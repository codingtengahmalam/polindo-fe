/**
 * Widget and Ads Types
 */

export interface Ad {
  id: number;
  ad_title: string;
  ad_title_visible: string; // "0" or "1"
  ad_content: string; // Image URL
  ad_location: string;
  ad_url: string;
  ad_status: boolean;
  ad_source: string;
  ad_order: number;
  ad_start: string; // Format: "YYYY-MM-DD HH:mm:ss"
  ad_expired: string; // Format: "YYYY-MM-DD HH:mm:ss"
  created_at: string;
  updated_at: string;
}

export interface AdsListResponse {
  data: Ad[];
}
