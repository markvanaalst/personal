"use client";

import { useEffect, useId, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Switch } from "../ui/switch";

const STORAGE_KEY = "theme";

type ThemeSwitcherProps = React.ComponentProps<typeof Button>;

export function ThemeSwitcher({ onClick, ...props }: ThemeSwitcherProps) {
  const id = useId();
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextIsDark = storedTheme ? storedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
    setIsMounted(true);
  }, []);

  const applyTheme = (nextIsDark: boolean) => {
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem(STORAGE_KEY, nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    applyTheme(!isDark);
  };

  const handleCheckedChange = (checked: boolean) => {
    applyTheme(checked);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-center" role="group">
      <div className='relative inline-grid h-7 grid-cols-[1fr_1fr] items-center text-sm font-medium'>

        <Switch
          id={id}
          checked={isDark}
          onCheckedChange={handleCheckedChange}
          aria-labelledby={`${id}-dark ${id}-light`}
          aria-label="Toggle between dark and light mode"
          className='peer shadow-2xs border data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 [&_span]:!bg-background absolute inset-0 data-[size=default]:h-[inherit] data-[size=default]:w-14 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:group-data-[size=default]/switch:size-6.5 [&_span]:data-[state=checked]:translate-x-7 [&_span]:data-[state=checked]:rtl:-translate-x-7'

        />
        <span
          id={`${id}-light`}
          aria-controls={id}
          onClick={() => applyTheme(false)}
          className='peer-data-[state=checked]:text-muted-foreground/70 pointer-events-none relative ml-1.75 flex min-w-7 items-center text-center'>
          <IconSun className="size-4" aria-hidden="true" />
        </span>
        <span
          id={`${id}-dark`}
          aria-controls={id}
          onClick={() => applyTheme(true)}
          className='peer-data-[state=unchecked]:text-muted-foreground/70 pointer-events-none relative -ms-0.25 flex min-w-7 items-center text-center'>
          <IconMoon className="size-4" aria-hidden="true" />
        </span>
      </div>


      {/* Optional fallback button support for parent-provided onClick */}
      <button type="button" className="sr-only" onClick={handleToggle} {...props} />
    </div>
  );
}