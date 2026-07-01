"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LANGUAGES, NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/auth/user-menu";

import { Container } from "./container";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
            onClick={closeMobileMenu}
          >
            {SITE.name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-4 border-l border-border/60 pl-8">
              <LanguageToggle />
              <UserMenu />
            </div>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle />
            <UserMenu />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <nav className="flex flex-col gap-1 border-t border-border/60 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </Container>
    </header>
  );
}

function LanguageToggle() {
  return (
    <div
      className="flex items-center gap-2 text-sm"
      aria-label="Language toggle placeholder"
    >
      <span className="font-medium text-foreground">{LANGUAGES.en}</span>
      <span className="text-muted-foreground">|</span>
      <span className="cursor-default text-muted-foreground">{LANGUAGES.ja}</span>
    </div>
  );
}
