export const HERO = {
  title: "Create Stunning Game Concept Art with AI",
  subtitle:
    "Transform your ideas into production-ready concept art using AI-powered tools built for game creators.",
  primaryCta: "Start Creating",
  secondaryCta: "View Gallery",
} as const;

export const FEATURES = [
  {
    icon: "palette",
    title: "Concept Art Generation",
    description:
      "Generate high-quality concept art from structured prompts.",
  },
  {
    icon: "zap",
    title: "Fast Workflow",
    description: "Turn ideas into visuals within seconds.",
  },
  {
    icon: "gamepad",
    title: "Built for Game Developers",
    description: "Designed specifically for game artists and indie studios.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Describe your game world",
    description:
      "Define genre, environment, style, and creative direction in a structured workflow.",
  },
  {
    step: 2,
    title: "AI generates concept art",
    description:
      "Midgard Studios transforms your inputs into polished visual concepts.",
  },
  {
    step: 3,
    title: "Save and iterate",
    description:
      "Refine prompts, regenerate variations, and build your creative library.",
  },
] as const;

export const INSPIRED_BY_OPTIONS = [
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
  generateLabel: "Generate Concept Art",
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
