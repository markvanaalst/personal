import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { getPostUrl } from '@/lib/blog'
import cn from '@/lib/cn'

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
    <Card className={cn(className)}>
      <CardHeader className={cn('p-0')}>
        <Image
          src={post.image}
          className="object-cover w-full h-64"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '200px' }} // optional
          alt={post.title}
        />
      </CardHeader>
      <CardContent>
        <span className="text-xs font-light uppercase">
          {post.categories && post.categories[0]}
        </span>

        <h2>
          <Link
            href={`/blog/${getPostUrl(post.slug)}`}
            className="block h-10 mt-2 transition-colors duration-300 transform line-clamp-2"
            role="link"
          >
            {post.title}
          </Link>
        </h2>
        <p className="h-24 mt-2 text-base line-clamp-4">{post.excerpt}</p>
      </CardContent>
      <CardFooter className={cn('justify-between space-x-2')}>
        <Button title={`Read more about ${post.title}`} variant="secondary">
          <Link href={`/blog/${getPostUrl(post.slug)}`}>Read more</Link>
        </Button>
        <div className="flex p-4 text-xs font-medium uppercase text-theme-text-alt">
          {date}
        </div>
      </CardFooter>
    </Card>
  )
}
export default PostItem
