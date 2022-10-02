import { Router } from "express";
import { createChat, getChats, getChatName } from "../controllers/chatController";
import validateSchema from "../middlewares/schemaValidator";
import validateToken from "../middlewares/tokenValidator";
import chatSchema from "../schemas/chatSchema";

const router = Router();

router.use(validateToken);
router.post('/chats/create/:categoryId', validateSchema(chatSchema), createChat);
router.get('/chats/name/:chatId', getChatName);
router.get('/chats/:categoryId', getChats);

export default router;