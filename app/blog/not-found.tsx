import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold">Blog content not found</h1>
        <p className="text-muted-foreground">
          The post or category you requested could not be found.
        </p>
        <Link href="/blog" className="text-sm font-medium underline-offset-4 hover:underline">
          Back to blog
        </Link>
      </div>
    </div>
  );
}
