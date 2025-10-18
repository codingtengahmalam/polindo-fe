// ============================================================================
// Category Types - Polindo Frontend
// ============================================================================

import type { PaginationLinks, PaginationMeta } from "./common";

/**
 * Category entity from API
 */
export interface Category {
  id: number;
  name: string;
  name_slug: string;
  description: string | null;
  keywords: string | null;
  color: string;
  block_type: string;
  category_order: number;
  show_at_homepage: boolean;
  show_on_menu: boolean;
  category_image: string | null;
  lang_id: number;
  parent_id: number;
  created_at: string;
  updated_at: string | null;
}

/**
 * Category List Response
 */
export interface CategoryListResponse {
  data: Category[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

/**
 * Query parameters for categories API
 */
export interface CategoryQueryParams {
  show_on_menu?: boolean;
  per_page?: number;
  show_at_homepage?: boolean;
}

/**
 * Category Detail Response
 */
export interface CategoryDetailResponse {
  data: Category;
}
