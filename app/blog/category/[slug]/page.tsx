import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogCategories, getBlogPostsByCategory } from '@/lib/blog';
import { BlogList } from '@/components/blog/blog-list';
import { BlogCategoryList } from '@/components/blog/blog-category-list';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = blogCategories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: 'Category Not Found | Personal IT Website',
    };
  }

  return {
    title: `${category.name} | Personal IT Website`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = blogCategories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = await getBlogPostsByCategory(slug);

  return (
    <main className="max-w-6xl px-4 py-8 mx-auto flex justify-center items-stretch gap-6 lg:py-16 flex-col">


      <div className="w-full flex-1 items-center justify-between">
        <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground mb-2">{category.description}</p>
        <p className="text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-start gap-6">
        <BlogCategoryList className="sticky top-40" />

        <div className="w-full lg:w-3/4 text-md relative">

          <div className="container mx-auto ">
            <BlogList posts={posts} />
          </div>
        </div>
      </div>
    </main>
  );
}