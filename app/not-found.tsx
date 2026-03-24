import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">The page you are looking for does not exist.</p>
        <Link href="/" className="text-sm font-medium underline-offset-4 hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}
