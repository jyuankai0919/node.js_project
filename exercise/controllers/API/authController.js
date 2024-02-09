// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: '用戶已存在' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ msg: '用戶註冊成功' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('服務器錯誤');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: '用戶不存在' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: '密碼錯誤' });
        }
        res.json({ msg: '登入成功' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('服務器錯誤');
    }
};
