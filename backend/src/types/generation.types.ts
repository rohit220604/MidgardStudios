import type { Generation } from "../../generated/prisma/client.js";

export type CreateGenerationInput = Pick<
  Generation,
  "genre" | "environment" | "style" | "inspiredBy" | "prompt" | "imageUrl" | "userId"
>;
