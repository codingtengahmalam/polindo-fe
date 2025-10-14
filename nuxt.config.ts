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

  compatibilityDate: "2025-07-15",
  modules: ["@nuxt/fonts", "@nuxtjs/tailwindcss"],

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
