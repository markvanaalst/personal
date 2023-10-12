/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { type MDXComponents } from 'mdx/types'
import Link from 'next/link'

import cn from '@/lib/cn'

import { Tweet } from './twitter/Tweet'
import YouTube from './video/youtube'

export const components: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  h2: ({ children }) => <h2>{children}</h2>,
  YouTube: ({ youTubeId }) => <YouTube youTubeId={youTubeId as string} />,

  Img: ({ ...props }) => {
    return (
      <div className={cn('sm:mx-2 md:-mx-20')}>
        <img {...props} className={cn('mx-auto')} layout="responsive" />
      </div>
    )
  },
  pre: ({ children }) => {
    return (
      <div className={cn('-mx-24')}>
        <pre>{children}</pre>
      </div>
    )
  },
  Tweet: ({ id }) => {
    return (
      <div className={cn('mx-auto')}>
        <Tweet id={id} />
      </div>
    )
  },
}
