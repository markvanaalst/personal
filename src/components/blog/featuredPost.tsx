import Link from 'next/link'

import Button from '@/components/ui/button'
import { getPostUrl } from '@/lib/blog'

import type { Post } from '.contentlayer/generated/types'

type PostItemProps = {
  post: Post
}

const FeaturedPostItem = ({ post }: PostItemProps): JSX.Element => {
  return (
    <article className="h-48 md:h-96">
      <div
        className="absolute w-full h-48 overflow-hidden md:h-96 dark:bg-background "
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="h-full bg-slate-100/30 dark:bg-slate-950/70">
          <div className="h-full text-center">
            <div className="flex items-center justify-center h-full py-12 backdrop-blur-sm ">
              <div className="px-4">
                {post.categories && (
                  <Button variant="tertiary" size={'xs'} className="relative">
                    <Link
                      href={`/blog/category/${post.categories[0]}`}
                      className="uppercase"
                    >
                      {post.categories[0]}
                    </Link>
                  </Button>
                )}
                <h2 className="my-2 text-xl font-medium md:my-4 md:text-4xl drop-shadow-sm">
                  <Link href={`/blog/${getPostUrl(post.slug)}`}>
                    {post.title}
                  </Link>
                </h2>
                <Button variant="outline" size="lg" className="relative">
                  <Link
                    className="uppercase read-more"
                    href={`/blog/${getPostUrl(post.slug)}`}
                  >
                    Read more
                    <span className="sr-only">{post.title}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
export default FeaturedPostItem
