import { CtaSection } from "@/components/cta/cta";
import { Features } from "@/components/features/features";
import { GeneratorSection } from "@/components/generator/generator-section";
import { Hero } from "@/components/hero/hero";
import { HowItWorks } from "@/components/how-it-works/how-it-works";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <GeneratorSection />
      <CtaSection />
    </>
  );
}
