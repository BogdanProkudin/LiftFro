import React from "react";

interface ButtonCancelProps {
  text: string;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  styles?: string;
}
const ButtonCancel = ({
  text,
  onClick,
  leftIcon,
  rightIcon,
  styles,
}: ButtonCancelProps) => {
  return (
    <button
      className={`cursor-pointer flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:brightness-95 transition ${styles ? styles : "px-4 py-[6px]"}`}
      onClick={onClick}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {text}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default ButtonCancel;
