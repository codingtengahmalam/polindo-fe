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
import FacebookIcon from "~/assets/social-media-ori/fb.png";
import TiktokIcon from "~/assets/social-media-ori/tiktok.png";
import YoutubeIcon from "~/assets/social-media-ori/yt.png";
import InstagramIcon from "~/assets/social-media-ori/ig.png";

// Types
interface SocialMediaLink {
  name: string;
  icon: string;
  url: string;
}

// Get runtime config
const config = useRuntimeConfig();

// Social media links with URLs from environment variables
const SOCIAL_MEDIA: readonly SocialMediaLink[] = [
  {
    name: "Facebook",
    icon: FacebookIcon,
    url: config.public.socialMedia.facebook,
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: config.public.socialMedia.instagram,
  },
  {
    name: "TikTok",
    icon: TiktokIcon,
    url: config.public.socialMedia.tiktok,
  },
  {
    name: "YouTube",
    icon: YoutubeIcon,
    url: config.public.socialMedia.youtube,
  }
] as const;
</script>
