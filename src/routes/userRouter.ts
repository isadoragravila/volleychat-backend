import { Router } from "express";
import { enterChat, sendProfileInfo, getParticipants, removeParticipant, updateStatus, getProfileById } from "../controllers/userController";
import validateToken from "../middlewares/tokenValidator";

const router = Router();

router.use(validateToken);
router.get("/profile", sendProfileInfo);
router.post("/participants/:chatroomId", enterChat);
router.get("/participants/:chatroomId", getParticipants);
router.delete("/participants/:chatroomId", removeParticipant);
router.patch("/participants/:chatroomId/status", updateStatus);
router.get("/profile/:id", getProfileById);

export default router;