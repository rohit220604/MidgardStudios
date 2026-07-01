"use client";

import { Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  GENERATOR,
  GENERATOR_FIELDS,
  INSPIRED_BY_OPTIONS,
} from "@/lib/landing";

import { FormField } from "./form-field";

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
        <Select>
          <SelectTrigger id={GENERATOR_FIELDS.inspiredBy.id} className="w-full">
            <SelectValue placeholder={GENERATOR_FIELDS.inspiredBy.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {INSPIRED_BY_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

      <Button
        type="button"
        size="lg"
        className="h-12 w-full text-sm font-medium transition-transform hover:scale-[1.01]"
      >
        <Wand2 className="size-4" />
        {GENERATOR.generateLabel}
      </Button>
    </form>
  );
}
