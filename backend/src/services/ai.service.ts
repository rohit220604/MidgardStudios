import { AppError } from "../middleware/error.middleware.js";

const POLLINATIONS_IMAGE_BASE_URL = "https://image.pollinations.ai/prompt";
const DEFAULT_MODEL = "flux";
const DEFAULT_WIDTH = "1024";
const DEFAULT_HEIGHT = "1024";
const GENERATION_TIMEOUT_MS = 120_000;

const buildPollinationsImageUrl = (prompt: string): string => {
  const encodedPrompt = encodeURIComponent(prompt);
  const query = new URLSearchParams({
    model: DEFAULT_MODEL,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });

  return `${POLLINATIONS_IMAGE_BASE_URL}/${encodedPrompt}?${query.toString()}`;
};

const verifyImageAvailability = async (
  imageUrl: string,
  signal: AbortSignal,
): Promise<void> => {
  const response = await fetch(imageUrl, {
    method: "HEAD",
    signal,
    redirect: "follow",
  });

  if (!response.ok) {
    throw new AppError(
      500,
      "Image generation failed",
      `Pollinations returned status ${response.status}`,
    );
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.startsWith("image/")) {
    throw new AppError(500, "Image generation failed", "Unexpected API response");
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  const imageUrl = buildPollinationsImageUrl(prompt);
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, GENERATION_TIMEOUT_MS);

  try {
    await verifyImageAvailability(imageUrl, abortController.signal);

    return imageUrl;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new AppError(504, "Generation timeout");
    }

    throw new AppError(503, "Service unavailable", error);
  } finally {
    clearTimeout(timeoutId);
  }
};
