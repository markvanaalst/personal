'use client';

import { Post } from '@/types/post';
import Link from 'next/link';

export default function PostsList({ posts }: { posts: Post[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2">
      {posts.map(({ frontmatter: { title, date, slug, categories }}, index) => (
        <li key={`${slug}-${index}`}>
          <Link href={`/blog/${categories[0]}/${slug}`}>
            {title} <span className="text-sm text-gray-500">({date})</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
