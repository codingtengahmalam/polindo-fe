import type { Setting, SettingResponse } from "~/types";

/**
 * Composable to access global app settings
 * Settings are fetched in middleware and cached globally
 *
 * @example
 * ```vue
 * <script setup>
 * const { settings } = useSettings()
 * console.log(settings.value?.site_title)
 * </script>
 * ```
 */
export const useSettings = () => {
  // Access the same useState key used in middleware
  const settingsResponse = useState<SettingResponse | null>(
    "app-settings",
    () => null
  );

  // Computed to extract settings data with type safety
  const settings = computed<Setting | null>(() => {
    return settingsResponse.value?.data || null;
  });

  return {
    settings: readonly(settings),
    settingsResponse: readonly(settingsResponse),
  };
};
