import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { api } from "@/lib/api";
import { consumeGalleryRefreshFlag } from "@/lib/regeneration";
import type { Generation } from "@/types/generation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useGallery(userEmail?: string) {
  const t = useTranslations("gallery.errors");
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
    } catch (err: unknown) {
      const errMsg =
        axios.isAxiosError<{ message?: string }>(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : t("fetchFailed");
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (userEmail) {
      const fetchTimer = window.setTimeout(() => {
        fetchGallery(userEmail);
      }, 0);

      return () => window.clearTimeout(fetchTimer);
    }
  }, [userEmail, fetchGallery]);

  useEffect(() => {
    if (!userEmail) {
      return;
    }

    const refreshIfNeeded = () => {
      if (consumeGalleryRefreshFlag()) {
        fetchGallery(userEmail);
      }
    };

    const refreshTimer = window.setTimeout(refreshIfNeeded, 0);
    window.addEventListener("focus", refreshIfNeeded);
    document.addEventListener("visibilitychange", refreshIfNeeded);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("focus", refreshIfNeeded);
      document.removeEventListener("visibilitychange", refreshIfNeeded);
    };
  }, [userEmail, fetchGallery]);

  return {
    generations,
    isLoading,
    error,
    refetch: () => userEmail && fetchGallery(userEmail),
  };
}
