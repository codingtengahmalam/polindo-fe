// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: "https://api.politikindonesia.id",
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
          domains: ["politikindonesia.id", "api.politikindonesia.id"],
        },
      },
    ],
  ],

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
