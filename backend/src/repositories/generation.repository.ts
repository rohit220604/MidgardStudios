import type { Generation } from "../../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import type { CreateGenerationInput } from "../types/generation.types.js";

export const createGeneration = async (
  data: CreateGenerationInput,
): Promise<Generation> => {
  return prisma.generation.create({ data });
};

export const getUserGenerations = async (userId: string): Promise<Generation[]> => {
  return prisma.generation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getGenerationById = async (
  id: string,
): Promise<Generation | null> => {
  return prisma.generation.findUnique({
    where: { id },
  });
};
