import { execSync } from 'child_process';
import fetch from 'node-fetch';
import { createHash, randomBytes } from 'crypto';

// 用於執行shell命令獲取當前公網IP
const getPublicIP = () => {
  try {
    return execSync('curl ifconfig.me').toString().trim();
  } catch (error) {
    console.error('Failed to get public IP:', error);
    return null;
  }
};

const updateAtlasWhitelist = async (publicKey, privateKey, groupId, ipAddress) => {
  const auth = Buffer.from(`${publicKey}:${privateKey}`).toString('base64');
  const apiURL = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${groupId}/accessList`;
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          ipAddress: ipAddress,
          comment: "CodeSpace IP" // 可以自定義註釋
        }
      ])
    };

    const response = await fetchWithDigestAuth(apiURL, options, publicKey, privateKey);
    const data = await response.json();

    if (response.ok) {
      console.log('IP Whitelist updated successfully:', data);
    } else {
      console.error('Failed to update IP Whitelist:', data);
    }
  } catch (error) {
    console.error('Failed to update IP Whitelist:', error);
  }
};


const publicKey = process.env.MONGODB_PROJECT_PUBLIC_KEY;
const privateKey = process.env.MONGODB_PROJECT_PRIVATE_KEY;
const groupId = process.env.GROUPID;

const publicIP = getPublicIP();
if (publicIP) {
  updateAtlasWhitelist(publicKey, privateKey, groupId, publicIP);
} else {
  console.error('No public IP address found.');
}

async function fetchWithDigestAuth(url, options = {}, username, password) {
  // 首先發送一個請求以獲取WWW-Authenticate頭
  let response = await fetch(url, options);
  if (response.status === 401) {
    // 解析WWW-Authenticate頭以獲取挑戰參數
    const authDetails = response.headers.get('www-authenticate').split(', ').reduce((prev, curr) => {
      const [key, value] = curr.split('=');
      prev[key] = value.replace(/"/g, '');
      return prev;
    }, {});

    // 在這裡，根據authDetails和API keys作為帳號、密碼來生成Authorization head的值
    const authHeader = generateAuthHeader(authDetails, username, password, options.method, url);

    // 添加Authorization頭到原始請求選項中並重發請求
    options.headers = {
      ...options.headers,
      'Authorization': authHeader
    };

    response = await fetch(url, options); // 使用帶有認證的請求重發
  }

  return response; // 返回最終的響應
}

function generateAuthHeader(authDetails, username, password, method, uri) {
    const ha1 = createHash('md5').update(`${username}:${authDetails.realm}:${password}`).digest('hex');
    const ha2 = createHash('md5').update(`${method}:${uri}`).digest('hex');
    const response = createHash('md5').update(`${ha1}:${authDetails.nonce}:${ha2}`).digest('hex');

    let authHeader = `Digest username="${username}", realm="${authDetails.realm}", nonce="${authDetails.nonce}", uri="${uri}", response="${response}"`;

    if (authDetails.opaque) {
        authHeader += `, opaque="${authDetails.opaque}"`;
    }

    if (authDetails.algorithm) {
        authHeader += `, algorithm=${authDetails.algorithm}`;
    }

    if (authDetails.qop) {
        // 假設qop="auth"，nonceCount固定為"00000001"，cnonce為隨機生成的字符串
        const nonceCount = '00000001';
        const cnonce = randomBytes(16).toString('hex');
        const responseWithQop = createHash('md5').update(`${ha1}:${authDetails.nonce}:${nonceCount}:${cnonce}:${authDetails.qop}:${ha2}`).digest('hex');
        authHeader = `Digest username="${username}", realm="${authDetails.realm}", nonce="${authDetails.nonce}", uri="${uri}", qop=${authDetails.qop}, nc=${nonceCount}, cnonce="${cnonce}", response="${responseWithQop}", opaque="${authDetails.opaque}"`;
    }

    return authHeader;
}
