import { Router } from 'express';
import { login } from './user.ctrl';

const router: Router = Router();

router.post('/session', login);

export default router;
