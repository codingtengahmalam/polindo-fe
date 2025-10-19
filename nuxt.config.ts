// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: "https://api.politikindonesia.id",
    },
  },

  typescript: {
    typeCheck: true,
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  compatibilityDate: "2025-07-15",
  modules: ["@nuxt/fonts", "@nuxtjs/tailwindcss", "@nuxt/image"],

  image: {
    provider: process.env.NUXT_IMAGE_PROVIDER || "weserv",
    quality: 80,
    format: ["webp"],
    screens: {
      xs: 360,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    dir: "public",
    domains: ["politikindonesia.id"],
    // Weserv configuration (only used in production)
    weserv: {
      baseURL: "https://politikindonesia.id",
    },
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
