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
        },
      ],
    ],
  },
} satisfies NonNullable<ComponentProps<typeof MDXRemote>['options']>;