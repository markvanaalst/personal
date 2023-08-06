import Categories from '@/components/ui/blog/categories'
import FeaturedPostItem from '@/components/ui/blog/featuredPost'
import PostItem from '@/components/ui/blog/post'
import Profile from '@/components/ui/blog/profile'
import { getLatestPost, getLatestPosts } from '@/lib/blog'
import cn from '@/lib/cn'

export default function Home() {
  return (
    <div className={cn('flex flex-col justify-center min-h-[70vh]')}>
      <FeaturedPostItem post={getLatestPost()} />
      <div className={cn('flex flex-col items-center')}>
        <div className={cn('flex flex-row flex-wrap py-4')}>
          <div className={cn('w-full sm:w-2/3 md:w-3/4 px-2 max-w-4xl')}>
            <div className="grid gap-4 mt-4 md:grid-cols-2 sm:grid-cols-1">
              {getLatestPosts(5, true).map((post, key) => (
                <PostItem post={post} key={key} />
              ))}
            </div>
          </div>
          <div className={cn('w-full sm:w-1/3 md:w-1/4 px-2')}>
            <Profile />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
