import { HomePage } from "@/components/homepage/home-page"
import { getAllBlogPosts } from "@/lib/blog"
import { pageMetadata } from "@/lib/metadata"
import { siteDescription, siteTitle } from "@/lib/site"

const RECENT_POST_COUNT = 4

export const metadata = pageMetadata({
  title: siteTitle,
  description: siteDescription,
  path: "/",
  absoluteTitle: true,
})

export default async function Page() {
  const posts = await getAllBlogPosts()
  const recentPosts = posts.slice(0, RECENT_POST_COUNT).map(({ slug, title, excerpt, date, readTime }) => ({
    slug,
    title,
    excerpt,
    date,
    readTime,
  }))

  return <HomePage posts={recentPosts} />
}
