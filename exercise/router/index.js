// router/index.js
import { Router } from 'express';
const router = Router();

// 使用EJS渲染首頁
router.get('/', (req, res) => {
    res.render('index', { title: '首頁' }); // 假設你有一個變量title需要傳遞給模板
});

// 使用EJS渲染登入頁面
router.get('/login', (req, res) => {
    res.render('login', { title: '登入' });
});

// 使用EJS渲染註冊頁面
router.get('/register', (req, res) => {
    res.render('register', { title: '註冊' });
});

// 引入各個模塊的路由
import aboutRouter from './about.js';
import bookRouter from './book.js';
import authRouter from './auth.js';

// 使用這些路由
router.use('/about', aboutRouter);
router.use('/book', bookRouter);
router.use('/auth', authRouter);

export default router;
