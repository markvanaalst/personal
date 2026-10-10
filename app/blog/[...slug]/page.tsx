import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogCategories, getAllBlogSlugs, getBlogPostBySlug, getBlogPostBySlugWithMdx } from '@/lib/blog';
import { BlogPost } from '@/components/blog/blog-post';
import { pageMetadata } from '@/lib/metadata';
import { authorName, contentColumn, siteUrl } from '@/lib/site';
import { JsonLd, blogPostingSchema, breadcrumbSchema } from '@/lib/structured-data';

interface BlogPostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Only published posts are pre-rendered; anything else (including drafts) 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const post = await getBlogPostBySlug(slugString);

  if (!post || !post.published) {
    return {
      title: 'Post Not Found',
      robots: { index: false },
    };
  }

  const metadata = pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: { url: `/blog/og/${post.slug}`, width: 1200, height: 630, alt: post.title },
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      authors: [siteUrl],
      section: post.categories[0],
      tags: post.tags,
    },
  });

  return {
    ...metadata,
    keywords: post.tags.length > 0 ? post.tags : undefined,
    authors: [{ name: authorName, url: siteUrl }],
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const [post, mdxPost] = await Promise.all([
    getBlogPostBySlug(slugString),
    getBlogPostBySlugWithMdx(slugString),
  ]);

  if (!post || !mdxPost || !post.published) {
    notFound();
  }

  const category = blogCategories.find((c) => c.slug === post.categories[0]);

  return (
    <div className={contentColumn}>
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          ...(category ? [{ name: category.name, path: `/blog/category/${category.slug}` }] : []),
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <BlogPost
        title={post.title}
        date={post.date}
        excerpt={post.excerpt}
        readTime={post.readTime}
        categories={post.categories}
        content={mdxPost.content}
      />
    </div>
  );
}
