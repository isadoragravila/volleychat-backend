import { Router } from "express";
import { sendProfileInfo } from "../controllers/userController";
import tokenValidator from "../middlewares/tokenValidator";

const router = Router();

router.get('/profile', tokenValidator, sendProfileInfo);

export default router;