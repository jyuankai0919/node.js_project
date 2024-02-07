// 建立router
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.showBooks);
router.get('/page', bookController.showPage);

module.exports = router;