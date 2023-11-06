import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { PostHeader } from '@/components/blog/postHeader'
import { components } from '@/components/mdx-components'
import { getPost } from '@/lib/blog'
import cn from '@/lib/cn'
import { getMetadata } from '@/lib/metadata'

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
  const updatedMetadata = getMetadata({
    title: post?.title,
    description: post?.excerpt,
  })

  return {
    ...updatedMetadata,
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <div className={cn('flex flex-col justify-center min-w-12 ')}>
      {post.image != null && <PostHeader blogpost={post} />}
      <article className={cn('w-full md:max-w-5xl mx-auto p-2 md:p-4')}>
        <div
          className={cn(
            'prose max-w-4xl border-gray-500 dark:prose-invert prose-img:rounded-md prose-img:border-1 prose-img:shadow-xl prose-img:my-8 prose-table:-mx-20 prose-table:w-fit',
          )}
        >
          <MDXContent components={components} />
        </div>
      </article>
    </div>
  )
}
