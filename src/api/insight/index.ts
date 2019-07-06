import {Router } from "express";
import { findOne } from "./insight.ctrl";

const router: Router = Router();

router.get('/', findOne);

export default router;