const axios = require('axios');
const { execSync } = require('child_process');

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
  try {
    const response = await axios.post(
      `https://cloud.mongodb.com/api/atlas/v1.0/groups/${groupId}/accessList`,
      [{ ipAddress, comment: "Codespaces IP" }],
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('IP Whitelist updated successfully:', response.data);
  } catch (error) {
    console.error('Failed to update IP Whitelist:', error.response ? error.response.data : error);
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
