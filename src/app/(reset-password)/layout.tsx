import { ReactNode } from "react";

export default function AuthSimpleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg)]">
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
}
