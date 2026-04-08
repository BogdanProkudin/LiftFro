"use client";
import React, { useState } from "react";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";
import { Step0_Profile } from "./steps/step0-profile";
import { Step1_Personalnfo } from "./steps/step1-personalnfo";
import { Step2_Goal } from "./steps/step2-goal";
import { Step3_FitnessProfile } from "./steps/step3-fitnessProfile";

import { useLocale, useTranslations } from "next-intl";

import { AnimatePresence } from "framer-motion";

import { OnboardingFormData } from "../../model/types";
import { createOnboardingSchema } from "../../model/validation";
import { onboardingApi } from "../../model/onboarding-api";
import { setOnboardingComplete } from "../../model/server-action";
import { handleAxiosError } from "@/shared/lib/axios-error-handler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const CreateOnboardingForm = () => {
  const t = useTranslations("OnBoardingPage");
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(createOnboardingSchema()),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      unitSystem: "METRIC",
      isPublic: true,
      locale,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      gender: "MALE",
      birthDate: 0,
      height: 0,
      weight: 0,
      goal: {
        type: "STRENGTH",
        targetWeight: 0,
        targetDate: "",
      },
      fitnessProfile: {
        level: "BEGINNER",
        experienceMonths: 0,
        activityLevel: 0,
      },
      // limitations: [],
    },
  });

  const totalSteps = 4;

  const nextStep = async () => {
    let fieldsToValidate: Path<OnboardingFormData>[] = [];
    switch (step) {
      case 1:
        fieldsToValidate = ["name", "username", "unitSystem", "isPublic"];
        break;
      case 2:
        fieldsToValidate = ["gender", "birthDate", "height", "weight"];
        break;
      case 3:
        fieldsToValidate = [
          "goal.type",
          "goal.targetWeight",
          "goal.targetDate",
        ];
        break;
      case 4:
        fieldsToValidate = ["fitnessProfile"];
        break;
      // case 5:
      //   fieldsToValidate = ["limitations"];
      //   break;
    }
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
        birthDate: new Date(data.birthDate, 0, 1).toISOString(),
      };

      await onboardingApi.completeOnboarding(payload);
      await setOnboardingComplete();
      toast.success(t("onboardingSuccess"));
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    } catch (error) {
      const message = handleAxiosError(error, t("onboardingError"));
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step0_Profile
            control={control}
            register={register}
            errors={errors}
            nextStep={nextStep}
            getValues={getValues}
            trigger={trigger}
          />
        );
      case 2:
        return (
          <Step1_Personalnfo
            control={control}
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <Step2_Goal
            control={control}
            register={register}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Step3_FitnessProfile
            control={control}
            register={register}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
            isLoading={isLoading}
          />
        );
      // case 5:
      //   return (
      //     <Step5_Limitations
      //       control={control}
      //       register={register}
      //       errors={errors}
      //       prevStep={prevStep}
      //       isLoading={isLoading}
      //     />
      //   );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <div className="relative w-full h-1.5 bg-(--color-bg-secondary) rounded-full overflow-hidden mb-3 shadow-inner">
          <motion.div
            className="h-full rounded-full relative overflow-hidden bg-linear-to-r from-(--color-primary) via-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
        <p className="text-sm font-semibold text-(--color-text-secondary)">
          {t("step")} {step} {t("of")} {totalSteps}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="min-h-[600px] flex flex-col"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
};
