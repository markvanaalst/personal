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
    <div className={cn('flex flex-col justify-center min-w-12 ')}>
      {post.image != null && (
        <div
          className={`relative min-h-420 bg-cover sm:min-h-120`}
          style={{ backgroundImage: `url(${post.image})` }}
        >
          <div className="bg-slate-950/50 min-h-420 sm:min-h-120">
            <div className={cn('px-4 mx-auto max-w-5xl py-24 lg:py-36')}>
              <div className={cn('invert')}>
                <h1
                  className={cn(
                    'text-4xl font-bold leading-normal mt-0 mb-3 theme-text',
                  )}
                >
                  {post.title}
                </h1>
                <div className={cn('')}>Published on {date}</div>

                <div className={cn('mt-4')}>
                  {post.categories?.map((tag, key) => (
                    <Button
                      key={key}
                      className={cn('opacity-100')}
                      variant="solid"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div
              className={cn('absolute left-0 w-full -bottom-1 invert')}
              style={{ height: `calc(6% + 8vw)` }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 8"
                preserveAspectRatio="none"
                width="100%"
                height="100%"
                className="rotate"
              >
                <path
                  fill="currentColor"
                  d="M64 7.9 L64 10 L0 10 L0 0 Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
      <article className={cn('max-w-5xl mx-auto')}>
        <div className="prose dark:prose-invert">
          <MDXContent components={components} />
        </div>
      </article>
    </div>
  )
}
