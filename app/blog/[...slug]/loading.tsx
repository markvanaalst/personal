export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="h-8 w-48 rounded bg-muted animate-pulse" />
        <div className="h-10 w-3/4 rounded bg-muted animate-pulse" />
        <div className="h-5 w-40 rounded bg-muted animate-pulse" />
        <div className="space-y-3 pt-4">
          <div className="h-4 rounded bg-muted animate-pulse" />
          <div className="h-4 rounded bg-muted animate-pulse" />
          <div className="h-4 rounded bg-muted animate-pulse" />
          <div className="h-4 rounded bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
}
