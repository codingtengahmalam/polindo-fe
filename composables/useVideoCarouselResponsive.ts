import { useWindowSize } from "@vueuse/core";

/**
 * Composable for managing responsive video carousel behavior
 * Handles mobile/desktop detection and responsive calculations specifically for video carousel
 * Mobile: 1 video per page, Desktop: 4 videos per page
 */
export const useVideoCarouselResponsive = () => {
  // Use VueUse's useWindowSize for reactive window dimensions
  const { width } = useWindowSize();

  /**
   * Computed: Check if current viewport is mobile
   * Based on Tailwind's md breakpoint (768px)
   */
  const isMobile = computed(() => width.value < 768);

  /**
   * Computed: Videos per page based on screen size
   * Mobile: 1 video per page, Desktop: 4 videos per page
   */
  const videosPerPage = computed(() => {
    return isMobile.value ? 1 : 4;
  });

  /**
   * Calculate grid style with gap calculation for carousel animation
   */
  const calculateGridStyle = (
    currentPage: number,
    totalVideos: number
  ): { transform: string; gridTemplateColumns: string } => {
    if (isMobile.value) {
      // Mobile: Each video takes 100% + gap (1rem = 16px)
      // So each "slide" is calc(100% + 1rem)
      // TranslateX needs to move by (100% + 1rem) per page
      const translateValue = `calc(-${currentPage * 100}% - ${
        currentPage * 1
      }rem)`;

      return {
        transform: `translateX(${translateValue})`,
        gridTemplateColumns: `repeat(${totalVideos}, 100%)`,
      };
    } else {
      // Desktop: 4 videos per page, account for gap between videos
      // Each video = (100% - 3 gaps) / 4 = 25% - 0.75rem
      return {
        transform: `translateX(-${currentPage * 100}%)`,
        gridTemplateColumns: `repeat(${totalVideos}, calc(25% - 0.75rem))`,
      };
    }
  };

  return {
    isMobile,
    videosPerPage,
    calculateGridStyle,
  };
};
