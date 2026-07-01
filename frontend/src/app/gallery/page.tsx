"use client";

import Link from "next/link";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { useAuth } from "@/hooks/use-auth";
import { useGallery } from "@/hooks/use-gallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, RefreshCw, LogIn, Image as ImageIcon, RotateCw, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function GalleryPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { generations, isLoading: galleryLoading, refetch } = useGallery(user?.email || undefined);

  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl space-y-6 py-6 animate-in fade-in duration-300">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5 gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Gallery
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              Explore your collection of AI-generated assets and concepts.
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
              <h3 className="text-lg font-medium text-foreground">Sign in required</h3>
              <p className="text-sm text-muted-foreground">
                Please log in with Google to view and manage your generated concept art.
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
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16 bg-muted/60 animate-pulse" />
                    <Skeleton className="h-4 w-20 bg-muted/60 animate-pulse" />
                  </div>
                  <Skeleton className="h-4 w-2/3 bg-muted/60 animate-pulse" />
                  <Skeleton className="h-3 w-1/3 bg-muted/60 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : generations.length === 0 ? (
          // Empty State Layout
          <div className="rounded-2xl border border-dashed border-border/80 bg-card/25 p-16 text-center backdrop-blur-sm shadow-inner max-w-2xl mx-auto mt-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 shadow-sm">
              <ImageIcon className="h-12 w-12 text-primary/80 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">No concept art yet</h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Generate your first artwork to build your personal gallery.
            </p>
            <div className="mt-8">
              <Link href="/#generator" passHref legacyBehavior>
                <Button variant="default" className="px-6 gap-2">
                  <Sparkles className="h-4.5 w-4.5" />
                  Generate Artwork
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Gallery Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {generations.map((gen) => (
              <Card
                key={gen.id}
                className="overflow-hidden border border-border/80 bg-card/45 backdrop-blur-sm group hover:border-primary/50 transition-all duration-300 shadow-lg flex flex-col h-full"
              >
                {/* Image & Tags Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted/30 border-b border-border/40">
                  <img
                    src={gen.imageUrl}
                    alt={gen.prompt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Genre and Style Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                    <span className="bg-background/80 backdrop-blur-xs border border-border/40 text-[10px] px-2 py-0.5 rounded-md font-semibold text-foreground text-opacity-95 shadow-sm">
                      {gen.genre}
                    </span>
                    <span className="bg-background/80 backdrop-blur-xs border border-border/40 text-[10px] px-2 py-0.5 rounded-md font-semibold text-foreground text-opacity-95 shadow-sm">
                      {gen.style}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <CardContent className="p-4 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span className="font-semibold text-primary/80 truncate max-w-[150px]">
                        {gen.environment}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-primary/60" />
                        {new Date(gen.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-foreground/95 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-300">
                      {gen.prompt}
                    </p>
                  </div>

                  <div className="flex gap-2 border-t border-border/40 pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        toast.info(
                          "Regeneration triggered (UI placeholder)",
                        )
                      }
                      className="w-full h-8 gap-1.5 border-border/60 hover:bg-muted text-foreground transition-all duration-200"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Regenerate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
