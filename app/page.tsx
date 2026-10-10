"use client"

import { HomeConnectSection } from "@/components/homepage/home-connect-section"
import { HomeIntroSection } from "@/components/homepage/home-intro-section"
import { HomeSideNav } from "@/components/homepage/home-side-nav"
import { HomeThoughtsSection } from "@/components/homepage/home-thoughts-section"
import { HomeWorkSection } from "@/components/homepage/home-work-section"
import { SiteFooter } from "@/components/layout/footer"
import { useEffect, useRef, useState } from "react"

const homepageSections = ["intro", "work", "writings", "connect"]

export default function Home() {
  const [activeSection, setActiveSection] = useState(homepageSections[0])
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // The active section is the last one whose top has scrolled above 45% of the viewport.
    const updateActiveSection = () => {
      let nextActive = homepageSections[0]
      sectionsRef.current.forEach((section) => {
        if (section && section.getBoundingClientRect().top < window.innerHeight * 0.45) {
          nextActive = section.id
        }
      })
      setActiveSection(nextActive)
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [])

  const setSectionRef = (index: number) => (element: HTMLElement | null) => {
    sectionsRef.current[index] = element
  }

  const navigateToSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      <HomeSideNav activeSection={activeSection} sections={homepageSections} onNavigate={navigateToSection} />

      <main className="mx-auto max-w-4xl pl-14 pr-6 sm:pr-12 lg:px-16">
        <HomeIntroSection setRef={setSectionRef(0)} />
        <HomeWorkSection setRef={setSectionRef(1)} />
        <HomeThoughtsSection setRef={setSectionRef(2)} />
        <HomeConnectSection setRef={setSectionRef(3)} />
        <SiteFooter />
      </main>

      <div className="pointer-events-none fixed right-0 bottom-0 left-0 h-24 bg-linear-to-t from-background to-transparent"></div>
    </div>
  )
}
