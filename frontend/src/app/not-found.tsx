import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="flex min-h-full flex-col items-center justify-center bg-background font-sans text-foreground">
        <div className="flex flex-col items-center justify-center px-4 text-center animate-in fade-in duration-500">
          {/* Rune-inspired 404 illustration */}
          <svg
            className="mb-8 size-40 text-primary/20"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer ring */}
            <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Inner compass-like shape */}
            <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            {/* Cross lines */}
            <line x1="60" y1="20" x2="60" y2="100" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line x1="20" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            {/* Diagonal accents */}
            <line x1="35" y1="35" x2="85" y2="85" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
            <line x1="85" y1="35" x2="35" y2="85" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
            {/* Center dot */}
            <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.4" />
            {/* Sparkle */}
            <circle cx="90" cy="30" r="2.5" fill="currentColor" opacity="0.3">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>

          <h1 className="text-6xl font-bold tracking-tight text-foreground">404</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This page could not be found.
          </p>
          <p className="mt-1 text-sm text-muted-foreground/60">
            The realm you seek does not exist.
          </p>

          <Link href="/" className="mt-10">
            <Button variant="default" size="lg" className="gap-2 px-8">
              Return Home
            </Button>
          </Link>

          <p className="mt-16 text-xs text-muted-foreground/40">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </body>
    </html>
  );
}