"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CheckboxGroupProps {
  name: string;
  options: { value: string; label: string }[];
  direction?: "row" | "column";
}

export function CheckboxGroup({ name, options, direction = "column" }: CheckboxGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value: string[] = field.value || [];
        return (
          <div className={cn("flex flex-wrap gap-3", direction === "column" ? "flex-col" : "flex-row")}
            role="group"
            aria-labelledby={`${name}-label`}
          >
            {options.map((option) => {
              const checked = value.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus-within:border-brand"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(isChecked) => {
                      if (isChecked) {
                        field.onChange([...value, option.value]);
                      } else {
                        field.onChange(value.filter((v) => v !== option.value));
                      }
                    }}
                    className="mt-0.5"
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        );
      }}
    />
  );
}
