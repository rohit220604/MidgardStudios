import type { NextFunction, Request, Response } from "express";
import { getAllGenerations } from "../repositories/generation.repository.js";
import { AppError } from "../middleware/error.middleware.js";
import type { GalleryResponse } from "../types/gallery.types.js";

const toGalleryItem = (
  generation: Awaited<ReturnType<typeof getAllGenerations>>[number],
) => ({
  id: generation.id,
  imageUrl: generation.imageUrl,
  prompt: generation.prompt,
  genre: generation.genre,
  environment: generation.environment,
  style: generation.style,
  createdAt: generation.createdAt.toISOString(),
});

export const getGallery = async (
  _req: Request,
  res: Response<GalleryResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const generations = await getAllGenerations();

    res.json(generations.map(toGalleryItem));
  } catch (error) {
    next(new AppError(500, "Database read failed", error));
  }
};
