"use client"

import { Icons } from "@/components/icons"
import { ResumeSocialItem, typedResumeData } from "@/lib/types/resume"
import Link from "next/link"

interface HomeConnectSectionProps {
  setRef: (element: HTMLElement | null) => void
}

export function HomeConnectSection({ setRef }: HomeConnectSectionProps) {
  return (
    <section id="connect" ref={setRef} className="min-h-screen flex items-center py-20 sm:py-32 opacity-0">
      <div className="w-full grid lg:grid-cols-2 gap-12 sm:gap-16">
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Always interested in opportunities, collaborations, and conversations about technology.
            </p>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="text-sm text-muted-foreground font-mono">MOST USED</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {typedResumeData.contact.social.map((social: ResumeSocialItem) => {
              const SocialIcon = Icons[social.icon as keyof typeof Icons]

              return (
                <Link
                  key={social.name}
                  href={social.url}
                  className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                      {SocialIcon ? <SocialIcon className="w-4 h-4" /> : null}
                      <span>{social.name}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
