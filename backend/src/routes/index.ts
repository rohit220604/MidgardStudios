import { Router } from "express";
import { getDbTest } from "../controllers/db-test.controller.js";
import { getHealth } from "../controllers/health.controller.js";
import { getRoot } from "../controllers/root.controller.js";
import apiRoutes from "./api.routes.js";

const router = Router();

router.get("/", getRoot);
router.get("/health", getHealth);
router.get("/db-test", getDbTest);
router.use("/api", apiRoutes);

export default router;
