// controllers/authController.js

export function loginIndex(req, res) {
    res.sendFile(__dirname + '/public/login.html');
}

export function registerIndex(req, res) {
    res.sendFile(__dirname + '/public/register.html');
}