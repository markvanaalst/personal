"use client"
import { typedResumeData } from "@/lib/types"
import { ReadMoreLink } from "../shared/read-more-link"

interface HomeWorkSectionProps {
  setRef: (element: HTMLElement | null) => void
}

export function HomeWorkSection({ setRef }: HomeWorkSectionProps) {

  const workStartYear = typedResumeData.work[typedResumeData.work.length - 1].start
  const workEndYear = typedResumeData.work[0].end

  return (
    <section id="work" ref={setRef} className="py-32 opacity-0">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-4xl font-light tracking-[-0.01em]">Work Experience</h2>
        <div className="font-mono text-[13px] text-muted-foreground">{workStartYear} - {workEndYear}</div>
      </div>

      <div className="flex flex-col">
        {typedResumeData.work.map(({ title, description, start, end, company }) => (
          <div className="flex items-start" key={`${company}-${start}`}>
            {/* Company and dates sit in a side column from sm up; on mobile they move into the timeline item */}
            <div className="mt-2.5 mr-6 hidden w-24 shrink-0 flex-col gap-1.5 text-right sm:flex">
              <div className="text-[17px] leading-[1.3] font-semibold">{company}</div>
              <div className="text-[13px] text-muted-foreground">
                {start} - {end ?? "Present"}
              </div>
            </div>
            <div className="relative flex min-w-0 flex-1 flex-col gap-2 border-l-2 border-border pb-10 pl-8">
              {/* Timeline dot */}
              <span className="absolute top-4 -left-[7px] size-2 box-content rounded-full border-2 border-primary bg-background" />

              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:hidden">
                <span className="text-[17px] leading-[1.3] font-semibold">{company}</span>
                <span className="text-[13px] text-muted-foreground">
                  {start} - {end ?? "Present"}
                </span>
              </div>

              <h3 className="text-lg font-semibold tracking-[-0.01em] sm:mt-2">{title}</h3>
              <p className="text-[15px] leading-[1.6] text-pretty text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <ReadMoreLink text="View resume" link="/resume" />
      </div>
    </section>
  )
}
