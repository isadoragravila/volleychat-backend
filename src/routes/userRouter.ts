import { Router } from "express";
import { enterChat, sendProfileInfo, getParticipants } from "../controllers/userController";
import validateToken from "../middlewares/tokenValidator";

const router = Router();

router.get('/profile', validateToken, sendProfileInfo);
router.post('/participants/:chatroomId', validateToken, enterChat);
router.get('/participants/:chatroomId', validateToken, getParticipants);

export default router;