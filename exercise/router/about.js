// 引入router
import { Router } from 'express';
const router = Router();
import { showAbout, showDetail } from '../controllers/aboutController.js';

router.get('/', showAbout);
router.get('/detail', showDetail);

export default router;
