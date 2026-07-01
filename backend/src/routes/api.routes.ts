import { Router } from "express";
import { postGenerate } from "../controllers/generate.controller.js";
import { getGallery } from "../controllers/gallery.controller.js";

const apiRouter = Router();

apiRouter.post("/generate", postGenerate);
apiRouter.get("/gallery", getGallery);

export default apiRouter;
