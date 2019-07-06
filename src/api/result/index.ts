import { Router } from 'express';
import { create, findFromWeek } from './result.ctrl';

const router: Router = Router();

router.post('/', create);
router.get('/week', findFromWeek);

export default router;
