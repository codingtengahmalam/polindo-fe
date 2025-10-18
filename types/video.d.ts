// ============================================================================
// Video Types - Polindo Frontend
// ============================================================================

import type { PaginationLinks, PaginationMeta } from "./common";

/**
 * Video Author entity
 */
export interface VideoAuthor {
  id: number;
  username: string;
  slug: string;
  avatar: string | null;
  display_name: string;
}

/**
 * Video Post entity from API
 */
export interface VideoPost {
  id: number;
  title: string;
  video_slug: string;
  subtitle: string;
  keywords: string;
  summary: string;
  visibility: boolean;
  status: string;
  video_path: string;
  video_description: string | null;
  image_thumbnail: string | null;
  thumbnail_url: string | null;
  user_approval: boolean;
  user: VideoAuthor;
  created_at: string;
  updated_at: string;
}

/**
 * Video Post List Response
 */
export interface VideoPostListResponse {
  data: VideoPost[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

/**
 * Video Post Detail Response
 */
export interface VideoPostDetailResponse {
  data: VideoPost;
}

/**
 * Query parameters for video posts API
 */
export interface VideoPostQueryParams {
  page?: number;
  per_page?: number;
  status?: string;
  visibility?: boolean;
}
