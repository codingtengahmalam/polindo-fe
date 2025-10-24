<template>
  <section class="bg-brand-25 w-full py-6">
    <ContentContainer class="space-y-4 px-4 md:px-0">
      <!-- Header of Section -->
      <div class="flex items-center justify-between">
        <h2
          class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2"
        >
          Video
        </h2>

        <div class="flex items-center gap-3 text-grayscale-40 flex-shrink-0">
          <button
            type="button"
            aria-label="Previous video"
            :disabled="!hasPrevPage || isLoading"
            :class="[
              'cursor-pointer transition-colors',
              !hasPrevPage || isLoading
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:text-grayscale-100',
            ]"
            @click="handleManualNavigation('prev')"
          >
            <IconChevronLeft class="size-3" />
          </button>
          <button
            type="button"
            aria-label="Next video"
            :disabled="!hasNextPage || isLoading"
            :class="[
              'cursor-pointer transition-colors',
              !hasNextPage || isLoading
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:text-grayscale-100',
            ]"
            @click="handleManualNavigation('next')"
          >
            <IconChevronLeft class="size-3 rotate-180" />
          </button>
        </div>
      </div>

      <!-- Content Video -->
      <div
        class="overflow-hidden"
        @mouseenter="stopAutoSlide"
        @mouseleave="startAutoSlide"
      >
        <ClientOnly>
          <!-- Loading State -->
          <div
            v-if="isLoading"
            class="grid gap-4"
            :class="isMobile ? 'grid-cols-1' : 'grid-cols-4'"
          >
            <div
              v-for="i in isMobile ? 1 : 4"
              :key="i"
              class="w-full aspect-[9/16] rounded-lg animate-pulse"
            >
              <img
                src="/videothumbnail.png"
                alt="Video Thumbnail"
                class="w-full aspect-[9/16] object-cover rounded-lg"
              />
            </div>
          </div>

          <!-- Videos Slider -->
          <div v-else class="relative overflow-hidden">
            <div
              ref="sliderRef"
              class="flex"
              style="will-change: transform"
              :style="{
                transform: `translateX(-${currentDisplayIndex * 100}%)`,
                transition: isTransitioning
                  ? `transform ${SLIDE_DURATION}ms ease-in-out`
                  : 'none',
              }"
            >
              <!-- Clone of last set for seamless loop (next) -->
              <div v-if="videoSets.length > 0" class="w-full flex-shrink-0">
                <div
                  class="grid gap-4"
                  :class="isMobile ? 'grid-cols-1' : 'grid-cols-4'"
                >
                  <div
                    v-for="(video, index) in videoSets[videoSets.length - 1]"
                    :key="`clone-last-${video.id}`"
                    class="relative group"
                  >
                    <video
                      :src="`${video.video_path}#t=0.001`"
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      playsinline
                      poster="/videothumbnail.png"
                      class="w-full aspect-[9/16] object-cover rounded-lg"
                    >
                      Your browser doesn't support video formats.
                    </video>
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                      <div
                        class="bg-gradient-to-t from-black/80 to-transparent rounded-b-lg p-4 -m-4"
                      >
                        <NuxtLink
                          :to="`/video/${video.video_slug}`"
                          class="block text-white hover:text-brand-300 transition-colors duration-200"
                          :aria-label="`Read article: ${video.title}`"
                        >
                          <h3
                            class="text-sm font-semibold line-clamp-2 leading-tight"
                          >
                            {{ video.title }}
                          </h3>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Original video sets -->
              <div
                v-for="(videoSet, setIndex) in videoSets"
                :key="`set-${setIndex}-${videoSet[0]?.id || 0}`"
                class="w-full flex-shrink-0"
              >
                <div
                  class="grid gap-4"
                  :class="isMobile ? 'grid-cols-1' : 'grid-cols-4'"
                >
                  <!-- Video Container with Overlay -->
                  <div
                    v-for="(video, index) in videoSet"
                    :key="video.id"
                    class="relative group"
                  >
                    <!-- Video Element -->
                    <video
                      :ref="(el) => setVideoRef(el, video.id, index)"
                      :controls="activeVideoId === video.id"
                      :src="`${video.video_path}#t=0.001`"
                      :data-video-id="video.id"
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      playsinline
                      poster="/videothumbnail.png"
                      class="w-full aspect-[9/16] object-cover rounded-lg"
                      @play="handlePlay(video.id)"
                      @mouseenter="handleMouseEnter(video.id)"
                      @mouseleave="handleMouseLeave(video.id)"
                      @touchstart="handleTouchStart(video.id)"
                    >
                      Your browser doesn't support video formats.
                    </video>

                    <!-- Overlay with Title - always visible on mobile -->
                    <div
                      class="absolute inset-0 rounded-lg"
                      @click="toggleVideoPlayback(video.id)"
                    >
                      <!-- Icon Play/Pause - only shows when clicked -->
                      <div
                        v-if="isVideoClicked(video.id)"
                        class="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                      >
                        <div
                          v-if="!isVideoPlaying(video.id)"
                          class="bg-black/50 rounded-full p-3 backdrop-blur-sm"
                        >
                          <IconPlay class="size-12 text-white" />
                        </div>
                        <div
                          v-else
                          class="bg-black/50 rounded-full p-3 backdrop-blur-sm"
                        >
                          <IconPause class="size-12 text-white" />
                        </div>
                      </div>
                      <div
                        class="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 ease-in-out pointer-events-none"
                        :class="
                          isMobile
                            ? 'translate-y-0'
                            : 'translate-y-full group-hover:translate-y-0'
                        "
                      >
                        <div
                          class="bg-gradient-to-t from-black/80 to-transparent rounded-b-lg p-4 -m-4 pointer-events-auto"
                        >
                          <NuxtLink
                            :to="`/video/${video.video_slug}`"
                            class="block text-white hover:text-brand-300 transition-colors duration-200 pointer-events-auto"
                            :aria-label="`Read article: ${video.title}`"
                            @click.stop
                          >
                            <h3
                              class="text-sm font-semibold line-clamp-2 leading-tight"
                            >
                              {{ video.title }}
                            </h3>
                          </NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Clone of first set for seamless loop (prev) -->
              <div v-if="videoSets.length > 0" class="w-full flex-shrink-0">
                <div
                  class="grid gap-4"
                  :class="isMobile ? 'grid-cols-1' : 'grid-cols-4'"
                >
                  <div
                    v-for="(video, index) in videoSets[0]"
                    :key="`clone-first-${video.id}`"
                    class="relative group"
                  >
                    <video
                      :src="`${video.video_path}#t=0.001`"
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      playsinline
                      poster="/videothumbnail.png"
                      class="w-full aspect-[9/16] object-cover rounded-lg"
                    >
                      Your browser doesn't support video formats.
                    </video>
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                      <div
                        class="bg-gradient-to-t from-black/80 to-transparent rounded-b-lg p-4 -m-4"
                      >
                        <NuxtLink
                          :to="`/video/${video.video_slug}`"
                          class="block text-white hover:text-brand-300 transition-colors duration-200"
                          :aria-label="`Read article: ${video.title}`"
                        >
                          <h3
                            class="text-sm font-semibold line-clamp-2 leading-tight"
                          >
                            {{ video.title }}
                          </h3>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <template #fallback>
            <div
              class="grid gap-4"
              :class="isMobile ? 'grid-cols-1' : 'grid-cols-4'"
            >
              <div
                v-for="i in isMobile ? 1 : 4"
                :key="i"
                class="w-full aspect-[9/16] rounded-lg bg-grayscale-20 animate-pulse"
              />
            </div>
          </template>
        </ClientOnly>
      </div>
    </ContentContainer>
  </section>
