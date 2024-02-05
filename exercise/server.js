const express = require('express');
const app = express();
const port = 3000;

// 引入mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// 設定router
const bookRouter = require('./router/book.js'); // . ->當前目錄
const aboutRouter = require('./router/about.js');
const aboutRouter = require('./router/user.js');

// 引入dotenv
require('dotenv').config();

// Body Parser Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


// 首頁ruter
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// console.log
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Serve static files from the "public" directory
app.use(express.static('public'));

// 使用router
app.use('/book', bookRouter);
app.use('/about', aboutRouter);
app.use('/api/users', require('./route/user'));
