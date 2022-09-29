import { Router } from "express";
import { sendProfileInfo } from "../controllers/userController";
import validateToken from "../middlewares/tokenValidator";

const router = Router();

router.get('/profile', validateToken, sendProfileInfo);

export default router;