// router/auth.js
import { Router } from 'express';
const router = Router();
import { register, login } from '../controllers/API/authController.js';
import { registerIndex, loginIndex } from '../controllers/authController.js';

router.get('/register', registerIndex);
router.get('/login', loginIndex);
router.post('/Api/register', register);
router.post('/Api/login', login);

export default router;
