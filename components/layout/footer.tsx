"use client";

import Link from 'next/link'
import settings from '@/content/settings.json';
import { LogoIcon } from '../shared/logo';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <footer className="pt-12 sm:pt-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto border-t py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-1">
            <Link href="/" className="flex items-center">
              <LogoIcon className="size-10 text-foreground" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {settings.footer.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Company Info */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-sm text-muted-foreground">
              © Mark van Aalst 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
