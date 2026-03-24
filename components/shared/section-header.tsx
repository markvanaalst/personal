type SectionHeaderProps = {
  title: string;
  description: string;
  className?: string;
};

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-border" />
        <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {title}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <p className="text-center text-muted-foreground text-sm max-w-md mx-auto">
        {description}
      </p>
    </div>
  )
}
