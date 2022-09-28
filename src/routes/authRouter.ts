import { Router } from "express";
import { registerUser } from "../controllers/authController";
import validateSchema from "../middlewares/schemaValidator";
import registerSchema from "../schemas/registerSchema";

const router = Router();

router.post('/sign-up', validateSchema(registerSchema), registerUser);

export default router;