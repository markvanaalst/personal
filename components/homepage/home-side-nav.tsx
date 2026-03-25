"use client"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { IconChevronRight } from "@tabler/icons-react"
import { ThemeSwitcher } from "../layout/theme-switcher"

interface HomeSideNavProps {
  activeSection: string
  sections: string[]
  onNavigate: (section: string) => void
}

const MenuItemIconClass = (activeSection: string, section: string) => [
  activeSection === section ? "text-foreground-muted dark:text-white" : "text-foreground dark:text-muted-foreground",
  "size-8",
  "transition-all duration-500"
].join(" ");

export function HomeSideNav({ activeSection, sections, onNavigate }: HomeSideNavProps) {
  return (
    <nav className="fixed left-2 lg:left-8 top-1/2 -translate-y-1/2 z-10 ">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <div key={section} className="flex items-start gap-2">
            <Button variant="link" size="lg" 
              onClick={() => onNavigate(section)}
              aria-label={`Navigate to ${section}`}
            >
              <div className={cn(activeSection === section ? "border-muted-foreground dark:border-muted border" : "dark:bg-muted bg-muted border", "rounded-full size-6", "xl:hidden")} />
              <IconChevronRight className={cn(MenuItemIconClass(activeSection, section), "hidden xl:inline")} />
              <span className={cn("hidden xl:inline xl:text-2xl 2xl:text-4xl", activeSection === section ? "text-foreground-muted dark:text-white" : "text-foreground dark:text-muted-foreground")}>{section}</span>
              </Button>
          </div>
        ))}
      </div>
      <div className="flex mt-8">
        <ThemeSwitcher variant="ghost" />
      </div>
    </nav>
  )
}
