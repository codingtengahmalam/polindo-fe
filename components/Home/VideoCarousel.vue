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
                <!-- Icon Play/Pause - hanya tampil ketika diklik -->
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
                      :aria-label="`Baca artikel: ${video.title}`"
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
import { isIOSDevice } from "~/utils/device";

const isIOS = computed(() => isIOSDevice());
const { isMobile, videosPerPage, calculateGridStyle } =
  useVideoCarouselResponsive();

// API state
const videos = ref<VideoPostListResponse>();
const allVideos = ref<VideoPost[]>([]); // Store all fetched videos
const currentDisplayIndex = ref<number>(0); // Current starting index for display
const isLoading = ref(false);
const isFetchingMore = ref(false);
const hasMoreData = ref(true);

// Auto slide constants
const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds
let autoSlideTimer: ReturnType<typeof setInterval> | null = null;

// Video play state tracking
const playingVideoIds = ref<Set<number>>(new Set());

// State untuk melacak video yang baru saja diklik (untuk menampilkan icon)
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

// Function to check if video is currently playing
const isVideoPlaying = (videoId: number): boolean => {
  // Use reactive state as primary source
  const isPlaying = playingVideoIds.value.has(videoId);

  // Fallback to video element check
  const videoElement = videoRefs.value.get(videoId);
  const elementIsPlaying = videoElement ? !videoElement.paused : false;

  console.log("isVideoPlaying debug:", {
    videoId,
    reactiveState: isPlaying,
    elementState: elementIsPlaying,
    hasVideoElement: !!videoElement,
    paused: videoElement?.paused,
    playingVideoIds: Array.from(playingVideoIds.value),
  });

  return isPlaying || elementIsPlaying;
};

// Function to check if video was recently clicked (untuk menampilkan icon)
const isVideoClicked = (videoId: number): boolean => {
  return clickedVideoIds.value.has(videoId);
};

// Function to show icon for a specific video
const showIconForVideo = (videoId: number) => {
  // Clear existing timer if any
  const existingTimer = iconTimers.value.get(videoId);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  // Add video to clicked set
  clickedVideoIds.value.add(videoId);

  // Set timer to hide icon after 1 second
  const timer = setTimeout(() => {
    clickedVideoIds.value.delete(videoId);
    iconTimers.value.delete(videoId);
  }, 1000);

  iconTimers.value.set(videoId, timer);
};

// Function to hide icon for a specific video
const hideIconForVideo = (videoId: number) => {
  const timer = iconTimers.value.get(videoId);
  if (timer) {
    clearTimeout(timer);
    iconTimers.value.delete(videoId);
  }
  clickedVideoIds.value.delete(videoId);
};

// Function to toggle video play/pause when button is clicked
const toggleVideoPlayback = (videoId: number) => {
  const videoElement = videoRefs.value.get(videoId);
  const isCurrentlyPlaying = playingVideoIds.value.has(videoId);

  // Show icon when clicked
  showIconForVideo(videoId);

  if (videoElement) {
    if (isCurrentlyPlaying || !videoElement.paused) {
      console.log("Pausing video:", videoId);
      // Pause the current video
      videoElement.pause();
      playingVideoIds.value.delete(videoId);
    } else {
      console.log("Playing video:", videoId);
      // Pause all other videos first
      handlePlay(videoId);
      // Clear all playing states
      playingVideoIds.value.clear();
      // Then play the selected video
      videoElement
        .play()
        .then(() => {
          playingVideoIds.value.add(videoId);
        })
        .catch((error) => {
          console.warn("Error playing video:", error);
        });
    }
  } else {
    console.warn("Video element not found for ID:", videoId);
  }
};

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

    // Store all videos and create response structure
    allVideos.value = response.data;
    videos.value = {
      data: currentVideos.value,
      links: response.links,
      meta: response.meta
    };

    // Check if there's more data available
    hasMoreData.value = response.links.next !== null;

    // Start auto slide after data is loaded
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

    // Append new videos to existing array
    allVideos.value.push(...response.data);

    // Check if there's more data available
    hasMoreData.value = response.links.next !== null;
  } catch (error) {
    console.error("Error fetching more videos:", error);
  } finally {
    isFetchingMore.value = false;
  }
}

