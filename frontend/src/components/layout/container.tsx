import type { ReactNode } from "react";

import { LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        LAYOUT.maxWidth,
        LAYOUT.horizontalPadding,
        className,
      )}
    >
      {children}
    </div>
  );
}
