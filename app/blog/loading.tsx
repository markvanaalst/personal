export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="h-9 w-40 rounded bg-muted animate-pulse" />
        <div className="space-y-4">
          <div className="h-28 rounded bg-muted animate-pulse" />
          <div className="h-28 rounded bg-muted animate-pulse" />
          <div className="h-28 rounded bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
}
