import Image from 'next/image'
import Link from 'next/link'

import { getPostUrl } from '@/lib/blog'
import cn from '@/lib/cn'

import Button from '../button'
import type { Post } from '.contentlayer/generated/types'

type PostItemProps = {
  post: Post
  className?: string
}

const PostItem = ({ post, className }: PostItemProps): JSX.Element => {
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    new Date(post.date),
  )

  return (
    <div
      className={cn(
        'overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800',
        className,
      )}
    >
      <Image
        src={post.image}
        className="object-cover w-full h-64"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '200px' }} // optional
        alt={post.title}
      />

      <div className="p-6">
        <div>
          <span className="text-xs font-light text-blue-600 uppercase dark:text-blue-400">
            {post.categories && post.categories[0]}
          </span>

          <h1>
            <Link
              href={`/blog/${getPostUrl(post.slug)}`}
              className="block h-10 mt-2 font-normal transition-colors duration-300 transform line-clamp-2"
              role="link"
            >
              {post.title}
            </Link>
          </h1>
          <p className="h-24 mt-2 text-xs line-clamp-4">{post.excerpt}</p>
        </div>

        <div className="mt-4">
          <div className="flex flex-row">
            <div className="flex flex-auto">
              <Button title={`Read more about ${post.title}`} variant="outline">
                <Link href={`/blog/${getPostUrl(post.slug)}`}>Read more</Link>
              </Button>
            </div>
            <div className="flex p-4 text-xs font-medium uppercase text-theme-text">
              {date}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostItem
