import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconArrowLeft } from '@tabler/icons-react';
import { mdxComponents } from '@/lib/mdx-components';
import { mdxOptions } from '@/lib/mdx';

interface BlogPostProps {
  title: string;
  date: string;
  readTime: string;
  categories: string[];
  content: string; // The raw MDX content string
}

export function BlogPost({
  title,
  date,
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
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-4">
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Badge key={category} variant="secondary">
              <Link href={`/blog/category/${category}`} className="hover:underline">
                {category}
              </Link>
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-4">{title}</h1>

        <div className="text-sm text-muted-foreground mb-6">
          <time dateTime={date}>{publishDate}</time> · <span>{readTime}</span>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <MDXRemote source={content} components={mdxComponents} options={mdxOptions} />
      </div>
    </article>
  );
}