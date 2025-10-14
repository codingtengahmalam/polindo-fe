/**
 * Composable for managing video carousel state and behavior
 * Handles video playback, refs management, and carousel navigation
 */
export const useVideoCarousel = (
  videos: Array<{ id: number; title: string; url: string }>,
  videosPerPage: ComputedRef<number>
) => {
  // Video refs management
  const videoRefs = ref<Map<number, HTMLVideoElement>>(new Map());
  const activeVideoId = ref<number | null>(null);
  const isTouchDevice = ref(false);

  // Carousel state
  const currentPage = ref(0);

  // Computed: Total pages
  const totalPages = computed(() => {
    return Math.ceil(videos.length / videosPerPage.value);
  });

  /**
   * Determine if a video should be rendered based on its index
   * Strategy: Render current page + adjacent pages (prev & next) for instant navigation
   *
   * Example with videosPerPage = 4:
   * - Page 0: Render indices [0,1,2,3] + preload [4,5,6,7] (next)
   * - Page 1: Render indices [4,5,6,7] + preload [0,1,2,3] (prev) + [8,9,10,11] (next)
   * - Page 2: Render indices [8,9,10,11] + preload [4,5,6,7] (prev)
   *
   * This ensures smooth navigation without loading delays
   */
  const shouldRenderVideo = (index: number): boolean => {
    const startIndex = currentPage.value * videosPerPage.value;
    const endIndex = startIndex + videosPerPage.value;

    // ✅ Always render current page videos (visible on screen)
    if (index >= startIndex && index < endIndex) {
      return true;
    }

    // ✅ Preload PREVIOUS page (for smooth backward navigation)
    if (currentPage.value > 0) {
      const prevStartIndex = (currentPage.value - 1) * videosPerPage.value;
      const prevEndIndex = prevStartIndex + videosPerPage.value;

      if (index >= prevStartIndex && index < prevEndIndex) {
        return true;
      }
    }

    // ✅ Preload NEXT page (for smooth forward navigation)
    if (currentPage.value < totalPages.value - 1) {
      const nextStartIndex = (currentPage.value + 1) * videosPerPage.value;
      const nextEndIndex = Math.min(
        videos.length,
        nextStartIndex + videosPerPage.value
      );

      if (index >= nextStartIndex && index < nextEndIndex) {
        return true;
      }
    }

    return false;
  };

  /**
   * Check if video is in current page (for preload strategy)
   * Current page videos use preload="metadata", next page uses preload="none"
   */
  const isCurrentPageVideo = (index: number): boolean => {
    const startIndex = currentPage.value * videosPerPage.value;
    const endIndex = startIndex + videosPerPage.value;
    return index >= startIndex && index < endIndex;
  };

  /**
   * Set video element ref
   */
  const setVideoRef = (el: any, id: number) => {
    if (el) {
      videoRefs.value.set(id, el as HTMLVideoElement);
    }
  };

  /**
   * Pause all videos
   */
  const pauseAllVideos = () => {
    videoRefs.value.forEach((video) => {
      if (!video.paused) {
        video.pause();
      }
    });
    activeVideoId.value = null;
  };

  /**
   * Handle play event - pause other videos when one plays
   */
  const handlePlay = (playingId: number) => {
    videoRefs.value.forEach((video, id) => {
      if (id !== playingId && !video.paused) {
        video.pause();
      }
    });
  };

  /**
   * Handle mouse enter - only for non-touch devices
   */
  const handleMouseEnter = (id: number) => {
    if (!isTouchDevice.value) {
      activeVideoId.value = id;
    }
  };

  /**
   * Handle mouse leave - hide controls if video is paused (non-touch only)
   */
  const handleMouseLeave = (id: number) => {
    if (!isTouchDevice.value) {
      const video = videoRefs.value.get(id);
      if (video && video.paused) {
        activeVideoId.value = null;
      }
    }
  };

  /**
   * Handle touch start for mobile/tablet devices
   */
  const handleTouchStart = (id: number) => {
    isTouchDevice.value = true; // Mark as touch device

    // Toggle controls on touch
    if (activeVideoId.value === id) {
      const video = videoRefs.value.get(id);
      if (video && video.paused) {
        activeVideoId.value = null;
      }
    } else {
      activeVideoId.value = id;
    }
  };

  /**
   * Navigate to next page
   */
  const goToNext = () => {
    if (currentPage.value < totalPages.value - 1) {
      currentPage.value++;
      pauseAllVideos();
    }
  };

  /**
   * Navigate to previous page
   */
  const goToPrev = () => {
    if (currentPage.value > 0) {
      currentPage.value--;
      pauseAllVideos();
    }
  };

  /**
   * Clean up video refs that are no longer rendered
   */
  const cleanupUnrenderedVideoRefs = () => {
    const renderedVideoIds = new Set<number>();

    videos.forEach((video, index) => {
      if (shouldRenderVideo(index)) {
        renderedVideoIds.add(video.id);
      }
    });

    // Remove refs for videos that are no longer rendered
    videoRefs.value.forEach((_, id) => {
      if (!renderedVideoIds.has(id)) {
        videoRefs.value.delete(id);
      }
    });
  };

  /**
   * Reset carousel to first page
   */
  const resetToFirstPage = () => {
    currentPage.value = 0;
    pauseAllVideos();
  };

  /**
   * Clear all video refs (cleanup on unmount)
   */
  const clearAllVideoRefs = () => {
    videoRefs.value.clear();
  };

  // Watch currentPage to cleanup video refs when page changes
  watch(currentPage, () => {
    cleanupUnrenderedVideoRefs();
  });

  return {
    // State
    videoRefs,
    activeVideoId,
    isTouchDevice,
    currentPage,
    totalPages,

    // Methods
    shouldRenderVideo,
    isCurrentPageVideo,
    setVideoRef,
    pauseAllVideos,
    handlePlay,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    goToNext,
    goToPrev,
    resetToFirstPage,
    clearAllVideoRefs,
  };
};
