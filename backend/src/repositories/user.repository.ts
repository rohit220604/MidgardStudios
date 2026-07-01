import type { User } from "../../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

export const findByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: {
  email: string;
  name?: string | null;
  image?: string | null;
  provider: string;
}): Promise<User> => {
  return prisma.user.create({
    data,
  });
};

export const findOrCreate = async (
  email: string,
  defaults: { name?: string | null; image?: string | null; provider: string } = { provider: "google" },
): Promise<User> => {
  const existing = await findByEmail(email);
  if (existing) return existing;

  return createUser({
    email,
    name: defaults.name ?? null,
    image: defaults.image ?? null,
    provider: defaults.provider,
  });
};
