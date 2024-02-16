// 引入所需模塊和套件
import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import routes from './router/index.js'; // 引入中央路由處理器

// 解決__dirname問題
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 只有在本地開發時，才需要加載.env文件
if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 3000; // 使用環境變量設定端口，沒有則默認為3000

// set
app.set('view engine', 'ejs'); // 設置視圖引擎為EJS
app.set('views', join(__dirname, 'views')); // 設置視圖的目錄

// use
app.use(express.json()); // 使用Express內置的json解析中間件
app.use(express.static(join(__dirname, 'public')));
app.use('/', routes); // 使用中央路由處理器

// 連接到MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connection successful...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// 啟動服務器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
