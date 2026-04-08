import React, { useState, useRef, useEffect } from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { Calendar } from "@/shared/ui/calendar/calendar";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

type DateInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  icon?: string;
  type?: "normal" | "fromToday" | "date";
};

export const DateInput = <T extends FieldValues>({
  label,
  name,
  control,
  icon,
  type,
}: DateInputProps<T>) => {
  const tValidation = useTranslations("ValidationMessages");
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [direction, setDirection] = useState<"down" | "up">("down");

  // Determine selected date from field.value
  const selected = React.useMemo(() => {
    if (!field.value) return undefined;
    const date = new Date(field.value);
    return isNaN(date.getTime()) ? undefined : date;
  }, [field.value]);

  const handleSelect = (date?: Date) => {
    if (!date) {
      field.onChange(undefined);
      setOpen(false);
      return;
    }

    const value = date.toISOString().split("T")[0];
    field.onChange(value);
    setOpen(false);
  };

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggleCalendar = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const calendarHeight = 350;
      setDirection(spaceBelow >= calendarHeight ? "down" : "up");
    }
    setOpen((s) => !s);
  };

  return (
    <div className="relative w-full mb-5" ref={containerRef}>
      {label && (
        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-text-secondary)]">
          {label}
        </label>
      )}

      <div className="w-full mt-1 relative">
        <button
          type="button"
          ref={buttonRef}
          onClick={toggleCalendar}
          className={`relative flex items-center w-full bg-[var(--color-bg)] border-2 rounded-lg px-4 transition-all ${
            error ? "border-red-500" : "border-[var(--color-border)]"
          } focus-within:border-[var(--color-primary)] focus-within:ring-4 focus-within:ring-[rgba(0,122,255,0.08)] text-left h-12`}
        >
          <span className="text-lg mr-2.5 opacity-70">{icon ?? ""}</span>

          <span
            className={`flex-1 py-3 text-sm ${
              selected
                ? "text-[var(--color-text-primary)] font-medium"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            {selected ? selected.toLocaleDateString() : "Select date"}
          </span>

          <ChevronDown
            size={18}
            className={`ml-2 transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {open && (
          <div
            className={`absolute left-0 z-[100]`}
            style={{
              top: direction === "down" ? "100%" : undefined,
              bottom: direction === "up" ? "100%" : undefined,
              marginTop: direction === "down" ? "8px" : undefined,
              marginBottom: direction === "up" ? "8px" : undefined,
            }}
          >
            <div className="bg-[var(--color-bg)] border-2 border-[var(--color-border)] rounded-xl shadow-2xl overflow-hidden p-1">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={(date) => handleSelect(date as Date | undefined)}
                {...(type === "fromToday"
                  ? { disabled: { before: new Date() } }
                  : {})}
              />
            </div>
          </div>
        )}
      </div>

      {error?.message && (
        <p className="text-red-500 mt-1 text-xs">
          {tValidation(error.message) || error.message}
        </p>
      )}
    </div>
  );
};
