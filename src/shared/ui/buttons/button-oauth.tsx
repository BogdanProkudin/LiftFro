"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type AuthButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "google" | "apple";
};

export const AuthButton = ({
  icon,
  label,
  onClick,
  variant,
}: AuthButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onClick?.();
  };

  const isApple = variant === "apple";

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`
        relative w-full overflow-hidden rounded-xl border mt-5
        px-4 py-[14px] text-sm font-medium
        flex items-center justify-center gap-3
        cursor-pointer select-none outline-none
        transition-[border-color,background,box-shadow] duration-300
        ${
          isApple
            ? "bg-white/95 text-gray-900 border-white/20 hover:bg-white hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.12)]"
            : "bg-white/5 text-gray-100 border-white/10 backdrop-blur-sm hover:border-white/20 hover:bg-white/8 hover:shadow-[0_0_20px_4px_rgba(0,122,255,0.1)]"
        }
      `}
    >
      <motion.div
        initial={false}
        animate={{ opacity: isPressed ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={`pointer-events-none absolute inset-0 rounded-xl ${
          isApple
            ? "shadow-[inset_0_0_16px_rgba(255,255,255,0.3)]"
            : "shadow-[inset_0_0_16px_rgba(0,122,255,0.15)]"
        }`}
      />

      <AnimatePresence>
        {ripple && (
          <motion.span
            key={`${ripple.x}-${ripple.y}`}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 12, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ left: ripple.x, top: ripple.y }}
            className={`pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full ${
              isApple ? "bg-gray-400" : "bg-[#007aff]"
            }`}
          />
        )}
      </AnimatePresence>

      <motion.span
        initial={false}
        className={`pointer-events-none absolute bottom-0 left-[10%] h-[1.5px] w-[80%] origin-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          isApple
            ? "bg-gradient-to-r from-transparent via-white/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-[#007aff] to-[#007aff]"
        }`}
      />

      <span
        className={`flex shrink-0 ${isApple ? "text-gray-900" : "text-gray-200"}`}
      >
        {icon}
      </span>

      <span className={`h-4 w-px ${isApple ? "bg-gray-300" : "bg-white/15"}`} />

      <span className="tracking-[0.01em]">{label}</span>
    </motion.button>
  );
};
