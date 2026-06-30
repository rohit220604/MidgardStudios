import type { NextFunction, Request, Response } from "express";
import { AppError } from "../middleware/error.middleware.js";
import { testDatabaseConnection } from "../repositories/db.repository.js";
import type { DbTestResponse } from "../types/api.types.js";

export const getDbTest = async (
  _req: Request,
  res: Response<DbTestResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    await testDatabaseConnection();

    res.json({
      success: true,
      database: "connected",
    });
  } catch (error) {
    next(new AppError(503, "Database connection failed", error));
  }
};