</template>

<script lang="ts" setup>
import type { VideoPostListResponse, VideoPost } from "~/types";

// Constants
const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds
const ICON_DISPLAY_DURATION = 1000; // 1 second
const SLIDE_DURATION = 500; // milliseconds (reduced for better responsiveness)

// Composables
const { isMobile, videosPerPage } = useVideoCarouselResponsive();

// API state
const videos = ref<VideoPostListResponse>();
const allVideos = ref<VideoPost[]>([]);
const currentDisplayIndex = ref<number>(0);
const isLoading = ref(false);
const isFetchingMore = ref(false);
const hasMoreData = ref(true);

// Animation state
const isSliding = ref(false);
const isTransitioning = ref(true);
const sliderRef = ref<HTMLElement | null>(null);

// Auto slide state
let autoSlideTimer: ReturnType<typeof setInterval> | null = null;

// Video play state tracking
const playingVideoIds = ref<Set<number>>(new Set());

// State to track recently clicked videos (for showing icons)
const clickedVideoIds = ref<Set<number>>(new Set());
const iconTimers = ref<Map<number, NodeJS.Timeout>>(new Map());

// Computed perPage based on screen size (mobile: 1, desktop: 4)
const perPage = computed(() => videosPerPage.value);

// Computed: Check if has next/prev page based on available data
const hasNextPage = computed(() => {
  const nextIndex = currentDisplayIndex.value + 1;
  return nextIndex < videoSets.value.length || hasMoreData.value;
});

