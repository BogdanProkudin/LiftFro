export type OnboardingFormData = {
  name: string;
  username: string;
  bio?: string;
  unitSystem: "METRIC" | "IMPERIAL";
  isPublic: boolean;
  locale: string;
  timezone: string;

  gender: "MALE" | "FEMALE" | "OTHER";
  birthDate: number;
  height: number;
  weight: number;

  goal: {
    type:
      | "STRENGTH"
      | "HYPERTROPHY"
      | "POWERLIFTING"
      | "ENDURANCE"
      | "FAT_LOSS"
      | "GENERAL_FITNESS"
      | "ATHLETIC_PERFORMANCE"
      | "REHABILITATION";
    targetWeight: number;
    targetDate: string;
  };

  fitnessProfile: {
    level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
    experienceMonths: number;
    activityLevel: number;
  };
};
export type OnboardingData = {
  name: string;
  username: string;
  bio?: string;
  unitSystem: "METRIC" | "IMPERIAL";
  isPublic: boolean;
  locale: string;
  timezone: string;

  gender: "MALE" | "FEMALE" | "OTHER";
  birthDate: string;
  height: number;
  weight: number;

  goal: {
    type:
      | "STRENGTH"
      | "HYPERTROPHY"
      | "POWERLIFTING"
      | "ENDURANCE"
      | "FAT_LOSS"
      | "GENERAL_FITNESS"
      | "ATHLETIC_PERFORMANCE"
      | "REHABILITATION";
    targetWeight: number;
    targetDate: string;
  };

  fitnessProfile: {
    level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
    experienceMonths: number;
    activityLevel: number;
  };
};
export type FirstStepData = {
  fullname: string;
  username: string;
  bio?: string;
  unitSystem: "METRIC" | "IMPERIAL";
  isPublic: boolean;
};
