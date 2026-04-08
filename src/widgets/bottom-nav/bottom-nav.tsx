"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Home, Dumbbell, BarChart3, Users, ScanLine } from "lucide-react";

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

export default function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors ${
                active
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                  active ? "bg-[var(--color-primary)]/10" : ""
                }`}
              >
                <Icon size={20} />
              </div>
              <span>{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>

      {/* Safe area for devices with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
