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
            <img src="/videothumbnail.png" alt="Video Thumbnail" class="w-full aspect-[9/16] object-cover rounded-lg" />
            </div>
          </div>

          <!-- Videos Grid -->
          <div
            v-else
            class="grid gap-4 transition-opacity duration-300"
            :class="isMobile ? 'grid-cols-1' : 'grid-cols-4'"
          >
            <!-- Video Container with Overlay -->
            <div
              v-for="(video, index) in currentVideos"
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

// Composables
const { isMobile, videosPerPage } = useVideoCarouselResponsive();

// API state
const videos = ref<VideoPostListResponse>();
const allVideos = ref<VideoPost[]>([]);
const currentDisplayIndex = ref<number>(0);
const isLoading = ref(false);
const isFetchingMore = ref(false);
const hasMoreData = ref(true);

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
  const totalAvailable = allVideos.value.length;
  const nextIndex = currentDisplayIndex.value + perPage.value;
  return nextIndex < totalAvailable || hasMoreData.value;
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

// Update videos display
const updateVideosDisplay = () => {
  videos.value = {
    ...videos.value!,
    data: currentVideos.value
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
        page: '1',
        per_page: batchSize.toString(),
      })}`
    );

    allVideos.value = response.data;
    videos.value = {
      data: currentVideos.value,
      links: response.links,
      meta: response.meta
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
  if (!hasNextPage.value || isLoading.value) return;

  pauseAllVideos();
  clearAllIconStates();

  const nextIndex = currentDisplayIndex.value + perPage.value;

  if (nextIndex >= allVideos.value.length && hasMoreData.value) {
    await fetchMoreVideos();
  }

  if (nextIndex < allVideos.value.length) {
    currentDisplayIndex.value = nextIndex;
    updateVideosDisplay();
  } else if (hasMoreData.value) {
    await fetchMoreVideos();
    if (nextIndex < allVideos.value.length) {
      currentDisplayIndex.value = nextIndex;
      updateVideosDisplay();
    }
  } else {
    currentDisplayIndex.value = 0;
    updateVideosDisplay();
  }
}

// Navigate to previous page
async function goToPrev() {
  if (!hasPrevPage.value || isLoading.value) return;

  pauseAllVideos();
  clearAllIconStates();

  const prevIndex = currentDisplayIndex.value - perPage.value;

  if (prevIndex >= 0) {
    currentDisplayIndex.value = prevIndex;
    updateVideosDisplay();
  } else {
    const lastPossibleIndex = Math.max(0, allVideos.value.length - perPage.value);
    currentDisplayIndex.value = lastPossibleIndex;
    updateVideosDisplay();
  }
}

// ============================================================================
// Auto Slide Functions
// ============================================================================

const startAutoSlide = () => {
  const totalSets = Math.ceil(allVideos.value.length / perPage.value);
  if (totalSets <= 1) return;

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
const handleManualNavigation = (direction: 'prev' | 'next') => {
  stopAutoSlide();
  if (direction === 'prev') {
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
