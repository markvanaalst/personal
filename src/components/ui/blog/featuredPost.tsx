import Image from 'next/image'
import Link from 'next/link'

import { getPostUrl } from '@/lib/blog'

import Button from '../button'
import type { Post } from '.contentlayer/generated/types'

type PostItemProps = {
  post: Post
}

const FeaturedPostItem = ({ post }: PostItemProps): JSX.Element => {
  return (
    <article className="h-96">
      <div className="absolute w-full overflow-hidden h-96">
        <Image
          alt="Featured image"
          src={post.image}
          quality={100}
          placeholder="empty"
          fill
          sizes="(max-width: 768px) 100vw,
								(max-width: 1200px) 50vw,
								33vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="h-full text-center ">
        <div className="flex items-center justify-center h-full py-12 bg-white">
          <div className="w-7/12 text-theme-text">
            {post.categories && (
              <Button variant="ghost">
                <Link
                  href={`/blog/category/${post.categories[0]}`}
                  className="uppercase"
                >
                  {post.categories[0]}
                </Link>
              </Button>
            )}
            <h2 className="my-4 text-2xl font-medium sm:text-2xl drop-shadow-sm text-theme-text-alt">
              <Link href={`/blog/${getPostUrl(post.slug)}`}>{post.title}</Link>
            </h2>
            <Button variant="link">
              <Link
                className="read-more effect-underline"
                href={`/blog/${getPostUrl(post.slug)}`}
              >
                Read more
                <span className="sr-only">{post.title}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
export default FeaturedPostItem
