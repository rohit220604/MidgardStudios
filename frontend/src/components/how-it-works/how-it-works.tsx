import type { LucideIcon } from "lucide-react";
import { ImageIcon, PenLine, Sparkles } from "lucide-react";

import { FadeIn } from "@/components/layout/fade-in";
import { Section } from "@/components/layout/section";
import { HOW_IT_WORKS_STEPS } from "@/lib/landing";

const STEP_ICONS: Record<(typeof HOW_IT_WORKS_STEPS)[number]["icon"], LucideIcon> =
  {
    pen: PenLine,
    sparkles: Sparkles,
    image: ImageIcon,
  };

const STAGGER_DELAYS = ["", "delay-100", "delay-200"] as const;

export function HowItWorks() {
  return (
    <Section className="border-y border-border/60 bg-card/20">
      <FadeIn className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          How It Works
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Three steps to your next concept
        </h2>
      </FadeIn>

      <div className="grid gap-8 md:grid-cols-3">
        {HOW_IT_WORKS_STEPS.map((item, index) => {
          const Icon = STEP_ICONS[item.icon];

          return (
            <FadeIn
              key={item.step}
              className={`relative flex flex-col items-center text-center ${STAGGER_DELAYS[index]}`}
            >
              {index < HOW_IT_WORKS_STEPS.length - 1 ? (
                <div
                  aria-hidden
                  className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-5rem)] bg-gradient-to-r from-border via-primary/40 to-border md:block"
                />
              ) : null}

              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 to-accent/10 text-primary transition-transform duration-300 hover:scale-105">
                <Icon className="size-6" />
              </div>

              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-primary">
                Step {item.step}
              </p>
              <h3 className="mb-2 text-xl font-medium text-foreground">{item.title}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
