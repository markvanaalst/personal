import type { Metadata } from 'next'

import FeaturedCategory from '@/components/ui/blog/featuredCategory'
import PostItem from '@/components/ui/blog/post'
import { getPost, getPostsByCategory } from '@/lib/blog'
import { getCategories } from '@/lib/categories'
import cn from '@/lib/cn'

export async function generateStaticParams() {
  return getCategories().map((category) => ({
    category: category.slug,
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

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <div className={cn('flex flex-col justify-center min-h-[70vh]')}>
      <FeaturedCategory categorySlug={params.slug} />
      <div className={cn('flex flex-col items-center')}>
        <div className={cn('flex flex-row flex-wrap py-4')}>
          <div className={cn('w-full sm:w-2/3 md:w-3/4 px-2 max-w-4xl')}>
            <div className="grid gap-4 mt-4 md:grid-cols-1 sm:grid-cols-1">
              {getPostsByCategory(params.slug)?.map((post, key) => (
                <PostItem post={post} key={key} className={cn('mb-10')} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
