"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import settings from '@/content/settings.json';

const navLinks = settings.topNavbar;

export function Navbar() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo and Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo className="w-full h-10" aria-label="Home" />
          </Link>
          <NavigationMenu className=" md:flex" viewport={false}>
            <NavigationMenuList className="gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    asChild
                    className={
                      link.href !== "/" && (pathname === link.href || pathname.startsWith(`${link.href}/`))
                        ? "bg-muted text-muted-foreground"
                        : pathname === "/" && link.href === "/"
                          ? "bg-muted text-muted-foreground"
                          : undefined
                    }
                  >
                    <Link
                      href={link.href}
                      aria-current={
                        link.href !== "/" && (pathname === link.href || pathname.startsWith(`${link.href}/`))
                          ? "page"
                          : pathname === "/" && link.href === "/"
                            ? "page"
                            : undefined
                      }
                      className="text-muted-foreground"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
