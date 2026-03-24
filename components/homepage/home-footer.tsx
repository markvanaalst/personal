"use client"

import { typedResumeData } from "@/lib/types/resume"
import { Button } from "../ui/button"
import { ThemeSwitcher } from "../layout/theme-switcher"

interface HomeFooterProps {
  isDark: boolean
  onToggleTheme: () => void
}

export function HomeFooter({ isDark, onToggleTheme }: HomeFooterProps) {
  return (
    <footer className="py-12 sm:py-16 border-t border-border">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">© 2026 {typedResumeData.firstName} {typedResumeData.lastName}. All rights reserved.</div>
          <div className="text-xs text-muted-foreground">Built using VS Code and Copilot</div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  )
}
