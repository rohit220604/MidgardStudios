import { Section } from "@/components/layout/section";
import { HOW_IT_WORKS_STEPS } from "@/lib/landing";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  return (
    <Section className="border-y border-border/60 bg-card/20">
      <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          How It Works
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          From idea to artwork in three steps
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {HOW_IT_WORKS_STEPS.map((item, index) => (
          <div key={item.step} className="relative flex flex-col items-center text-center">
            {index < HOW_IT_WORKS_STEPS.length - 1 ? (
              <div
                aria-hidden
                className="absolute left-[calc(50%+2rem)] top-6 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-border via-primary/40 to-border md:block"
              />
            ) : null}

            <div
              className={cn(
                "mb-5 flex size-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary",
              )}
            >
              {item.step}
            </div>

            <h3 className="mb-2 text-lg font-medium text-foreground">{item.title}</h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
