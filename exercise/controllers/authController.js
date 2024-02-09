// controllers/authController.js

exports.loginIndex= (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
};

exports.registerIndex = (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
};