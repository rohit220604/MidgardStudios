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

function EmptyGalleryIllustration() {
  return (
    <svg
      className="mb-6 size-32 text-muted-foreground/20"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Frame */}
      <rect x="15" y="15" width="90" height="90" rx="12" stroke="currentColor" strokeWidth="1.5" />
      {/* Inner image area */}
      <rect x="28" y="28" width="64" height="64" rx="6" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
      {/* Landscape hint */}
      <path d="M30 72 L45 52 L60 62 L75 42 L90 72" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="42" cy="42" r="5" stroke="currentColor" strokeWidth="1" />
      {/* Sparkle */}
      <circle cx="85" cy="30" r="2.5" fill="currentColor" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="92" cy="26" r="1.5" fill="currentColor" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function GalleryPage() {
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
              {t("title")}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              {t("subtitle")}
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

        {/* Content States */}
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
                {t("signInDescription")}
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
                  <div className="flex gap-2">
                    <Skeleton className="h-8 flex-1 bg-muted/60 animate-pulse rounded-md" />
                    <Skeleton className="h-8 flex-1 bg-muted/60 animate-pulse rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : generations.length === 0 ? (
          // Empty State Layout
          <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-dashed border-border/60 bg-card/20 p-16 text-center backdrop-blur-sm shadow-inner animate-in fade-in duration-500">
            <div className="mx-auto mb-6 flex justify-center">
              <EmptyGalleryIllustration />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {t("emptyTitle")}
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("emptyDescription")}
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
              <GenerationCard key={gen.id} generation={gen} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
