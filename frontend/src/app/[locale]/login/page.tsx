import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { GoogleButton } from "@/components/auth/google-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });

  return {
    title: t("signInTitle"),
    description: t("signInDescription"),
  };
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "auth" });
  const callbackUrl = locale === "en" ? "/" : `/${locale}`;

  return (
    <div className="relative flex flex-1 items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-[420px] transition-all duration-300">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {"<- "}
            {t("backHome")}
          </Link>
        </div>

        <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/45 shadow-2xl backdrop-blur-md">
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <CardHeader className="space-y-2 pb-6 pt-8 text-center">
            <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-inner">
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
              {t("loginSubtitle")}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pb-8">
            <div className="space-y-4">
              <GoogleButton callbackUrl={callbackUrl} />
            </div>

            <div className="flex items-center justify-center gap-2 rounded-lg border border-border/20 bg-muted/40 p-2.5 text-center">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">
                {t("secureNotice")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
