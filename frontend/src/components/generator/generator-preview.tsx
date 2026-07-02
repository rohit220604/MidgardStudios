"use client";

import { memo, useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Frame,
  ImageIcon,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { GenerateResponse } from "@/types/generation";

interface GeneratorPreviewProps {
  isLoading: boolean;
  result: GenerateResponse["generation"] | null;
  generationTime: number | null;
  error: string | null;
  onRetry?: () => void;
}

function ShimmerSkeleton() {
  return (
    <div className="w-full max-w-sm space-y-3">
      {/* Image placeholder with shimmer */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted/60">
        {/* Animated shimmer overlay */}
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 60%, transparent 100%)",
          }}
        />
        {/* Skeleton boxes inside placeholder */}
        <div className="absolute inset-4 rounded-lg border border-dashed border-border/40" />
        <div className="absolute left-8 top-8 h-20 w-24 rounded-lg border border-border/50 bg-muted/40" />
        <div className="absolute bottom-9 right-9 h-28 w-36 rounded-lg border border-primary/10 bg-primary/5" />
      </div>
      {/* Caption shimmer lines */}
      <div className="flex gap-3">
        <Skeleton className="h-2 flex-1 bg-muted/60" />
        <Skeleton className="h-2 w-20 bg-muted/60" />
      </div>
    </div>
  );
}

function LoadingIllustration() {
  return (
    <svg
      className="mb-3 size-28 text-primary/30"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Brush stroke base */}
      <rect x="20" y="20" width="80" height="80" rx="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      {/* Inner palette shape */}
      <ellipse cx="60" cy="58" rx="28" ry="24" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
      {/* Sparkle dots */}
      <circle cx="45" cy="45" r="3" fill="currentColor" opacity="0.4">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="72" cy="38" r="2.5" fill="currentColor" opacity="0.3">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="48" cy="72" r="2" fill="currentColor" opacity="0.2">
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.8s" repeatCount="indefinite" />
      </circle>
      {/* Pulsing ring */}
      <circle cx="60" cy="58" r="32" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.15">
        <animate attributeName="r" values="28;36;28" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Color swatches */}
      <rect x="44" y="18" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="56" y="18" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.3" />
      <rect x="68" y="18" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export const GeneratorPreview = memo(function GeneratorPreview({
  isLoading,
  result,
  generationTime,
  error,
  onRetry,
}: GeneratorPreviewProps) {
  const t = useTranslations("generator.preview");
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Reset image loaded state when result changes
  useEffect(() => {
    if (result) {
      setImageLoaded(false);
    }
  }, [result]);

  return (
    <Card className="h-full overflow-hidden border-border/60 bg-card/50 shadow-xl shadow-black/10">
      <CardContent className="flex h-full min-h-[28rem] flex-col p-3 md:p-4 lg:min-h-[30rem]">
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-border/60 bg-gradient-to-b from-background/80 via-card/40 to-background/60">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
          />

          <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-6 text-center md:px-6">
            {isLoading ? (
              /* ── Loading state: shimmer + illustration ── */
              <div className="flex w-full max-w-md animate-in flex-col items-center justify-center space-y-5 fade-in duration-500">
                <div className="relative mb-1">
                  <LoadingIllustration />
                  <div className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border border-primary/40 bg-primary/20 text-primary">
                    <Sparkles className="size-3.5 animate-spin" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t("loadingTitle")}
                  </h3>
                  <p className="mx-auto max-w-xs text-xs leading-relaxed text-muted-foreground">
                    {t("loadingDescription")}
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                    {t("loadingTimeEstimate")}
                  </p>
                  <p className="text-[10px] italic text-muted-foreground/40">
                    {t("loadingRefreshWarning")}
                  </p>
                </div>
                <ShimmerSkeleton />
              </div>
            ) : error ? (
              /* ── Error state: toast already shown + retry button ── */
              <div className="flex max-w-sm animate-in flex-col items-center justify-center space-y-4 fade-in duration-300">
                <div className="mb-1 flex size-14 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10 text-destructive">
                  <AlertTriangle className="size-6" />
                </div>
                <h3 className="text-lg font-medium text-foreground">
                  {t("errorTitle")}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {error}
                </p>
                {onRetry && (
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="mt-2 gap-1.5"
                    onClick={onRetry}
                  >
                    <RefreshCw className="size-3.5" />
                    <span>{t("retryButton")}</span>
                  </Button>
                )}
              </div>
            ) : result ? (
              /* ── Success state: fade-in image ── */
              <div className="flex w-full max-w-2xl animate-in flex-col items-center justify-center space-y-4 fade-in zoom-in-95 duration-500">
                {/* Save confirmation & elapsed time badges */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="size-3.5" />
                    <span>{t("saved")}</span>
                  </div>
                  {generationTime !== null && (
                    <div className="flex items-center gap-1 rounded-full bg-muted/80 border border-border/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                      <Clock className="size-3.5" />
                      <span>{generationTime}s</span>
                    </div>
                  )}
                </div>

                {/* Main Image View with fade-in */}
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted/30 shadow-2xl transition-all duration-300 hover:border-primary/50">
                  {/* Skeleton placeholder while image loads */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/40">
                      <Skeleton className="absolute inset-0 rounded-xl" />
                      <ImageIcon className="z-20 size-8 text-muted-foreground/40" />
                    </div>
                  )}
                  <img
                    src={result.imageUrl}
                    alt={result.prompt}
                    onLoad={handleImageLoad}
                    className={`h-full w-full object-cover transition-all duration-700 ${
                      imageLoaded
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-[0.98]"
                    } group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[10px] text-muted-foreground truncate max-w-full">
                      ID: {result.id}
                    </span>
                  </div>
                </div>

                {/* Generated Prompt description */}
                <div className="w-full rounded-xl border border-border/40 bg-muted/30 p-3 text-left transition-all duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                    {t("optimizedPrompt")}
                  </span>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground transition-all duration-300 hover:line-clamp-none">
                    {result.prompt}
                  </p>
                </div>
              </div>
            ) : (
              /* ── Default / Empty state ── */
              <div className="relative flex w-full max-w-lg animate-in flex-col items-center justify-center fade-in duration-300">
                <div className="relative mb-6 aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border border-border/70 bg-background shadow-inner">
                  <div className="absolute inset-4 rounded-lg border border-dashed border-border/80 bg-card/60" />
                  <div className="absolute left-8 top-8 h-20 w-24 rounded-lg border border-border/70 bg-muted/50" />
                  <div className="absolute bottom-9 right-9 h-28 w-36 rounded-lg border border-primary/20 bg-primary/10" />
                  <div className="absolute bottom-12 left-10 h-16 w-32 rounded-lg border border-accent/30 bg-accent/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-20 items-center justify-center rounded-2xl border border-border/60 bg-card shadow-inner">
                      <ImageIcon className="size-9 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute right-8 top-8 flex size-8 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary">
                    <Sparkles className="size-4" />
                  </div>
                </div>

                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
                  <Frame className="size-3.5" />
                  <span>{t("label")}</span>
                </div>

                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {t("empty")}
                </p>
              </div>
            )}
          </div>

          {/* Footer bar */}
          <div className="border-t border-border/60 bg-background/40 px-4 py-3 text-center text-xs text-muted-foreground">
            {isLoading
              ? t("loadingFooter")
              : result
                ? t("successFooter")
                : error
                  ? t("errorFooter")
                  : t("emptyFooter")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
