import React from "react";
interface ButtonAddProps {
  text: string;
  onClick?: () => void;
  styles?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}
const ButtonAdd = ({
  text,
  onClick,
  styles,
  leftIcon,
  rightIcon,
}: ButtonAddProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm border-2 border-[var(--color-border)] text-[var(--color-text-primary)] text-base hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)] transition-all duration-300 ${styles}`}
    >
      {leftIcon && <span className="">{leftIcon}</span>}
      {text}
      {rightIcon && <span className="">{rightIcon}</span>}
    </button>
  );
};

export default ButtonAdd;
