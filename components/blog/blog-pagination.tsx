'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  className = '',
}: PaginationProps) {
  // Don't render if only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const prevHref = isFirstPage
    ? baseUrl
    : currentPage === 2
    ? baseUrl
    : `${baseUrl}?page=${currentPage - 1}`;

  const nextHref = `${baseUrl}?page=${currentPage + 1}`;

  return (
    <nav
      className={`flex items-center justify-center gap-4 mt-8 ${className}`}
      aria-label="Pagination"
    >
      <Button
        asChild
        variant="outline"
        size="sm"
        disabled={isFirstPage}
        aria-label="Go to previous page"
      >
        <Link
          href={prevHref}
          tabIndex={isFirstPage ? -1 : 0}
          aria-disabled={isFirstPage}
        >
          Previous
        </Link>
      </Button>

      <span
        className="text-sm text-muted-foreground"
        aria-live="polite"
        aria-atomic="true"
      >
        Page {currentPage} of {totalPages}
      </span>

      <Button
        asChild
        variant="outline"
        size="sm"
        disabled={isLastPage}
        aria-label="Go to next page"
      >
        <Link
          href={nextHref}
          tabIndex={isLastPage ? -1 : 0}
          aria-disabled={isLastPage}
        >
          Next
        </Link>
      </Button>
    </nav>
  );
}
