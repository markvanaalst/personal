"use client"

import { IconArrowRight } from "@tabler/icons-react"
import Link from "next/link"
import { ReadMoreLink } from "../shared/read-more-link"
import { fromHomeTransition } from "@/lib/transitions"

interface HomeThoughtsSectionProps {
  posts: HomePost[]
  setRef: (element: HTMLElement | null) => void
}

export interface HomePost {
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

export function HomeThoughtsSection({ posts, setRef }: HomeThoughtsSectionProps) {
  return (
    <section id="writings" ref={setRef} className="py-32 opacity-0">
      <h2 className="mb-16 text-4xl font-light tracking-[-0.01em]">Recent writings</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            transitionTypes={[fromHomeTransition]}
            className="group flex flex-col gap-4 rounded-[10px] border border-border p-8 text-foreground transition-[border-color,box-shadow] duration-400 hover:border-ring hover:shadow-[0_10px_30px_-12px_rgb(0_0_0/0.15)]"
          >
            <div className="flex justify-between font-mono text-xs text-muted-foreground uppercase">
              <span>{formatPostDate(post.date)}</span>
              <span>{post.readTime}</span>
            </div>

            <h3 className="text-xl leading-[1.35] font-medium">{post.title}</h3>

            <p className="leading-relaxed text-pretty text-muted-foreground">{post.excerpt}</p>

            <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              <span>Read more</span>
              <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </Link>
        ))}

        {posts.length === 0 && <p className="text-muted-foreground">No blog posts found.</p>}
      </div>

      <div className="mt-12 flex justify-center">
        <ReadMoreLink text="View all posts" link="/blog" transitionTypes={[fromHomeTransition]} />
      </div>
    </section>
  )
}
