import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ id, label, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
