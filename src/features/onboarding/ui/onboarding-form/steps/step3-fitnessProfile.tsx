import React from "react";

import { OnboardingFormData } from "@/features/onboarding/model/types";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import ButtonApply from "@/shared/ui/buttons/button-apply";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import DropdownInput from "@/shared/ui/inputs/dropdown-onboarding";

interface Step3Props {
  control: Control<OnboardingFormData>;
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  nextStep: () => void;
  prevStep: () => void;
  isLoading: boolean;
}

export const Step3_FitnessProfile = ({
  register,
  control,
  errors,
  nextStep,
  prevStep,
  isLoading,
}: Step3Props) => {
  const t = useTranslations("OnBoardingPage");
  const levelProfile = useWatch({
    control,
    name: "fitnessProfile.level",
  });
  const fitnessLevels = [
    {
      value: "BEGINNER",
      icon: "🌱",
      title: t("step3.optionsFitnessLevel.beginner"),
      description: t("step3.optionsFitnessLevel.beginnerDescription"),
      activeBorder: "border-emerald-500",
      activeGradient: "from-emerald-500/15 to-teal-500/10",
      activeText: "text-emerald-400",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    },
    {
      value: "INTERMEDIATE",
      icon: "💫",
      title: t("step3.optionsFitnessLevel.intermediate"),
      description: t("step3.optionsFitnessLevel.intermediateDescription"),
      activeBorder: "border-[var(--color-primary)]",
      activeGradient: "from-blue-500/15 to-purple-500/10",
      activeText: "text-[var(--color-primary)]",
      iconBg: "bg-gradient-to-br from-[var(--color-primary)] to-purple-500",
    },
    {
      value: "ADVANCED",
      icon: "⭐",
      title: t("step3.optionsFitnessLevel.advanced"),
      description: t("step3.optionsFitnessLevel.advancedDescription"),
      activeBorder: "border-orange-500",
      activeGradient: "from-orange-500/15 to-red-500/10",
      activeText: "text-orange-400",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    },
    {
      value: "EXPERT",
      icon: "🏆",
      title: t("step3.optionsFitnessLevel.expert"),
      description: t("step3.optionsFitnessLevel.expertDescription"),
      activeBorder: "border-red-500",
      activeGradient: "from-red-500/15 to-rose-500/10",
      activeText: "text-red-400",
      iconBg: "bg-gradient-to-br from-red-500 to-rose-500",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center pb-1">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-(--color-bg-secondary) border border-(--color-border) rounded-2xl text-3xl mb-4 shadow-sm">
          💪
        </div>
        <h2 className="text-xl font-bold text-(--color-text-primary) tracking-tight">
          {t("step3.title")}
        </h2>
        <p className="text-sm text-(--description-text-color) mt-1.5 leading-relaxed">
          {t("step3.subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-(--color-text-primary) uppercase tracking-wider">
          {t("step3.labelFitnessLevel")}
        </label>
        <div className="flex flex-col gap-2.5">
          {fitnessLevels.map((level) => {
            const isActive = levelProfile === level.value;
            return (
              <label
                key={level.value}
                className={`
                  relative flex items-center gap-3.5 p-4 rounded-xl border-2 cursor-pointer
                  transition-all duration-200 overflow-hidden
                  ${
                    isActive
                      ? `${level.activeBorder} bg-gradient-to-br ${level.activeGradient} shadow-[0_0_0_4px_rgba(0,122,255,0.06)]`
                      : errors.fitnessProfile?.level
                        ? "border-red-500/50 bg-(--color-bg-secondary)"
                        : "border-(--color-border) bg-(--color-bg-secondary) hover:border-primary/40"
                  }
                `}
              >
                <input
                  type="radio"
                  value={level.value}
                  {...register("fitnessProfile.level")}
                  className="sr-only"
                />

                <div
                  className={`
                  flex items-center justify-center w-10 h-10 rounded-xl text-xl flex-shrink-0
                  transition-all duration-200
                  ${isActive ? `${level.iconBg} shadow-lg` : "bg-(--color-bg) border border-(--color-border)"}
                `}
                >
                  {level.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold transition-colors duration-200 ${isActive ? level.activeText : "text-(--color-text-primary)"}`}
                  >
                    {level.title}
                  </p>
                  <p className="text-xs text-(--description-text-color) mt-0.5 leading-relaxed">
                    {level.description}
                  </p>
                </div>

                <div
                  className={`flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isActive ? level.activeBorder : "border-(--color-border)"}`}
                  style={{ width: 18, height: 18 }}
                >
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  )}
                </div>
              </label>
            );
          })}
        </div>
        {errors.fitnessProfile?.level?.message && (
          <p className="text-xs text-red-500">
            {errors.fitnessProfile.level.message}
          </p>
        )}
      </div>

      <DropdownInput
        label={t("step3.labelTrainingExperience")}
        register={register("fitnessProfile.experienceMonths", {
          valueAsNumber: true,
        })}
        error={
          errors.fitnessProfile?.experienceMonths?.message as string | undefined
        }
        icon="📊"
        placeholder="0"
        suffix="months"
        min={0}
        max={64}
        control={control}
      />

      <DropdownInput
        label={`${t("step3.labelActivityLevel")} (1–5)`}
        register={register("fitnessProfile.activityLevel", {
          valueAsNumber: true,
        })}
        error={
          errors.fitnessProfile?.activityLevel?.message as string | undefined
        }
        icon="🏃"
        placeholder="3"
        suffix="/ 5"
        min={1}
        max={5}
        control={control}
      />

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center gap-2 px-5 py-3.5 bg-(--color-bg-secondary) hover:bg-(--color-bg) text-(--color-text-primary) border border-(--color-border) hover:border-primary/50 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft size={18} />
          {t("backButton")}
        </button>
        <ButtonApply
          type="submit"
          text={isLoading ? t("loadingButton") : t("completeButton")}
          rightIcon={
            isLoading ? (
              <LoaderCircle className="animate-spin" size={18} />
            ) : (
              <CircleCheck size={18} />
            )
          }
          styles="flex-1 justify-center py-3.5 px-6 font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
        />
      </div>
    </div>
  );
};
