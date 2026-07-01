import type { NextFunction, Request, Response } from "express";
import { createGeneration } from "../repositories/generation.repository.js";
import { AppError } from "../middleware/error.middleware.js";
import { generateImage } from "../services/ai.service.js";
import { uploadImageFromUrl } from "../services/cloudinary.service.js";
import { buildOptimizedPrompt } from "../services/prompt.service.js";
import type { GenerateResponse } from "../types/generate.types.js";
import { parseGenerateInput } from "../utils/generate.validation.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export const postGenerate = async (
  req: Request,
  res: Response<GenerateResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user) {
      throw new AppError(401, "Not authenticated");
    }

    const input = parseGenerateInput(req.body);
    const optimizedPrompt = buildOptimizedPrompt(input);
    const pollinationsImageUrl = await generateImage(optimizedPrompt);
    console.log("\n=========================");
    console.log("Pollinations URL:");
    console.log(pollinationsImageUrl);
    console.log("=========================\n");
    const cloudinaryImageUrl = await uploadImageFromUrl(pollinationsImageUrl);

    let generation;

    try {
      generation = await createGeneration({
        genre: input.genre,
        environment: input.environment,
        style: input.style,
        prompt: optimizedPrompt,
        imageUrl: cloudinaryImageUrl,
        userId: authReq.user.id,
      });
    } catch (error) {
      next(new AppError(500, "Database write failed", error));
      return;
    }

    res.json({
      success: true,
      generation: {
        id: generation.id,
        imageUrl: generation.imageUrl,
        prompt: generation.prompt,
      },
    });
  } catch (error) {
    next(error);
  }
};
