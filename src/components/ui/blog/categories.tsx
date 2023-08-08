import { getCategories } from '@/lib/categories'
import cn from '@/lib/cn'

const Categories = () => {
  const categories = getCategories()

  return (
    <div className="w-full max-w-xs p-4 mt-4 mb-8 overflow-hidden bg-theme-bg-alt text-theme-text">
      <div className="top-0 w-full">
        <h4 className={cn('font-normal px-1 mb-4')}>Categories</h4>
        <ul className={cn('text-xs')}>
          {categories.map((category, i) => (
            <li className="px-1 py-2 transition duration-300" key={i}>
              <a
                href={`/blog/category/${category.slug}`}
                className="flex items-center cursor-pointer text-theme-text"
              >
                {category.name}
                <span className="ml-auto text-gray-500">
                  {category.count} articles
                </span>
                <i className="ml-1 text-gray-500 bx bx-right-arrow-alt" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Categories
