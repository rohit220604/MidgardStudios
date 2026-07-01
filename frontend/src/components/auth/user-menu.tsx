"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { AvatarDropdown } from "./avatar-dropdown";

export function UserMenu() {
  const { user, status, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-8 w-8 animate-pulse rounded-full bg-muted border border-border/80" />
    );
  }

  if (isAuthenticated && user) {
    return <AvatarDropdown user={user} />;
  }

  return (
    <Link href="/login" passHref legacyBehavior>
      <Button
        variant="outline"
        size="sm"
        className="border-border hover:bg-muted text-foreground transition-all duration-200"
      >
        Sign In
      </Button>
    </Link>
  );
}
