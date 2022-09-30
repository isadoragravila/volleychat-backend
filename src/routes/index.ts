import { Router } from "express";
import authRouter from './authRouter';
import userRouter from './userRouter';
import categoryRouter from "./categoryRouter";
import chatRouter from "./chatRouter";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(categoryRouter);
router.use(chatRouter);

export default router;