import Link from 'next/link';
import Image from 'next/image';
import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';
import YouTube from '@/components/video/youtube';
import { Tweet } from 'react-tweet';
import { cn } from './utils';

type MdxImageProps = Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt'> & {
  src?: string;
  alt?: string;
};

const linkClassName = 'text-link underline-offset-4 transition-colors hover:underline';
const imageClassName = 'h-auto w-full rounded-[10px] border border-border';
const captionClassName = 'mt-2 text-center text-sm text-muted-foreground';

/**
 * MDX component mapping for blog posts
 * These components override default HTML elements and provide custom MDX components
 */
export const mdxComponents: MDXComponents = {
  YouTube: ({ youTubeId }: { youTubeId: string }) => <YouTube youTubeId={youTubeId} />,
  Tweet: ({ id }: { id: string }) => {
    return (
      <div className={cn('w-min md:w-full')}>
        <Tweet id={id} />
      </div>
    );
  },
  // Link component - use Next.js Link for client-side navigation
  a: ({ href, children, ...props }) => {
    if (!href) {
      return <span {...props}>{children}</span>;
    }

    // Handle internal vs external links
    const isInternal = typeof href === 'string' && (href.startsWith('/') || href.startsWith('#'));

    return isInternal ? (
      <Link href={href as string} className={linkClassName} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href as string} className={linkClassName} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },

  // Image component - use Next.js Image for optimization
  img: ({ src, alt }: MdxImageProps) => {
    if (!src) return null;

    return (
      <figure className="my-8">
        <Image src={src} alt={alt || 'Blog post image'} width={800} height={600} className={imageClassName} />
        {alt && <figcaption className={captionClassName}>{alt}</figcaption>}
      </figure>
    );
  },

  // Img component (capitalized) - same as img but for custom MDX components
  Img: ({ src, alt, ...props }: MdxImageProps) => {
    if (!src) return null;

    // Handle external URLs - use regular img tag for external images
    const isExternal = typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));

    if (isExternal) {
      return (
        <figure className="my-8">
          <img src={src} alt={alt || 'Blog post image'} className={imageClassName} {...props} />
          {alt && <figcaption className={captionClassName}>{alt}</figcaption>}
        </figure>
      );
    }

    return (
      <figure className="my-8">
        <Image src={src} alt={alt || 'Blog post image'} width={800} height={600} className={imageClassName} />
        {alt && <figcaption className={captionClassName}>{alt}</figcaption>}
      </figure>
    );
  },

  // Heading styles
  h1: ({ children, ...props }) => (
    <h1 className="mt-12 mb-4 text-[32px] leading-[1.25] font-medium tracking-[-0.01em] text-foreground" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2 className="mt-12 mb-3 text-[26px] leading-[1.3] font-medium tracking-[-0.01em] text-foreground" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3 className="mt-10 mb-3 text-xl leading-[1.4] font-medium text-foreground" {...props}>
      {children}
    </h3>
  ),

  h4: ({ children, ...props }) => (
    <h4 className="mt-8 mb-2 text-lg font-medium text-foreground" {...props}>
      {children}
    </h4>
  ),

  h5: ({ children, ...props }) => (
    <h5 className="mt-6 mb-2 text-[17px] font-medium text-foreground" {...props}>
      {children}
    </h5>
  ),

  h6: ({ children, ...props }) => (
    <h6 className="mt-6 mb-2 text-base font-medium text-foreground" {...props}>
      {children}
    </h6>
  ),

  // Paragraph styling
  p: ({ children, ...props }) => (
    <p className="mb-5 leading-7 text-pretty text-prose" {...props}>
      {children}
    </p>
  ),

  // Blockquote styling
  blockquote: ({ children, ...props }) => (
    <blockquote className="my-6 border-l-2 border-border pl-5 italic text-muted-foreground [&_p]:text-muted-foreground" {...props}>
      {children}
    </blockquote>
  ),

  // List styling
  ul: ({ children, ...props }) => (
    <ul className="mb-5 list-disc space-y-1.5 pl-5 text-prose" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="mb-5 list-decimal space-y-1.5 pl-5 text-prose" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="text-prose [&>p]:mb-0" {...props}>
      {children}
    </li>
  ),

  // Table styling
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-border text-[15px]" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="bg-muted" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,

  tr: ({ children, ...props }) => (
    <tr className="border-b border-border" {...props}>
      {children}
    </tr>
  ),

  td: ({ children, ...props }) => (
    <td className="px-4 py-2 text-prose" {...props}>
      {children}
    </td>
  ),

  th: ({ children, ...props }) => (
    <th className="px-4 py-2 text-left font-medium text-foreground" {...props}>
      {children}
    </th>
  ),

  // Horizontal rule
  hr: (props) => <hr className="my-10 border-t border-border" {...props} />
};
