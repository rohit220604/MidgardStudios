import type { NextFunction, Request, Response } from "express";
import { createGeneration, getGenerationById } from "../repositories/generation.repository.js";
import { AppError } from "../middleware/error.middleware.js";
import { generateImage } from "../services/ai.service.js";
import { uploadImageFromUrl } from "../services/cloudinary.service.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export const postRegenerate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user) {
      throw new AppError(401, "Not authenticated");
    }

    const { generationId, updatedPrompt } = req.body;

    if (!generationId || typeof generationId !== "string" || generationId.trim() === "") {
      throw new AppError(400, "generationId is required");
    }

    // 1. Fetch original generation
    const original = await getGenerationById(generationId.trim());
    if (!original) {
      throw new AppError(404, "Generation not found");
    }

    // 2. Verify ownership
    if (original.userId !== authReq.user.id) {
      throw new AppError(403, "Forbidden");
    }

    // 3. Determine prompt to use (fallback to original prompt if updatedPrompt is not provided)
    const promptToUse =
      updatedPrompt && typeof updatedPrompt === "string" && updatedPrompt.trim() !== ""
        ? updatedPrompt.trim()
        : original.prompt;

    // 4. Generate new image using AI service
    const pollinationsImageUrl = await generateImage(promptToUse);
    console.log("\n=========================");
    console.log("Regeneration Pollinations URL:");
    console.log(pollinationsImageUrl);
    console.log("=========================\n");

    // 5. Upload to Cloudinary
    const cloudinaryImageUrl = await uploadImageFromUrl(pollinationsImageUrl);

    // 6. Create new generation database record linked to current user
    let newGeneration;
    try {
      newGeneration = await createGeneration({
        genre: original.genre,
        environment: original.environment,
        style: original.style,
        prompt: promptToUse,
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
        id: newGeneration.id,
        imageUrl: newGeneration.imageUrl,
        prompt: newGeneration.prompt,
      },
    });
  } catch (error) {
    next(error);
  }
};
