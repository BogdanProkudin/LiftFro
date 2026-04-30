"use client";
import { CreateOnboardingForm } from "@/features/onboarding/ui/onboarding-form/create-onboarding-form";

export const OnboardingWidget = () => {
  return (
    <div className="w-full max-w-[600px] mx-auto relative group">
      <div className="absolute inset-0 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 bg-black/40 shadow-2xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px]" />
      </div>

      <div className="relative z-10 w-full p-6 sm:p-10 text-white">
        <CreateOnboardingForm />
      </div>
    </div>
  );
};
