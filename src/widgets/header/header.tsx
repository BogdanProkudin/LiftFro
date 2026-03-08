import { LanguageSwitcher } from "@/features/language-switcher/ui/language-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher/ui/theme-switcher";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="font-bold text-xl">LiftFro</div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;
