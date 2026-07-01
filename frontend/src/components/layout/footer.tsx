import Link from "next/link";

import { SITE } from "@/lib/constants";

import { Container } from "./container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40">
      <Container className="py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-base font-semibold text-foreground">{SITE.name}</p>
            <p className="max-w-sm text-sm text-muted-foreground">{SITE.tagline}</p>
          </div>

          <Link
            href={SITE.githubUrl}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub placeholder"
          >
            GitHub
          </Link>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {SITE.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
