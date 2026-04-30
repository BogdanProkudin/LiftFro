"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hook";
import { verifyRegistration } from "@/features/auth/model/auth-slice";
import { Status } from "@/shared/types/status";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const VerifyToken = () => {
  const t = useTranslations("VerifyTokenPage");
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    t("loading_step1"),
    t("loading_step2"),
    t("loading_step3"),
    t("loading"),
  ];

  useEffect(() => {
    if (status === Status.LOADING) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [status, loadingMessages.length]);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      dispatch(verifyRegistration({ token }));
    } else {
      router.replace("/error");
    }
  }, [dispatch, searchParams, router]);

  useEffect(() => {
    if (status === Status.FAILED) {
      router.replace("/error");
    }
  }, [status, router]);

  const handleContinue = () => {
    setIsRedirecting(true);
    router.push("/onboarding");
  };

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {status === Status.LOADING && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center space-y-8 text-center"
          >
            <div className="relative">
              <motion.div
                className="h-24 w-24 rounded-full border-4 border-[#007aff]/10"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Loader2 className="absolute inset-0 h-24 w-24 animate-spin text-[#007aff]" />
            </div>

            <div className="h-20 flex flex-col items-center justify-center space-y-3">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={loadingStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl font-bold text-white tracking-tight"
                >
                  {loadingMessages[loadingStep]}
                </motion.h2>
              </AnimatePresence>
              <motion.div className="h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-linear-to-r from-[#007aff] to-cyan-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {status === Status.SUCCEEDED && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-md"
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-8 ring-emerald-500/5"
              >
                <CheckCircle2 size={40} />
              </motion.div>
            </div>

            <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
              {t("successTitle")}
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-(--color-text-secondary)">
              {t("successDescription")}
            </p>

            <motion.button
              onClick={handleContinue}
              disabled={isRedirecting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`
                group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-[15px] font-bold text-white transition-all duration-300
                ${
                  isRedirecting
                    ? "cursor-not-allowed bg-white/10 opacity-50 shadow-none"
                    : "cursor-pointer bg-linear-to-r from-[#007aff] via-[#4da3ff] to-cyan-400 shadow-[0_4px_10px_rgba(0,122,255,0.2)] hover:shadow-[0_8px_25px_rgba(0,122,255,0.35)]"
                }
              `}
            >
              <span className="relative z-10">
                {isRedirecting ? t("loading") : t("continue")}
              </span>
              {!isRedirecting && (
                <ArrowRight
                  size={18}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
              {!isRedirecting && (
                <div className="absolute inset-0 z-0 translate-y-full bg-linear-to-r from-cyan-400 via-[#4da3ff] to-[#007aff] transition-transform duration-500 group-hover:translate-y-0" />
              )}
              {isRedirecting && (
                <Loader2 className="relative z-10 h-5 w-5 animate-spin" />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerifyToken;
