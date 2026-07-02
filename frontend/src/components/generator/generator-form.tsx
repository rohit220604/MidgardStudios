"use client";

import { Loader2, RotateCcw, Wand2, X } from "lucide-react";
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

export function GeneratorForm({
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
  const getFieldClassName = (field: keyof GenerateInput) =>
    cn(
      "transition-all duration-300",
      prefillAnimated && "animate-in fade-in-0 slide-in-from-bottom-1 duration-500",
      changedFields[field] && "ring-2 ring-primary/60 ring-offset-2 ring-offset-background",
    );

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
      toast.error(t("toasts.signInRequired"));
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
      toast.error(t("toasts.missingFields"));
      return;
    }

    try {
      await onSubmit(formData, user.email);
    } catch {
      // Error handles in hook with toast
    }
  };

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
        <Textarea
          id="prompt"
          name="prompt"
          placeholder={t("fields.prompt.placeholder")}
          rows={5}
          className={cn("min-h-28 resize-none", getFieldClassName("prompt"))}
          value={formData.prompt}
          onChange={handleInputChange}
          disabled={isLoading}
        />
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
}
