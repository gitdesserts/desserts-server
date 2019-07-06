import { Router } from 'express';
import { create } from './result.ctrl';

const router: Router = Router();

router.post('/', create);

export default router;
