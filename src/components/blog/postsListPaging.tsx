'use client';

import { buttonVariants } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { cn } from '@/lib/utils';

interface PostListPagingProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  queryParamName?: string;
}

export function PostListPaging({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  queryParamName = 'page',
}: PostListPagingProps) {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Effect to handle URL query params
  useEffect(() => {
    const pageParam = searchParams.get(queryParamName);
    if (pageParam) {
      const parsedPage = parseInt(pageParam, 10);
      if (
        !isNaN(parsedPage) &&
        parsedPage >= 1 &&
        parsedPage <= totalPages &&
        parsedPage !== currentPage
      ) {
        onPageChange(parsedPage);
      }
    }
  }, [searchParams, queryParamName, onPageChange, totalPages, currentPage]);

  // No pagination needed if only one page
  if (totalPages <= 1) return null;

  // Function to determine which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Adjust based on your preference

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than or equal to max visible
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always include first page, last page, current page and pages adjacent to current
    pageNumbers.push(1);

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) pageNumbers.push(-1); // Add ellipsis

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) pageNumbers.push(-2); // Add ellipsis

    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
          </PaginationItem>

          {getPageNumbers().map((page, index) =>
            page < 0 ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={`page-${page}`} >
                <PaginationLink
                  href={`?page=${page}`}
                  aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                    className={cn(
                      buttonVariants({
                        variant: currentPage === page ? "outline" : "ghost",
                      }),
                    )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext href={`?page=${currentPage + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
