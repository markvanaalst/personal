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
      <Link
        href={href as string}
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
        {...props}
      >
        {children}
      </Link>
    ) : (
      <a
        href={href as string}
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },

  // Image component - use Next.js Image for optimization
  img: ({ src, alt }: MdxImageProps) => {
    if (!src) return null;

    return (
      <figure className="my-6">
        <Image
          src={src}
          alt={alt || 'Blog post image'}
          width={800}
          height={600}
          className="rounded-lg shadow-md w-full h-auto"
        />
        {alt && <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">{alt}</figcaption>}
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
        <figure className="my-6">
          <img
            src={src}
            alt={alt || 'Blog post image'}
            className="rounded-lg shadow-md w-full h-auto"
            {...props}
          />
          {alt && <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">{alt}</figcaption>}
        </figure>
      );
    }

    return (
      <figure className="my-6">
        <Image
          src={src}
          alt={alt || 'Blog post image'}
          width={800}
          height={600}
          className="rounded-lg shadow-md w-full h-auto"
        />
        {alt && <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">{alt}</figcaption>}
      </figure>
    );
  },

  // Heading styles
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-bold mt-7 mb-3 text-gray-900 dark:text-white" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-bold mt-6 mb-2 text-gray-900 dark:text-white" {...props}>
      {children}
    </h3>
  ),

  h4: ({ children, ...props }) => (
    <h4 className="text-xl font-bold mt-5 mb-2 text-gray-900 dark:text-white" {...props}>
      {children}
    </h4>
  ),

  h5: ({ children, ...props }) => (
    <h5 className="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-white" {...props}>
      {children}
    </h5>
  ),

  h6: ({ children, ...props }) => (
    <h6 className="text-base font-bold mt-3 mb-2 text-gray-900 dark:text-white" {...props}>
      {children}
    </h6>
  ),

  // Paragraph styling
  p: ({ children, ...props }) => (
    <p className="my-4 leading-7 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </p>
  ),

  // Blockquote styling
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 pl-4 pr-4 py-2 my-4 rounded-r-lg italic text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // List styling
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300 pl-4" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300 pl-4" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="ml-2" {...props}>
      {children}
    </li>
  ),

  // Table styling
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="bg-gray-100 dark:bg-gray-800" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,

  tr: ({ children, ...props }) => (
    <tr className="border-b border-gray-300 dark:border-gray-700" {...props}>
      {children}
    </tr>
  ),

  td: ({ children, ...props }) => (
    <td className="px-4 py-2 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </td>
  ),

  th: ({ children, ...props }) => (
    <th className="px-4 py-2 text-left font-bold text-gray-900 dark:text-white" {...props}>
      {children}
    </th>
  ),

  // Horizontal rule
  hr: (props) => <hr className="my-6 border-t border-gray-300 dark:border-gray-700" {...props} />
};
