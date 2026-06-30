import type { NextFunction, Request, Response } from "express";
import { generateImage } from "../services/ai.service.js";
import { buildOptimizedPrompt } from "../services/prompt.service.js";
import type { GenerateResponse } from "../types/generate.types.js";
import { parseGenerateInput } from "../utils/generate.validation.js";

export const postGenerate = async (
  req: Request,
  res: Response<GenerateResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const input = parseGenerateInput(req.body);
    const optimizedPrompt = buildOptimizedPrompt(input);
    const imageUrl = await generateImage(optimizedPrompt);

    res.json({
      success: true,
      prompt: optimizedPrompt,
      imageUrl,
    });
  } catch (error) {
    next(error);
  }
};
