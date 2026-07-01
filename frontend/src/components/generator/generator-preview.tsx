"use client";

import { Frame, ImageIcon, Sparkles, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GENERATOR } from "@/lib/landing";
import type { GenerateResponse } from "@/types/generation";

interface GeneratorPreviewProps {
  isLoading: boolean;
  result: GenerateResponse["generation"] | null;
  generationTime: number | null;
  error: string | null;
}

function PreviewSkeleton() {
  return (
    <div className="w-full max-w-sm space-y-4 opacity-50">
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
  return (
    <Card className="h-full overflow-hidden border-border/60 bg-card/50 shadow-xl shadow-black/10">
      <CardContent className="flex h-full min-h-[36rem] flex-col p-4 md:p-6">
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-background/80 via-card/40 to-background/60">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
          />

          <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
            {isLoading ? (
              // 1. Loading state (Skeletons and loaders)
              <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-md animate-in fade-in duration-300">
                <div className="relative mb-2">
                  <div className="flex size-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-inner">
                    <ImageIcon className="size-9 text-primary animate-pulse" />
                  </div>
                  <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full border border-primary/50 bg-primary/25 text-primary">
                    <Sparkles className="size-4 animate-spin" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">Creating concept art...</h3>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    Invoking Gemini prompt optimizer and generating your assets with Pollinations AI.
                  </p>
                </div>
                <PreviewSkeleton />
              </div>
            ) : error ? (
              // 2. Error state
              <div className="flex flex-col items-center justify-center p-6 space-y-4 max-w-sm animate-in fade-in duration-300">
                <div className="flex size-14 items-center justify-center rounded-xl bg-destructive/10 border border-destructive/20 text-destructive mb-2">
                  <AlertTriangle className="size-6" />
                </div>
                <h3 className="text-lg font-medium text-foreground">Generation Failed</h3>
                <p className="text-sm text-muted-foreground">{error}</p>
                <p className="text-xs text-muted-foreground/80">
                  Please check your input values and try again.
                </p>
              </div>
            ) : result ? (
              // 3. Success state (Render generation result)
              <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-lg animate-in fade-in zoom-in-95 duration-500">
                {/* Save confirmation & elapsed time badges */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="size-3.5" />
                    <span>Saved to Gallery</span>
                  </div>
                  {generationTime !== null && (
                    <div className="flex items-center gap-1 rounded-full bg-muted/80 border border-border/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                      <Clock className="size-3.5" />
                      <span>{generationTime}s</span>
                    </div>
                  )}
                </div>

                {/* Main Image View */}
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-muted/30 aspect-[4/3] w-full max-w-md shadow-2xl transition-all duration-300 hover:border-primary/50">
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
                <div className="w-full max-w-md bg-muted/30 border border-border/40 rounded-xl p-4 text-left space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                    Optimized Prompt
                  </span>
                  <p className="text-sm text-foreground leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-300">
                    {result.prompt}
                  </p>
                </div>
              </div>
            ) : (
              // 4. Default / Empty state
              <div className="relative flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="relative mb-8">
                  <div className="flex size-20 items-center justify-center rounded-2xl border border-border/60 bg-card shadow-inner">
                    <ImageIcon className="size-9 text-muted-foreground" />
                  </div>
                  <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary">
                    <Sparkles className="size-4" />
                  </div>
                </div>

                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
                  <Frame className="size-3.5" />
                  <span>Preview</span>
                </div>

                <h3 className="mb-3 text-lg font-medium text-foreground">Empty canvas</h3>

                <p className="mb-10 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {GENERATOR.previewMessage}
                </p>

                <PreviewSkeleton />
              </div>
            )}
          </div>

          <div className="border-t border-border/60 bg-background/40 px-4 py-3 text-center text-xs text-muted-foreground">
            {isLoading
              ? "Artistry in motion..."
              : result
              ? "Generation complete. View in your Gallery."
              : "Generated images will render in this panel"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
