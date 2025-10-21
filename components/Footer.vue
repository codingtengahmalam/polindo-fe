<template>
  <footer>
    <!-- Main Footer Content -->
    <div class="bg-grayscale-90">
      <ContentContainer class="py-10 px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-white">
          <!-- Company Info & Contact -->
          <div class="space-y-5">
            <NuxtLink to="/" aria-label="Go to homepage">
              <img
                src="/logo.png"
                alt="Politik Indonesia - Jaringan Informasi Politik"
                height="48"
                class="h-12 w-auto"
              />
            </NuxtLink>
            <address class="not-italic space-y-3 text-[#E5E8E8]">
              <div class="flex gap-3 items-start">
                <IconTower class="h-5 shrink-0 mt-0.5" />
                <span class="text-sm leading-relaxed">
                  {{ settings?.contact_address ?? "Villa Melati Mas Blok M6 No 5, Jelupang, Serpong Utara, Tangerang Selatan" }}
                </span>
              </div>
              <div class="flex gap-3 items-center">
                <IconMail class="h-4 shrink-0" />
                <a
                  href="mailto:politikindonesiaonline@gmail.com"
                  class="text-sm hover:text-white transition-colors"
                >
                  {{ settings?.contact_email ?? "politikindonesiaonline@gmail.com" }}
                </a>
              </div>
            </address>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-4" aria-label="Footer navigation">
            <h2 class="text-sm font-semibold uppercase text-[#E5E8E8]">
              Pedoman Kami
            </h2>
            <ul class="space-y-2">
              <li v-for="page in pages" :key="page.id">
                <NuxtLink
                  :to="page.slug"
                  class="text-sm hover:text-[#E5E8E8] transition-colors inline-block"
                >
                  {{ page.title }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- App Download Links -->
          <div class="space-y-4">
            <h2 class="text-sm font-semibold uppercase text-[#E5E8E8]">
              Unduh Aplikasi POLINDO
            </h2>
            <div class="flex flex-row md:flex-col gap-3">
              <a
                v-for="app in APPS"
                :key="app.name"
                :href="app.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Download on ${app.name}`"
                class="transition-opacity hover:opacity-80"
              >
                <img
                  :src="app.icon"
                  :alt="`Download on ${app.name}`"
                  width="135"
                  height="40"
                  class="h-10 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>

    <!-- Footer Bottom - Copyright & Social Media -->
    <div class="bg-grayscale-100 py-4">
      <ContentContainer
        class="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between text-white px-4"
      >
        <!-- Social Media Links -->
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
              class="h-5 md:h-6 w-auto"
            />
          </a>
        </nav>

        <!-- Copyright -->
        <div
          class="text-center md:text-right text-xs md:text-sm text-[#E5E8E8]"
        >
          <p>
            &copy; {{ currentYear }} Politik Indonesia. All rights reserved.
          </p>
        </div>
      </ContentContainer>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import FacebookIcon from "~/assets/social-media/ri_facebook-fill.png";
import InstagramIcon from "~/assets/social-media/uil_instagram.png";
import TiktokIcon from "~/assets/social-media/ic_baseline-tiktok.png";
import YoutubeIcon from "~/assets/social-media/mdi_youtube.png";
import RSSIcon from "~/assets/social-media/ri_rss-fill.png";
import AppStoreIcon from "~/assets/appstore.png";
import GooglePlayIcon from "~/assets/playstore.png";
import type { Page, PagesListResponse } from "~/types";

const { settings } = useSettings();
const pages = ref<Page[]>([]);
const pagesState = useState<PagesListResponse | null>("pages-state", () => null);

// Types
interface SocialMediaLink {
  name: string;
  icon: string;
  url: string;
}

interface GuidelineLink {
  name: string;
  url: string;
}

interface AppLink {
  name: string;
  icon: string;
  url: string;
}

// Reactive state
const currentYear = new Date().getFullYear();

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

const APPS: readonly AppLink[] = [
  {
    name: "Google Play",
    icon: GooglePlayIcon,
    url: settings.value?.android_download_link ?? "https://play.google.com/store/apps/details?id=id.polindo.android",
  },
  {
    name: "App Store",
    icon: AppStoreIcon,
    url: settings.value?.android_download_link ?? "https://play.google.com/store/apps/details?id=id.polindo.android", // response not provide ios link
  },
] as const;

async function getPages() {
  try {

    if (!pagesState.value) {
      pagesState.value = await $fetch<PagesListResponse>(
        `${useRuntimeConfig().public.apiBase}/api/v1/pages`
      );
    }

    pages.value = pagesState.value?.data || [];
  } catch (error) {
    console.error("Failed to fetch pages:", error);
  }
}

onMounted(async () => {
  await getPages();
});
</script>
