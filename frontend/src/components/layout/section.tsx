import { forwardRef, type ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, className, id },
  ref,
) {
  return (
    <section ref={ref} id={id} className={cn(LAYOUT.sectionSpacing, className)}>
      <Container>{children}</Container>
    </section>
  );
});
