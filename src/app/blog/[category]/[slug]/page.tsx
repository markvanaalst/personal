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
        <div className="relative bg-[url(/images/blog/variant-background.png)] bg-cover ">
          <div className="min-h-500 bg-slate-950/25">
            <div className={cn('article-header')}>
              <div className={cn('max-w-5xl mx-auto')}>
                <h1
                  className={cn(
                    'text-5xl font-bold leading-normal mt-0 mb-3 text-white',
                  )}
                >
                  {post.title}
                </h1>
              </div>
            </div>
            <div
              className={cn('absolute left-0 w-full -bottom-1')}
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
                <path fill="white" d="M64 7.9 L64 10 L0 10 L0 0 Z"></path>
              </svg>
            </div>
          </div>
        </div>
      )}
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
