"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/auth/user-menu";
import { LanguageSwitcher } from "@/i18n/components/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { Container } from "./container";

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/about", labelKey: "about" },
] as const;

export function Navbar() {
  const t = useTranslations("navigation");
  const brand = useTranslations("brand");
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
      role="banner"
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            onClick={closeMobileMenu}
            aria-label={`${brand("name")} — Home`}
          >
            {brand("name")}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label={t("home")}>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}

            <div className="flex items-center gap-4 border-l border-border/60 pl-6 ml-2">
              <LanguageSwitcher />
              <UserMenu />
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <UserMenu />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-nav"
            className="flex flex-col gap-1 border-t border-border/60 py-4 md:hidden"
            aria-label={t("home")}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                    active
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                  onClick={closeMobileMenu}
                  aria-current={active ? "page" : undefined}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>
        )}
      </Container>
    </header>
  );
}