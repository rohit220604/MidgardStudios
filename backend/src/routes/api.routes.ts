import { Router } from "express";
import { postGenerate } from "../controllers/generate.controller.js";
import { getGallery } from "../controllers/gallery.controller.js";
import { postRegenerate } from "../controllers/regenerate.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const apiRouter = Router();

apiRouter.post("/generate", authenticate, postGenerate);
apiRouter.get("/me/gallery", authenticate, getGallery);
apiRouter.post("/regenerate", authenticate, postRegenerate);

export default apiRouter;
