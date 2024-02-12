// 引入所需模塊和套件
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const routes = require('./router/index'); // 引入中央路由處理器

const app = express();
const port = process.env.PORT || 3000; // 使用環境變量設定端口，沒有則默認為3000

// set
app.set('view engine', 'ejs'); // 設置視圖引擎為EJS
app.set('views', path.join(__dirname, 'views')); // 設置視圖的目錄

// use
app.use(bodyParser.json()); // 使用body-parser中間件來解析請求體
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes); // 使用中央路由處理器


// 連接到MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// 啟動服務器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
