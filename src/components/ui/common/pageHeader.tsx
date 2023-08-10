import cn from '@/lib/cn'

type PageHeaderProps = {
  image?: string
  title: string
  date?: string
}

export const PageHeader = ({ image, title, date }: PageHeaderProps) => {
  const publishDate =
    date &&
    new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
      new Date(date),
    )

  const backgroundImage = image ? image : '/images/desk.jpg'

  return (
    <div
      className={`relative min-h-420 bg-cover sm:min-h-120`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-slate-950/50 min-h-420 sm:min-h-120">
        <div className={cn('px-4 mx-auto max-w-5xl py-24 lg:py-36')}>
          <div className={cn('invert')}>
            <h1
              className={cn(
                'text-4xl font-bold leading-normal mt-0 mb-3 theme-text',
              )}
            >
              {title}
            </h1>
            {publishDate && (
              <div className={cn('')}>Published on {publishDate}</div>
            )}
          </div>
        </div>
        <div
          className={cn('absolute left-0 w-full -bottom-1 invert')}
          style={{ height: `calc(6% + 8vw)` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 8"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            className="rotate"
          >
            <path fill="currentColor" d="M64 7.9 L64 10 L0 10 L0 0 Z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}
