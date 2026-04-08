"use client";
import React, { useState } from "react";
import { OnboardingFormData } from "@/features/onboarding/model/types";
import { useTranslations } from "next-intl";
import { ArrowRight, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  useWatch,
} from "react-hook-form";
import { InputOnboarding } from "@/shared/ui/inputs/input-onboarding";
import { onboardingApi } from "@/features/onboarding/model/onboarding-api";
import { handleAxiosError } from "@/shared/lib/axios-error-handler";

interface Step0Props {
  control: Control<OnboardingFormData>;
  register: UseFormRegister<OnboardingFormData>;
  errors: FieldErrors<OnboardingFormData>;
  nextStep: () => void;
  getValues: UseFormGetValues<OnboardingFormData>;
  trigger: UseFormTrigger<OnboardingFormData>;
}

export const Step0_Profile = ({
  register,
  control,
  errors,
  nextStep,
  getValues,
  trigger,
}: Step0Props) => {
  const t = useTranslations("OnBoardingPage");
  const [error, setError] = useState<string>("");

  const unitSystem = useWatch({ control, name: "unitSystem" });
  const isPublic = useWatch({ control, name: "isPublic" });

  const handleContinue = async () => {
    try {
      setError("");
      const isValid = await trigger(["name", "username", "bio"]);
      if (!isValid) return;

      await onboardingApi.firstStep({
        fullname: getValues("name"),
        username: getValues("username"),
        bio: getValues("bio"),
        unitSystem: unitSystem,
        isPublic: isPublic,
      });

      nextStep();
    } catch (error) {
      const errorMessage = handleAxiosError(error, t("onboardingError"));
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center pb-1">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-(--color-bg-secondary) border border-(--color-border) rounded-2xl text-3xl mb-4 shadow-sm">
          👋
        </div>
        <h2 className="text-xl font-bold text-(--color-text-primary) tracking-tight">
          {t("step0.title")}
        </h2>
        <p className="text-sm text-(--description-text-color) mt-1.5 leading-relaxed">
          {t("step0.subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-1 w-full mt-4">
        <InputOnboarding
          label={t("step0.nameLabel")}
          placeholder="John Doe"
          register={register("name")}
          errorType="name"
          errors={errors}
          control={control}
        />

        <InputOnboarding
          label={t("step0.usernameLabel")}
          placeholder="johndoe123"
          register={register("username")}
          errorType="username"
          errors={errors}
          control={control}
        />

        <InputOnboarding
          label={t("step0.bioLabel")}
          placeholder="Tell us a little about yourself"
          register={register("bio")}
          errorType="bio"
          errors={errors}
          isTextArea
          control={control}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-(--color-text-primary) uppercase tracking-wider">
          {t("step0.unitSystemLabel") || "Unit System"}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "METRIC", label: "Metric (kg, cm)" },
            { value: "IMPERIAL", label: "Imperial (lbs, ft)" },
          ].map((option) => (
            <label
              key={option.value}
              className={`
                relative flex items-center justify-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer
                transition-all duration-200 group text-sm font-semibold
                ${
                  unitSystem === option.value
                    ? "border-(--color-primary) bg-primary/5 text-(--color-primary) shadow-[0_0_0_4px_rgba(0,122,255,0.08)]"
                    : "border-(--color-border) bg-(--color-bg-secondary) text-(--description-text-color) hover:border-primary/50"
                }
              `}
            >
              <input
                type="radio"
                value={option.value}
                {...register("unitSystem")}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 mb-2">
        <label className="text-xs font-semibold text-(--color-text-primary) uppercase tracking-wider">
          {t("step0.privacyLabel") || "Profile Privacy"}
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              {...register("isPublic")}
              className="sr-only"
            />
            <div
              className={`block w-14 h-8 rounded-full transition-colors ${isPublic ? "bg-(--color-primary)" : "bg-(--color-bg-secondary) border border-(--color-border)"}`}
            ></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isPublic ? "transform translate-x-6" : ""}`}
            ></div>
          </div>
          <div className="text-sm">
            <div className="font-medium text-(--color-text-primary)">
              {isPublic ? "Public Profile" : "Private Profile"}
            </div>
            <div className="text-xs text-(--description-text-color)">
              {isPublic
                ? "Visible to the Liftly community"
                : "Only visible to you"}
            </div>
          </div>
        </label>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 shadow-sm"
          >
            <AlertCircle size={18} className="shrink-0" />
            <p className="text-sm font-medium leading-none">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={handleContinue}
        className="w-full cursor-pointer flex items-center justify-center gap-2 py-3.5 px-6 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm"
      >
        {t("nextButton")}
        <ArrowRight size={18} />
      </button>
    </div>
  );
};
