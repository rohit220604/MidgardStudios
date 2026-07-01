import type { LucideIcon } from "lucide-react";
import { Gamepad2, Palette, Zap } from "lucide-react";

import { Section } from "@/components/layout/section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FEATURES } from "@/lib/landing";

const FEATURE_ICONS: Record<(typeof FEATURES)[number]["icon"], LucideIcon> = {
  palette: Palette,
  zap: Zap,
  gamepad: Gamepad2,
};

export function Features() {
  return (
    <Section id="features">
      <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Features
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Built for professional game creation
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = FEATURE_ICONS[feature.icon];

          return (
            <Card
              key={feature.title}
              className="border-border/60 bg-card/50 transition-colors hover:border-primary/30 hover:bg-card"
            >
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg border border-border/60 bg-background text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
