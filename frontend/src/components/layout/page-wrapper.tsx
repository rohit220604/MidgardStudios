import type { ReactNode } from "react";

import { LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Container } from "./container";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn("flex-1", LAYOUT.sectionSpacing, className)}>
      <Container>{children}</Container>
    </div>
  );
}
