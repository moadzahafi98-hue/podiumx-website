"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useLocalStorage, useDebounce } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSection } from "@/components/form/FormSection";
import { Field } from "@/components/form/Field";
import { CheckboxGroup } from "@/components/form/CheckboxGroup";
import { Stepper } from "@/components/form/Stepper";
import { SaveDraft } from "@/components/form/SaveDraft";
import { UnitsToggle } from "@/components/form/UnitsToggle";
import { SubmissionInput, SubmissionSchema } from "@/lib/zodSchemas";
import { formSections } from "@/lib/form-definition";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  locale: SubmissionInput["locale"];
  defaultValues: SubmissionInput;
}

const STORAGE_KEY_PREFIX = "podiumx-form-";

export function FormClient({ locale, defaultValues }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm<SubmissionInput>({
    resolver: zodResolver(SubmissionSchema),
    defaultValues: {
      ...defaultValues,
      locale,
      startedAt: Date.now()
    },
    mode: "onBlur"
  });
  const { handleSubmit, watch, setValue, getValues, reset } = methods;
  const [activeStep, setActiveStep] = useState(0);
    const [localStorageValue, setLocalStorageValue] = useLocalStorage<SubmissionInput | null>(
    `${STORAGE_KEY_PREFIX}${locale}`,
    null
  );
  const watchedValues = watch();
  const debouncedValues = useDebounce(watchedValues, 2000);
  const isRTL = locale === "ar";

  useEffect(() => {
    if (localStorageValue) {
      reset({ ...localStorageValue, locale });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageValue(debouncedValues);
  }, [debouncedValues, setLocalStorageValue]);

  useEffect(() => {
    if (!watchedValues.startedAt) {
      setValue("startedAt", Date.now(), { shouldDirty: false, shouldTouch: false });
    }
  }, [setValue, watchedValues.startedAt]);

  const steps = useMemo(
    () =>
      formSections.map((section) => ({
        id: section.id,
        label: t(section.translationKey)
      })),
    [t]
  );

  const requiredFields = useMemo(() => {
    const names: string[] = [];
    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.required) {
          names.push(field.name);
        }
      });
    });
    return names;
  }, []);

  const completedRequired = requiredFields.filter((name) => {
    const value = getNestedValue(watchedValues, name);
    if (typeof value === "boolean") return value;
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  }).length;

  const progressPercent = Math.round((completedRequired / requiredFields.length) * 100);

  const onSubmit = async (data: SubmissionInput) => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale })
      });
      if (!response.ok) {
        const error = await response.json();
        toast.error(typeof error.error === "string" ? t(error.error) : t("validation.required"));
        return;
      }
      const json = await response.json();
      setLocalStorageValue(null);
      router.push(`/${locale}/thank-you/${json.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Submission failed");
    }
  };

  const handleDraft = async () => {
    try {
      const response = await fetch("/api/save-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...getValues(), locale })
      });
      if (!response.ok) {
        throw new Error("Draft failed");
      }
      toast.success(t("draft.saved"));
    } catch (error) {
      toast.error("Unable to save draft");
    }
  };

  const renderField = (name: string, type: string, translationKey: string, helperKey?: string, field?: any) => {
    const id = name.replace(/\./g, "-");

    switch (type) {
      case "text":
      case "email":
      case "tel":
      case "time":
        return <Input id={id} type={type === "time" ? "time" : type} {...methods.register(name as any)} />;
      case "number":
        return (
          <Input
            id={id}
            type="number"
            step={field?.step ?? 1}
            min={field?.min}
            max={field?.max}
            {...methods.register(name as any, { valueAsNumber: true })}
          />
        );
      case "textarea":
        return <Textarea id={id} rows={4} {...methods.register(name as any)} />;
      case "select":
        return (
          <Controller
            control={methods.control}
            name={name as any}
            render={({ field: controllerField }) => (
              <Select value={controllerField.value ?? ""} onValueChange={controllerField.onChange}>
                <SelectTrigger id={id}>
                  <SelectValue placeholder={t("nav.select", { defaultValue: "" })} />
                </SelectTrigger>
                <SelectContent dir={isRTL ? "rtl" : "ltr"}>
                  {resolveOptions(name, t).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );
      case "multiselect":
        return <CheckboxGroup name={name} options={resolveOptions(name, t)} />;
      case "boolean":
        return (
          <Controller
            control={methods.control}
            name={name as any}
            render={({ field: controllerField }) => (
              <div className="flex items-center gap-3">
                <Checkbox
                  id={id}
                  checked={Boolean(controllerField.value)}
                  onCheckedChange={(checked) => controllerField.onChange(Boolean(checked))}
                />
                <span className="text-sm text-slate-700">{t(translationKey)}</span>
              </div>
            )}
          />
        );
      default:
        return <Input id={id} type="text" {...methods.register(name as any)} />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <input type="hidden" value={locale} {...methods.register("locale")} />
        <input type="hidden" {...methods.register("startedAt", { value: Date.now() })} />
        <input type="text" className="sr-only" tabIndex={-1} aria-hidden="true" autoComplete="off" {...methods.register("honeypot")} />
        <div className="space-y-6">
          <Stepper steps={steps} activeStep={activeStep} locale={locale} />
          <div className={cn("flex flex-col gap-6 lg:flex-row", isRTL ? "lg:flex-row-reverse" : "lg:flex-row")}
          >
            <aside className="lg:w-64">
              <div className="sticky top-24 space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-700">{t("progress.title")}</p>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-brand" style={{ width: `${progressPercent}%` }} aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} role="progressbar" />
                </div>
                <p className="text-xs text-slate-500">{t("progress.completed", { count: completedRequired, total: requiredFields.length })}</p>
                <nav className="space-y-2" aria-label="Section navigation">
                  {steps.map((step, index) => (
                    <button
                      type="button"
                      key={step.id}
                      onClick={() => setActiveStep(index)}
                      className={cn(
                        "w-full rounded-md px-3 py-2 text-left text-sm transition",
                        index === activeStep ? "bg-brand text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      {step.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
            <div className="flex-1 space-y-12">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-slate-900">{t("hero.title")}</h1>
                  <p className="text-slate-600">{t("hero.description")}</p>
                </div>
                <UnitsToggle />
              </div>
              {formSections.map((section, index) => (
                <FormSection key={section.id} title={t(section.translationKey)} visible={index === activeStep} dir={isRTL ? "rtl" : "ltr"}>
                  <div className="grid gap-6">
                    {section.id === "s1" ? <Anthropometrics /> : null}
                    {section.id === "s5" ? <MacroTargets /> : null}
                    {section.fields.map((field) => (
                      <Field
                        key={field.name}
                        name={field.name}
                        label={field.type === "boolean" ? "" : t(field.translationKey)}
                        description={field.helperKey ? t(field.helperKey) : undefined}
                        required={field.required}
                      >
                        {renderField(field.name, field.type, field.translationKey, field.helperKey, field)}
                      </Field>
                    ))}
                  </div>
                  <div className={cn("mt-8 flex flex-col gap-4 sm:flex-row", isRTL ? "sm:flex-row-reverse" : "sm:flex-row")}
                  >
                    <div className="flex gap-3">
                      {index > 0 && (
                        <Button type="button" variant="outline" onClick={() => setActiveStep((prev) => prev - 1)}>
                          {t("nav.back")}
                        </Button>
                      )}
                      {index < formSections.length - 1 && (
                        <Button type="button" onClick={() => setActiveStep((prev) => prev + 1)}>
                          {t("nav.next")}
                        </Button>
                      )}
                      {index === formSections.length - 1 && (
                        <Button type="submit">{t("nav.submit")}</Button>
                      )}
                    </div>
                    <SaveDraft onSave={handleDraft} />
                  </div>
                </FormSection>
              ))}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

function getNestedValue(object: any, path: string) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), object);
}

function resolveOptions(name: string, t: (key: string, options?: any) => string) {
  switch (name) {
    case "personal.dobBracket":
      return ["<18", "18-25", "26-35", "36-45", "46-55", "56+"].map((value) => ({ value, label: value }));
    case "personal.workSchedule":
      return (t("options.workSchedule", { returnObjects: true }) as string[]).map((label) => ({ value: label, label }));
    case "lifestyle.workActivity":
      return (t("options.workActivity", { returnObjects: true }) as string[]).map((label) => ({ value: label, label }));
    case "lifestyle.stressLevel":
      return (t("options.stressLevel", { returnObjects: true }) as string[]).map((label) => ({ value: label, label }));
    case "training.trainingTypes":
    case "nutrition.proteinSources":
    case "nutrition.carbSources":
    case "nutrition.fatSources":
    case "goals.goals":
    case "goals.secondaryGoals":
      return (t(`options.${name.split(".")[1]}`, { returnObjects: true }) as string[]).map((label) => ({ value: label, label }));
    case "nutrition.macroPreference":
      const macroOptions = t("options.macroPreference", { returnObjects: true }) as Record<string, string>;
      return Object.entries(macroOptions).map(([value, label]) => ({ value, label }));
    case "goals.timeline":
      return (t("options.timeline", { returnObjects: true }) as string[]).map((label) => ({ value: label, label }));
    case "preferences.checkInFrequency":
      return (t("options.checkIns", { returnObjects: true }) as string[]).map((label) => ({ value: label, label }));
    case "preferences.communication":
      return (t("options.communication", { returnObjects: true }) as string[]).map((label) => ({ value: label, label }));
    default:
      return [];
  }
}

function Anthropometrics() {
  const { t } = useTranslation();
  const { register, setValue, watch, getValues } = useFormContext<SubmissionInput>();
  const units = watch("settings.units");
  const heightUnit = watch("personal.height.unit");
  const weightUnit = watch("personal.weight.unit");
  const goalUnit = watch("personal.goalWeight.unit");
  const prevUnits = useRef<string | null>(null);

  useEffect(() => {
    if (!prevUnits.current) {
      prevUnits.current = units;
      return;
    }
    if (prevUnits.current === units) return;

    const values = getValues();
    if (units === "imperial") {
      setValue("personal.height.value", Number((values.personal.height.value / 2.54).toFixed(1)), { shouldDirty: true });
      setValue("personal.height.unit", "in", { shouldDirty: true });
      setValue("personal.weight.value", Number((values.personal.weight.value * 2.20462).toFixed(1)), { shouldDirty: true });
      setValue("personal.weight.unit", "lb", { shouldDirty: true });
      if (values.personal.goalWeight) {
        setValue("personal.goalWeight.value", Number((values.personal.goalWeight.value * 2.20462).toFixed(1)), {
          shouldDirty: true
        });
        setValue("personal.goalWeight.unit", "lb", { shouldDirty: true });
      }
    } else {
      setValue("personal.height.value", Number((values.personal.height.value * 2.54).toFixed(1)), { shouldDirty: true });
      setValue("personal.height.unit", "cm", { shouldDirty: true });
      setValue("personal.weight.value", Number((values.personal.weight.value / 2.20462).toFixed(1)), { shouldDirty: true });
      setValue("personal.weight.unit", "kg", { shouldDirty: true });
      if (values.personal.goalWeight) {
        setValue("personal.goalWeight.value", Number((values.personal.goalWeight.value / 2.20462).toFixed(1)), {
          shouldDirty: true
        });
        setValue("personal.goalWeight.unit", "kg", { shouldDirty: true });
      }
    }
    prevUnits.current = units;
  }, [getValues, setValue, units]);

  const updateUnit = (path: keyof SubmissionInput["personal"], unit: "kg" | "lb" | "cm" | "in") => {
    setValue(`personal.${path}.unit` as const, unit, { shouldDirty: true });
  };

  return (
    <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">{t("sections.s1")} — {t("fields.height")}/{t("fields.weight")}</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="height-value" className="text-sm font-medium text-slate-700">
            {t("fields.height")}
          </label>
          <Input id="height-value" type="number" step="0.5" {...register("personal.height.value", { valueAsNumber: true })} />
          <div className="flex gap-2">
            <Button type="button" variant={heightUnit === "cm" ? "default" : "outline"} size="sm" onClick={() => updateUnit("height", "cm")}>
              cm
            </Button>
            <Button type="button" variant={heightUnit === "in" ? "default" : "outline"} size="sm" onClick={() => updateUnit("height", "in")}>
              in
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="weight-value" className="text-sm font-medium text-slate-700">
            {t("fields.weight")}
          </label>
          <Input id="weight-value" type="number" step="0.1" {...register("personal.weight.value", { valueAsNumber: true })} />
          <div className="flex gap-2">
            <Button type="button" variant={weightUnit === "kg" ? "default" : "outline"} size="sm" onClick={() => updateUnit("weight", "kg")}>
              kg
            </Button>
            <Button type="button" variant={weightUnit === "lb" ? "default" : "outline"} size="sm" onClick={() => updateUnit("weight", "lb")}>
              lb
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="goal-weight-value" className="text-sm font-medium text-slate-700">
            {t("fields.goalWeight")}
          </label>
          <Input id="goal-weight-value" type="number" step="0.1" {...register("personal.goalWeight.value", { valueAsNumber: true })} />
          <div className="flex gap-2">
            <Button type="button" variant={goalUnit === "kg" ? "default" : "outline"} size="sm" onClick={() => updateUnit("goalWeight", "kg")}>
              kg
            </Button>
            <Button type="button" variant={goalUnit === "lb" ? "default" : "outline"} size="sm" onClick={() => updateUnit("goalWeight", "lb")}>
              lb
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
function MacroTargets() {
  const { t } = useTranslation();
  const { register } = useFormContext<SubmissionInput>();
  return (
    <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-800">{t("fields.macroTargets")}</h3>
        <p className="text-sm text-slate-600">{t("helperTexts.macroTargets")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="macro-protein" className="text-sm font-medium text-slate-700">{t("fields.proteinTarget")}</label>
          <Input id="macro-protein" type="number" step="1" {...register("nutrition.macroTargets.proteinG" as const, { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <label htmlFor="macro-carbs" className="text-sm font-medium text-slate-700">{t("fields.carbTarget")}</label>
          <Input id="macro-carbs" type="number" step="1" {...register("nutrition.macroTargets.carbsG" as const, { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <label htmlFor="macro-fats" className="text-sm font-medium text-slate-700">{t("fields.fatTarget")}</label>
          <Input id="macro-fats" type="number" step="1" {...register("nutrition.macroTargets.fatsG" as const, { valueAsNumber: true })} />
        </div>
      </div>
    </div>
  );
}
