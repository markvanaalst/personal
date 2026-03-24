"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { typedResumeData } from "@/lib/types"
import type { ResumeSkillCategory, ResumeSkillLevel } from "@/lib/types"
import { SectionHeader } from "../shared/section-header"
import { Button } from "../ui/button"

type SkillView = "bars" | "badges"

const skillViews: Array<{ key: SkillView; label: string }> = [
  { key: "bars", label: "Progress" },
  { key: "badges", label: "Compact" },
]

const skillsData: ResumeSkillCategory[] = typedResumeData.skillCategories

function SkillBar({ skill, isVisible }: { skill: ResumeSkillLevel; isVisible: boolean }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
          }}
        />
      </div>
    </div>
  )
}

function SkillBadge({ skill }: { skill: ResumeSkillLevel }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium text-secondary-foreground transition-colors cursor-default">
      {skill.name}
    </span>
  )
}

export function Skills() {
  const [activeView, setActiveView] = useState<SkillView>("bars")
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(new Set())

  const markCategoryVisible = useCallback((title: string) => {
    setVisibleCategories((prev) => {
      if (prev.has(title)) {
        return prev
      }

      const next = new Set(prev)
      next.add(title)
      return next
    })
  }, [])

  return (
    <section className="py-16 px-4 md:px-8 w-full mx-auto">
      <SectionHeader 
        title="Skills" 
        description="Technologies and tools I work with to bring ideas to life" 
      />

      {/* View Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center bg-secondary rounded-lg p-1">
          {skillViews.map((view) => (
            <Button
              key={view.key}
              onClick={() => setActiveView(view.key)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                activeView === view.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {view.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-10 md:grid-cols-3">
        {skillsData.map((category) => (
          <SkillCategoryCard
            key={category.title}
            category={category}
            activeView={activeView}
            onVisible={() => markCategoryVisible(category.title)}
            isVisible={visibleCategories.has(category.title)}
          />
        ))}
      </div>
    </section>
  )
}

interface SkillCategoryCardProps {
  category: ResumeSkillCategory
  activeView: SkillView
  onVisible: () => void
  isVisible: boolean
}

function SkillCategoryCard({
  category,
  activeView,
  onVisible,
  isVisible,
}: SkillCategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = cardRef.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onVisible()
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [onVisible])

  return (
    <div className="space-y-6" ref={cardRef}>
      <h3 className="text-primary font-semibold text-sm tracking-wide">
        {category.title}
      </h3>
      
      {activeView === "bars" ? (
        <div className="space-y-4">
          {category.skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} isVisible={isVisible} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <SkillBadge key={skill.name} skill={skill} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Skills
