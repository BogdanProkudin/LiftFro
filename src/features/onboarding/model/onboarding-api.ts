import axiosInstance from "@/shared/config/axios-config";
import { FirstStepData, OnboardingData } from "./types";
import { AxiosResponse } from "axios";

export const onboardingApi = {
  firstStep: (
    data: FirstStepData,
  ): Promise<AxiosResponse<{ isValid: boolean }>> =>
    axiosInstance.post("/onboarding/first-step", data, {
      withCredentials: true,
    }),
  completeOnboarding: (
    data: OnboardingData,
  ): Promise<AxiosResponse<{ success: boolean }>> =>
    axiosInstance.post("/onboarding/complete", data, { withCredentials: true }),
};
