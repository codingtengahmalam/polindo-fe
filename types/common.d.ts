// ============================================================================
// Common/Shared Types - Polindo Frontend
// ============================================================================

/**
 * Pagination link item structure
 */
export interface PaginationLinkItem {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

/**
 * Pagination links structure
 */
export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

/**
 * Pagination metadata structure
 */
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLinkItem[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

/**
 * Base API response structure
 */
export interface BaseApiResponse {
  success: boolean;
  message: string;
}
