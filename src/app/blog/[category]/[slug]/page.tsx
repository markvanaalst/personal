import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { components } from '@/components/mdx-components'
import { getPost } from '@/lib/blog'
import cn from '@/lib/cn'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getPost(params.slug)

  return {
    title: post?.title,
    description: post?.excerpt,
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (!post) notFound()

  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    new Date(post.date),
  )

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <article className={cn('prose dark:prose-invert')}>
      <h1 className="mb-2 text-slate-900">{post.title}</h1>

      <span>{date}</span>

      <div className="prose content">
        <MDXContent components={components} />
      </div>
    </article>
  )
}
