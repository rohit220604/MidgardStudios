import { prisma } from "../lib/prisma.js";

export const testDatabaseConnection = async (): Promise<void> => {
  await prisma.$queryRaw`SELECT 1`;
};
