"use client"

import { typedResumeData } from "@/lib/types/resume"
import { Badge } from "../ui/badge"

interface HomeIntroSectionProps {
  setRef: (element: HTMLElement | null) => void
}

export function HomeIntroSection({ setRef }: HomeIntroSectionProps) {
  return (
    <header id="intro" ref={setRef} className="min-h-screen flex items-center opacity-0">
      <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              {typedResumeData.firstName}
              <br />
              <span className="text-muted-foreground">{typedResumeData.lastName}</span>
            </h1>
          </div>

          <div className="space-y-6 max-w-md">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Building <span className="text-foreground">AI</span> systems that <span className="text-foreground">improve</span> <span className="text-foreground">efficiency</span> and enhance user & <span className="text-foreground">developer experience</span> at scale
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
            <div className="space-y-2">
              <div className="text-foreground">{typedResumeData.work[0].title}</div>
              <div className="text-muted-foreground">@ {typedResumeData.work[0].company}</div>
              <div className="text-xs text-muted-foreground">{typedResumeData.work[0].start} - Present</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">RECENT FOCUS</div>
            <div className="flex flex-wrap gap-2">
              {typedResumeData.work[0].badges.map((skill) => (
                <Badge key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
