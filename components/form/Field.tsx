"use client";

import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FieldProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function Field({ name, label, description, required, children, className }: FieldProps) {
  const {
    formState: { errors }
  } = useFormContext();
  const error = errors && (errors as any)[name];

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <label htmlFor={name.replace(/\./g, "-")} className="text-sm font-medium text-slate-900">
          {label}
          {required ? <span className="ml-1 text-red-600">*</span> : null}
        </label>
      ) : null}
      {description ? <p className="text-sm text-slate-500">{description}</p> : null}
      {children}
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {(error as any).message as string}
        </p>
      ) : null}
    </div>
  );
}
