import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog'

const DEFAULT_LIMIT = 4
const MAX_LIMIT = 12

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const parsedLimit = Number(searchParams.get('limit'))
    const limit = Number.isFinite(parsedLimit)
      ? Math.max(1, Math.min(MAX_LIMIT, Math.trunc(parsedLimit)))
      : DEFAULT_LIMIT

    const posts = await getAllBlogPosts()

    const recentPosts = posts.slice(0, limit).map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
    }))

    return NextResponse.json(recentPosts)
  } catch (error) {
    console.error('Error loading homepage blog posts:', error)
    return NextResponse.json([], { status: 500 })
  }
}