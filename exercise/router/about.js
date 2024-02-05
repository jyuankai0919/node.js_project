// 引入router
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('there is no about here :( ');
});

router.get('/detail', (req, res) => {
    let name = req.query.name;
    res.send(`there is no ${name} detail here :(`);
});

module.exports = router;
