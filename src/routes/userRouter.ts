import { Router } from "express";
import { enterChat, sendProfileInfo, getParticipants, removeParticipant, updateStatus } from "../controllers/userController";
import validateToken from "../middlewares/tokenValidator";

const router = Router();

router.get("/profile", validateToken, sendProfileInfo);
router.post("/participants/:chatroomId", validateToken, enterChat);
router.get("/participants/:chatroomId", validateToken, getParticipants);
router.delete("/participants/:chatroomId", validateToken, removeParticipant);
router.patch("/participants/:chatroomId/status", validateToken, updateStatus);

export default router;