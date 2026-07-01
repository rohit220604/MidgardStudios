import axios from "axios";
import { AppError } from "../middleware/error.middleware.js";
import { logger } from "../utils/logger.js";

const POLLINATIONS_IMAGE_BASE_URL = "https://image.pollinations.ai/prompt";
const POLL_INTERVAL_MS = 2_000;
const MAX_WAIT_MS = 30_000;
const MAX_ATTEMPTS = 15;
const DOWNLOAD_TIMEOUT_MS = 120_000;

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const buildPollinationsImageUrl = (prompt: string): string => {
  return `${POLLINATIONS_IMAGE_BASE_URL}/${encodeURIComponent(prompt)}`;
};

const isAxiosTimeoutError = (error: unknown): boolean => {
  return axios.isAxiosError(error) && error.code === "ECONNABORTED";
};

const requestImage = async (
  imageUrl: string,
): Promise<Buffer | null> => {
  const response = await axios.get<ArrayBuffer>(imageUrl, {
    responseType: "arraybuffer",
    timeout: DOWNLOAD_TIMEOUT_MS,
    maxRedirects: 5,
    validateStatus: () => true,
  });

  if (response.status !== 200) {
    return null;
  }

  const contentType = String(response.headers["content-type"] ?? "");

  if (!contentType.startsWith("image/")) {
    throw new AppError(500, "Image generation failed", "Unexpected content type");
  }

  const imageBuffer = Buffer.from(response.data);

  if (imageBuffer.byteLength === 0) {
    return null;
  }

  return imageBuffer;
};

const waitForImage = async (imageUrl: string): Promise<Buffer> => {
  const startTime = Date.now();

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const elapsed = Date.now() - startTime;

    if (elapsed > MAX_WAIT_MS) {
      throw new AppError(504, "Generation timeout");
    }

    logger.info(`Pollinations poll attempt: ${attempt}`);

    try {
      const imageBuffer = await requestImage(imageUrl);

      if (imageBuffer) {
        logger.info(`Pollinations downloaded byte length: ${imageBuffer.byteLength}`);
        logger.info(`Pollinations total generation time: ${Date.now() - startTime}ms`);

        return imageBuffer;
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      if (isAxiosTimeoutError(error)) {
        throw new AppError(504, "Generation timeout");
      }

      throw new AppError(503, "Service unavailable", error);
    }

    if (attempt < MAX_ATTEMPTS) {
      await sleep(POLL_INTERVAL_MS);
    }
  }

  throw new AppError(504, "Generation timeout");
};

export const generateImage = async (prompt: string): Promise<Buffer> => {
  const imageUrl = buildPollinationsImageUrl(prompt);

  try {
    return await waitForImage(imageUrl);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (isAxiosTimeoutError(error)) {
      throw new AppError(504, "Generation timeout");
    }

    throw new AppError(503, "Service unavailable", error);
  }
};
