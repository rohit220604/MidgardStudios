import type { LucideIcon } from "lucide-react";
import { Cloud, Gamepad2, Palette } from "lucide-react";

import { FadeIn } from "@/components/layout/fade-in";
import { Section } from "@/components/layout/section";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FEATURES } from "@/lib/landing";

const FEATURE_ICONS: Record<(typeof FEATURES)[number]["icon"], LucideIcon> = {
  palette: Palette,
  gamepad: Gamepad2,
  cloud: Cloud,
};

const STAGGER_DELAYS = ["", "delay-100", "delay-200"] as const;

export function Features() {
  return (
    <Section id="features">
      <FadeIn className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Features
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Everything you need to create concept art
        </h2>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const Icon = FEATURE_ICONS[feature.icon];

          return (
            <FadeIn key={feature.title} className={STAGGER_DELAYS[index]}>
              <Card className="h-full border-border/60 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="mb-3 flex size-11 items-center justify-center rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/5 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
