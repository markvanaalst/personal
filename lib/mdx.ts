import rehypeShiki from '@shikijs/rehype';
import remarkGfm from 'remark-gfm';
import type { ComponentProps } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          // Emit only CSS variables so globals.css picks the theme (inline colors would always win).
          defaultColor: false,
        },
      ],
    ],
  },
} satisfies NonNullable<ComponentProps<typeof MDXRemote>['options']>;