import { contentColumn } from '@/lib/site';

export default function BlogLoading() {
  return (
    <div className={contentColumn}>
      <div className="space-y-6 pt-16 lg:pt-24">
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
