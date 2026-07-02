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
    <div
      id="generator"
      ref={sectionRef}
      className="flex flex-1 items-center bg-background px-4 py-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4">
        <FadeIn className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {brand("name")}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {brand("tagline")}
          </p>
        </FadeIn>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)]">
          <FadeIn>
            <Card className="h-full border-border/60 bg-card/70 shadow-lg shadow-black/10">
              <CardContent className="px-5 py-5">
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
      </div>
    </div>
  );
}
