import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToMetric(value: number, unit: "kg" | "lb" | "cm" | "in") {
  if (unit === "lb") {
    return value * 0.45359237;
  }
  if (unit === "in") {
    return value * 2.54;
  }
  return value;
}

export function formatNumber(value: number, locale: string, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, options).format(value);
}
