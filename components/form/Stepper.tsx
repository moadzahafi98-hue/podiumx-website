"use client";

import { cn } from "@/lib/utils";

interface StepperProps {
  steps: { id: string; label: string }[];
  activeStep: number;
  locale: string;
}

export function Stepper({ steps, activeStep, locale }: StepperProps) {
  const isRTL = locale === "ar";
  return (
    <ol
      className={cn(
        "flex flex-wrap gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm",
        isRTL ? "flex-row-reverse" : "flex-row"
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isComplete = index < activeStep;
        return (
          <li
            key={step.id}
            className={cn(
              "flex items-center gap-3 text-sm",
              isActive ? "font-semibold text-brand" : isComplete ? "text-slate-500" : "text-slate-400"
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border",
                isActive ? "border-brand bg-brand text-white" : isComplete ? "border-brand bg-brand/10 text-brand" : "border-slate-200"
              )}
            >
              {index + 1}
            </span>
            <span className="max-w-[10rem] text-sm leading-tight">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
