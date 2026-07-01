import { ImageIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GENERATOR } from "@/lib/landing";

export function PreviewSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-[4/3] w-full rounded-xl bg-muted/80" />
      <div className="flex gap-3">
        <Skeleton className="h-2 flex-1 bg-muted/80" />
        <Skeleton className="h-2 w-20 bg-muted/80" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-16 rounded-lg bg-muted/60" />
        <Skeleton className="h-16 rounded-lg bg-muted/60" />
        <Skeleton className="h-16 rounded-lg bg-muted/60" />
      </div>
    </div>
  );
}

export function GeneratorPreview() {
  return (
    <Card className="h-full border-border/60 bg-card/50">
      <CardContent className="flex h-full min-h-[32rem] flex-col p-4 md:p-6">
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-border/60 bg-background/40">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5"
          />

          <div className="relative flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-border/60 bg-card text-muted-foreground">
              <ImageIcon className="size-8" />
            </div>

            <p className="mb-8 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {GENERATOR.previewMessage}
            </p>

            <div className="w-full max-w-md opacity-60">
              <PreviewSkeleton />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
