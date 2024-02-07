// 引入所需模塊和套件
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // 加載環境變量

const app = express();
const port = process.env.PORT || 3000; // 使用環境變量設定端口，沒有則默認為3000

// 引入路由
const bookRouter = require('./router/book.js');
const aboutRouter = require('./router/about.js');
const authRouter = require('./router/auth');

// 使用body-parser中間件來解析請求體
app.use(bodyParser.json());

// 連接到MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// 設置靜態文件目錄
app.use(express.static('public'));

// 定義路由
// 首頁路由
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 書籍和關於頁面的路由
app.use('/book', bookRouter);
app.use('/about', aboutRouter);

// 認證（登入和註冊）的API路由
app.use('/api/auth', authRouter);

// 啟動服務器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
