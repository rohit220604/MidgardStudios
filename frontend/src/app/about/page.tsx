import type { Metadata } from "next";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          About
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          {SITE.name} builds professional AI tooling for game creators. This
          page will expand with product details in a future release.
        </p>
      </div>
    </PageWrapper>
  );
}
