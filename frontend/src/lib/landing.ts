export const HERO = {
  title: "Create Stunning Game Concept Art with AI",
  subtitle:
    "Generate production-ready game concept art using AI designed specifically for game developers and artists.",
  primaryCta: "Start Creating",
  secondaryCta: "Explore Gallery",
} as const;

export const FEATURES = [
  {
    icon: "palette",
    title: "Concept Art Generation",
    description: "Generate game-ready artwork from structured prompts.",
  },
  {
    icon: "gamepad",
    title: "Built for Game Creators",
    description: "Purpose-built workflow for indie studios and developers.",
  },
  {
    icon: "cloud",
    title: "Cloud Gallery",
    description: "Save and revisit your creations anytime.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Describe",
    description:
      "Define your genre, environment, art style, and creative vision.",
    icon: "pen",
  },
  {
    step: 2,
    title: "Generate",
    description:
      "Midgard Studios transforms your inputs into polished concept art.",
    icon: "sparkles",
  },
  {
    step: 3,
    title: "Create",
    description:
      "Save, iterate, and build a library of production-ready visuals.",
    icon: "image",
  },
] as const;

export const INSPIRED_BY_OPTIONS = [
  "Custom",
  "Dark Souls",
  "Elden Ring",
  "Studio Ghibli",
  "Cyberpunk 2077",
  "Zelda",
  "Norse Mythology",
  "JRPG",
] as const;

export const GENERATOR = {
  id: "generator",
  title: "Concept Art Generator",
  subtitle:
    "Configure your creative direction and generate production-ready concept art.",
  previewMessage: "Your generated artwork will appear here.",
  generateLabel: "Generate",
} as const;

export const GENERATOR_FIELDS = {
  genre: {
    id: "genre",
    label: "Game Genre",
    placeholder: "e.g. Fantasy RPG, Sci-Fi Horror",
  },
  environment: {
    id: "environment",
    label: "Environment",
    placeholder: "e.g. Ancient forest, neon megacity",
  },
  style: {
    id: "style",
    label: "Art Style",
    placeholder: "e.g. Concept art, painterly, cel-shaded",
  },
  inspiredBy: {
    id: "inspired-by",
    label: "Inspired By",
    placeholder: "Select an inspiration",
  },
  prompt: {
    id: "prompt",
    label: "Additional Prompt",
    placeholder:
      "Describe key subjects, mood, lighting, or composition details...",
  },
} as const;

export const CTA = {
  title: "Ready to create your next world?",
  subtitle:
    "Start generating concept art tailored for game development workflows.",
  buttonLabel: "Start Generating",
} as const;
