"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Logo, LogoIcon } from "@/components/shared/logo";
import settings from "@/content/settings.json";
import { contentColumn } from "@/lib/site";
import { typedResumeData } from "@/lib/types/resume";
import { cn } from "@/lib/utils";

const navLinks = settings.topNavbar;

export function Navbar() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-background/80 backdrop-blur-[10px]">
      <div className={cn(contentColumn, "flex h-16 items-center justify-between gap-4 sm:gap-6")}>
        <div className="flex items-center gap-5 sm:gap-8">
          <Link href="/" className="-ml-2 shrink-0 text-foreground">
            {/* -ml-2 offsets the SVG's built-in left padding so the mark lines up with the column. The full wordmark doesn't fit next to the nav links on phones, so show the icon there. */}
            <LogoIcon className="size-8 sm:hidden" aria-hidden="true" />
            <Logo className="hidden h-8 w-auto sm:block" aria-hidden="true" />
            <span className="sr-only">
              {typedResumeData.firstName} {typedResumeData.lastName}
            </span>
          </Link>
          <nav className="flex gap-4 text-sm sm:gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <ThemeSwitcher />
      </div>
    </header>
  );
}
