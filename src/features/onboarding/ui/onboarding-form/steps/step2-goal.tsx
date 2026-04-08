import React from "react";

import { OnboardingFormData } from "@/features/onboarding/model/types";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import DropdownInput from "@/shared/ui/inputs/dropdown-onboarding";
import { DateInput } from "@/shared/ui/inputs/input-onboarding-date";

interface Step2Props {
  control: Control<OnboardingFormData>;
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  nextStep: () => void;
  prevStep: () => void;
}

export const Step2_Goal = ({
  register,
  control,
  errors,
  nextStep,
  prevStep,
}: Step2Props) => {
  const t = useTranslations("OnBoardingPage");

  const goalType = useWatch({ control, name: "goal.type" });
  const unitSystem = useWatch({ control, name: "unitSystem" });
  const isImperial = unitSystem === "IMPERIAL";
  const goals = [
    {
      value: "STRENGTH",
      icon: "🏋️",
      title: t("step2.optionsGoal.strength"),
      description: t("step2.optionsGoal.strengthDescription"),
      activeGradient: "from-red-500/20 to-orange-500/20",
      activeBorder: "border-red-500",
      activeText: "text-red-400",
      iconBg: "bg-gradient-to-br from-red-500 to-orange-500",
    },
    {
      value: "HYPERTROPHY",
      icon: "💪",
      title: t("step2.optionsGoal.hypertrophy"),
      description: t("step2.optionsGoal.hypertrophyDescription"),
      activeGradient: "from-blue-500/20 to-purple-500/20",
      activeBorder: "border-[var(--color-primary)]",
      activeText: "text-[var(--color-primary)]",
      iconBg: "bg-gradient-to-br from-[var(--color-primary)] to-purple-500",
    },
    {
      value: "POWERLIFTING",
      icon: "🔩",
      title: t("step2.optionsGoal.powerlifting"),
      description: t("step2.optionsGoal.powerliftingDescription"),
      activeGradient: "from-slate-500/20 to-zinc-500/20",
      activeBorder: "border-slate-400",
      activeText: "text-slate-300",
      iconBg: "bg-gradient-to-br from-slate-500 to-zinc-600",
    },
    {
      value: "ENDURANCE",
      icon: "🏃",
      title: t("step2.optionsGoal.endurance"),
      description: t("step2.optionsGoal.enduranceDescription"),
      activeGradient: "from-cyan-500/20 to-blue-500/20",
      activeBorder: "border-cyan-500",
      activeText: "text-cyan-400",
      iconBg: "bg-gradient-to-br from-cyan-500 to-blue-500",
    },
    {
      value: "FAT_LOSS",
      icon: "🔥",
      title: t("step2.optionsGoal.fatLoss"),
      description: t("step2.optionsGoal.fatLossDescription"),
      activeGradient: "from-orange-500/20 to-red-500/20",
      activeBorder: "border-orange-500",
      activeText: "text-orange-400",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    },
    {
      value: "GENERAL_FITNESS",
      icon: "🎯",
      title: t("step2.optionsGoal.generalFitness"),
      description: t("step2.optionsGoal.generalFitnessDescription"),
      activeGradient: "from-emerald-500/20 to-teal-500/20",
      activeBorder: "border-emerald-500",
      activeText: "text-emerald-400",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    },
    {
      value: "ATHLETIC_PERFORMANCE",
      icon: "⚡",
      title: t("step2.optionsGoal.athleticPerformance"),
      description: t("step2.optionsGoal.athleticPerformanceDescription"),
      activeGradient: "from-yellow-500/20 to-amber-500/20",
      activeBorder: "border-yellow-500",
      activeText: "text-yellow-400",
      iconBg: "bg-gradient-to-br from-yellow-500 to-amber-500",
    },
    {
      value: "REHABILITATION",
      icon: "🩹",
      title: t("step2.optionsGoal.rehabilitation"),
      description: t("step2.optionsGoal.rehabilitationDescription"),
      activeGradient: "from-pink-500/20 to-rose-500/20",
      activeBorder: "border-pink-500",
      activeText: "text-pink-400",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center pb-1">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-(--color-bg-secondary) border border-(--color-border) rounded-2xl text-3xl mb-4 shadow-sm">
          🎯
        </div>
        <h2 className="text-xl font-bold text-(--color-text-primary) tracking-tight">
          {t("step2.title")}
        </h2>
        <p className="text-sm text-(--description-text-color) mt-1.5 leading-relaxed">
          {t("step2.subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-(--color-text-primary) uppercase tracking-wider">
          {t("step2.labelGoal")}
        </label>
        <div className="flex flex-col gap-2.5 max-h-[230px] overflow-y-auto custom-scrollbar pr-1">
          {goals.map((goal) => {
            const isActive = goalType === goal.value;
            return (
              <label
                key={goal.value}
                className={`
                  relative flex items-center gap-3.5 min-h-[70px] p-4 rounded-xl border-2 cursor-pointer
                  transition-all duration-200 overflow-hidden
                  ${
                    isActive
                      ? `${goal.activeBorder} bg-gradient-to-br ${goal.activeGradient} shadow-[0_0_0_4px_rgba(0,122,255,0.06)]`
                      : errors.goal?.type
                        ? "border-red-500/50 bg-(--color-bg-secondary)"
                        : "border-(--color-border) bg-(--color-bg-secondary) hover:border-primary/40"
                  }
                `}
              >
                <input
                  type="radio"
                  value={goal.value}
                  {...register("goal.type")}
                  className="sr-only"
                />

                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
                )}

                <div
                  className={`
                  flex items-center justify-center w-10 h-10 rounded-xl text-xl flex-shrink-0
                  transition-all duration-200 shadow-sm
                  ${isActive ? `${goal.iconBg} shadow-lg` : "bg-(--color-bg) border border-(--color-border)"}
                `}
                >
                  {goal.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold transition-colors duration-200 ${isActive ? goal.activeText : "text-(--color-text-primary)"}`}
                  >
                    {goal.title}
                  </p>
                  <p className="text-xs text-(--description-text-color) mt-0.5 leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                <div
                  className={`
                  w-4.5 h-4.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                  transition-all duration-200
                  ${isActive ? `${goal.activeBorder.replace("border-", "border-")} bg-current` : "border-(--color-border)"}
                `}
                  style={{ width: 18, height: 18 }}
                >
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <DropdownInput
        label={isImperial ? t("step2.labelTargetWeightLbs") : t("step2.labelTargetWeight")}
        register={register("goal.targetWeight")}
        error={errors.goal?.targetWeight?.message as string | undefined}
        icon="🎯"
        min={30}
        max={200}
        step={1}
        suffix={isImperial ? "lbs" : "kg"}
        placeholder={isImperial ? "176" : "80"}
        control={control}
      />

      <DateInput
        label={t("step2.labelTargetDate")}
        name="goal.targetDate"
        control={control}
        icon="📅"
        type="fromToday"
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
        <button
          type="button"
          onClick={nextStep}
          className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-3.5 px-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm"
        >
          {t("nextButton")}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
