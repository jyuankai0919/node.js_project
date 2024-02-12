
document.getElementById('registerBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/auth/Api/register', { // 確保這個URL與你的後端路由匹配
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg) {
            alert(data.msg); // 顯示註冊結果的訊息
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
