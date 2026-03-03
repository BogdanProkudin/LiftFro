import { LoaderCircle } from "lucide-react";
import React from "react";
interface ButtonAddProps {
  text: string;
  onClick?: () => void;
  styles?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}
const ButtonDefault = ({
  text,
  onClick,
  styles,
  leftIcon,
  rightIcon,
  disabled,
  loading,
  type,
}: ButtonAddProps) => {
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      type={type}
      className={`
    flex items-center cursor-pointer justify-center gap-2 rounded-lg transition-all duration-200
    bg-[var(--color-primary)] text-white
    ${styles ? styles : "px-7 py-3.5"}
    disabled:opacity-50 disabled:cursor-not-allowed
    ${!disabled ? "hover:shadow-lg hover:shadow-blue-500/20 hover:bg-[var(--color-primary-hover)]" : ""}
  `}
    >
      {loading ? (
        <LoaderCircle size={24} className="animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="">{leftIcon}</span>}
          {text}
          {rightIcon && <span className="">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default ButtonDefault;
