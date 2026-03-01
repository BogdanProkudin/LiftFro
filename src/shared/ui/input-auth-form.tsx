"use client";
import React, { useRef, useState } from "react";

import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { AuthData } from "@/features/auth/model/types";

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

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputType =
    type === "password" ? (isVisible ? "text" : "password") : type;
  const isFloating = isFocused || hasValue;
  const isError = Boolean(errors[errorType]);

  const errorMessage = errors[errorType]?.message;

  const errorT = errorMessage ? t(String(errorMessage)) : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    register?.onChange?.(e);
  };

  return (
    <div className="relative w-full mb-5">
      <div className="relative">
        <motion.div
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
            className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition-colors duration-200 ${
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
