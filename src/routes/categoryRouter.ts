import { Router } from "express";
import { getCategories } from "../controllers/categoryController";
import validateToken from "../middlewares/tokenValidator";

const router = Router();

router.get('/categories', validateToken, getCategories);

export default router;