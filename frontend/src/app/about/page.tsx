import type { Metadata } from "next";
import Image from "next/image";

import { PageWrapper } from "@/components/layout/page-wrapper";

export const metadata: Metadata = {
  title: "About",
};

const features = [
  {
    title: "AI Concept Art Generation",
    description:
      "Transform structured ideas into high-quality game concept art using AI-powered prompt generation.",
  },
  {
    title: "Personal Gallery",
    description:
      "Every generated artwork is securely stored, allowing you to revisit, organize, and continue building your game world.",
  },
  {
    title: "Prompt Regeneration",
    description:
      "Iterate on previous concepts by editing existing prompts instead of starting over from scratch.",
  },
  {
    title: "Built for Game Creators",
    description:
      "Designed specifically for game developers, artists, and indie studios with a structured creative workflow.",
  },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-7xl space-y-20">
        {/* Hero */}
        <section className="grid items-center gap-14 lg:grid-cols-2">
          <div className="space-y-7">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              About Midgard Studios
            </h1>

            <p className="text-lg leading-8 text-muted-foreground">
              <span className="font-semibold text-foreground">
                Midgard Studios
              </span>{" "}
              is an AI-powered concept art platform built for game creators.
              It helps developers, designers, and artists transform structured
              ideas into visually compelling concept art within seconds.
            </p>

            <p className="text-lg leading-8 text-muted-foreground">
              Instead of writing complex prompts manually, creators simply
              describe their world through intuitive inputs like game genre,
              environment, art style, inspiration, and additional details.
              Midgard Studios refines these ideas into optimized AI prompts,
              making concept creation faster, more consistent, and easier to
              iterate.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            <Image
              src="/images/about-hero.png"
              alt="Fantasy world concept art"
              width={900}
              height={700}
              priority
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
        </section>

        {/* Why Midgard */}
        <section className="rounded-3xl border border-border bg-card p-8 md:p-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl font-semibold">
              Why "Midgard"?
            </h2>

            <p className="text-lg leading-8 text-muted-foreground">
              The name <strong className="text-foreground">Midgard</strong>{" "}
              comes from Norse mythology, where it represents the realm of
              humans—a world filled with stories, exploration, creativity, and
              adventure.
            </p>

            <p className="text-lg leading-8 text-muted-foreground">
              Just as Midgard connects countless journeys and legends,
              <strong className="text-foreground">
                {" "}
                Midgard Studios
              </strong>{" "}
              is designed as a creative space where ideas evolve into immersive
              game worlds through the power of AI.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-semibold">
              Key Features
            </h2>

            <p className="mt-2 text-muted-foreground">
              Everything you need to rapidly create, refine and organize game
              concept art.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
              >
                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}