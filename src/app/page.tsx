import type { Metadata } from 'next/types'

import Categories from '@/components/blog/categories'
import Disclaimer from '@/components/blog/disclaimer'
import FeaturedPostItem from '@/components/blog/featuredPost'
import PostItem from '@/components/blog/post'
import Profile from '@/components/blog/profile'
import { getLatestPost, getLatestPosts } from '@/lib/blog'
import cn from '@/lib/cn'
import { generateRssFeed } from '@/lib/feeds'
import { defaultMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const feedTitle = defaultMetadata.titleTemplate.replace(
    /%s/g,
    `${defaultMetadata.title}`,
  )

  return {
    title: defaultMetadata.titleTemplate.replace(
      /%s/g,
      `${defaultMetadata.title}`,
    ),
    description: defaultMetadata.description,
    alternates: {
      types: {
        'application/rss+xml': [
          {
            url: '/feed',
            title: `${feedTitle} | RSS`,
          },
        ],
        'application/feed+json': [
          {
            url: '/feed.json',
            title: `${feedTitle} | JSON Feed`,
          },
        ],
        'application/atom+xml': [
          {
            url: '/atom',
            title: `${feedTitle} | ATOM`,
          },
        ],
      },
    },
  }
}

export default function Home() {
  generateRssFeed()

  return (
    <div className={cn('flex flex-col justify-center min-h-[70vh]')}>
      <FeaturedPostItem post={getLatestPost()} />
      <div className={cn('flex flex-col items-center')}>
        <div className={cn('flex flex-row flex-wrap py-4')}>
          <div className={cn('w-full sm:w-2/3 md:w-3/4 px-2 max-w-4xl')}>
            <div className="grid gap-8 mt-4 md:grid-cols-2 sm:grid-cols-1">
              {getLatestPosts(5, true).map((post, key) => (
                <PostItem post={post} key={key} />
              ))}
            </div>
          </div>
          <div className={cn('w-full sm:w-1/3 md:w-1/4 px-2 pt-4 grid gap-4')}>
            <Profile />
            <Categories />
            <Disclaimer />
          </div>
        </div>
      </div>
    </div>
  )
}
