"use client"

import { Icons } from "@/components/icons"
import { ResumeSocialItem, typedResumeData } from "@/lib/types/resume"
import Link from "next/link"

interface HomeConnectSectionProps {
  setRef: (element: HTMLElement | null) => void
}

export function HomeConnectSection({ setRef }: HomeConnectSectionProps) {
  return (
    <section id="connect" ref={setRef} className="flex min-h-[80vh] items-center py-32 opacity-0">
      <div className="flex w-full flex-wrap gap-16">
        <div className="flex flex-[1_1_300px] flex-col gap-8">
          <h2 className="text-4xl font-light tracking-[-0.01em]">Let's Connect</h2>
          <p className="text-xl leading-relaxed text-pretty text-muted-foreground">
            Always interested in opportunities, collaborations, and conversations about technology.
          </p>
        </div>

        <div className="flex flex-[1_1_300px] flex-col gap-8">
          <div className="font-mono text-[13px] text-muted-foreground">MOST USED</div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
            {typedResumeData.contact.social.map((social: ResumeSocialItem) => {
              const SocialIcon = Icons[social.icon as keyof typeof Icons]

              return (
                <Link
                  key={social.name}
                  href={social.url}
                  className="flex items-center gap-2 rounded-[10px] border border-border p-4 text-foreground transition-colors duration-300 hover:border-ring"
                >
                  {SocialIcon ? <SocialIcon className="size-4" /> : null}
                  <span>{social.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
