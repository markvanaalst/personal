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
    <section id="work" ref={setRef} className="min-h-screen py-20 sm:py-32 opacity-0">
      <div className="space-y-6 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
          <div className="text-sm text-muted-foreground font-mono">{workStartYear} - {workEndYear}</div>
        </div>

        <div className="w-full px-6 md:mx-auto">
          <div className="relative">
            {/* Timeline line */}
            {/* <div className="absolute left-0 top-3 bottom-0 border-l-2" /> */}

            {typedResumeData.work
              .map(({ title, description, start, end, company }, index) => (
                <div className="group relative" key={index}>
                  {/* Content */}
                  <div className="flex items-start">
                    <div className="mt-3 mr-5 flex w-[75px] shrink-0 flex-col gap-2 text-end sm:w-[90px]">
                      <h6 className="font-semibold text-lg">
                        {company}
                      </h6>
                      <span className="text-muted-foreground sm:text-sm text-md">
                        {start} - {end ?? "Present"}
                      </span>
                    </div>
                    <div className="relative space-y-2 border-l-2 pb-10 pl-6 group-last:pb-4 sm:pl-8">
                      {/* Timeline Dot */}
                      <div className="absolute top-4 -left-px h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background" />

                      <h3 className="mt-2 font-semibold text-lg tracking-[-0.01em]">
                        {title}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="w-full flex justify-center">
          <ReadMoreLink text="View resume" link="/resume" className="mt-8" />
        </div>
        </div>
        
      </div>
    </section>
  )
}
