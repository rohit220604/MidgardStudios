import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageWrapper } from "@/components/layout/page-wrapper";

const featureKeys = [
  "aiConcept",
  "personalGallery",
  "promptRegeneration",
  "builtForCreators",
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("metadataTitle"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const brand = await getTranslations({ locale, namespace: "brand" });

  return (
    <PageWrapper>
      <div className="mx-auto max-w-7xl space-y-20">
        <section className="grid items-center gap-14 lg:grid-cols-2">
          <div className="space-y-7">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t("heroTitle")}
            </h1>

            <p className="text-lg leading-8 text-muted-foreground">
              {t("intro1BeforeBrand")}
              <span className="font-semibold text-foreground">
                {brand("name")}
              </span>
              {t("intro1AfterBrand")}
            </p>

            <p className="text-lg leading-8 text-muted-foreground">
              {t("intro2")}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            <Image
              src="/images/about-hero.png"
              alt={t("heroImageAlt")}
              width={900}
              height={700}
              priority
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-8 md:p-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl font-semibold">{t("whyTitle")}</h2>

            <p className="text-lg leading-8 text-muted-foreground">
              {t("why1BeforeBrand")}
              <strong className="text-foreground">Midgard</strong>
              {t("why1AfterBrand")}
            </p>

            <p className="text-lg leading-8 text-muted-foreground">
              {t("why2BeforeBrand")}
              <strong className="text-foreground">{brand("name")}</strong>
              {t("why2AfterBrand")}
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-semibold">{t("featuresTitle")}</h2>

            <p className="mt-2 text-muted-foreground">
              {t("featuresSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featureKeys.map((featureKey) => (
              <div
                key={featureKey}
                className="rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
              >
                <h3 className="mb-3 text-xl font-semibold">
                  {t(`features.${featureKey}.title`)}
                </h3>

                <p className="leading-7 text-muted-foreground">
                  {t(`features.${featureKey}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
