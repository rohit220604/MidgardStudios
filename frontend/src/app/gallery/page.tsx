import type { Metadata } from "next";

import { PageWrapper } from "@/components/layout/page-wrapper";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Gallery
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Your generated artwork will appear here. Gallery content will be
          implemented in a later stage.
        </p>
      </div>
    </PageWrapper>
  );
}
