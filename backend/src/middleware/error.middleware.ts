import type { NextFunction, Request, Response } from "express";
import type { ApiErrorResponse } from "../types/api.types.js";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly error?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.error !== undefined ? { error: err.error } : {}),
    });
    return;
  }

  logger.error("Unexpected server error", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(env.NODE_ENV === "development" && err instanceof Error
      ? { error: err.message }
      : {}),
  });
};
