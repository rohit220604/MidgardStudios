import type { Request, Response, NextFunction } from "express";
import { findOrCreate } from "../repositories/user.repository.js";
import { AppError } from "./error.middleware.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    provider: string;
    createdAt: Date;
  };
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const email = req.headers["x-user-email"];

  if (!email || typeof email !== "string" || email.trim() === "") {
    next(new AppError(401, "Not authenticated"));
    return;
  }

  try {
    const user = await findOrCreate(email.trim().toLowerCase(), {
      provider: "google",
      name: email.trim().split("@")[0],
    });

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error) {
    next(new AppError(500, "Authentication failed", error));
  }
};
