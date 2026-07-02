"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { useAuth } from "@/hooks/use-auth";
import { useGallery } from "@/hooks/use-gallery";
import { Button } from "@/components/ui/button";
import { GenerationCard } from "@/components/gallery/generation-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { LogIn, RotateCw, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

function EmptyMyGalleryIllustration() {
  return (
    <svg
      className="mb-6 size-32 text-muted-foreground/20"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Collection frame */}
      <rect x="15" y="20" width="90" height="75" rx="10" stroke="currentColor" strokeWidth="1.5" />
      {/* Empty slot 1 */}
      <rect x="25" y="30" width="30" height="28" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
      {/* Empty slot 2 */}
      <rect x="62" y="30" width="30" height="28" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
      {/* Empty slot 3 (wide) */}
      <rect x="25" y="63" width="67" height="22" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
      {/* Plus icon */}
      <path d="M40 44 L40 44 M40 42 L40 46 M38 44 L42 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M77 44 L77 44 M77 42 L77 46 M75 44 L79 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Star sparkle */}
      <circle cx="90" cy="22" r="2.5" fill="currentColor" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function MyGalleryPage() {
  const t = useTranslations("gallery");
  const buttons = useTranslations("buttons");
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { generations, isLoading: galleryLoading, refetch } = useGallery(user?.email || undefined);

  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl space-y-6 py-6 animate-in fade-in duration-300">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5 gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {t("myTitle")}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              {t("mySubtitle")}
            </p>
          </div>
          {isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              disabled={galleryLoading}
              className="self-start sm:self-auto gap-2 border-border bg-input/10 hover:bg-input/20 transition-all duration-200"
            >
              <RotateCw className={`h-4.5 w-4.5 ${galleryLoading ? "animate-spin" : ""}`} />
              {buttons("refresh")}
            </Button>
          )}
        </div>

        {/* Content Loading State */}
        {authLoading ? (
          <div className="flex justify-center items-center py-20">
            <RotateCw className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : !isAuthenticated ? (
          // Unauthenticated State Card
          <div className="rounded-2xl border border-border/80 bg-card/25 p-12 text-center backdrop-blur-sm max-w-md mx-auto space-y-5 shadow-xl mt-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive border border-destructive/25 shadow-inner">
              <LogIn className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">{t("signInRequired")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("mySignInDescription")}
              </p>
            </div>
            <Link href="/login">
              <Button variant="default" className="w-full">
                {buttons("signInWithGoogle")}
              </Button>
            </Link>
          </div>
        ) : galleryLoading ? (
          // Gallery Loading State (Pulse Skeletons)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full rounded-2xl bg-muted/60 animate-pulse" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4 bg-muted/60 animate-pulse" />
                  <div className="flex gap-2">
                    <Skeleton className="h-3 w-16 bg-muted/60 animate-pulse" />
                    <Skeleton className="h-3 w-20 bg-muted/60 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : generations.length === 0 ? (
          // Empty State
          <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-dashed border-border/60 bg-card/20 p-16 text-center backdrop-blur-sm shadow-inner animate-in fade-in duration-500">
            <div className="mx-auto mb-6 flex justify-center">
              <EmptyMyGalleryIllustration />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {t("myEmptyTitle")}
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("myEmptyDescription")}
            </p>
            <div className="mt-8">
              <Link href="/#generator">
                <Button variant="default" className="gap-2 px-6">
                  <Sparkles className="size-4" />
                  {buttons("generateArtwork")}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Gallery Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {generations.map((gen) => (
              <GenerationCard key={gen.id} generation={gen} variant="compact" />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
