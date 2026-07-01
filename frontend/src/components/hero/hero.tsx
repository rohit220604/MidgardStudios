import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/layout/fade-in";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GENERATOR, HERO } from "@/lib/landing";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-20 md:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 size-64 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30">
              <Sparkles className="size-3.5 text-primary" />
              <span>AI-powered tools for game creators</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl lg:leading-[1.1]">
                {HERO.title}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {HERO.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 px-6 text-sm transition-transform hover:scale-[1.02]"
              >
                <Link href={`#${GENERATOR.id}`}>
                  {HERO.primaryCta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 px-6 text-sm transition-colors hover:border-primary/40"
              >
                <Link href="/gallery">{HERO.secondaryCta}</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn className="delay-100">
            <HeroIllustration />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/25 transition-transform duration-500 hover:scale-[1.01]">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-accent/15"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="space-y-3">
            <Skeleton className="h-3 w-24 bg-foreground/10" />
            <Skeleton className="h-32 w-full rounded-xl bg-foreground/10 md:h-40" />
            <div className="flex gap-3">
              <Skeleton className="h-2 flex-1 bg-foreground/10" />
              <Skeleton className="h-2 w-16 bg-foreground/10" />
            </div>
          </div>
        </div>

        <div className="absolute left-6 top-6 rounded-lg border border-border/40 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
          Illustration preview
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -right-4 -top-4 size-24 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-6 -left-6 size-32 rounded-full bg-accent/15 blur-3xl"
      />
    </div>
  );
}
