import { Post } from '@/types/post';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export interface BlogCardProps {
  post: Post;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className={cn('border-none shadow-none p-0 bg-background')}>
      <CardHeader className="inline flex-row items-center gap-3 p-0 font-semibold">
        <div className="relative">  
        <Image
            src={post.frontmatter.image ?? '/images/blog/StockSnap_ZTXOFYBPSL-scaled.jpg'}
            alt={post.frontmatter.title}
            className="object-cover w-full h-64 rounded-lg dark:opacity-90"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '200px' }} // optional
        />
        <Badge className="absolute flex top-4 right-4 opacity-80">
          <Link href={`/blog/category/${post.frontmatter.categories[0]}`}>
            {post.frontmatter.categories[0]}
          </Link>
        </Badge>
</div>
        <h3 className='mt-4'>{post.frontmatter.title}</h3>
      </CardHeader>
      <CardContent className="text-[15px] text-muted-foreground p-0 h-full">
        <p>{post.frontmatter.excerpt}</p>
      </CardContent>
      <CardFooter className='p-0'>
        <Button variant="link" effect="hoverUnderline" icon={ArrowRight} iconPlacement="right" asChild className='p-0'>
          <Link href={`/blog/${post.frontmatter.categories[0]}/${post.frontmatter.slug}`} className='p-0'>
            Read more
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