// Pre-fetch data when approaching the end
watch(currentDisplayIndex, (newIndex) => {
  const totalSets = videoSets.value.length;
  const remainingSets = totalSets - newIndex;

  // Pre-fetch when we have 2 or fewer sets remaining
  if (remainingSets <= 2 && hasMoreData.value && !isFetchingMore.value) {
    fetchMoreVideos();
  }
});

const hasPrevPage = computed(() => {
  return currentDisplayIndex.value > 0;
});

// Computed: Get current videos to display
const currentVideos = computed(() => {
  const startIndex = currentDisplayIndex.value;
  const endIndex = startIndex + perPage.value;
  return allVideos.value.slice(startIndex, endIndex);
});

// Computed: Get first and last items for seamless loop (kept for compatibility)
const firstItem = computed(() => allVideos.value[0]);
const lastItem = computed(() => allVideos.value[allVideos.value.length - 1]);

// Computed: Split videos into sets for slider (optimized)
const videoSets = computed(() => {
  if (allVideos.value.length === 0) return [];

  const sets = [];
  const pageSize = perPage.value;

  for (let i = 0; i < allVideos.value.length; i += pageSize) {
    sets.push(allVideos.value.slice(i, i + pageSize));
  }

  return sets;
});

// Video carousel composable
const {
  activeVideoId,
  setVideoRef,
  handlePlay,
  handleMouseEnter,
  handleMouseLeave,
  handleTouchStart,
  pauseAllVideos,
  clearAllVideoRefs,
  videoRefs,
} = useVideoCarousel([], videosPerPage);

// ============================================================================
// Video Control Functions
// ============================================================================

// Check if video is currently playing
const isVideoPlaying = (videoId: number): boolean => {
  const isPlaying = playingVideoIds.value.has(videoId);
  const videoElement = videoRefs.value.get(videoId);
  const elementIsPlaying = videoElement ? !videoElement.paused : false;
  return isPlaying || elementIsPlaying;
};

// Check if video was recently clicked (for showing icons)
const isVideoClicked = (videoId: number): boolean => {
  return clickedVideoIds.value.has(videoId);
};

// Show icon for a specific video
const showIconForVideo = (videoId: number) => {
  const existingTimer = iconTimers.value.get(videoId);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  clickedVideoIds.value.add(videoId);

  const timer = setTimeout(() => {
    clickedVideoIds.value.delete(videoId);
    iconTimers.value.delete(videoId);
  }, ICON_DISPLAY_DURATION);

  iconTimers.value.set(videoId, timer);
};

// Toggle video play/pause when button is clicked
const toggleVideoPlayback = (videoId: number) => {
  const videoElement = videoRefs.value.get(videoId);
  const isCurrentlyPlaying = playingVideoIds.value.has(videoId);

  showIconForVideo(videoId);

  if (videoElement) {
    if (isCurrentlyPlaying || !videoElement.paused) {
      videoElement.pause();
      playingVideoIds.value.delete(videoId);
    } else {
      handlePlay(videoId);
      playingVideoIds.value.clear();
      videoElement
        .play()
        .then(() => {
          playingVideoIds.value.add(videoId);
        })
        .catch((error) => {
          console.warn("Error playing video:", error);
        });
    }
  }
};

// ============================================================================
// Helper Functions
// ============================================================================

// Clear all icon timers and clicked states
const clearAllIconStates = () => {
  iconTimers.value.forEach((timer) => clearTimeout(timer));
  iconTimers.value.clear();
  clickedVideoIds.value.clear();
};

// Update videos display (for compatibility with existing API structure)
const updateVideosDisplay = () => {
  videos.value = {
    ...videos.value!,
    data: currentVideos.value,
  };
};

// ============================================================================
// API Functions
// ============================================================================

// Fetch initial videos (16 for desktop, 5 for mobile)
async function getInitialVideos() {
  try {
    isLoading.value = true;
    const batchSize = isMobile.value ? 5 : 16;

    const response = await $fetch<VideoPostListResponse>(
      `${
        useRuntimeConfig().public.apiBase
      }/api/v1/video-posts?${new URLSearchParams({
        page: "1",
        per_page: batchSize.toString(),
      })}`
    );

    allVideos.value = response.data;
    videos.value = {
      data: currentVideos.value,
      links: response.links,
      meta: response.meta,
    };

    hasMoreData.value = response.links.next !== null;

    if (autoSlideTimer === null) {
      startAutoSlide();
    }
  } catch (error) {
    console.error("Error fetching initial videos:", error);
  } finally {
    isLoading.value = false;
  }
}

