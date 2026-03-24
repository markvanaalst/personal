"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ReadMoreLink } from "../shared/read-more-link"

interface HomeThoughtsSectionProps {
  setRef: (element: HTMLElement | null) => void
}

interface HomePost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
}

function formatPostDate(dateValue: string): string {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return dateValue
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  })
}

export function HomeThoughtsSection({ setRef }: HomeThoughtsSectionProps) {
  const [posts, setPosts] = useState<HomePost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const loadPosts = async () => {
      try {
        const response = await fetch("/api/blogposts?limit=4", {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error("Failed to load posts")
        }

        const data = (await response.json()) as HomePost[]
        setPosts(data)
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error loading homepage posts:", error)
          setPosts([])
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <section id="writings" ref={setRef} className="min-h-screen py-20 sm:py-32 opacity-0">
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">Recent writings</h2>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-6 sm:p-8 border border-border rounded-lg animate-pulse">
                <div className="space-y-4">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-6 w-4/5 bg-muted rounded" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-3/4 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}

          {!isLoading &&
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
              >
                <article className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{formatPostDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    <span>Read more</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </article>
              </Link>
            ))}

          {!isLoading && posts.length === 0 && (
            <p className="text-muted-foreground lg:col-span-2">No blog posts found.</p>
          )}

        </div>
        <div className="lg-col-span-4 flex justify-center">
          <ReadMoreLink text="View all posts" link="/blog" />
        </div>
      </div>
    </section>
  )
}
