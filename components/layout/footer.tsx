"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import settings from "@/content/settings.json";
import { cn } from "@/lib/utils";
import { contentColumn } from "@/lib/site";
import { typedResumeData } from "@/lib/types/resume";

type FooterLink = {
  title: string;
  href: string;
};

type SiteFooterProps = {
  /** Navigation links shown on the right. Without links, the theme switcher is shown instead. */
  links?: FooterLink[];
  className?: string;
};

export function SiteFooter({ links, className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "flex flex-wrap items-center justify-between gap-6 border-t border-border pt-12 pb-16",
        className,
      )}
    >
      <div className="flex flex-col gap-1.5">
        <div className="text-sm text-muted-foreground">
          © 2026 {typedResumeData.firstName} {typedResumeData.lastName}. All rights reserved.
        </div>
      </div>

      {links ? (
        <nav className="flex flex-wrap gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      ) : (
        <ThemeSwitcher />
      )}
    </footer>
  );
}

export function Footer() {
  const pathname = usePathname();

  // The homepage renders its own footer inside its main column.
  if (pathname === "/") return null;

  return (
    <div className={cn(contentColumn, "mt-24")}>
      <SiteFooter links={settings.footer} />
    </div>
  );
}
