export const SITE = {
  name: "Midgard Studios",
  tagline: "AI-powered tools for game creators.",
  description: "AI-powered tools for game creators.",
  githubUrl: "#",
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
