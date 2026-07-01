import { AppError } from "../middleware/error.middleware.js";
import type { GenerateInput } from "../types/generate.types.js";

const REQUIRED_FIELDS = ["genre", "environment", "style", "inspiredBy", "prompt"] as const;

const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};

export const parseGenerateInput = (body: unknown): GenerateInput => {
  if (!body || typeof body !== "object") {
    throw new AppError(400, "Invalid input");
  }

  const record = body as Record<string, unknown>;
  const missingFields = REQUIRED_FIELDS.filter(
    (field) => !isNonEmptyString(record[field]),
  );

  if (missingFields.length > 0) {
    throw new AppError(400, "Invalid input", { missingFields });
  }

  return {
    genre: (record.genre as string).trim(),
    environment: (record.environment as string).trim(),
    style: (record.style as string).trim(),
    inspiredBy: (record.inspiredBy as string).trim(),
    prompt: (record.prompt as string).trim(),
  };
};
