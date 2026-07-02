"use client";

import { Calendar, RefreshCw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "@/i18n/navigation";
import { saveRegenerationInput, toRegenerationInput } from "@/lib/regeneration";
import type { Generation } from "@/types/generation";

interface GenerationCardProps {
  generation: Generation;
  variant?: "gallery" | "compact";
}

export function GenerationCard({
  generation,
  variant = "gallery",
}: GenerationCardProps) {
  const t = useTranslations("buttons");
  const locale = useLocale();
  const router = useRouter();
  const createdAt = new Date(generation.createdAt).toLocaleDateString(locale);

  const handleRegenerate = () => {
    saveRegenerationInput(toRegenerationInput(generation));
    router.push("/#generator");
  };

  if (variant === "compact") {
    return (
      <Card className="group overflow-hidden border border-border/80 bg-card/45 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/50">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-border/40 bg-muted/30">
          <img
            src={generation.imageUrl}
            alt={generation.prompt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="truncate font-mono text-[10px] text-muted-foreground/80">
              ID: {generation.id}
            </span>
          </div>
        </div>

        <CardContent className="space-y-4 p-4">
          <p className="line-clamp-3 text-sm leading-relaxed text-foreground/95 transition-all duration-300 hover:line-clamp-none">
            {generation.prompt}
          </p>

          <div className="flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="h-3.5 w-3.5 text-primary/70" />
                        {createdAt}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              className="h-7 gap-1 border-border/60 px-2.5 text-foreground transition-all duration-200 hover:bg-muted"
            >
              <RefreshCw className="h-3 w-3" />
              {t("regenerate")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group flex h-full flex-col overflow-hidden border border-border/80 bg-card/45 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/50">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border/40 bg-muted/30">
        <img
          src={generation.imageUrl}
          alt={generation.prompt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-md border border-border/40 bg-background/80 px-2 py-0.5 text-[10px] font-semibold text-foreground text-opacity-95 shadow-sm backdrop-blur-xs">
            {generation.genre}
          </span>
          <span className="rounded-md border border-border/40 bg-background/80 px-2 py-0.5 text-[10px] font-semibold text-foreground text-opacity-95 shadow-sm backdrop-blur-xs">
            {generation.style}
          </span>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="max-w-[150px] truncate font-semibold text-primary/80">
              {generation.environment}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="h-3.5 w-3.5 text-primary/60" />
              {createdAt}
            </span>
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-foreground/95 transition-all duration-300 hover:line-clamp-none">
            {generation.prompt}
          </p>
        </div>

        <div className="flex gap-2 border-t border-border/40 pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRegenerate}
            className="h-8 w-full gap-1.5 border-border/60 text-foreground transition-all duration-200 hover:bg-muted"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {t("regenerate")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
