import { z } from "zod";

export const AnthropometricSchema = z.object({
  value: z
    .number({ invalid_type_error: "Value must be a number" })
    .min(0, "Value is required"),
  unit: z.enum(["kg", "lb", "cm", "in"])
});

const heightSchema = z.object({
  value: z.number().min(120).max(230),
  unit: z.enum(["cm", "in"])
});

const weightSchema = z.object({
  value: z.number().min(25).max(400),
  unit: z.enum(["kg", "lb"])
});

export const SubmissionSchema = z.object({
  locale: z.enum(["en", "fr", "ar"]),
  startedAt: z.number(),
  consent: z.boolean().refine((value) => value === true, { message: "validation.consent" }),
  honeypot: z.string().max(0, { message: "validation.honeypot" }).optional(),
  settings: z.object({
    units: z.enum(["metric", "imperial"]).default("metric")
  }),
  personal: z.object({
    fullName: z.string().min(2, "validation.required"),
    preferredName: z.string().optional(),
    email: z.string().email("validation.email"),
    phone: z.string().optional(),
    dobBracket: z.enum(["<18", "18-25", "26-35", "36-45", "46-55", "56+"]),
    genderIdentity: z.string().optional(),
    pronouns: z.string().optional(),
    occupation: z.string().optional(),
    workSchedule: z.string().optional(),
    country: z.string().min(2, "validation.required"),
    city: z.string().min(1, "validation.required"),
    timeZone: z.string().min(1, "validation.required"),
    height: heightSchema,
    weight: weightSchema,
    goalWeight: weightSchema.optional(),
    household: z.string().optional(),
    lifestyleNotes: z.string().optional()
  }),
  lifestyle: z.object({
    wakeTime: z.string().optional(),
    bedTime: z.string().optional(),
    sleepHours: z
      .number({ invalid_type_error: "validation.range" })
      .min(0, "validation.range")
      .max(16, "validation.range"),
    sleepQuality: z.string().optional(),
    workActivity: z.string().optional(),
    stressLevel: z.string().optional(),
    stressSources: z.string().optional(),
    relaxation: z.string().optional()
  }),
  training: z.object({
    trainingFrequency: z.number().min(0).max(21).optional(),
    trainingTypes: z.array(z.string()).optional(),
    stepsPerDay: z.number().min(0).max(50000).optional(),
    activeMinutes: z.number().min(0).max(5000).optional(),
    injuries: z.string().optional(),
    sportGoals: z.string().optional()
  }),
  nutrition: z.object({
    mealsPerDay: z.number().min(1).max(10).optional(),
    snacksPerDay: z.number().min(0).max(10).optional(),
    mealTiming: z.string().optional(),
    hydration: z.string().optional(),
    caffeine: z.string().optional(),
    alcohol: z.string().optional(),
    digestion: z.string().optional(),
    cravings: z.string().optional(),
    foodAllergies: z.boolean(),
    allergyItems: z.array(z.string()).optional(),
    proteinSources: z.array(z.string()).min(1, "validation.required"),
    carbSources: z.array(z.string()).min(1, "validation.required"),
    fatSources: z.array(z.string()).min(1, "validation.required"),
    macroPreference: z.enum(["highProtein", "balanced", "lowCarb", "moderateFat", "performance", "unsure"]),
    macroTargets: z
      .object({
        proteinG: z.number().min(10).max(600).optional(),
        carbsG: z.number().min(10).max(600).optional(),
        fatsG: z.number().min(10).max(600).optional()
      })
      .refine(
        (value) => {
          const filled = [value.proteinG, value.carbsG, value.fatsG].filter(Boolean).length;
          return filled === 0 || filled === 3;
        },
        {
          message: "validation.macroAllOrNone"
        }
      ),
    supplements: z.string().optional()
  }).superRefine((value, ctx) => {
    if (value.foodAllergies && (!value.allergyItems || value.allergyItems.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["allergyItems"],
        message: "validation.allergyItems"
      });
    }
  }),
  health: z.object({
    medicalConditions: z.string().optional(),
    medications: z.string().optional(),
    digestiveConditions: z.string().optional(),
    sleepConditions: z.string().optional(),
    injuryHistory: z.string().optional(),
    familyHistory: z.string().optional(),
    labTesting: z.string().optional()
  }),
  goals: z.object({
    goals: z.array(z.string()).min(1, "validation.atLeastOneGoal"),
    secondaryGoals: z.array(z.string()).optional(),
    timeline: z.string().optional(),
    progressMeasures: z.string().optional(),
    pastAttempts: z.string().optional()
  }),
  motivation: z.object({
    biggestMotivation: z.string().optional(),
    biggestChallenges: z.string().optional(),
    supportSystem: z.string().optional()
  }),
  preferences: z.object({
    coachingStyle: z.string().optional(),
    mealPrep: z.string().optional(),
    recipePreferences: z.string().optional(),
    budget: z.string().optional(),
    checkInFrequency: z.string().optional(),
    communication: z.string().optional()
  }),
  notes: z.object({
    additionalNotes: z.string().optional()
  })
});

export type SubmissionInput = z.infer<typeof SubmissionSchema>;

export const DraftSchema = SubmissionSchema.deepPartial().extend({
  locale: SubmissionSchema.shape.locale.optional(),
  consent: z.boolean().optional(),
  startedAt: z.number().optional()
});

export type DraftInput = z.infer<typeof DraftSchema>;
