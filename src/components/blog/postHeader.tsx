import cn from '@/lib/cn'

import Badge from '../ui/badge'
import type { Post } from '.contentlayer/generated/types'

type PostHeaderProps = {
  blogpost: Post
}

export const PostHeader = ({ blogpost }: PostHeaderProps) => {
  const publishDate =
    blogpost.date &&
    new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
      new Date(blogpost.date),
    )

  const backgroundImage = blogpost.image ? blogpost.image : '/images/desk.jpg'

  return (
    <div
      className={`relative min-h-420 bg-cover sm:min-h-120 dark:bg-opacity-50`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-slate-950/50 dark:bg-slate-950/70 min-h-420 sm:min-h-120">
        <div className={cn('px-4 mx-auto max-w-5xl py-24 lg:py-36')}>
          <h1
            className={cn(
              'text-xl md:text-5xl font-bold leading-normal mt-0 mb-3 text-white',
            )}
          >
            {blogpost.title}
          </h1>
          {publishDate && (
            <div className={cn('text-white mb-4')}>
              Published on {publishDate}
            </div>
          )}
          {blogpost.tags?.map((tag, key) => (
            <Badge key={key} className={cn('mr-4')}>
              {tag}
            </Badge>
          ))}
        </div>
        <div
          className={cn('absolute left-0 w-full -bottom-1 xpageheader')}
          style={{ height: `calc(6% + 8vw)` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 8"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            className="rotate dark:hidden fill-white"
          >
            <path d="M64 7.9 L64 10 L0 10 L0 0 Z"></path>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 8"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            className="hidden rotate dark:block dark:fill-background"
          >
            <path d="M64 7.9 L64 10 L0 10 L0 0 Z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}
