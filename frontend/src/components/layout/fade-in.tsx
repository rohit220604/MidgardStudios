import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  className?: string;
}

export function FadeIn({ children, className }: FadeInProps) {
  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both",
        className,
      )}
    >
      {children}
    </div>
  );
}
