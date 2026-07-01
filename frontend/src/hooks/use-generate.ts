import { useState } from "react";
import axios from "axios";
import { api } from "@/lib/api";
import type { GenerateInput, GenerateResponse } from "@/types/generation";
import { toast } from "sonner";

export function useGenerate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse["generation"] | null>(null);
  const [generationTime, setGenerationTime] = useState<number | null>(null);

  const generate = async (input: GenerateInput, userEmail: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setGenerationTime(null);
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
      toast.success("AI image generated successfully!");
      return response.data.generation;
    } catch (err: unknown) {
      const errMsg =
        axios.isAxiosError<{ message?: string }>(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : "Failed to generate image";
      setError(errMsg);
      toast.error(errMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    isLoading,
    error,
    result,
    generationTime,
    setResult,
  };
}
