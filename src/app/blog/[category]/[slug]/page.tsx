import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { getPostByCategoryAndSlug } from '@/lib/blog';

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const files = await fs.readdir(blogDir, { recursive: true });

  return files
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => ({
      slug: file.replace(/\.(mdx|md)$/, '').split(path.sep),
    }));
}

export default async function PostPage(props: { params: Promise<{ category: string, slug: string }> }) {
  const params = await props.params;
  const post = await getPostByCategoryAndSlug(params.category, params.slug);
console.log('Post:', post);
  if (!post) {
    notFound();
  }

  return (
    <article className="prose mx-auto">
      <h1>{post.frontmatter.title}</h1>
      <p className="text-sm text-gray-500">{post.frontmatter.date}</p>
      {post.frontmatter.excerpt && <p className="italic">{post.frontmatter.excerpt}</p>}
      <hr className="my-4" />
      {post.content}
    </article>
  );
}


