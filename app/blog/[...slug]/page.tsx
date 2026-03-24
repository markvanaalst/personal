import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogPostBySlug, getBlogPostBySlugWithMdx } from '@/lib/blog';
import { BlogPost } from '@/components/blog/blog-post';

interface BlogPostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

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
  const ogImageUrl = `/blog/og/${slugString}`;

  if (!post) {
    return {
      title: 'Post Not Found | Personal IT Website',
    };
  }

  return {
    title: `${post.title} | Personal IT Website`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const post = await getBlogPostBySlugWithMdx(slugString);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readTime } = post;

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogPost
        title={frontmatter.title as string}
        date={frontmatter.date as string}
        readTime={readTime}
        categories={(frontmatter.categories as string[]) || []}
        content={content}
      />
    </div>
  );
}
