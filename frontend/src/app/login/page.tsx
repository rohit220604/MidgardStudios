import type { Metadata } from "next";
import Link from "next/link";
import { GoogleButton } from "@/components/auth/google-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Midgard Studios account.",
};

export default function LoginPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      {/* Background Glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-[420px] transition-all duration-300">
        {/* Back Link */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Login Card */}
        <Card className="border border-border/80 bg-card/45 backdrop-blur-md shadow-2xl relative overflow-hidden rounded-2xl">
          {/* Top subtle gradient highlight line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <CardHeader className="space-y-2 pb-6 text-center pt-8">
            {/* Logo */}
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-2 shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Midgard Studios
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Sign in to generate assets and access your gallery
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 pb-8">
            <div className="space-y-4">
              <GoogleButton callbackUrl="/" />
            </div>

            {/* Disclaimer / Secure Connection Info */}
            <div className="flex items-center justify-center gap-2 rounded-lg bg-muted/40 p-2.5 text-center border border-border/20">
              <ShieldAlert className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-[11px] text-muted-foreground">
                Authorized access only. By continuing, you agree to our Terms.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
