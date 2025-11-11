export interface SettingResponse {
  data: Setting;
}

export interface Setting {
  id: number;
  lang_id: number;
  site_title: string;
  home_title: string;
  site_description: string;
  keywords: string;
  application_name: string;
  primary_font: number;
  secondary_font: number;
  tertiary_font: number;
  social_media: any;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  pinterest_url: string;
  linkedin_url: string;
  vk_url: string;
  telegram_url: string;
  youtube_url: string;
  optional_url_button_name: string;
  about_footer: string;
  contact: any;
  contact_text: string;
  contact_address: string;
  contact_email: string;
  contact_phone: string;
  copyright: string;
  cookies_warning: boolean;
  cookies_warning_text: string;
  android_version: string;
  android_version_code: number;
  android_version_forced: string;
  android_download_link: string;
  fcm_key: string;
  fcm_topic: string;
  logo_url: string;
  favicon_url: string;
  dashboard_url: string;
  created_at: any;
  updated_at: any;
}
