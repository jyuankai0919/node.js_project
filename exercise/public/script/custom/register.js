
document.getElementById('registerBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    // 正則表達式來驗證密碼複雜度
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // 檢查密碼是否符合要求
    if (!passwordRegex.test(password)) {
        alert('密碼必須包含大小寫英文字母和數字，且至少8位長');
        return; // 不提交表單
    }
    
    fetch('/auth/Api/register', { // 確保這個URL與你的後端路由匹配
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg) {
            // 使用showNotice函數來顯示註冊結果的訊息
            showNotice(data.msg);
            
            alert(data.msg); // 顯示註冊結果的訊息
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
