import Link from 'next/link';
import { Card, CardContent, CardHeader, } from '@/components/ui/card';
import { getBlogCategoriesWithPostCount } from '@/lib/blog';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
interface BlogCategoryListProps {
  className?: string;
}

export async function BlogCategoryList({ className }: BlogCategoryListProps) {
  const categoriesWithCount = await getBlogCategoriesWithPostCount();


  if (categoriesWithCount.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No blog categories found.</p>
      </div>
    );
  }

  return (
    <>
      <Card className={`hidden lg:w-1/4 lg:sticky h-full lg:top-16 px-4 py-6 ${className}`}>
        <CardHeader>
          <h3 className="text-lg font-semibold">Categories</h3>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {categoriesWithCount.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
            >
              {category.name} ({category.postCount})
            </Link>
          ))}

        </CardContent>
      </Card>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="lg:hidden w-full">
          <Button variant="outline">Categories</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categoriesWithCount.map((category) => (
            <DropdownMenuItem key={category.slug} asChild>
              <Link href={`/blog/category/${category.slug}`}>
                {category.name} ({category.postCount})
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}