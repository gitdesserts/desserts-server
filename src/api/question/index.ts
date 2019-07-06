import { Router } from 'express';
import { find } from './question.ctrl';

const router: Router = Router();

router.get('/', find);

export default router;
