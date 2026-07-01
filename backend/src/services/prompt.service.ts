import type { GenerateInput } from "../types/generate.types.js";

const formatGenre = (genre: string): string => {
  const trimmed = genre.trim();

  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
};

const withLeadingArticle = (phrase: string): string => {
  const normalized = phrase.trim().toLowerCase();
  const article = /^[aeiou]/.test(normalized) ? "an" : "a";

  return `${article} ${normalized}`;
};

const formatSubject = (prompt: string): string => {
  const normalized = prompt.trim().toLowerCase().replace(/\s+with\s+/g, " and ");

  return withLeadingArticle(normalized);
};

export const buildOptimizedPrompt = (input: GenerateInput): string => {
  const genre = formatGenre(input.genre);
  const environment = withLeadingArticle(input.environment);
  const style = input.style.trim().toLowerCase();
  const subject = formatSubject(input.prompt);

  return `High quality ${genre} ${style} of ${environment} featuring ${subject}, digital ${style}, highly detailed, cinematic lighting.`;
  // return "fantasy forest with glowing trees that are very good and glowing very well";
};