// Fetch more videos when needed
async function fetchMoreVideos() {
  if (isFetchingMore.value || !hasMoreData.value) return;

  try {
    isFetchingMore.value = true;
    const batchSize = isMobile.value ? 5 : 16;
    const currentPage = Math.ceil(allVideos.value.length / batchSize) + 1;

    const response = await $fetch<VideoPostListResponse>(
      `${
        useRuntimeConfig().public.apiBase
      }/api/v1/video-posts?${new URLSearchParams({
        page: currentPage.toString(),
        per_page: batchSize.toString(),
      })}`
    );

    allVideos.value.push(...response.data);
    hasMoreData.value = response.links.next !== null;
  } catch (error) {
    console.error("Error fetching more videos:", error);
  } finally {
    isFetchingMore.value = false;
  }
}

// ============================================================================
// Navigation Functions
// ============================================================================

// Navigate to next page
async function goToNext() {
  if (!hasNextPage.value || isSliding.value) return;

  pauseAllVideos();
  clearAllIconStates();

  isSliding.value = true;
  isTransitioning.value = true;

  const nextIndex = currentDisplayIndex.value + 1;

  // Check if we need to fetch more data
  if (nextIndex >= videoSets.value.length && hasMoreData.value) {
    // Start fetching in background
    fetchMoreVideos();

    // Wait a bit for data to be fetched, but don't block indefinitely
    let attempts = 0;
    const maxAttempts = 5; // Max 500ms wait

    while (
      nextIndex >= videoSets.value.length &&
      attempts < maxAttempts &&
      hasMoreData.value
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }
  }

  if (nextIndex < videoSets.value.length) {
    currentDisplayIndex.value = nextIndex;
    setTimeout(() => {
      isSliding.value = false;
    }, SLIDE_DURATION);
  } else {
    // Loop to first set when reaching the end
    setTimeout(() => {
      isTransitioning.value = false;
      currentDisplayIndex.value = 0;
      setTimeout(() => {
        isTransitioning.value = true;
        isSliding.value = false;
      }, 50);
    }, SLIDE_DURATION);
  }
}

// Navigate to previous page
async function goToPrev() {
  if (!hasPrevPage.value || isSliding.value) return;

  pauseAllVideos();
  clearAllIconStates();

  isSliding.value = true;
  isTransitioning.value = true;

  const prevIndex = currentDisplayIndex.value - 1;

  if (prevIndex >= 0) {
    currentDisplayIndex.value = prevIndex;
    setTimeout(() => {
      isSliding.value = false;
    }, SLIDE_DURATION);
  } else {
    // Loop to last set when reaching the beginning
    setTimeout(() => {
      isTransitioning.value = false;
      currentDisplayIndex.value = videoSets.value.length - 1;
      setTimeout(() => {
        isTransitioning.value = true;
        isSliding.value = false;
      }, 50);
    }, SLIDE_DURATION);
  }
}

// ============================================================================
// Auto Slide Functions
// ============================================================================

const startAutoSlide = () => {
  if (videoSets.value.length <= 1) return;

  stopAutoSlide();

  autoSlideTimer = setInterval(() => {
    goToNext();
  }, AUTO_SLIDE_INTERVAL);
};

const stopAutoSlide = () => {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
};

// Handle manual navigation (stops auto slide)
const handleManualNavigation = (direction: "prev" | "next") => {
  // Prevent rapid clicks
  if (isSliding.value) return;

  stopAutoSlide();
  if (direction === "prev") {
    goToPrev();
  } else {
    goToNext();
  }
};

// ============================================================================
// Lifecycle & Watchers
// ============================================================================

// Watch for mobile/desktop switch and reset to index 0
const prevIsMobile = ref(isMobile.value);
watch(isMobile, async (newValue) => {
  if (prevIsMobile.value !== newValue) {
    pauseAllVideos();
    stopAutoSlide();
    clearAllIconStates();

    currentDisplayIndex.value = 0;

    const batchSize = newValue ? 5 : 16;
    if (allVideos.value.length < batchSize && hasMoreData.value) {
      await fetchMoreVideos();
    }

    updateVideosDisplay();
    startAutoSlide();
    prevIsMobile.value = newValue;
  }
});

// Initial load
onMounted(async () => {
  await getInitialVideos();
  startAutoSlide();
});

// Cleanup on unmount
onUnmounted(() => {
  clearAllVideoRefs();
  stopAutoSlide();
  clearAllIconStates();
});
</script>

<style></style>
