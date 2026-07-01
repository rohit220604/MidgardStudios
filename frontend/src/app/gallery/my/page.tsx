"use client";

import Link from "next/link";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { useAuth } from "@/hooks/use-auth";
import { useGallery } from "@/hooks/use-gallery";
import { Button } from "@/components/ui/button";
import { GenerationCard } from "@/components/gallery/generation-card";
import { Skeleton } from "@/components/ui/skeleton";
import { LogIn, Image as ImageIcon, RotateCw } from "lucide-react";

export default function MyGalleryPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { generations, isLoading: galleryLoading, refetch } = useGallery(user?.email || undefined);

  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl space-y-6 py-6 animate-in fade-in duration-300">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5 gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              My Gallery
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              A personalized space containing your AI-generated gaming assets and creations.
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
              Refresh
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
              <h3 className="text-lg font-medium text-foreground">Sign in required</h3>
              <p className="text-sm text-muted-foreground">
                You must be logged in to view your personalized asset generation gallery.
              </p>
            </div>
            <Link href="/login" passHref legacyBehavior>
              <Button variant="default" className="w-full">
                Sign In with Google
              </Button>
            </Link>
          </div>
        ) : galleryLoading ? (
          // Gallery Loading State (Pulse Skeletons)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full rounded-2xl bg-muted/60 animate-pulse" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-2/3 bg-muted/60 animate-pulse" />
                  <Skeleton className="h-3 w-1/3 bg-muted/60 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : generations.length === 0 ? (
          // Empty State
          <div className="rounded-2xl border border-dashed border-border/80 bg-card/25 p-16 text-center backdrop-blur-sm shadow-inner">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 mb-4 shadow-sm">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No assets generated yet</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
              Get started by returning to the generator home page and creating your first custom studio asset.
            </p>
            <div className="mt-6">
              <Link href="/#generator" passHref legacyBehavior>
                <Button variant="default">Go to Generator</Button>
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
