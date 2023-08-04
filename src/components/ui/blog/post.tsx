import Image from 'next/image'
import Link from 'next/link'

import { getPostUrl } from '@/lib/blog'
import cn from '@/lib/cn'

import Button from '../button'
import type { Post } from '.contentlayer/generated/types'

type PostItemProps = {
  post: Post
  wide?: boolean
}

const PostItem = ({ post, wide }: PostItemProps): JSX.Element => {
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    new Date(post.date),
  )

  return (
    <div className={cn('p-4 md:w-1/1', wide ? 'xl:w-1/1' : 'xl:w-1/2')}>
      <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
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
            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
              {post.categories && post.categories[0]}
            </span>
            <div className="text-xs font-medium uppercase text-theme-text ">
              {date}
            </div>
            <h1>
              <a
                href="#"
                className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                role="link"
              >
                {post.title}
              </a>
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <div className="flex items-center">
                <Button
                  title={`Read more about ${post.title}`}
                  variant="outline"
                >
                  <Link href={`/blog/${getPostUrl(post.slug)}`}>Read more</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostItem
