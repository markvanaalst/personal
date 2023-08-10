/* eslint-disable jsx-a11y/alt-text */
import { type MDXComponents } from 'mdx/types'
import Link from 'next/link'

import cn from '@/lib/cn'

import YouTube from './ui/video/youtube'

export const components: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  h2: ({ children }) => <h2>{children}</h2>,
  YouTube: ({ youTubeId }) => <YouTube youTubeId={youTubeId as string} />,
  Img: ({ ...props }) => {
    return (
      <div className={cn('-mx-20')}>
        <img {...props} className={cn('mx-auto')} />
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
}
