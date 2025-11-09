/**
 * Widget and Ads Types
 */

export interface AdContent {
  image: string;
  url: string;
  target: '_blank' | '_self' | '_parent' | '_top';
  date_start: string;
  date_end: string;
}

export interface Ad {
  id: number;
  lang_id: number;
  title: string;
  visible_title: boolean;
  content: AdContent;
  type: string;
  widget_order: number;
  visibility: boolean;
  is_custom: number;
  location: string;
  created_at: string;
}

export interface AdsListResponse {
  data: Ad[];
}
