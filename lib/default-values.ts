import { SubmissionInput } from "./zodSchemas";

export const createDefaultValues = (locale: SubmissionInput["locale"]): SubmissionInput => ({
  locale,
  startedAt: Date.now(),
  consent: false,
  honeypot: "",
  settings: {
    units: "metric"
  },
  personal: {
    fullName: "",
    preferredName: "",
    email: "",
    phone: "",
    dobBracket: "26-35",
    genderIdentity: "",
    pronouns: "",
    occupation: "",
    workSchedule: "",
    country: "",
    city: "",
    timeZone: "",
    height: { value: 170, unit: "cm" },
    weight: { value: 70, unit: "kg" },
    goalWeight: { value: 70, unit: "kg" },
    household: "",
    lifestyleNotes: ""
  },
  lifestyle: {
    wakeTime: "",
    bedTime: "",
    sleepHours: 7,
    sleepQuality: "",
    workActivity: "",
    stressLevel: "",
    stressSources: "",
    relaxation: ""
  },
  training: {
    trainingFrequency: 0,
    trainingTypes: [],
    stepsPerDay: 0,
    activeMinutes: 0,
    injuries: "",
    sportGoals: ""
  },
  nutrition: {
    mealsPerDay: 3,
    snacksPerDay: 1,
    mealTiming: "",
    hydration: "",
    caffeine: "",
    alcohol: "",
    digestion: "",
    cravings: "",
    foodAllergies: false,
    allergyItems: [],
    proteinSources: [],
    carbSources: [],
    fatSources: [],
    macroPreference: "balanced",
    macroTargets: {},
    supplements: ""
  },
  health: {
    medicalConditions: "",
    medications: "",
    digestiveConditions: "",
    sleepConditions: "",
    injuryHistory: "",
    familyHistory: "",
    labTesting: ""
  },
  goals: {
    goals: [],
    secondaryGoals: [],
    timeline: "",
    progressMeasures: "",
    pastAttempts: ""
  },
  motivation: {
    biggestMotivation: "",
    biggestChallenges: "",
    supportSystem: ""
  },
  preferences: {
    coachingStyle: "",
    mealPrep: "",
    recipePreferences: "",
    budget: "",
    checkInFrequency: "",
    communication: ""
  },
  notes: {
    additionalNotes: ""
  }
});
