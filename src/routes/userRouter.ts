import { Router } from "express";
import { enterChat, sendProfileInfo } from "../controllers/userController";
import validateToken from "../middlewares/tokenValidator";

const router = Router();

router.get('/profile', validateToken, sendProfileInfo);
router.post('/participants/:chatroomId', validateToken, enterChat);

export default router;