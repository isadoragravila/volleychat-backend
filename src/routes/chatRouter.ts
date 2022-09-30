import { Router } from "express";
import { createChat } from "../controllers/chatController";
import validateSchema from "../middlewares/schemaValidator";
import validateToken from "../middlewares/tokenValidator";
import chatSchema from "../schemas/chatSchema";

const router = Router();

router.use(validateToken);
router.post('/chats/create/:categoryId', validateSchema(chatSchema), createChat);

export default router;