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
});