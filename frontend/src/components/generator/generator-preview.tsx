"use client";

import { AlertTriangle, CheckCircle2, Clock, Frame, ImageIcon, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { GenerateResponse } from "@/types/generation";

interface GeneratorPreviewProps {
  isLoading: boolean;
  result: GenerateResponse["generation"] | null;
  generationTime: number | null;
  error: string | null;
}

function PreviewSkeleton() {
  return (
    <div className="w-full max-w-sm space-y-3 opacity-50">
      <Skeleton className="aspect-[4/3] w-full rounded-xl bg-muted/80 animate-pulse" />
      <div className="flex gap-3">
        <Skeleton className="h-2 flex-1 bg-muted/80 animate-pulse" />
        <Skeleton className="h-2 w-20 bg-muted/80 animate-pulse" />
      </div>
    </div>
  );
}

export function GeneratorPreview({
  isLoading,
  result,
  generationTime,
  error,
}: GeneratorPreviewProps) {
  const t = useTranslations("generator.preview");

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
              // 1. Loading state (Skeletons and loaders)
              <div className="flex w-full max-w-md animate-in flex-col items-center justify-center space-y-5 fade-in duration-300">
                <div className="relative mb-2">
                  <div className="flex size-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-inner">
                    <ImageIcon className="size-9 text-primary animate-pulse" />
                  </div>
                  <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full border border-primary/50 bg-primary/25 text-primary">
                    <Sparkles className="size-4 animate-spin" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">{t("loadingTitle")}</h3>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    {t("loadingDescription")}
                  </p>
                </div>
                <PreviewSkeleton />
              </div>
            ) : error ? (
              // 2. Error state
              <div className="flex max-w-sm animate-in flex-col items-center justify-center space-y-4 fade-in duration-300">
                <div className="flex size-14 items-center justify-center rounded-xl bg-destructive/10 border border-destructive/20 text-destructive mb-2">
                  <AlertTriangle className="size-6" />
                </div>
                <h3 className="text-lg font-medium text-foreground">{t("errorTitle")}</h3>
                <p className="text-sm text-muted-foreground">{error}</p>
                <p className="text-xs text-muted-foreground/80">
                  {t("errorDescription")}
                </p>
              </div>
            ) : result ? (
              // 3. Success state (Render generation result)
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

                {/* Main Image View */}
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted/30 shadow-2xl transition-all duration-300 hover:border-primary/50">
                  <img
                    src={result.imageUrl}
                    alt={result.prompt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[10px] text-muted-foreground truncate max-w-full">
                      ID: {result.id}
                    </span>
                  </div>
                </div>

                {/* Generated Prompt description */}
                <div className="w-full rounded-xl border border-border/40 bg-muted/30 p-3 text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                    {t("optimizedPrompt")}
                  </span>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground transition-all duration-300 hover:line-clamp-none">
                    {result.prompt}
                  </p>
                </div>
              </div>
            ) : (
              // 4. Default / Empty state
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

          <div className="border-t border-border/60 bg-background/40 px-4 py-3 text-center text-xs text-muted-foreground">
            {isLoading
              ? t("loadingFooter")
              : result
              ? t("successFooter")
              : t("emptyFooter")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
