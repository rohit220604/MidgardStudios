"use client";

import { Loader2, RotateCcw, Wand2, X } from "lucide-react";
import { memo, useCallback, useRef } from "react";
import { Badge } from "@/components/ui/badge";
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
import { INSPIRED_BY_OPTIONS } from "@/lib/landing";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { PROMPT_MAX_LENGTH } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { GenerateInput, GenerateResponse } from "@/types/generation";

import { FormField } from "./form-field";

interface GeneratorFormProps {
  formData: GenerateInput;
  setFormData: React.Dispatch<React.SetStateAction<GenerateInput>>;
  onSubmit: (
    input: GenerateInput,
    userEmail: string,
  ) => Promise<GenerateResponse["generation"]>;
  isLoading: boolean;
  isEditingPreviousPrompt?: boolean;
  prefillAnimated?: boolean;
  changedFields?: Partial<Record<keyof GenerateInput, boolean>>;
  onCancelEditing?: () => void;
}

export const GeneratorForm = memo(function GeneratorForm({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  isEditingPreviousPrompt = false,
  prefillAnimated = false,
  changedFields = {},
  onCancelEditing,
}: GeneratorFormProps) {
  const t = useTranslations("generator");
  const buttons = useTranslations("buttons");
  const { isAuthenticated, user } = useAuth();
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const getFieldClassName = (field: keyof GenerateInput) =>
    cn(
      "transition-all duration-300",
      prefillAnimated && "animate-in fade-in-0 slide-in-from-bottom-1 duration-500",
      changedFields[field] && "ring-2 ring-primary/60 ring-offset-2 ring-offset-background",
    );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name === "prompt" && value.length > PROMPT_MAX_LENGTH) return;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData],
  );

  const handleSelectChange = useCallback(
    (value: string) => {
      setFormData((prev) => ({ ...prev, inspiredBy: value }));
    },
    [setFormData],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!isAuthenticated || !user?.email) {
        toast.error(t("toasts.signInRequired"));
        return;
      }

      const { genre, environment, style, inspiredBy, prompt } = formData;
      const missing: string[] = [];
      if (!genre.trim()) missing.push("genre");
      if (!environment.trim()) missing.push("environment");
      if (!style.trim()) missing.push("style");
      if (!inspiredBy.trim()) missing.push("inspiredBy");
      if (!prompt.trim()) missing.push("prompt");

      if (missing.length > 0) {
        // Focus the first missing field
        if (missing.includes("genre")) {
          document.getElementById("genre")?.focus();
        } else if (missing.includes("environment")) {
          document.getElementById("environment")?.focus();
        } else if (missing.includes("style")) {
          document.getElementById("style")?.focus();
        } else if (missing.includes("prompt")) {
          promptRef.current?.focus();
        }
        toast.error(t("toasts.missingFields"));
        return;
      }

      try {
        await onSubmit(formData, user.email);
      } catch {
        // Error handled in hook with toast
      }
    },
    [formData, isAuthenticated, user?.email, onSubmit, t],
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {isEditingPreviousPrompt && (
        <div className="flex flex-col gap-3 rounded-lg border border-primary/30 bg-primary/10 p-3 sm:flex-row sm:items-center sm:justify-between">
          <Badge className="h-6 gap-1.5 rounded-md bg-primary/90 text-primary-foreground">
            <RotateCcw className="h-3.5 w-3.5" />
            {t("editingPreviousPrompt")}
          </Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancelEditing}
            disabled={isLoading}
            className="h-8 border-primary/30 bg-background/40"
          >
            <X className="h-3.5 w-3.5" />
            {buttons("cancelEditing")}
          </Button>
        </div>
      )}

      <FormField id="genre" label={t("fields.genre.label")}>
        <Input
          id="genre"
          name="genre"
          placeholder={t("fields.genre.placeholder")}
          autoComplete="off"
          value={formData.genre}
          onChange={handleInputChange}
          disabled={isLoading}
          className={getFieldClassName("genre")}
        />
      </FormField>

      <FormField
        id="environment"
        label={t("fields.environment.label")}
      >
        <Input
          id="environment"
          name="environment"
          placeholder={t("fields.environment.placeholder")}
          autoComplete="off"
          value={formData.environment}
          onChange={handleInputChange}
          disabled={isLoading}
          className={getFieldClassName("environment")}
        />
      </FormField>

      <FormField id="style" label={t("fields.style.label")}>
        <Input
          id="style"
          name="style"
          placeholder={t("fields.style.placeholder")}
          autoComplete="off"
          value={formData.style}
          onChange={handleInputChange}
          disabled={isLoading}
          className={getFieldClassName("style")}
        />
      </FormField>

      <FormField
        id="inspired-by"
        label={t("fields.inspiredBy.label")}
      >
        <Select
          value={formData.inspiredBy}
          onValueChange={handleSelectChange}
          disabled={isLoading}
        >
          <SelectTrigger
            id="inspired-by"
            className={cn("w-full", getFieldClassName("inspiredBy"))}
          >
            <SelectValue placeholder={t("fields.inspiredBy.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {INSPIRED_BY_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {t(`presets.${option}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField id="prompt" label={t("fields.prompt.label")}>
        <div className="relative">
          <Textarea
            ref={promptRef}
            id="prompt"
            name="prompt"
            placeholder={t("fields.prompt.placeholder")}
            rows={5}
            className={cn(
              "min-h-28 resize-none pb-7",
              getFieldClassName("prompt"),
            )}
            value={formData.prompt}
            onChange={handleInputChange}
            disabled={isLoading}
            aria-describedby="prompt-counter"
            aria-label={t("fields.prompt.label")}
          />
          <span
            id="prompt-counter"
            className="absolute bottom-2 right-3 text-[10px] tabular-nums text-muted-foreground/50"
          >
            {formData.prompt.length}/{PROMPT_MAX_LENGTH}
          </span>
        </div>
      </FormField>

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="h-11 w-full text-sm font-medium transition-transform hover:scale-[1.01]"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t("preview.loadingTitle")}
          </>
        ) : (
          <>
            <Wand2 className="size-4" />
            {buttons("generate")}
          </>
        )}
      </Button>
    </form>
  );
});
