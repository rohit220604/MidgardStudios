import { useState, useCallback, useEffect } from "react";
import { api } from "@/lib/api";
import type { Generation } from "@/types/generation";
import { toast } from "sonner";

export function useGallery(userEmail?: string) {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<Generation[]>("/api/me/gallery", {
        headers: {
          "x-user-email": email,
        },
      });
      setGenerations(response.data);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to fetch gallery";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchGallery(userEmail);
    }
  }, [userEmail, fetchGallery]);

  return {
    generations,
    isLoading,
    error,
    refetch: () => userEmail && fetchGallery(userEmail),
  };
}
