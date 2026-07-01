import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";

export const metadata: Metadata = {
  title: "My Gallery",
};

export default function MyGalleryPage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-4xl space-y-6 py-6 animate-in fade-in duration-300">
        <div className="border-b border-border/60 pb-5">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            My Gallery
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            A personalized space containing your AI-generated gaming assets and creations.
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-border/80 bg-card/25 p-12 text-center backdrop-blur-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground">No assets generated yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
            Get started by returning to the generator home page and creating your first custom studio asset.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
