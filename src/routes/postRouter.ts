import { Router } from "express";
import { getPosts } from "../controllers/postController";
import validateToken from "../middlewares/tokenValidator";


const router = Router();

router.use(validateToken);
router.get("/posts/:id", getPosts);

export default router;