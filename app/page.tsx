"use client"

import { HomeConnectSection } from "@/components/homepage/home-connect-section"
import { HomeFooter } from "@/components/homepage/home-footer"
import { HomeIntroSection } from "@/components/homepage/home-intro-section"
import { HomeSideNav } from "@/components/homepage/home-side-nav"
import { HomeThoughtsSection } from "@/components/homepage/home-thoughts-section"
import { HomeWorkSection } from "@/components/homepage/home-work-section"
import { useEffect, useRef, useState } from "react"

const homepageSections = ["intro", "work", "writings", "connect"]

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
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

  const setSectionRef = (index: number) => (element: HTMLElement | null) => {
    sectionsRef.current[index] = element
  }

  const navigateToSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleTheme = () => {
    setIsDark((previousValue) => !previousValue)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <HomeSideNav activeSection={activeSection} sections={homepageSections} onNavigate={navigateToSection} />

      <main className="max-w-4xl ml-12 lg:ml-auto lg:mx-auto px-6 sm:px-8 lg:px-16">
        <HomeIntroSection setRef={setSectionRef(0)} />
        <HomeWorkSection setRef={setSectionRef(1)} />
        <HomeThoughtsSection setRef={setSectionRef(2)} />
        <HomeConnectSection setRef={setSectionRef(3)} />
        <HomeFooter isDark={isDark} onToggleTheme={toggleTheme} />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
