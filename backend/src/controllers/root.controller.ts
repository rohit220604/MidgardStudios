import type { Request, Response } from "express";
import type { RootResponse } from "../types/api.types.js";

export const getRoot = (_req: Request, res: Response<RootResponse>): void => {
  res.json({
    success: true,
    message: "Midgard Studios API",
  });
};
