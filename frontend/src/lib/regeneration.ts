import type { GenerateInput, Generation } from "@/types/generation";

const REGENERATION_INPUT_KEY = "midgard.regenerationInput";
const GALLERY_REFRESH_KEY = "midgard.galleryNeedsRefresh";

export type RegenerationInput = GenerateInput;

export const toRegenerationInput = (generation: Generation): RegenerationInput => ({
  genre: generation.genre,
  environment: generation.environment,
  style: generation.style,
  inspiredBy: generation.inspiredBy || "Custom",
  prompt: generation.prompt,
});

export const saveRegenerationInput = (input: RegenerationInput) => {
  window.sessionStorage.setItem(REGENERATION_INPUT_KEY, JSON.stringify(input));
};

export const readRegenerationInput = (): RegenerationInput | null => {
  const value = window.sessionStorage.getItem(REGENERATION_INPUT_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as RegenerationInput;
  } catch {
    window.sessionStorage.removeItem(REGENERATION_INPUT_KEY);
    return null;
  }
};

export const clearRegenerationInput = () => {
  window.sessionStorage.removeItem(REGENERATION_INPUT_KEY);
};

export const markGalleryNeedsRefresh = () => {
  window.sessionStorage.setItem(GALLERY_REFRESH_KEY, Date.now().toString());
};

export const consumeGalleryRefreshFlag = () => {
  const needsRefresh = window.sessionStorage.getItem(GALLERY_REFRESH_KEY);
  window.sessionStorage.removeItem(GALLERY_REFRESH_KEY);

  return Boolean(needsRefresh);
};
