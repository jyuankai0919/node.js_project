// 建立router
import { Router } from 'express';
const router = Router();
import { showBooks, showPage } from '../controllers/bookController.js';

router.get('/', showBooks);
router.get('/page', showPage);

export default router;