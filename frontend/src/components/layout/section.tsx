import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn(LAYOUT.sectionSpacing, className)}>
      <Container>{children}</Container>
    </section>
  );
}
