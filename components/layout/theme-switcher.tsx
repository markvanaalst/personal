"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme";

type ThemeSwitcherProps = {
  className?: string;
};

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [isDark, setIsDark] = useState(false);

  // The inline script in the root layout sets the `dark` class before hydration,
  // so the visuals below are driven by the `dark:` variant and this state only feeds ARIA.
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextIsDark ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this page view.
    }
    setIsDark(nextIsDark);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle between dark and light mode"
      onClick={toggleTheme}
      className={cn(
        "relative h-[30px] w-[58px] shrink-0 cursor-pointer rounded-full border border-border bg-muted p-0 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-[2px] left-[2px] size-6 rounded-full bg-background shadow-[0_1px_2px_rgb(0_0_0/0.15)] transition-[left] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] dark:left-[30px]"
      />
      <IconSun
        aria-hidden="true"
        className="absolute top-[7px] left-2 size-3.5 text-foreground dark:text-muted-foreground"
      />
      <IconMoon
        aria-hidden="true"
        className="absolute top-[7px] right-2 size-3.5 text-muted-foreground dark:text-foreground"
      />
    </button>
  );
}
