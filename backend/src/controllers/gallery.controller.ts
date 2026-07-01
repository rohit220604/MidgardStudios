import type { NextFunction, Request, Response } from "express";
import { getUserGenerations } from "../repositories/generation.repository.js";
import { AppError } from "../middleware/error.middleware.js";
import type { GalleryResponse } from "../types/gallery.types.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

const toGalleryItem = (
  generation: Awaited<ReturnType<typeof getUserGenerations>>[number],
) => ({
  id: generation.id,
  imageUrl: generation.imageUrl,
  prompt: generation.prompt,
  genre: generation.genre,
  environment: generation.environment,
  style: generation.style,
  inspiredBy: generation.inspiredBy ?? "Custom",
  createdAt: generation.createdAt.toISOString(),
});

export const getGallery = async (
  req: Request,
  res: Response<GalleryResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user) {
      throw new AppError(401, "Not authenticated");
    }

    const generations = await getUserGenerations(authReq.user.id);

    res.json(generations.map(toGalleryItem));
  } catch (error) {
    next(new AppError(500, "Database read failed", error));
  }
};
