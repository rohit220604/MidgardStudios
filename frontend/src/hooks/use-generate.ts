"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { api } from "@/lib/api";
import type { GenerateInput, GenerateResponse } from "@/types/generation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useGenerate() {
  const t = useTranslations("generator.toasts");
  const errors = useTranslations("errors");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse["generation"] | null>(null);
  const [generationTime, setGenerationTime] = useState<number | null>(null);

  // Track last input & email for retry
  const lastInputRef = useRef<{ input: GenerateInput; userEmail: string } | null>(null);

  const generate = async (input: GenerateInput, userEmail: string) => {
    // Guard against double submission — reject silently so form's try/catch handles it
    if (isLoading) throw new Error("Already generating");

    setIsLoading(true);
    setError(null);
    setResult(null);
    setGenerationTime(null);

    // Store for potential retry
    lastInputRef.current = { input, userEmail };

    const startTime = performance.now();

    try {
      const response = await api.post<GenerateResponse>("/api/generate", input, {
        headers: {
          "x-user-email": userEmail,
        },
      });

      const endTime = performance.now();
      const timeElapsed = parseFloat(((endTime - startTime) / 1000).toFixed(2)); // in seconds

      setResult(response.data.generation);
      setGenerationTime(timeElapsed);
      toast.success(t("success"));
      return response.data.generation;
    } catch (err: unknown) {
      const errMsg =
        axios.isAxiosError<{ message?: string }>(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : errors("generateFailed");
      setError(errMsg);
      toast.error(errMsg, {
        duration: 5000,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const retry = async () => {
    const last = lastInputRef.current;
    if (!last) return undefined;
    return generate(last.input, last.userEmail);
  };

  return {
    generate,
    retry,
    isLoading,
    error,
    result,
    generationTime,
    setResult,
  };
}