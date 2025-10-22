// ============================================================================
// Pages Types - Polindo Frontend
// ============================================================================

/**
 * Page entity structure
 */
export interface Page {
  id: number;
  title: string;
  slug: string;
  page_type: "page" | "link";
  visibility: boolean;
  created_at: string;
  updated_at: string | null;
}

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
 * Updated pagination metadata structure
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
 * Updated pagination links structure
 */
export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

/**
 * Base API response structure
 */
export interface BaseApiResponse {
  success: boolean;
  message: string;
}

/**
 * Pages list response
 */
export interface PagesListResponse extends BaseApiResponse {
  data: Page[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface PageDetail {
  id: number;
  lang_id: number;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  is_custom: boolean;
  page_default_name: any;
  page_content: string;
  page_order: number;
  visibility: boolean;
  title_active: boolean;
  breadcrumb_active: boolean;
  right_column_active: boolean;
  need_auth: boolean;
  location: string;
  link: any;
  parent_id: number;
  page_type: string;
  parent: any;
  children: any[];
  created_at: string;
  updated_at: any;
}


/**
 * Single page response
 */
export interface PageDetailResponse extends BaseApiResponse {
  data: PageDetail;
}
