"use client";
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  ChangeEvent,
} from "react";
import { UseFormRegisterReturn, useWatch, Control } from "react-hook-form";
import { OnboardingFormData } from "../../../features/onboarding/model/types";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

type DropdownInputProps = {
  label?: string;
  register: UseFormRegisterReturn;
  icon?: string;
  suffix?: string;
  placeholder?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  type?: string;
  options?: number[];
  control?: Control<OnboardingFormData>;
};

export const DropdownInput = ({
  label,
  register,
  icon,
  suffix = "",
  placeholder = "Select",
  error,
  min = 0,
  max = 100,
  step = 1,
  options,
  type,
  control,
}: DropdownInputProps) => {
  const { name, ref, onBlur, onChange } = register;
  const tValidation = useTranslations("ValidationMessages");
  const [open, setOpen] = useState(false);

  const value = useWatch({
    control,
    name: name as keyof OnboardingFormData,
  });

  const selected =
    value !== undefined && value !== "" && value !== null
      ? Number(value)
      : undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputWidth, setInputWidth] = useState(0);
  const [direction, setDirection] = useState<"down" | "up">("down");

  const items = useMemo(() => {
    if (options && options.length) return options;
    const list = [];
    for (let i = min; i <= max; i += step) list.push(i);
    if (type === "birthYear") {
      return list.reverse();
    } else {
      return list;
    }
  }, [options, min, max, step, type]);

  useEffect(() => {
    const handleResize = () => {
      if (inputRef.current) setInputWidth(inputRef.current.offsetWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const toggleDropdown = () => {
    if (!open && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = Math.min(items.length * 36, 240);
      setDirection(spaceBelow >= dropdownHeight ? "down" : "up");
    }
    setOpen((s) => !s);
  };
  const handleSelect = (value: number) => {
    setOpen(false);

    onChange?.({
      target: { name, value },
    } as ChangeEvent<{ name: string; value: number }>);
  };

  return (
    <div className="w-full mb-3 relative" ref={containerRef}>
      {label && (
        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-text-secondary)]">
          {label}
        </label>
      )}

      <div
        ref={inputRef}
        className={`flex items-center w-full mt-2 bg-(--color-bg) border-2 rounded-lg px-3 py-2 cursor-pointer transition-all ${
          error ? "border-red-500" : "border-(--color-border)"
        } focus-within:border-(--color-primary) focus-within:ring-4 focus-within:ring-[rgba(0,122,255,0.08)]`}
        onClick={toggleDropdown}
      >
        {icon && (
          <span className="text-lg mr-3 pointer-events-none">{icon}</span>
        )}

        <span
          className={`flex-1 text-sm ${
            selected !== undefined && selected !== null && selected !== 0
              ? "text-[var(--color-text-primary)]"
              : "text-[var(--color-text-secondary)]"
          }`}
        >
          {selected !== undefined && selected !== null && selected !== 0
            ? selected
            : placeholder}
        </span>

        {suffix && (
          <span className="ml-3 text-sm pointer-events-none">{suffix}</span>
        )}

        <ChevronDown
          size={18}
          className={`ml-2 pointer-events-none transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <ul
          className={`absolute z-50 overflow-y-auto bg-(--color-bg) border-2 border-(--color-border) rounded-lg shadow-lg ${
            direction === "down" ? "mt-1 top-full" : "mb-1 bottom-[48px] "
          }`}
          style={{ width: inputWidth, maxHeight: 240 }}
        >
          {items.map((item) => (
            <li
              key={item}
              className="px-3 py-2 hover:bg-(--color-primary) hover:text-white cursor-pointer text-sm"
              onClick={() => handleSelect(item)}
            >
              {item} {suffix}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-red-500 mt-1 text-xs">
          {tValidation(error) || error}
        </p>
      )}

      <input type="hidden" name={name} ref={ref} value={selected ?? ""} />
    </div>
  );
};

export default DropdownInput;
