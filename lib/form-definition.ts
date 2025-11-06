import { SubmissionInput } from "./zodSchemas";

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "tel"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "multiselect"
  | "time"
  | "boolean";

export interface FieldConfig {
  name: keyof FlattenSubmission;
  type: FieldType;
  translationKey: string;
  helperKey?: string;
  optionsKey?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface SectionConfig {
  id: string;
  translationKey: string;
  fields: FieldConfig[];
}

type FlattenSubmission = SubmissionInput extends infer T
  ? {
      [K in keyof T]: T[K] extends Record<string, any>
        ? `${Extract<K, string>}.${keyof T[K] & string}`
        : Extract<K, string>;
    }[keyof T]
  : never;

export const formSections: SectionConfig[] = [
  {
    id: "s1",
    translationKey: "sections.s1",
    fields: [
      { name: "personal.fullName", translationKey: "fields.fullName", type: "text", required: true },
      { name: "personal.preferredName", translationKey: "fields.preferredName", type: "text" },
      { name: "personal.email", translationKey: "fields.email", type: "email", required: true },
      { name: "personal.phone", translationKey: "fields.phone", type: "tel" },
      { name: "personal.dobBracket", translationKey: "fields.dobBracket", type: "select", required: true },
      { name: "personal.genderIdentity", translationKey: "fields.genderIdentity", type: "text" },
      { name: "personal.pronouns", translationKey: "fields.pronouns", type: "text" },
      { name: "personal.occupation", translationKey: "fields.occupation", type: "text" },
      { name: "personal.workSchedule", translationKey: "fields.workSchedule", type: "select" },
      { name: "personal.country", translationKey: "fields.country", type: "text", required: true },
      { name: "personal.city", translationKey: "fields.city", type: "text", required: true },
      { name: "personal.timeZone", translationKey: "fields.timeZone", type: "text", required: true, helperKey: "helperTexts.timeZone" },
      { name: "personal.household", translationKey: "fields.household", type: "textarea" },
      { name: "personal.lifestyleNotes", translationKey: "fields.lifestyleNotes", type: "textarea" }
    ]
  },
  {
    id: "s2",
    translationKey: "sections.s2",
    fields: [
      { name: "lifestyle.wakeTime", translationKey: "fields.wakeTime", type: "time" },
      { name: "lifestyle.bedTime", translationKey: "fields.bedTime", type: "time" },
      { name: "lifestyle.sleepHours", translationKey: "fields.sleepHours", type: "number", required: true, min: 0, max: 16, helperKey: "helperTexts.sleepHours" },
      { name: "lifestyle.sleepQuality", translationKey: "fields.sleepQuality", type: "textarea" },
      { name: "lifestyle.workActivity", translationKey: "fields.workActivity", type: "select" },
      { name: "lifestyle.stressLevel", translationKey: "fields.stressLevel", type: "select" },
      { name: "lifestyle.stressSources", translationKey: "fields.stressSources", type: "textarea" },
      { name: "lifestyle.relaxation", translationKey: "fields.relaxation", type: "textarea" }
    ]
  },
  {
    id: "s3",
    translationKey: "sections.s3",
    fields: [
      { name: "training.trainingFrequency", translationKey: "fields.trainingFrequency", type: "number", min: 0, max: 21 },
      { name: "training.trainingTypes", translationKey: "fields.trainingTypes", type: "multiselect" },
      { name: "training.stepsPerDay", translationKey: "fields.stepsPerDay", type: "number" },
      { name: "training.activeMinutes", translationKey: "fields.activeMinutes", type: "number" },
      { name: "training.injuries", translationKey: "fields.injuries", type: "textarea" },
      { name: "training.sportGoals", translationKey: "fields.sportGoals", type: "textarea" }
    ]
  },
  {
    id: "s4",
    translationKey: "sections.s4",
    fields: [
      { name: "nutrition.mealsPerDay", translationKey: "fields.mealsPerDay", type: "number" },
      { name: "nutrition.snacksPerDay", translationKey: "fields.snacksPerDay", type: "number" },
      { name: "nutrition.mealTiming", translationKey: "fields.mealTiming", type: "textarea" },
      { name: "nutrition.hydration", translationKey: "fields.hydration", type: "textarea", helperKey: "helperTexts.hydration" },
      { name: "nutrition.caffeine", translationKey: "fields.caffeine", type: "textarea" },
      { name: "nutrition.alcohol", translationKey: "fields.alcohol", type: "textarea" },
      { name: "nutrition.digestion", translationKey: "fields.digestion", type: "textarea" },
      { name: "nutrition.cravings", translationKey: "fields.cravings", type: "textarea" }
    ]
  },
  {
    id: "s5",
    translationKey: "sections.s5",
    fields: [
      { name: "nutrition.foodAllergies", translationKey: "fields.foodAllergies", type: "boolean", required: true },
      { name: "nutrition.allergyItems", translationKey: "fields.allergyItems", type: "textarea", helperKey: "helperTexts.allergy" },
      { name: "nutrition.proteinSources", translationKey: "fields.proteinSources", type: "multiselect", required: true },
      { name: "nutrition.carbSources", translationKey: "fields.carbSources", type: "multiselect", required: true },
      { name: "nutrition.fatSources", translationKey: "fields.fatSources", type: "multiselect", required: true },
      { name: "nutrition.macroPreference", translationKey: "fields.macroPreference", type: "select", required: true },
      { name: "nutrition.supplements", translationKey: "fields.supplements", type: "textarea" }
    ]
  },
  {
    id: "s6",
    translationKey: "sections.s6",
    fields: [
      { name: "health.medicalConditions", translationKey: "fields.medicalConditions", type: "textarea" },
      { name: "health.medications", translationKey: "fields.medications", type: "textarea" },
      { name: "health.digestiveConditions", translationKey: "fields.digestiveConditions", type: "textarea" },
      { name: "health.sleepConditions", translationKey: "fields.sleepConditions", type: "textarea" },
      { name: "health.injuryHistory", translationKey: "fields.injuryHistory", type: "textarea" },
      { name: "health.familyHistory", translationKey: "fields.familyHistory", type: "textarea" },
      { name: "health.labTesting", translationKey: "fields.labTesting", type: "textarea" }
    ]
  },
  {
    id: "s7",
    translationKey: "sections.s7",
    fields: [
      { name: "goals.goals", translationKey: "fields.goals", type: "multiselect", required: true },
      { name: "goals.secondaryGoals", translationKey: "fields.secondaryGoals", type: "multiselect" },
      { name: "goals.timeline", translationKey: "fields.timeline", type: "select" },
      { name: "goals.progressMeasures", translationKey: "fields.progressMeasures", type: "textarea" },
      { name: "goals.pastAttempts", translationKey: "fields.pastAttempts", type: "textarea" }
    ]
  },
  {
    id: "s8",
    translationKey: "sections.s8",
    fields: [
      { name: "motivation.biggestMotivation", translationKey: "fields.biggestMotivation", type: "textarea" },
      { name: "motivation.biggestChallenges", translationKey: "fields.biggestChallenges", type: "textarea" },
      { name: "motivation.supportSystem", translationKey: "fields.supportSystem", type: "textarea" }
    ]
  },
  {
    id: "s9",
    translationKey: "sections.s9",
    fields: [
      { name: "preferences.coachingStyle", translationKey: "fields.coachingStyle", type: "textarea" },
      { name: "preferences.mealPrep", translationKey: "fields.mealPrep", type: "textarea" },
      { name: "preferences.recipePreferences", translationKey: "fields.recipePreferences", type: "textarea" },
      { name: "preferences.budget", translationKey: "fields.budget", type: "textarea" },
      { name: "preferences.checkInFrequency", translationKey: "fields.checkInFrequency", type: "select" },
      { name: "preferences.communication", translationKey: "fields.communication", type: "select" }
    ]
  },
  {
    id: "s10",
    translationKey: "sections.s10",
    fields: [
      { name: "notes.additionalNotes", translationKey: "fields.additionalNotes", type: "textarea" },
      { name: "consent", translationKey: "fields.consent", type: "boolean", required: true }
    ]
  }
];
