"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
            {brand("name")}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
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
                {t(link.labelKey)}
              </Link>
            ))}

            <div className="flex items-center gap-4 border-l border-border/60 pl-8">
              <LanguageSwitcher />
              <UserMenu />
            </div>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <UserMenu />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <nav className="flex flex-col gap-1 border-t border-border/60 py-4 md:hidden">
            {navLinks.map((link) => (
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
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
