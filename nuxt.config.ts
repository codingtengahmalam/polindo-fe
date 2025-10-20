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
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  modules: ["@nuxt/fonts", "@nuxtjs/tailwindcss", "@nuxt/image"],

  image: {
    // Weserv is perfect for static deployments (Netlify, Vercel, etc.)
    // IPX only works with SSR Node.js servers
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
    // Allow images from these domains
    domains: ["politikindonesia.id", "api.politikindonesia.id"],
    // Weserv config - no baseURL needed as API returns full URLs
    weserv: {
      // Leave empty - API provides full URLs like:
      // https://politikindonesia.id/uploads/images/2025/10/image.jpg
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
