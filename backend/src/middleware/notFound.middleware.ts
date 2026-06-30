import type { Request, Response } from "express";
import type { ApiErrorResponse } from "../types/api.types.js";

export const notFoundHandler = (
  _req: Request,
  res: Response<ApiErrorResponse>,
): void => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};
