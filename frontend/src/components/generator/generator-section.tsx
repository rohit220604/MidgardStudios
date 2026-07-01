import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GENERATOR } from "@/lib/landing";

import { GeneratorForm } from "./generator-form";
import { GeneratorPreview } from "./generator-preview";

export function GeneratorSection() {
  return (
    <Section id={GENERATOR.id} className="pb-20 md:pb-28">
      <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Generator
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {GENERATOR.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {GENERATOR.subtitle}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <Card className="border-border/60 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Creative inputs</CardTitle>
          </CardHeader>
          <CardContent>
            <GeneratorForm />
          </CardContent>
        </Card>

        <GeneratorPreview />
      </div>
    </Section>
  );
}
