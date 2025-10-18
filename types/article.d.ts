// ============================================================================
// Article Types - Polindo Frontend
// ============================================================================

import type { PaginationLinks, PaginationMeta } from "./common";

/**
 * Article Tag entity
 */
export interface ArticleTag {
  id: number;
  tag: string;
  tag_slug: string;
}

/**
 * Article Images entity with multiple sizes
 */
export interface ArticleImages {
  big: string;
  default: string;
  slider: string;
  mid: string;
  small: string;
  url: string;
  mime: string;
  description: string;
}

/**
 * Article Author entity
 */
export interface ArticleAuthor {
  id: number;
  username: string;
  slug: string;
  avatar: string | null;
  display_name: string;
}

/**
 * Article Category entity (simplified for article context)
 */
export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  color: string;
}

/**
 * Article entity from API
 */
export interface Article {
  id: number;
  title: string;
  title_slug: string;
  summary: string | null;
  content?: string;
  is_featured: boolean;
  post_type: string;
  status: boolean;
  visibility: boolean;
  pageviews: number;
  tags: ArticleTag[];
  images: ArticleImages | null;
  author: ArticleAuthor | null;
  category: ArticleCategory | null;
  created_at: string;
  updated_at: string;
}

/**
 * Article List Response
 */
export interface ArticleListResponse {
  data: Article[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

/**
 * Article Detail Response
 */
export interface ArticleDetailResponse {
  data: Article;
  message: string;
  status: boolean;
}
