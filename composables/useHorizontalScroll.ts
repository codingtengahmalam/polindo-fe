/**
 * Composable for horizontal scroll functionality
 * Provides scroll navigation with boundary detection
 */
export const useHorizontalScroll = () => {
  const scrollContainer = ref<HTMLElement | null>(null);
  const canScrollLeft = ref(false);
  const canScrollRight = ref(true);

  // Constants for scroll behavior
  const SCROLL_CARD_WIDTH = 270; // md:w-[270px]
  const SCROLL_GAP = 12; // gap-3 = 0.75rem = 12px
  const SCROLL_AMOUNT = SCROLL_CARD_WIDTH + SCROLL_GAP;

  /**
   * Scroll to the left by one card width
   */
  const scrollLeft = () => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollBy({
        left: -SCROLL_AMOUNT,
        behavior: "smooth",
      });
    }
  };

  /**
   * Scroll to the right by one card width
   */
  const scrollRight = () => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollBy({
        left: SCROLL_AMOUNT,
        behavior: "smooth",
      });
    }
  };

  /**
   * Update scroll state to enable/disable navigation buttons
   * Detects if scrolling is possible in either direction
   */
  const updateScrollState = () => {
    if (scrollContainer.value) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
      canScrollLeft.value = scrollLeft > 0;
      canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 1;
    }
  };

  /**
   * Initialize scroll state on mount and handle resize events
   */
  onMounted(() => {
    updateScrollState();

    // Handle window resize events that might affect scroll state
    const handleResize = () => {
      updateScrollState();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
  });

  return {
    scrollContainer,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    updateScrollState,
  };
};
