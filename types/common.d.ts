// ============================================================================
// Common/Shared Types - Polindo Frontend
// ============================================================================

/**
 * Pagination links structure
 */
export interface PaginationLinks {
  first: string;
  last: string | null;
  prev: string | null;
  next: string | null;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  current_page: number;
  current_page_url: string;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
