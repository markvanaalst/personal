/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// components/CustomMDX.tsx
import { cn } from '@/lib/utils';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { JSX } from 'react';
import YouTube from '../video/youtube';
import { Tweet } from 'react-tweet';

export const components = {
a: ({ href, children }: { href: string; children: React.ReactNode }) => <Link href={href} >{children}</Link>,
  h2: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  YouTube: ({ youTubeId }: { youTubeId: string }) => <YouTube youTubeId={youTubeId} />,
  Img: ({ ...props }) => {
    return (
      <div className={cn('sm:mx-2 md:-mx-20')}>
        <img {...props} className={cn('mx-auto')} />
      </div>
    )
  },
  pre: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className={cn('-mx-24')}>
        <pre>{children}</pre>
      </div>
    )
  },
  Tweet: ({ id }: { id: string }) => {
    return (
      <div className={cn('w-min md:w-full')}>
        <Tweet id={id} />
      </div>
    )
  },
};

export function MDXRenderer(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return <MDXRemote {...props} components={components} />;
}
