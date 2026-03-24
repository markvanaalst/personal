
// Blog post data structure
export interface BlogPost {
  slug: string;
  title: string;
  content: string; // MDX content
  excerpt: string;
  date: string; // ISO date string
  readTime: string;
  categories: string[];
  published: boolean;
}

// Blog category data structure
export interface BlogCategory {
  name: string;
  description: string;
  slug: string;
  image: string;
}

export interface BlogCategoryWithPostCount extends BlogCategory {
  postCount: number;
}

// Pagination data structures
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: PaginationInfo;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}
