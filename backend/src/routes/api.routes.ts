import { Router } from "express";
import { postGenerate } from "../controllers/generate.controller.js";

const apiRouter = Router();

apiRouter.post("/generate", postGenerate);

export default apiRouter;
