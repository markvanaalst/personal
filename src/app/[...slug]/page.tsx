import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getPageFileBySlug } from '@/lib/pages';

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const files = await fs.readdir(blogDir, { recursive: true });

  return files
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => ({
      slug: file.replace(/\.(mdx|md)$/, '').split(path.sep),
    }));
}

export default async function PostPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = await getPageFileBySlug(params.slug);
  console.log('Page:', params.slug);
  if (!page) {
    notFound();
  }

  return (
    <div className={cn('flex flex-col py-16 h-[calc(100vh-160px)] max-w-5xl mx-auto')}>
      <article className={cn('w-full mx-auto')}>
        <div
          className={cn(
            'prose w-full border-gray-500 dark:prose-invert prose-img:rounded-md prose-img:border-1 prose-img:shadow-xl prose-img:my-8 prose-table:-mx-20 prose-table:w-fit',
          )}
              >
                  <h1>{page.frontmatter.title}</h1>
                  
                  {page.content}
        </div>
      </article>
    </div>
  )
}