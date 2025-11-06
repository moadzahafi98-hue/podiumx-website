import { SubmissionInput } from "./zodSchemas";
import { convertToMetric } from "./utils";

export function normalizeSubmission(input: SubmissionInput) {
  const heightCm = convertToMetric(input.personal.height.value, input.personal.height.unit);
  const weightKg = convertToMetric(input.personal.weight.value, input.personal.weight.unit);
  const goalWeightKg = input.personal.goalWeight
    ? convertToMetric(input.personal.goalWeight.value, input.personal.goalWeight.unit)
    : null;

  return {
    locale: input.locale,
    consent: input.consent,
    personal: {
      ...input.personal,
      height: {
        ...input.personal.height,
        valueCm: heightCm
      },
      weight: {
        ...input.personal.weight,
        valueKg: weightKg
      },
      goalWeight: input.personal.goalWeight
        ? {
            ...input.personal.goalWeight,
            valueKg: goalWeightKg
          }
        : null
    },
    lifestyle: input.lifestyle,
    training: input.training,
    nutrition: input.nutrition,
    health: input.health,
    goals: input.goals,
    motivation: input.motivation,
    preferences: input.preferences,
    notes: input.notes,
    settings: input.settings
  };
}
