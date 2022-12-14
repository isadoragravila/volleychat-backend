import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import categoryRouter from "./categoryRouter";
import chatRouter from "./chatRouter";
import messageRouter from "./messageRouter";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(categoryRouter);
router.use(chatRouter);
router.use(messageRouter);

export default router;