"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FadeIn } from "@/components/layout/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import {
  clearRegenerationInput,
  markGalleryNeedsRefresh,
  readRegenerationInput,
  type RegenerationInput,
} from "@/lib/regeneration";
import { useGenerate } from "@/hooks/use-generate";
import { useTranslations } from "next-intl";
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
  const brand = useTranslations("brand");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<GenerateInput>(EMPTY_FORM_DATA);
  const [regenerationInput, setRegenerationInput] = useState<RegenerationInput | null>(null);
  const [prefillAnimated, setPrefillAnimated] = useState(false);

  const { generate, retry, isLoading, result, generationTime, error } = useGenerate();
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
    <div
      id="generator"
      ref={sectionRef}
      className="flex flex-1 items-start bg-background"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-6 lg:px-8 pt-[48px] pb-16">
        {/* Header — centered over the full workspace */}
        <FadeIn className="text-center mb-8">
          <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground">
            {brand("name")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {brand("tagline")}
          </p>
        </FadeIn>

        {/* Workspace — form + preview */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Generator form — fixed-width card */}
          <FadeIn className="w-full lg:w-[440px] shrink-0">
            <Card className="h-full border-border/60 bg-card/70 shadow-lg shadow-black/10">
              <CardContent className="px-5 py-6">
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

          {/* Preview — fills remaining space */}
          <FadeIn className="flex-1 min-w-0 delay-100">
            <GeneratorPreview
              isLoading={isLoading}
              result={result}
              generationTime={generationTime}
              error={error}
              onRetry={retry}
            />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}