// controllers/authController.js
import pkg from 'bcryptjs';
import User from '../../models/User.js';

const { genSalt, hash, compare } = pkg;

export async function register(req, res) {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: '用戶已存在' });
        }
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        user = new User({
            email: email,
            password: hashedPassword,
            name: req.body.name
        });

        await user.save();
        res.status(201).json({ msg: '用戶註冊成功' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('伺服器錯誤');
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        let user = await findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: '用戶不存在' });
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: '密碼錯誤' });
        }
        res.json({ msg: '登入成功' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('服務器錯誤');
    }
}
