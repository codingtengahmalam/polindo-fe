// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  // App configuration
  app: {
    head: {
      htmlAttrs: {
        lang: "id",
      },
      script: [
        {
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1253170951120275",
          async: true,
          crossorigin: "anonymous",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "https://api.politikindonesia.id",
      dashboardUrl:
        process.env.DASHBOARD_URL || "https://dashboard.politikindonesia.id",
      logoUrl: process.env.NUXT_PUBLIC_LOGO_URL || "/logo.png",
      socialMedia: {
        facebook: process.env.NUXT_PUBLIC_SOCIAL_FACEBOOK || "https://www.facebook.com/pages/PolitikIndonesia/113063772047616",
        instagram: process.env.NUXT_PUBLIC_SOCIAL_INSTAGRAM || "https://www.instagram.com/politikindonesia.id",
        tiktok: process.env.NUXT_PUBLIC_SOCIAL_TIKTOK || "https://www.tiktok.com/@politikindonesia.id",
        youtube: process.env.NUXT_PUBLIC_SOCIAL_YOUTUBE || "https://www.youtube.com/@politikindonesia-id",
      },
    },
  },

  typescript: {
    typeCheck: false, // Disable type checking during build for faster builds
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  compatibilityDate: "2025-07-15",
  css: [
    "@vuepic/vue-datepicker/dist/main.css",
    "~/assets/css/vue-datepicker-custom.css",
  ],
  modules: [
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    [
      "@nuxt/image",
      {
        // Use IPX for SSR (production with Node.js server)
        // IPX works with full URLs from API
        provider: "ipx",
        quality: 80,
        format: ["webp"],
        ipx: {
          // IPX allows full URLs from external domains
          // Domains can be set via IPX_DOMAINS env var (comma-separated)
          // Default: "politikindonesia.id,api.politikindonesia.id"
          domains: process.env.IPX_DOMAINS
            ? process.env.IPX_DOMAINS.split(",").map((d) => d.trim())
            : ["politikindonesia.id", "api.politikindonesia.id"],
        },
      },
    ],
    "nuxt-gtag",
  ],

  // Google Tag configuration (GA4 & Ads)
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || "G-8L8HDXF7VJ",
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },

  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
        weights: [400, 500, 600, 700, 800, 900],
      },
      {
        name: "Playfair Display",
        provider: "google",
        weights: [400, 500, 600, 700, 800, 900],
      },
    ],
  },
});
