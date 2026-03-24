import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogCategory as BlogCategoryType } from '@/lib/types';
import { IconArrowRight } from '@tabler/icons-react';

interface BlogCategoryCardProps {
  category: BlogCategoryType;
  postCount?: number;
}

export function BlogCategoryCard({ category, postCount }: BlogCategoryCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {category.image && (
        <div className="relative w-full h-40 bg-linear-to-r from-primary/20 to-primary/10 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary">{category.name}</h3>
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg">{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {postCount !== undefined && (
            <span className="text-sm text-muted-foreground">
              {postCount} {postCount === 1 ? 'post' : 'posts'}
            </span>
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/blog/category/${category.slug}`}>
              View
              <IconArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}