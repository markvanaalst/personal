/* eslint-disable jsx-a11y/alt-text */
import { type MDXComponents } from 'mdx/types'
import type { ImageProps } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'

import cn from '@/lib/cn'

export const components: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  Img: ({
    bleed = false,
    caption,
    ...props
  }: {
    bleed?: boolean
    caption?: string
  } & ImageProps) => {
    return (
      <figure className={cn(bleed ? '!col-span-full' : 'justify-self-center')}>
        <Image className="border rounded-lg" {...props} />

        {caption && (
          <figcaption className="text-sm text-center text-muted">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  },
}
