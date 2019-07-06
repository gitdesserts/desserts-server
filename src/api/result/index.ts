import { Router } from 'express';
import { create, findFromWeek, findAllFromMonth } from './result.ctrl';

const router: Router = Router();

router.post('/', create);
router.get('/week', findFromWeek);
router.get('/month', findAllFromMonth);

export default router;
