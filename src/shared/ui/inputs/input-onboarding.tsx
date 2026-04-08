"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  UseFormRegisterReturn,
  useWatch,
  Control,
  FieldErrors,
} from "react-hook-form";
import { OnboardingFormData } from "../../../features/onboarding/model/types";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

type InputProps = {
  label: string;
  type?: string;
  placeholder: string;
  errors: FieldErrors<OnboardingFormData>;
  errorType: string;
  register: UseFormRegisterReturn;
  style?: string;
  isTextArea?: boolean;
  control?: Control<OnboardingFormData>;
};

export const InputOnboarding = ({
  label,
  type = "text",
  placeholder,
  errors,
  register,
  errorType,
  isTextArea = false,
  control,
}: InputProps) => {
  const { name, ref, onBlur, onChange } = register;
  const t = useTranslations("ValidationMessages");
  const [isFocused, setIsFocused] = useState(false);

  const value = useWatch({
    control,
    name: name as keyof OnboardingFormData,
    defaultValue: "",
  });

  const [hasValue, setHasValue] = useState(Boolean(value));

  useEffect(() => {
    setHasValue(Boolean(value));
  }, [value]);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const isError = Boolean(
    errors[errorType as keyof FieldErrors<OnboardingFormData>],
  );
  const isFloating = isFocused || hasValue;

  const errorMessage =
    errors[errorType as keyof FieldErrors<OnboardingFormData>]?.message;

  const errorT = errorMessage ? t(String(errorMessage)) || errorMessage : "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setHasValue(e.target.value.length > 0);
    onChange?.(e);
  };

  const sharedClasses = `
    peer w-full rounded-xl border bg-white/5 backdrop-blur-sm
    px-3.5 text-sm text-gray-100 outline-none
    placeholder:text-gray-500 caret-[#007aff]
    transition-[border-color,box-shadow,padding] duration-300
    ${isFloating ? "pt-6 pb-2.5" : "py-[17px]"}
    ${
      isError
        ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
        : "border-white/10 focus:border-[#007aff]/70 focus:ring-2 focus:ring-[#007aff]/20"
    }
  `;

  return (
    <div className="relative w-full mb-5 z-10">
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
              : { top: isTextArea ? "24px" : "50%", scale: 1, x: 0 }
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

        {isTextArea ? (
          <textarea
            ref={(el) => {
              inputRef.current = el;
              if (typeof register?.ref === "function") register.ref(el);
            }}
            name={name}
            placeholder={isFocused ? placeholder : ""}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onChange={handleChange}
            rows={3}
            className={`${sharedClasses} resize-none`}
          />
        ) : (
          <input
            ref={(el) => {
              inputRef.current = el;
              if (typeof register?.ref === "function") register.ref(el);
            }}
            name={name}
            type={type}
            placeholder={isFocused ? placeholder : ""}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onChange={handleChange}
            className={sharedClasses}
          />
        )}

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
      </div>

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
            {errorT as React.ReactNode}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
