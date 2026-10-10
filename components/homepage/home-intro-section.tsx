"use client"

import { typedResumeData } from "@/lib/types/resume"
import { Badge } from "../ui/badge"

interface HomeIntroSectionProps {
  setRef: (element: HTMLElement | null) => void
}

export function HomeIntroSection({ setRef }: HomeIntroSectionProps) {
  const currentRole = typedResumeData.work[0]

  return (
    <header id="intro" ref={setRef} className="flex min-h-screen items-center opacity-0">
      <div className="flex w-full flex-wrap items-end gap-16">
        <div className="flex flex-[3_1_320px] flex-col gap-8">
          <h1 className="text-[clamp(48px,8vw,72px)] leading-[1.05] font-light tracking-[-0.025em]">
            {typedResumeData.firstName}
            <br />
            <span className="text-muted-foreground">{typedResumeData.lastName}</span>
          </h1>

          <p className="max-w-md text-xl leading-relaxed text-pretty text-muted-foreground">
            Building <span className="text-foreground">AI</span> systems that <span className="text-foreground">improve</span>{" "}
            <span className="text-foreground">efficiency</span> and enhance user &amp;{" "}
            <span className="text-foreground">developer experience</span> at scale
          </p>
        </div>

        <div className="flex flex-[2_1_240px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="font-mono text-[13px] text-muted-foreground">CURRENTLY</div>
            <div className="flex flex-col gap-1.5">
              <div className="text-foreground">{currentRole.title}</div>
              <div className="text-muted-foreground">@ {currentRole.company}</div>
              <div className="text-xs text-muted-foreground">{currentRole.start} - Present</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="font-mono text-[13px] text-muted-foreground">RECENT FOCUS</div>
            <div className="flex flex-wrap gap-2">
              {currentRole.badges.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
