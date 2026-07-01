"use client";

import { useState } from "react";
import { FadeIn } from "@/components/layout/fade-in";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GENERATOR } from "@/lib/landing";
import { useGenerate } from "@/hooks/use-generate";

import { GeneratorForm } from "./generator-form";
import { GeneratorPreview } from "./generator-preview";

export function GeneratorSection() {
  const [formData, setFormData] = useState({
    genre: "",
    environment: "",
    style: "",
    inspiredBy: "",
    prompt: "",
  });

  const { generate, isLoading, result, generationTime, error } = useGenerate();

  return (
    <Section
      id={GENERATOR.id}
      className="relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-background via-card/10 to-background pb-24 md:pb-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-2/3 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
      />

      <FadeIn className="relative mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Generator
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {GENERATOR.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {GENERATOR.subtitle}
        </p>
      </FadeIn>

      <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-10">
        <FadeIn>
          <Card className="border-border/60 bg-card/60 shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle className="text-lg">Creative inputs</CardTitle>
            </CardHeader>
            <CardContent>
              <GeneratorForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={generate}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn className="delay-100">
          <GeneratorPreview
            isLoading={isLoading}
            result={result}
            generationTime={generationTime}
            error={error}
          />
        </FadeIn>
      </div>
    </Section>
  );
}
