"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeLabels: Record<Locale, "english" | "japanese"> = {
  en: "english",
  ja: "japanese",
};

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const switchLocale = (nextLocale: Locale) => {
    window.document.cookie = `MIDGARD_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    window.localStorage.setItem("MIDGARD_LOCALE", nextLocale);
    setIsOpen(false);

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        aria-label={t("label")}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          "flex h-9 items-center gap-2 rounded-lg border border-border/60 bg-input/10 px-3 text-sm text-foreground transition-all duration-200 hover:bg-input/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          isPending && "opacity-70",
        )}
      >
        <Globe2 className="h-4 w-4 text-muted-foreground" />
        <span className="hidden sm:inline">{t(localeLabels[locale])}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-xl border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
          {routing.locales.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => switchLocale(option)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              <span>{t(localeLabels[option])}</span>
              {option === locale && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
