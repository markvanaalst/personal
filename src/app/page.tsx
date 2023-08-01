import Link from 'next/link'

import { getLatestPosts, getPostUrl } from '@/lib/blog'
import cn from '@/lib/cn'

export default function Home() {

  return (
    <div className={cn('flex flex-col justify-center min-h-[70vh]')}>
      <div className={cn('flex flex-col items-center text-center')}>
        <p className={cn('mb-4')}>Personal website for Mark van Aalst</p>
        <div className={cn('flex items-center justify-center mb-8')}>
          <Link
            href="https://github.com/markvanaalst/personal"
            target="_blank"
            className={cn(
              'border-b border-dotted border-gray-600 hover:text-primary-500 hover:border-primary-500',
              'dark:border-slate-50 dark:hover:border-primary-500',
            )}
          >
            See the repository
          </Link>
        </div>
        <div>
          {getLatestPosts().map((post) => (
            <article key={post._id} className="mb-4">
              <Link href={'blog/' + getPostUrl(post.slug)}>
                <h2 className="heading-md">{post.title}</h2>
                <p>{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
