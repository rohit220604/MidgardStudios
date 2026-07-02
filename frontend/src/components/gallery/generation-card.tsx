"use client";

import { Calendar, Copy, Download, RefreshCw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "@/i18n/navigation";
import { saveRegenerationInput, toRegenerationInput } from "@/lib/regeneration";
import { downloadImage } from "@/lib/download";
import { toast } from "sonner";
import type { Generation } from "@/types/generation";

import { ImageModal } from "./image-modal";

interface GenerationCardProps {
  generation: Generation;
  variant?: "gallery" | "compact";
}

function copyPrompt(prompt: string) {
  navigator.clipboard.writeText(prompt).then(() => {
    toast.success("Prompt copied successfully.");
  });
}

export const GenerationCard = memo(function GenerationCard({
  generation,
  variant = "gallery",
}: GenerationCardProps) {
  const t = useTranslations("buttons");
  const galleryT = useTranslations("gallery");
  const locale = useLocale();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const createdAt = new Date(generation.createdAt).toLocaleDateString(locale);

  const handleRegenerate = () => {
    saveRegenerationInput(toRegenerationInput(generation));
    router.push("/#generator");
  };

  const cardContent = (
    <>
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border/40 bg-muted/30">
        <img
          src={generation.imageUrl}
          alt={generation.prompt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Genre/style badges on image */}
        {variant === "gallery" && (
          <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="rounded-md border border-border/40 bg-background/80 px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-sm backdrop-blur-xs">
              {generation.genre}
            </span>
            <span className="rounded-md border border-border/40 bg-background/80 px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-sm backdrop-blur-xs">
              {generation.style}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <CardContent className="flex flex-1 flex-col justify-between gap-3 p-4">
        {/* Prompt preview */}
        <p className="line-clamp-2 text-sm leading-relaxed text-foreground/90 transition-all duration-300 hover:line-clamp-none">
          {generation.prompt}
        </p>

        {/* Date + Regenerate row */}
        <div className="flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="size-3.5 text-primary/70" />
            {createdAt}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleRegenerate();
            }}
            className="h-7 gap-1 border-border/60 px-2.5 text-foreground transition-all duration-200 hover:bg-muted"
          >
            <RefreshCw className="size-3" />
            {t("regenerate")}
          </Button>
        </div>

        {/* Action buttons row */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={async (e) => {
              e.stopPropagation();
              try {
                await downloadImage(generation.imageUrl, generation.id);
                toast.success("Image downloaded successfully.");
              } catch {
                toast.error("Download failed. Please try again.");
              }
            }}
            className="h-8 flex-1 gap-1.5 border-border/60 text-foreground transition-all duration-200 hover:bg-muted"
          >
            <Download className="size-3.5" />
            {galleryT("downloadButton")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              copyPrompt(generation.prompt);
            }}
            className="h-8 flex-1 gap-1.5 border-border/60 text-foreground transition-all duration-200 hover:bg-muted"
          >
            <Copy className="size-3.5" />
            {galleryT("copyPromptButton")}
          </Button>
        </div>
      </CardContent>
    </>
  );

  return (
    <>
      <Card
        className="group flex h-full cursor-pointer flex-col overflow-hidden border border-border/80 bg-card/45 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
        onClick={() => setModalOpen(true)}
      >
        {cardContent}
      </Card>

      {modalOpen && (
        <ImageModal
          generation={generation}
          onClose={() => setModalOpen(false)}
          onCopyPrompt={copyPrompt}
          onDownload={downloadImage}
        />
      )}
    </>
  );
});
