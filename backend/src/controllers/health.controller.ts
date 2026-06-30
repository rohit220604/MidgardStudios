import type { Request, Response } from "express";
import type { HealthResponse } from "../types/api.types.js";

export const getHealth = (_req: Request, res: Response<HealthResponse>): void => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
};
