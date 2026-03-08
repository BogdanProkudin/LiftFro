"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, LifeBuoy } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease },
});

const ErrorPage = () => {
  const t = useTranslations("ErrorAuthPage");
  const router = useRouter();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .title-gradient {
          background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 45%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        /* dot grid */
        .dot-grid {
          background-image: radial-gradient(rgba(59,130,246,0.18) 1px, transparent 1px);
          background-size: 32px 32px;
        }
      `}</style>

      <div className="font-outfit relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#03040d]">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_20%,transparent_100%)]" />

        <motion.div
          animate={{ y: [0, -18, 0], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.18)_0%,transparent_65%)] blur-[2px]"
        />

        <div className="pointer-events-none absolute -bottom-32 -left-28 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.14)_0%,transparent_65%)]" />

        <div className="pointer-events-none absolute -right-24 top-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_65%)]" />

        <motion.div
          className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          animate={{ top: ["-2%", "102%"] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5,
          }}
        />

        <AnimatePresence>
          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
            <motion.div
              className="relative mb-10 flex h-[88px] w-[88px] items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.65, ease }}
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(239,68,68,0.18),rgba(239,68,68,0.04)_70%)] ring-[1.5px] ring-red-500/25" />

              {["-inset-3.5", "-inset-7"].map((inset, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${inset} rounded-full ring-1 ring-red-500/20`}
                  animate={{
                    opacity: [0.6, 0, 0.6],
                    scale: [1, 1.12 + i * 0.06, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.55,
                  }}
                />
              ))}

              <motion.svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                animate={{ rotate: [0, -5, 5, -2, 0] }}
                transition={{
                  duration: 0.5,
                  delay: 1.6,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              >
                <circle
                  cx="17"
                  cy="17"
                  r="14"
                  stroke="rgba(239,68,68,0.4)"
                  strokeWidth="1.5"
                />
                <path
                  d="M17 9.5v10"
                  stroke="#f87171"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="17" cy="23.5" r="1.5" fill="#f87171" />
              </motion.svg>
            </motion.div>

            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/8 px-4 py-1.5"
              {...fadeUp(0.22)}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-red-500"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-300/80">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              className="mb-5 leading-[0.95] font-black tracking-[-0.04em]"
              style={{ fontSize: "clamp(52px, 10vw, 108px)" }}
              {...fadeUp(0.32)}
            >
              <span className="block text-slate-50">{t("titleLine1")}</span>
              <span className="title-gradient block pb-5">
                {t("titleLine2")}
              </span>
            </motion.h1>

            <motion.p
              className="mb-12 max-w-[380px] text-base leading-[1.75] text-slate-400/75 font-light"
              {...fadeUp(0.42)}
            >
              {t("description")}
            </motion.p>

            <motion.div
              className="mb-10 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-blue-500/25 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7, ease }}
            />

            <motion.div
              className="flex flex-col items-center gap-3 sm:flex-row"
              {...fadeUp(0.54)}
            >
              <motion.button
                onClick={() => router.replace("/login")}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="flex min-w-[180px] items-center justify-center gap-2.5 rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-4 text-[13.5px] font-semibold text-white shadow-[0_4px_24px_rgba(37,99,235,0.3)] transition-shadow hover:shadow-[0_6px_32px_rgba(37,99,235,0.45)]"
              >
                <ArrowLeft size={15} />
                {t("backToLogin")}
              </motion.button>

              <motion.button
                onClick={() => router.push("/support")}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="flex min-w-[180px] items-center justify-center gap-2.5 rounded-2xl border border-white/8 bg-white/3 px-8 py-4 text-[13.5px] font-medium text-slate-400 transition-colors hover:border-blue-500/20 hover:bg-white/6 hover:text-slate-300"
              >
                <LifeBuoy size={15} />
                {t("getHelp")}
              </motion.button>
            </motion.div>

            <motion.p
              className="mt-14 text-[11px] tracking-widest text-slate-600 uppercase"
              {...fadeUp(0.72)}
            >
              {t("footerHint")}
            </motion.p>
          </div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default ErrorPage;
