import { Post } from '@/types/post';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export interface BlogCardProps {
  post: Post;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="max-w-xs shadow-none">
      <CardHeader className="px-5 inline flex-row items-center gap-3 font-semibold">
        <div>{post.frontmatter.title}</div>
      </CardHeader>
      <CardContent className="text-[15px] text-muted-foreground px-5 h-full">
        <p>{post.frontmatter.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" effect="shineHover" icon={ArrowRight} iconPlacement="right" asChild>
          <Link href={`/blog/${post.frontmatter.categories[0]}/${post.frontmatter.slug}`}>
            Read more
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
