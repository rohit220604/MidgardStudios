"use client";

import { Calendar, Copy, Download, ImageIcon, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Generation } from "@/types/generation";

interface ImageModalProps {
  generation: Generation;
  onClose: () => void;
  onCopyPrompt: (prompt: string) => void;
  onDownload: (imageUrl: string, generationId: string) => Promise<void>;
}

export function ImageModal({
  generation,
  onClose,
  onCopyPrompt,
  onDownload,
}: ImageModalProps) {
  const locale = useLocale();
  const t = useTranslations("gallery");

  const createdAt = new Date(generation.createdAt).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 isolate z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${t("modalTitle")} — ${generation.prompt}`}
    >
      <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl animate-in zoom-in-95 fade-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex size-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
          aria-label={t("closeModal")}
        >
          <X className="size-4" />
        </button>

        {/* Image area */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/40">
          <img
            src={generation.imageUrl}
            alt={generation.prompt}
            className="h-full w-full object-contain"
          />
          {!generation.imageUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="size-12 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Details panel */}
        <div className="space-y-5 p-5">
          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-2">
            {generation.genre && (
              <span className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                {generation.genre}
              </span>
            )}
            {generation.environment && (
              <span className="rounded-md border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                {generation.environment}
              </span>
            )}
            {generation.style && (
              <span className="rounded-md border border-border/60 bg-muted/50 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                {generation.style}
              </span>
            )}
            <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Calendar className="size-3.5 text-primary/60" />
              {createdAt}
            </span>
          </div>

          {/* Prompt */}
          <div>
            <p className="text-sm leading-relaxed text-foreground/90">
              {generation.prompt}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 border-t border-border/40 pt-4">
            <Button
              variant="default"
              size="sm"
              className="gap-1.5"
          onClick={async () => {
            try {
              await onDownload(generation.imageUrl, generation.id);
              toast.success("Image downloaded successfully.");
            } catch {
              toast.error("Download failed. Please try again.");
            }
          }}
            >
              <Download className="size-3.5" />
              {t("downloadButton")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => onCopyPrompt(generation.prompt)}
            >
              <Copy className="size-3.5" />
              {t("copyPromptButton")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}