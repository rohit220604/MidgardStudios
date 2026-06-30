import { Router } from "express";
import { getDbTest } from "../controllers/db-test.controller.js";
import { getHealth } from "../controllers/health.controller.js";
import { getRoot } from "../controllers/root.controller.js";

const router = Router();

router.get("/", getRoot);
router.get("/health", getHealth);
router.get("/db-test", getDbTest);

export default router;
