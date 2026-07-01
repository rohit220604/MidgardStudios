import { Frame, ImageIcon, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GENERATOR } from "@/lib/landing";

function PreviewSkeleton() {
  return (
    <div className="w-full max-w-sm space-y-4 opacity-50">
      <Skeleton className="aspect-[4/3] w-full rounded-xl bg-muted/80" />
      <div className="flex gap-3">
        <Skeleton className="h-2 flex-1 bg-muted/80" />
        <Skeleton className="h-2 w-20 bg-muted/80" />
      </div>
    </div>
  );
}

export function GeneratorPreview() {
  return (
    <Card className="h-full overflow-hidden border-border/60 bg-card/50 shadow-xl shadow-black/10">
      <CardContent className="flex h-full min-h-[36rem] flex-col p-4 md:p-6">
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-background/80 via-card/40 to-background/60">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
          />

          <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
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

          <div className="border-t border-border/60 bg-background/40 px-4 py-3 text-center text-xs text-muted-foreground">
            Generated images will render in this panel
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
