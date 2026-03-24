import { Metadata } from 'next';
import { getBlogCategoriesWithPostCount } from '@/lib/blog';
import { BlogCategoryCard } from '@/components/blog/blog-category-card';

export const metadata: Metadata = {
  title: 'Blog Categories | Personal IT Website',
  description: 'Browse blog posts by category',
};

export default async function CategoriesPage() {
  const categoriesWithCount = await getBlogCategoriesWithPostCount();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Blog Categories</h1>
        <p className="text-muted-foreground mb-8">
          Explore blog posts organized by category.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesWithCount.map((category) => (
            <BlogCategoryCard
              key={category.slug}
              category={category}
              postCount={category.postCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}