// Navigate to next page
async function goToNext() {
  if (!hasNextPage.value || isLoading.value) return;

  pauseAllVideos();
  // Clear all icon timers when changing page
  iconTimers.value.forEach((timer) => clearTimeout(timer));
  iconTimers.value.clear();
  clickedVideoIds.value.clear();

  const nextIndex = currentDisplayIndex.value + perPage.value;

  // Check if we need to fetch more data
  if (nextIndex >= allVideos.value.length && hasMoreData.value) {
    await fetchMoreVideos();
  }

  // Navigate to next set of videos
  if (nextIndex < allVideos.value.length) {
    currentDisplayIndex.value = nextIndex;
    // Update videos.value to reflect current display
    videos.value = {
      ...videos.value!,
      data: currentVideos.value
    };
  } else if (hasMoreData.value) {
    // If we still have more data but couldn't fetch it, try again
    await fetchMoreVideos();
    if (nextIndex < allVideos.value.length) {
      currentDisplayIndex.value = nextIndex;
      videos.value = {
        ...videos.value!,
        data: currentVideos.value
      };
    }
  } else {
    // Loop to first page when reaching the end
    currentDisplayIndex.value = 0;
    videos.value = {
      ...videos.value!,
      data: currentVideos.value
    };
  }
}

// Navigate to previous page
async function goToPrev() {
  if (!hasPrevPage.value || isLoading.value) return;

  pauseAllVideos();
  // Clear all icon timers when changing page
  iconTimers.value.forEach((timer) => clearTimeout(timer));
  iconTimers.value.clear();
  clickedVideoIds.value.clear();

  const prevIndex = currentDisplayIndex.value - perPage.value;

  if (prevIndex >= 0) {
    // Navigate to previous set of videos
    currentDisplayIndex.value = prevIndex;
    videos.value = {
      ...videos.value!,
      data: currentVideos.value
    };
  } else {
    // Loop to last available set when reaching the beginning
    const lastPossibleIndex = Math.max(0, allVideos.value.length - perPage.value);
    currentDisplayIndex.value = lastPossibleIndex;
    videos.value = {
      ...videos.value!,
      data: currentVideos.value
    };
  }
}

// Auto slide functions
const startAutoSlide = () => {
  // Only start auto slide if we have multiple sets of videos
  const totalSets = Math.ceil(allVideos.value.length / perPage.value);
  if (totalSets <= 1) return;

  stopAutoSlide(); // Clear any existing timer

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
  stopAutoSlide(); // Stop auto slide when user manually navigates
  if (direction === 'prev') {
    goToPrev();
  } else {
    goToNext();
  }
};

// Watch for mobile/desktop switch and reset to index 0
const prevIsMobile = ref(isMobile.value);
watch(isMobile, async (newValue) => {
  if (prevIsMobile.value !== newValue) {
    pauseAllVideos();
    stopAutoSlide(); // Stop auto slide when switching
    // Clear all icon timers when switching mobile/desktop
    iconTimers.value.forEach((timer) => clearTimeout(timer));
    iconTimers.value.clear();
    clickedVideoIds.value.clear();

    // Reset to first set of videos
    currentDisplayIndex.value = 0;

    // If we don't have enough data for the new screen size, fetch more
    const batchSize = newValue ? 5 : 16;
    if (allVideos.value.length < batchSize && hasMoreData.value) {
      await fetchMoreVideos();
    }

    // Update videos display
    videos.value = {
      ...videos.value!,
      data: currentVideos.value
    };

    // Restart auto slide after data is loaded
    startAutoSlide();
    prevIsMobile.value = newValue;
  }
});

// Initial load
onMounted(async () => {
  await getInitialVideos();
  // Start auto slide after initial data is loaded
  startAutoSlide();
});

// Cleanup video refs and timers on unmount
onUnmounted(() => {
  clearAllVideoRefs();
  stopAutoSlide(); // Stop auto slide timer
  // Clear all icon timers
  iconTimers.value.forEach((timer) => {
    clearTimeout(timer);
  });
  iconTimers.value.clear();
  clickedVideoIds.value.clear();
});
</script>

<style></style>
