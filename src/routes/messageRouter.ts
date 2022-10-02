import { Router } from "express";
import { createMessage } from "../controllers/messageController";
import validateSchema from "../middlewares/schemaValidator";
import validateToken from "../middlewares/tokenValidator";
import messageSchema from "../schemas/messageSchema";

const router = Router();

router.use(validateToken);
router.post('/messages/:chatroomId', validateSchema(messageSchema), createMessage);

export default router;