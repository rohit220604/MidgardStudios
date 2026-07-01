import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary.js";
import { AppError } from "../middleware/error.middleware.js";
import { logger } from "../utils/logger.js";

const CLOUDINARY_FOLDER = "midgard-studios/generations";

const uploadToCloudinary = async (imageBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: CLOUDINARY_FOLDER,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(new AppError(500, "Cloudinary upload failed", error));
          return;
        }

        if (!result?.secure_url) {
          reject(
            new AppError(500, "Cloudinary upload failed", "Unexpected API response"),
          );
          return;
        }

        resolve(result.secure_url);
      },
    );

    uploadStream.end(imageBuffer);
  });
};

export const uploadImage = async (imageBuffer: Buffer): Promise<string> => {
  if (!isCloudinaryConfigured()) {
    throw new AppError(503, "Service unavailable", "Cloudinary is not configured");
  }

  try {
    logger.info(`Cloudinary upload byte length: ${imageBuffer.byteLength}`);

    return await uploadToCloudinary(imageBuffer);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(500, "Cloudinary upload failed", error);
  }
};

export const uploadImageFromUrl = async (
  imageSource: string | Buffer,
): Promise<string> => {
  if (Buffer.isBuffer(imageSource)) {
    return uploadImage(imageSource);
  }

  throw new AppError(500, "Image generation failed", "Unexpected API response");
};
