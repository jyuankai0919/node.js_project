// 引入router
const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

router.get('/', aboutController.showAbout);
router.get('/detail', aboutController.showDetail);

module.exports = router;
