import { Router } from "express";
import { createChat, getChats, getChatsByCreatorId } from "../controllers/chatController";
import validateSchema from "../middlewares/schemaValidator";
import validateToken from "../middlewares/tokenValidator";
import chatSchema from "../schemas/chatSchema";

const router = Router();

router.use(validateToken);
router.post("/chats/create/:categoryId", validateSchema(chatSchema), createChat);
router.get("/chats/:categoryId", getChats);
router.get("/chats/creator/:creatorId", getChatsByCreatorId);

export default router;