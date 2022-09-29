import { Router } from "express";
import authRouter from './authRouter';
import userRouter from './userRouter';
import categoryRouter from "./categoryRouter";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(categoryRouter);

export default router;