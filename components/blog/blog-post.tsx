import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { IconArrowLeft } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { mdxComponents } from '@/lib/mdx-components';
import { mdxOptions } from '@/lib/mdx';

interface BlogPostProps {
  title: string;
  date: string;
  excerpt?: string;
  readTime: string;
  categories: string[];
  content: string; // The raw MDX content string
}

export function BlogPost({
  title,
  date,
  excerpt,
  readTime,
  categories,
  content,
}: BlogPostProps) {
  const publishDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article>
      <header className="flex flex-col gap-6 border-b border-border pt-24 pb-12">
        <Link
          href="/blog"
          className="inline-flex w-fit items-center gap-2 font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconArrowLeft className="size-3.5" aria-hidden="true" />
          ALL WRITINGS
        </Link>

        <h1 className="text-[clamp(36px,6vw,56px)] leading-[1.1] font-light tracking-[-0.025em] text-balance">
          {title}
        </h1>

        {excerpt && (
          <p className="max-w-[640px] text-xl leading-relaxed text-pretty text-muted-foreground">{excerpt}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground uppercase">
          {categories.map((category) => (
            <Badge key={category} asChild className="font-sans normal-case">
              <Link href={`/blog/category/${category}`}>{category}</Link>
            </Badge>
          ))}
          <time dateTime={date}>{publishDate}</time>
          <span aria-hidden="true">·</span>
          <span>{readTime}</span>
        </div>
      </header>

      <div className="prose max-w-[680px] pt-6 text-[17px] leading-[1.75] text-prose">
        <MDXRemote source={content} components={mdxComponents} options={mdxOptions} />
      </div>
    </article>
  );
}
