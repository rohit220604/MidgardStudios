import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";
import { getRoot } from "../controllers/root.controller.js";

const router = Router();

router.get("/", getRoot);
router.get("/health", getHealth);

export default router;
