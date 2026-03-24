import { PaginationInfo } from './types';

export const POSTS_PER_PAGE = 5;
export const DEFAULT_PAGE = 1;

/**
 * Extract and validate current page number from querystring
 */
export function getCurrentPage(page: string | undefined): number {
  const pageNum = Number(page);
  return Number.isNaN(pageNum) || pageNum < 1 ? DEFAULT_PAGE : Math.floor(pageNum);
}

/**
 * Calculate total number of pages needed
 */
export function calculateTotalPages(
  totalItems: number,
  itemsPerPage: number
): number {
  if (totalItems <= 0) return 0;
  return Math.ceil(totalItems / itemsPerPage);
}

/**
 * Extract items for a specific page from an array
 */
export function getPaginatedItems<T>(
  items: T[],
  page: number,
  itemsPerPage: number
): T[] {
  if (items.length === 0) return [];
  
  const totalPages = calculateTotalPages(items.length, itemsPerPage);
  
  // Clamp page to valid range
  const validPage = Math.max(1, Math.min(page, totalPages || 1));
  
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return items.slice(startIndex, endIndex);
}

/**
 * Generate complete pagination metadata
 */
export function getPaginationInfo(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
): PaginationInfo {
  const totalPages = calculateTotalPages(totalItems, itemsPerPage);
  const validCurrentPage = totalPages === 0 ? 1 : Math.max(1, Math.min(currentPage, totalPages));
  
  return {
    currentPage: validCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: validCurrentPage < totalPages,
    hasPreviousPage: validCurrentPage > 1,
  };
}
