import type { SettingResponse } from "~/types";

/**
 * Global middleware to fetch app settings
 * Runs on every route navigation (only fetches once due to useState caching)
 */
export default defineNuxtRouteMiddleware(async () => {
  const settings = useState<SettingResponse | null>("app-settings", () => null);

  // Only fetch if not already loaded
  if (!settings.value) {
    try {
      const config = useRuntimeConfig();
      const response = await $fetch<SettingResponse>(
        `${config.public.apiBase}/api/v1/settings`
      );

      settings.value = response;
    } catch (error) {
      console.error("[Settings Middleware] Failed to fetch settings:", error);
    }
  }
});
