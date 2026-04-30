import { z } from "zod";

export const createOnboardingSchema = () =>
  z.object({
    name: z.string().min(3, { message: "nameRequired" }),
    username: z.string().min(3, { message: "usernameRequired" }),
    bio: z
      .string()
      .max(160, { message: "bioMaxLength" })
      .optional()
      .or(z.literal("")),
    unitSystem: z.enum(["METRIC", "IMPERIAL"], {
      message: "unitSystemRequired",
    }),
    isPublic: z.boolean({ message: "isPublicRequired" }),
    locale: z.string(),
    timezone: z.string(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      message: "genderRequired",
    }),
    birthDate: z
      .number()
      .min(1, { message: "birthDateRequired" })
      .max(new Date().getFullYear() - 14, { message: "birthDateMinAge" }),
    height: z
      .number({ message: "heightRequired" })
      .min(10, { message: "heightRequired" })
      .max(300, { message: "heightRequired" }),
    weight: z
      .number({ message: "weightRequired" })
      .min(10, { message: "weightRequired" })
      .max(400, { message: "weightRequired" }),
    goal: z.object({
      type: z.enum(
        [
          "STRENGTH",
          "HYPERTROPHY",
          "POWERLIFTING",
          "ENDURANCE",
          "FAT_LOSS",
          "GENERAL_FITNESS",
          "ATHLETIC_PERFORMANCE",
          "REHABILITATION",
        ],
        {
          message: "goalTypeRequired",
        },
      ),
      targetWeight: z
        .number({ message: "goalTargetWeightRequired" })
        .min(20, { message: "goalTargetWeightRequired" })
        .max(300, { message: "goalTargetWeightRequired" }),
      targetDate: z.string().min(1, { message: "goalTargetDateRequired" }),
    }),
    fitnessProfile: z.object({
      level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"], {
        message: "fitnessLevelRequired",
      }),
      experienceMonths: z
        .number({ message: "experienceMonthsRequired" })
        .min(0, { message: "experienceMonthsRequired" }),
      activityLevel: z
        .number({ message: "activityLevelRequired" })
        .min(1, { message: "activityLevelRequired" })
        .max(10, { message: "activityLevelRequired" }),
    }),
    // limitations: z.array(
    //   z.object({
    //     type: z.enum(["INJURY", "MEDICAL_CONDITION", "OTHER"], {
    //       message: "limitationsRequired",
    //     }),
    //     description: z.string().min(1, { message: "limitationsRequired" }),
    //   }),
    // ),
  });
