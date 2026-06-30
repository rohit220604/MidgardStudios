-- CreateTable
CREATE TABLE "generations" (
    "id" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generations_pkey" PRIMARY KEY ("id")
);
