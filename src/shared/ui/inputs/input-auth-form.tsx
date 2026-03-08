"use client";
import React, { useRef, useState } from "react";

import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { AuthData } from "@/features/auth/model/types";

type StrengthLevel = 0 | 1 | 2 | 3 | 4;

interface StrengthResult {
  level: StrengthLevel;
  label: string;
  color: string;
  glow: string;
  width: string;
}

const getPasswordStrength = (password: string): StrengthResult => {
  if (!password)
    return { level: 0, label: "", color: "", glow: "", width: "0%" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1)
    return {
      level: 1,
      label: "weak",
      color: "from-red-500 via-red-400 to-red-500",
      glow: "rgba(239,68,68,0.4)",
      width: "25%",
    };
  if (score === 2)
    return {
      level: 2,
      label: "fair",
      color: "from-orange-500 via-amber-400 to-orange-500",
      glow: "rgba(251,146,60,0.4)",
      width: "50%",
    };
  if (score === 3 || score === 4)
    return {
      level: 3,
      label: "good",
      color: "from-emerald-500 via-green-400 to-emerald-500",
      glow: "rgba(52,211,153,0.4)",
      width: "75%",
    };
  return {
    level: 4,
    label: "strong",
    color: "from-[#007aff] via-cyan-400 to-[#007aff]",
    glow: "rgba(0,122,255,0.5)",
    width: "100%",
  };
};

const StrengthBar = ({ password }: { password: string }) => {
  const t = useTranslations("PasswordStrength");
  const strength = getPasswordStrength(password);
  const show = password.length > 0;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mt-2.5 overflow-hidden px-0.5"
        >
          <div className="relative h-[3px] w-full rounded-full bg-white/8 overflow-hidden">
            <motion.div
              className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${strength.color}`}
              initial={false}
              animate={{ width: strength.width }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              style={{
                boxShadow: `0 0 8px 1px ${strength.glow}`,
              }}
            />
          </div>

          <motion.p
            key={strength.label}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="mt-1.5 pl-0.5 text-[11px] font-medium tracking-wide"
            style={{
              color: `${strength.glow.replace("0.4", "0.9").replace("0.5", "0.95")}`,
            }}
          >
            {t(strength.label)} {t("label")}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  errors: FieldErrors<AuthData>;
  errorType: keyof AuthData;
  register: UseFormRegisterReturn;
  style: string;
};

export const InputForm = ({
  label,
  type,
  placeholder,
  errors,
  register,
  errorType,
  style,
}: InputProps) => {
  const t = useTranslations("ValidationMessages");
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputType =
    type === "password" ? (isVisible ? "text" : "password") : type;
  const isFloating = isFocused || hasValue;
  const isError = Boolean(errors[errorType]);

  const errorMessage = errors[errorType]?.message;
  const errorT = errorMessage ? t(String(errorMessage)) : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    if (type === "password") setPasswordValue(e.target.value);
    register?.onChange?.(e);
  };

  return (
    <div className="relative w-full mb-5">
      <div className="relative">
        <motion.div
          initial={false}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`pointer-events-none absolute inset-0 rounded-xl ${
            isError
              ? "shadow-[0_0_20px_4px_rgba(239,68,68,0.15)]"
              : "shadow-[0_0_20px_4px_rgba(0,122,255,0.2)]"
          }`}
        />

        <motion.label
          onClick={() => inputRef.current?.focus()}
          animate={
            isFloating
              ? { top: "8px", scale: 0.85, x: 0 }
              : { top: "50%", scale: 1, x: 0 }
          }
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className={`absolute left-3.5 origin-left cursor-text select-none text-sm font-medium leading-none -translate-y-1/2 z-10 transition-colors duration-200 ${
            isError
              ? "text-red-400"
              : isFocused
                ? "text-[#007aff]"
                : "text-gray-400"
          }`}
        >
          {label}
        </motion.label>

        <input
          ref={(el) => {
            inputRef.current = el;
            if (typeof register?.ref === "function") register.ref(el);
          }}
          name={register?.name}
          type={inputType}
          placeholder={isFocused ? placeholder : ""}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            register?.onBlur?.(e);
          }}
          onChange={handleChange}
          className={`
            peer w-full rounded-xl border bg-white/5 backdrop-blur-sm
            px-3.5 pr-11 text-sm text-gray-100 outline-none
            placeholder:text-gray-500 caret-[#007aff]
            transition-[border-color,box-shadow,padding] duration-300
            ${isFloating ? "pt-6 pb-2.5" : "py-[17px]"}
            ${
              isError
                ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                : "border-white/10 focus:border-[#007aff]/70 focus:ring-2 focus:ring-[#007aff]/20"
            }
          `}
        />

        <motion.span
          animate={{ scaleX: isFocused ? 1 : 0 }}
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`pointer-events-none absolute bottom-0 left-[10%] h-[2px] w-[80%] origin-center rounded-full ${
            isError
              ? "bg-gradient-to-r from-transparent via-red-400 to-transparent"
              : "bg-gradient-to-r from-transparent via-[#007aff] to-[#007aff]"
          }`}
        />

        {type === "password" && (
          <motion.button
            type="button"
            onClick={() => setIsVisible((v) => !v)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 rounded-md p-1 transition-colors duration-200 ${
              isFocused ? "text-[#007aff]" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isVisible ? "off" : "on"}
                initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 15, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        )}
      </div>

      {type === "password" && <StrengthBar password={passwordValue} />}

      <AnimatePresence>
        {isError && errorT && (
          <motion.p
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mt-1.5 flex items-center gap-1.5 overflow-hidden pl-1 text-xs text-red-400"
          >
            <AlertCircle size={12} className="shrink-0" />
            {errorT}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
