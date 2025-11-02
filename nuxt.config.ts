// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  // App configuration
  app: {
    head: {
      htmlAttrs: {
        lang: "id",
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "https://api.politikindonesia.id",
      dashboardUrl: process.env.DASHBOARD_URL || "https://dashboard.politikindonesia.id",
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
  modules: ["@nuxt/fonts", "@nuxtjs/tailwindcss", [
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
  ], "nuxt-gtag"],

  // Google Tag configuration (GA4 & Ads)
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || "G-8L8HDXF7VJ",
    initCommands: [
      // Set up consent mode for GDPR compliance
      [
        "consent",
        "default",
        {
          ad_user_data: "denied",
          ad_personalization: "denied",
          ad_storage: "denied",
          analytics_storage: "denied",
          wait_for_update: 500,
        },
      ],
    ],
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