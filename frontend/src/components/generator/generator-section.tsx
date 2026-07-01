"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FadeIn } from "@/components/layout/fade-in";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GENERATOR } from "@/lib/landing";
import {
  clearRegenerationInput,
  markGalleryNeedsRefresh,
  readRegenerationInput,
  type RegenerationInput,
} from "@/lib/regeneration";
import { useGenerate } from "@/hooks/use-generate";
import type { GenerateInput } from "@/types/generation";

import { GeneratorForm } from "./generator-form";
import { GeneratorPreview } from "./generator-preview";

const EMPTY_FORM_DATA: GenerateInput = {
  genre: "",
  environment: "",
  style: "",
  inspiredBy: "",
  prompt: "",
};

export function GeneratorSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [formData, setFormData] = useState<GenerateInput>(EMPTY_FORM_DATA);
  const [regenerationInput, setRegenerationInput] = useState<RegenerationInput | null>(null);
  const [prefillAnimated, setPrefillAnimated] = useState(false);

  const { generate, isLoading, result, generationTime, error } = useGenerate();
  const changedFields = useMemo(() => {
    if (!regenerationInput) {
      return {};
    }

    return (Object.keys(regenerationInput) as (keyof GenerateInput)[]).reduce<
      Partial<Record<keyof GenerateInput, boolean>>
    >((fields, key) => {
      fields[key] = formData[key] !== regenerationInput[key];
      return fields;
    }, {});
  }, [formData, regenerationInput]);

  useEffect(() => {
    const input = readRegenerationInput();

    if (!input) {
      return;
    }

    const prefillTimer = window.setTimeout(() => {
      setRegenerationInput(input);
      setFormData(input);
      setPrefillAnimated(true);
    }, 0);

    window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const animationTimer = window.setTimeout(() => {
      setPrefillAnimated(false);
    }, 900);

    return () => {
      window.clearTimeout(prefillTimer);
      window.clearTimeout(animationTimer);
    };
  }, []);

  const handleCancelEditing = () => {
    clearRegenerationInput();
    setRegenerationInput(null);
    setFormData(EMPTY_FORM_DATA);
    setPrefillAnimated(false);
  };

  const handleGenerate = async (input: GenerateInput, userEmail: string) => {
    const generation = await generate(input, userEmail);

    if (regenerationInput) {
      clearRegenerationInput();
      markGalleryNeedsRefresh();
      setRegenerationInput(null);
      setPrefillAnimated(false);
    }

    return generation;
  };

  return (
    <Section
      id={GENERATOR.id}
      ref={sectionRef}
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
                onSubmit={handleGenerate}
                isLoading={isLoading}
                isEditingPreviousPrompt={Boolean(regenerationInput)}
                prefillAnimated={prefillAnimated}
                changedFields={changedFields}
                onCancelEditing={handleCancelEditing}
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
