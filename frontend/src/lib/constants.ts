export const SITE = {
  name: "Midgard Studios",
  tagline: "AI-powered tools for game creators.",
  description:
    "Midgard Studios is an AI-powered concept art platform built for game creators. Transform structured ideas into visually compelling concept art within seconds.",
  url: "https://midgardstudios.vercel.app",
  githubUrl: "https://github.com/rohit220604/MidgardStudios",
  author: "Rohit Jaliminchi",
} as const;

export const LAYOUT = {
  maxWidth: "max-w-7xl",
  horizontalPadding: "px-4 sm:px-6 lg:px-8",
  sectionSpacing: "py-12 md:py-16",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
] as const;

export const LANGUAGES = {
  en: "EN",
  ja: "日本語",
} as const;

export const PROMPT_MAX_LENGTH = 1000;