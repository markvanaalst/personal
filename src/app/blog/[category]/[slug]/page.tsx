import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { components } from '@/components/mdx-components'
import Button from '@/components/ui/button'
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
    <div className={cn('flex flex-col justify-center min-h-[70vh]')}>
      <article className={cn('max-w-5xl mx-auto')}>
        <h1
          className={cn(
            'text-3xl text-center font-bold leading-normal mt-0 mb-3',
          )}
        >
          {post.title}
        </h1>

        <div className={cn('text-center')}>Published on {date}</div>

        <div className={cn('text-center')}>
          {post.categories?.map((tag, key) => (
            <Button key={key} variant="ghost">
              {tag}
            </Button>
          ))}
        </div>

        <div className="mt-10 prose">
          <MDXContent components={components} />
        </div>
      </article>
    </div>
  )
}
