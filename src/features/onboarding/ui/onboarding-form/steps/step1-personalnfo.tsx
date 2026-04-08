import React from "react";

import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { OnboardingFormData } from "@/features/onboarding/model/types";
import DropdownInput from "@/shared/ui/inputs/dropdown-onboarding";

interface Step1Props {
  control: Control<OnboardingFormData>;
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  prevStep: () => void;
  nextStep: () => void;
}

export const Step1_Personalnfo = ({
  register,
  control,
  errors,
  prevStep,
  nextStep,
}: Step1Props) => {
  const t = useTranslations("OnBoardingPage");

  const gender = useWatch({ control, name: "gender" });
  const unitSystem = useWatch({ control, name: "unitSystem" });
  const isImperial = unitSystem === "IMPERIAL";

  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center pb-1">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-(--color-bg-secondary) border border-(--color-border) rounded-2xl text-3xl mb-4 shadow-sm">
          👤
        </div>
        <h2 className="text-xl font-bold text-(--color-text-primary) tracking-tight">
          {t("step1.title")}
        </h2>
        <p className="text-sm text-(--description-text-color) mt-1.5 leading-relaxed">
          {t("step1.subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-(--color-text-primary) uppercase tracking-wider">
          {t("step1.labelGender")}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "MALE", icon: "♂", label: t("step1.optionsGender.male") },
            {
              value: "FEMALE",
              icon: "♀",
              label: t("step1.optionsGender.female"),
            },
          ].map((option) => (
            <label
              key={option.value}
              className={`
                relative flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 cursor-pointer
                transition-all duration-200 group
                ${
                  gender === option.value
                    ? "border-(--color-primary) bg-primary/5 shadow-[0_0_0_4px_rgba(0,122,255,0.08)]"
                    : errors.gender
                      ? "border-red-500/50 bg-(--color-bg-secondary)"
                      : "border-(--color-border) bg-(--color-bg-secondary) hover:border-primary/50"
                }
              `}
            >
              <input
                type="radio"
                value={option.value}
                {...register("gender")}
                className="sr-only"
              />
              <div
                className={`
                flex items-center justify-center w-10 h-10 rounded-xl text-2xl font-light
                transition-all duration-200
                ${
                  gender === option.value
                    ? "bg-linear-to-br from-(--color-primary) to-purple-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-(--color-bg) border border-(--color-border) text-(--description-text-color)"
                }
              `}
              >
                {option.icon}
              </div>
              <span
                className={`text-sm font-semibold transition-colors duration-200 ${gender === option.value ? "text-(--color-primary)" : "text-(--color-text-primary)"}`}
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
        {errors.gender?.message && (
          <p className="text-xs text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <DropdownInput
          label={t("step1.birthdayLabel")}
          register={register("birthDate")}
          error={errors.birthDate?.message as string | undefined}
          icon="🎂"
          min={1900}
          max={new Date().getFullYear()}
          type="birthYear"
          step={1}
          control={control}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <DropdownInput
          label={isImperial ? t("step1.heightLabelIn") : t("step1.heightLabel")}
          register={register("height")}
          error={errors.height?.message as string | undefined}
          icon="📏"
          suffix={isImperial ? "in" : "cm"}
          min={isImperial ? 39 : 100}
          max={isImperial ? 98 : 250}
          step={1}
          placeholder={isImperial ? "67" : "170"}
          control={control}
        />
        <DropdownInput
          label={isImperial ? t("step1.weightLabelLbs") : t("step1.weightLabel")}
          register={register("weight")}
          error={errors.weight?.message as string | undefined}
          icon="⚖️"
          suffix={isImperial ? "lbs" : "kg"}
          min={isImperial ? 66 : 30}
          max={isImperial ? 440 : 200}
          step={1}
          placeholder={isImperial ? "154" : "70"}
          control={control}
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center gap-2 px-5 py-3.5 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
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
