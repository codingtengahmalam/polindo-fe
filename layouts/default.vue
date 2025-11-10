<template>
  <div class="max-w-full">
    <Header />
    <main class="min-h-[calc(100vh-80px)] pt-[68px]">
      <TrendingCarousel />
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
const { settings } = useSettings();

// Get dynamic base URL
const { baseUrl } = useBaseUrl();

const DEFAULTS = {
  siteTitle: "POLITIK INDONESIA, POLINDO",
  homeTitle: "Kantor Berita Politik Indonesia",
  description:
    "Berita Indonesia dan Dunia Terkini Hari Ini, Berita Akurat, Berita Terpercaya, Berita Politik Indonesia, Berita Terupdate, Berita Ekonomi, Hukum, Politik, Berita Hari Ini",
  keywords:
    "Berita Akurat, Berita Terupdate, Berita Hari Ini, Berita Politik, Berita Indonesia, Prabowo Subianto, Joko Widodo, politikindonesia.id, polindo.id",
  author: "rmolnetwork",
  twitterSite: "@Politik Indonesia",
  logoUrl: "https://politikindonesia.id/assets/img/logo.png",
};

// Computed values dari settings
const siteTitle = computed(
  () => settings.value?.site_title ?? DEFAULTS.siteTitle
);
const homeTitle = computed(
  () => settings.value?.home_title ?? DEFAULTS.homeTitle
);
const description = computed(
  () => settings.value?.site_description ?? DEFAULTS.description
);
const keywords = computed(() => settings.value?.keywords ?? DEFAULTS.keywords);

// Full page title untuk homepage
const fullTitle = computed(() => `${homeTitle.value} - ${siteTitle.value}`);

// SEO Meta Tags - useHead untuk meta tags yang kompleks
useHead({
  // Dynamic title template
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${siteTitle.value}` : fullTitle.value;
  },

  // Meta tags
  meta: [
    // Basic meta
    { charset: "UTF-8" },
    { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },

    // Primary meta tags
    { name: "title", content: siteTitle.value },
    { name: "description", content: description.value },
    { name: "keywords", content: keywords.value },
    { name: "news_keywords", content: keywords.value },

    // Author & Language
    { name: "author", content: DEFAULTS.author },
    { name: "language", content: "id" },

    // Geo tags
    { name: "geo.country", content: "id" },
    { name: "geo.placename", content: "Indonesia" },

    // Robots & Googlebot
    { name: "robots", content: "index,follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "googlebot-news", content: "index, follow" },

    // Open Graph locale
    { property: "og:locale", content: "id" },
  ],

  // Canonical link
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.png",
    },
    {
      rel: "canonical",
      href: baseUrl,
    },
  ],

  // Google Analytics
  // Use type: 'text/javascript' to ensure proper execution
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-8L8HDXF7VJ",
      async: true,
    },
    {
      type: "text/javascript",
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-8L8HDXF7VJ');
      `,
    },
  ],
});

// SEO Meta Tags - useSeoMeta untuk Open Graph & Twitter Cards
useSeoMeta({
  // Open Graph
  ogTitle: fullTitle.value,
  ogDescription: description.value,
  ogType: "website",
  ogSiteName: siteTitle.value,
  ogUrl: baseUrl,
  ogImage: DEFAULTS.logoUrl,
  ogImageWidth: "240",
  ogImageHeight: "90",

  // Twitter Cards
  twitterCard: "summary_large_image",
  twitterSite: DEFAULTS.twitterSite,
  twitterTitle: fullTitle.value,
  twitterDescription: description.value,
});
</script>
