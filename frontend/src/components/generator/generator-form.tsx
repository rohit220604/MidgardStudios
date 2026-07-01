"use client";

import { Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GENERATOR,
  GENERATOR_FIELDS,
  INSPIRED_BY_OPTIONS,
} from "@/lib/landing";
import { cn } from "@/lib/utils";

import { FormField } from "./form-field";

const selectClassName = cn(
  "h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "dark:bg-input/30",
);

export function GeneratorForm() {
  return (
    <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
      <FormField id={GENERATOR_FIELDS.genre.id} label={GENERATOR_FIELDS.genre.label}>
        <Input
          id={GENERATOR_FIELDS.genre.id}
          name="genre"
          placeholder={GENERATOR_FIELDS.genre.placeholder}
          autoComplete="off"
        />
      </FormField>

      <FormField
        id={GENERATOR_FIELDS.environment.id}
        label={GENERATOR_FIELDS.environment.label}
      >
        <Input
          id={GENERATOR_FIELDS.environment.id}
          name="environment"
          placeholder={GENERATOR_FIELDS.environment.placeholder}
          autoComplete="off"
        />
      </FormField>

      <FormField id={GENERATOR_FIELDS.style.id} label={GENERATOR_FIELDS.style.label}>
        <Input
          id={GENERATOR_FIELDS.style.id}
          name="style"
          placeholder={GENERATOR_FIELDS.style.placeholder}
          autoComplete="off"
        />
      </FormField>

      <FormField
        id={GENERATOR_FIELDS.inspiredBy.id}
        label={GENERATOR_FIELDS.inspiredBy.label}
      >
        <select
          id={GENERATOR_FIELDS.inspiredBy.id}
          name="inspiredBy"
          defaultValue=""
          className={selectClassName}
        >
          <option value="" disabled>
            {GENERATOR_FIELDS.inspiredBy.placeholder}
          </option>
          {INSPIRED_BY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id={GENERATOR_FIELDS.prompt.id} label={GENERATOR_FIELDS.prompt.label}>
        <Textarea
          id={GENERATOR_FIELDS.prompt.id}
          name="prompt"
          placeholder={GENERATOR_FIELDS.prompt.placeholder}
          rows={5}
          className="min-h-32 resize-none"
        />
      </FormField>

      <Button type="button" size="lg" className="h-12 w-full text-sm font-medium">
        <Wand2 className="size-4" />
        {GENERATOR.generateLabel}
      </Button>
    </form>
  );
}
