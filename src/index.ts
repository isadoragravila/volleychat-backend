import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";
import errorHandler from "./middlewares/errorHandler";
import e2eRouter from "../src/routes/e2eRouter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "test") {
	app.use(e2eRouter);
}

app.use(router);
app.use(errorHandler);

export default app;