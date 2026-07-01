"use client";

import { Wand2, Loader2 } from "lucide-react";
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
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import type { GenerateInput } from "@/types/generation";

import { FormField } from "./form-field";

interface GeneratorFormProps {
  formData: GenerateInput;
  setFormData: React.Dispatch<React.SetStateAction<GenerateInput>>;
  onSubmit: (input: GenerateInput, userEmail: string) => Promise<any>;
  isLoading: boolean;
}

export function GeneratorForm({
  formData,
  setFormData,
  onSubmit,
  isLoading,
}: GeneratorFormProps) {
  const { isAuthenticated, user } = useAuth();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inspiredBy: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isAuthenticated || !user?.email) {
      toast.error("Please sign in to generate images.");
      return;
    }

    const { genre, environment, style, inspiredBy, prompt } = formData;
    if (
      !genre.trim() ||
      !environment.trim() ||
      !style.trim() ||
      !inspiredBy.trim() ||
      !prompt.trim()
    ) {
      toast.error("Please fill in all inputs before generating.");
      return;
    }

    try {
      await onSubmit(formData, user.email);
    } catch (error) {
      // Error handles in hook with toast
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <FormField id={GENERATOR_FIELDS.genre.id} label={GENERATOR_FIELDS.genre.label}>
        <Input
          id={GENERATOR_FIELDS.genre.id}
          name="genre"
          placeholder={GENERATOR_FIELDS.genre.placeholder}
          autoComplete="off"
          value={formData.genre}
          onChange={handleInputChange}
          disabled={isLoading}
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
          value={formData.environment}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </FormField>

      <FormField id={GENERATOR_FIELDS.style.id} label={GENERATOR_FIELDS.style.label}>
        <Input
          id={GENERATOR_FIELDS.style.id}
          name="style"
          placeholder={GENERATOR_FIELDS.style.placeholder}
          autoComplete="off"
          value={formData.style}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </FormField>

      <FormField
        id={GENERATOR_FIELDS.inspiredBy.id}
        label={GENERATOR_FIELDS.inspiredBy.label}
      >
        <Select
          value={formData.inspiredBy}
          onValueChange={handleSelectChange}
          disabled={isLoading}
        >
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
          value={formData.prompt}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </FormField>

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="h-12 w-full text-sm font-medium transition-transform hover:scale-[1.01]"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Generating asset...
          </>
        ) : (
          <>
            <Wand2 className="size-4" />
            {GENERATOR.generateLabel}
          </>
        )}
      </Button>
    </form>
  );
}
