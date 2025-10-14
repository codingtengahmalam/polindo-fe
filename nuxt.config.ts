// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  app: {
    head: {
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
        },
      ],
    },
  },

  compatibilityDate: "2025-07-15",
  modules: ["@nuxt/fonts", "@nuxtjs/tailwindcss", "@nuxt/image"],

  image: {
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
    domains: [],
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
