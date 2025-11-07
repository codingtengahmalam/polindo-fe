<template>
  <aside
    class="w-full bg-white rounded-lg space-y-4"
    aria-labelledby="social-media-title"
  >
    <h2 id="social-media-title" class="text-title font-semibold">
      Ikuti Kami
    </h2>

    <nav
      class="flex items-center justify-center md:justify-start gap-4"
      aria-label="Social media links"
    >
      <a
        v-for="socialMedia in SOCIAL_MEDIA"
        :key="socialMedia.name"
        :href="socialMedia.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Follow us on ${socialMedia.name}`"
        class="transition-opacity hover:opacity-70"
      >
        <img
          :src="socialMedia.icon"
          :alt="`${socialMedia.name} icon`"
          width="24"
          height="24"
          class="h-6 w-6"
        />
      </a>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import FacebookIcon from "~/assets/social-media/ri_facebook-fill.png";
import InstagramIcon from "~/assets/social-media/uil_instagram.png";
import TiktokIcon from "~/assets/social-media/ic_baseline-tiktok.png";
import YoutubeIcon from "~/assets/social-media/mdi_youtube.png";
import RSSIcon from "~/assets/social-media/ri_rss-fill.png";

// Types
interface SocialMediaLink {
  name: string;
  icon: string;
  url: string;
}

// Constants with type safety
const SOCIAL_MEDIA: readonly SocialMediaLink[] = [
  {
    name: "Facebook",
    icon: FacebookIcon,
    url: "https://www.facebook.com/pages/PolitikIndonesia/113063772047616",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://www.instagram.com/politikindonesia.id",
  },
  {
    name: "TikTok",
    icon: TiktokIcon,
    url: "https://www.tiktok.com/@politikindonesia.id",
  },
  {
    name: "YouTube",
    icon: YoutubeIcon,
    url: "https://www.youtube.com/@politikindonesia-id",
  },
  {
    name: "RSS Feed",
    icon: RSSIcon,
    url: "/rss",
  },
] as const;
</script>
