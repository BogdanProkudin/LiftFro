"use client";

import { ThemeSwitcher } from "@/features/theme-switcher/ui/theme-switcher";
import { useAppSelector } from "@/shared/hooks/redux-hook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import {
  Home,
  Dumbbell,
  BarChart3,
  Users,
  ScanLine,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

interface NavItem {
  href: string;
  labelKey: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", labelKey: "home", icon: Home },
  { href: "/programs", labelKey: "programs", icon: Dumbbell },
  { href: "/track", labelKey: "track", icon: BarChart3 },
  { href: "/social", labelKey: "social", icon: Users },
  { href: "/scan", labelKey: "scan", icon: ScanLine },
];

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const tHeader = useTranslations("Header");
  const user = useAppSelector((state) => state.user.user);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1550px] items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Liftly
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
                }`}
              >
                <Icon size={18} />
                <span>{t(labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />

          {user ? (
            <ProfileDropdown
              userName={user.name}
              profileLabel={tHeader("profile")}
              logoutLabel={tHeader("logout")}
            />
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
              >
                {tHeader("login")}
              </Link>
              <Link
                href="/registration"
                className="rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-purple-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                {tHeader("register")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

interface ProfileDropdownProps {
  userName: string;
  profileLabel: string;
  logoutLabel: string;
}

function ProfileDropdown({
  userName,
  profileLabel,
  logoutLabel,
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (): void => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = (): void => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleLogout = (): void => {
    setIsOpen(false);
    // TODO: dispatch logout action + clear cookies
  };

  const initial = userName.charAt(0).toUpperCase();

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-2 py-1.5 transition-colors hover:bg-[var(--color-bg-secondary)]/80"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-500 text-xs font-bold text-white">
          {initial}
        </div>
        <ChevronDown
          size={14}
          className={`text-[var(--color-text-secondary)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full mt-2 min-w-[180px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[var(--shadow-medium)] transition-all duration-200 origin-top-right ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
        role="menu"
      >
        {/* User info */}
        <div className="border-b border-[var(--color-border)] px-4 py-3">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            {userName}
          </p>
        </div>

        {/* Menu items */}
        <div className="py-1">
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-secondary)]"
            role="menuitem"
          >
            <User size={16} className="text-[var(--color-text-secondary)]" />
            {profileLabel}
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-error)] transition-colors hover:bg-[var(--color-bg-secondary)]"
            role="menuitem"
          >
            <LogOut size={16} />
            {logoutLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
