// router/auth.js
const express = require('express');
const router = express.Router();
const authApiController = require('../controllers/API/authController');
const authController = require('../controllers/authController');

router.get('/register', authController.registerIndex);
router.get('/login', authController.loginIndex);
router.post('/Api/register', authApiController.register);
router.post('/Api/login', authApiController.login);

module.exports = router;
