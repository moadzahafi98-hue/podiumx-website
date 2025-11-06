"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "podiumx-units";

export function UnitsToggle() {
  const { t } = useTranslation();
  const { setValue, register } = useFormContext();
  const [unit, setUnit] = useLocalStorage<"metric" | "imperial">(STORAGE_KEY, "metric");

  useEffect(() => {
    register("settings.units");
  }, [register]);

  useEffect(() => {
    setValue("settings.units", unit, { shouldDirty: true, shouldTouch: false });
  }, [unit, setValue]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-600">{t("fields.unitToggle")}</span>
      <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
        <Button type="button" variant={unit === "metric" ? "default" : "ghost"} size="sm" onClick={() => setUnit("metric")}>
          {t("units.metric")}
        </Button>
        <Button type="button" variant={unit === "imperial" ? "default" : "ghost"} size="sm" onClick={() => setUnit("imperial")}>
          {t("units.imperial")}
        </Button>
      </div>
    </div>
  );
}
