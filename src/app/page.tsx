import PostItem from '@/components/ui/blog/post'
import { getLatestPost, getLatestPosts } from '@/lib/blog'
import cn from '@/lib/cn'

export default function Home() {
  return (
    <div className={cn('flex flex-col justify-center min-h-[70vh]')}>
      <div className={cn('flex flex-col items-center text-center')}>
        <div className={cn('flex flex-row flex-wrap py-4')}>
          <div className={cn('w-full sm:w-2/3 md:w-3/4 px-2 max-w-4xl')}>
            <PostItem post={getLatestPost()} wide={true} />
            <div className="flex flex-wrap">
              {getLatestPosts(5, true).map((post, key) => (
                <PostItem post={post} key={key} />
              ))}
            </div>
          </div>
          <div className={cn('w-full sm:w-1/3 md:w-1/4 px-2')}>Sidebar</div>
        </div>
      </div>
    </div>
  )
}
