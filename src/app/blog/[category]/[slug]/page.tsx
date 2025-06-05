import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { getPostByCategoryAndSlug } from '@/lib/blog';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
  params: Promise<{ category: string; slug: string }>;
}) {
  const params = await props.params;
  const post = await getPostByCategoryAndSlug(params.category, params.slug);

  if (!post) {
    notFound();
  }

  const publishDate =
    post.frontmatter.date &&
    new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(post.frontmatter.date));

  const backgroundImage = post.frontmatter.image ? post.frontmatter.image : '/images/desk.jpg';

  return (
    <>
      <div
        className={`relative min-h-420 bg-cover sm:min-h-120 dark:bg-opacity-50`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-slate-950/50 dark:bg-slate-950/70 min-h-420 sm:min-h-120">
          <div className={cn('px-4 mx-auto max-w-5xl py-24 lg:py-36')}>
            <h1
              className={cn(
                'text-xl md:text-5xl font-semibold leading-normal mt-0 mb-3 text-white'
              )}
            >
              {post.frontmatter.title}
            </h1>
            {publishDate && <div className={cn('text-white mb-4')}>Published on {publishDate}</div>}
            {post.frontmatter.tags?.map((tag, key) => (
              <Badge variant={'secondary'} key={key} className={cn('mr-4')}>
                {tag}
              </Badge>
            ))}
          </div>
          <div
            className={cn('absolute left-0 w-full -bottom-1 xpageheader')}
            style={{ height: `calc(6% + 8vw)` }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 8"
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              className="rotate dark:hidden fill-background"
            >
              <path d="M64 7.9 L64 10 L0 10 L0 0 Z"></path>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 8"
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              className="hidden rotate dark:block dark:fill-background"
            >
              <path d="M64 7.9 L64 10 L0 10 L0 0 Z"></path>
            </svg>
          </div>
        </div>
      </div>

      <main className="min-h-[calc(100vh-20rem)] flex flex-col items-center py-8 px-6 max-w-7xl mx-auto">
      <article
        className={cn(
          'prose max-w-4xl border-gray-500 dark:prose-invert prose-img:rounded-md prose-img:border-1 prose-img:shadow-xl prose-img:my-8 prose-table:-mx-20 prose-table:w-fit'
        )}
      >
        {post.content}
      </article>
      </main>
      </>
  );
}
