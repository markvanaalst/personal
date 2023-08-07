import { getCategories } from '@/lib/categories'
import cn from '@/lib/cn'

const Categories = () => {
  const categories = getCategories()

  return (
    <div className="w-full border bg-theme-bg-alt text-theme-text max-w-xs overflow-hidden rounded-xl shadow-lg mt-4 mb-8 p-4">
      <div className="top-0 w-full">
        <h4 className={cn('font-normal px-1')}>Categories</h4>
        <ul className={cn('text-sm')}>
          {categories.map((category, i) => (
            <li className="px-1 py-2 transition duration-300" key={i}>
              <a
                href={`/blog/category/${category.slug}`}
                className="flex items-center text-theme-text cursor-pointer"
              >
                {category.name}
                <span className="text-gray-500 ml-auto">
                  {category.count} articles
                </span>
                <i className="text-gray-500 bx bx-right-arrow-alt ml-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Categories
