import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/layout/fade-in";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { CTA, GENERATOR } from "@/lib/landing";

export function CtaSection() {
  return (
    <Section className="pb-24 md:pb-32">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card/80 to-primary/10 px-8 py-16 text-center md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent"
          />

          <div className="relative mx-auto max-w-2xl space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {CTA.title}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {CTA.subtitle}
            </p>
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-sm transition-transform hover:scale-[1.02]"
            >
              <Link href={`#${GENERATOR.id}`}>
                {CTA.buttonLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
