import React from "react";
import { motion } from "framer-motion";
interface ButtonApplyProps {
  text: string;
  styles?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  animation?: boolean;
}

const ButtonApply = ({
  text,
  leftIcon,
  rightIcon,
  onClick,
  styles,
  animation,
}: ButtonApplyProps) => {
  return (
    <>
      {animation ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <button
            className={` text-white cursor-pointer transition-colors ease-in-out rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-purple-500 flex items-center gap-2 ${styles ? styles : "px-4 py-2"}`}
            onClick={onClick}
          >
            {leftIcon && <span>{leftIcon}</span>}
            {text}
            {rightIcon && <span> {rightIcon}</span>}
          </button>
        </motion.div>
      ) : (
        <button
          className={` text-white cursor-pointer transition-colors ease-in-out rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-purple-500 flex items-center gap-2  hover:from-[var(--color-primary-hover)] hover:to-purple-600 hover:shadow-2xl hover:shadow-blue-500/30 ${styles ? styles : "px-4 py-2"}`}
          onClick={onClick}
        >
          {leftIcon && <span>{leftIcon}</span>}
          {text}
          {rightIcon && <span> {rightIcon}</span>}
        </button>
      )}{" "}
    </>
  );
};

export default ButtonApply;
