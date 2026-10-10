"use client"

import { cn } from "@/lib/utils"

interface HomeSideNavProps {
  activeSection: string
  sections: string[]
  onNavigate: (section: string) => void
}

export function HomeSideNav({ activeSection, sections, onNavigate }: HomeSideNavProps) {
  return (
    <nav className="fixed top-1/2 left-4 z-10 flex -translate-y-1/2 flex-col gap-5">
      {sections.map((section) => {
        const isActive = activeSection === section

        return (
          <button
            key={section}
            type="button"
            onClick={() => onNavigate(section)}
            aria-label={`Navigate to ${section}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "flex cursor-pointer items-center gap-3 p-1 font-mono text-[13px] tracking-[0.04em] uppercase transition-colors hover:text-foreground",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "size-2.5 rounded-full border border-muted-foreground transition-colors duration-300",
                isActive ? "bg-foreground" : "bg-transparent",
              )}
            />
            <span className="hidden min-[1200px]:inline">{section}</span>
          </button>
        )
      })}
    </nav>
  )
}
