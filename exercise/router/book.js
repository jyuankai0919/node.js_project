// 建立router
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('there is no book here :( ');
});

router.get('/page', (req, res) => {
    res.send('there is no page here :( ');
});

module.exports = router;