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
            @click="goToPrev"
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
            @click="goToNext"
          >
            <IconChevronLeft class="size-3 rotate-180" />
          </button>
        </div>
      </div>

      <!-- Content Video -->
      <div class="overflow-hidden">
        <ClientOnly>
          <!-- Loading State -->
          <div
            v-if="isLoading"
            class="grid gap-4"
            :class="isMobile ? 'grid-cols-1' : 'grid-cols-4'"
          >
            <div
              v-for="i in (isMobile ? 1 : 4)"
              :key="i"
              class="w-full aspect-[9/16] rounded-lg bg-grayscale-20 animate-pulse"
            />
          </div>

          <!-- Videos Grid -->
          <div
            v-else
            class="grid gap-4 transition-opacity duration-300"
            :class="isMobile ? 'grid-cols-1' : 'grid-cols-4'"
          >
            <!-- Video Container with Overlay -->
            <div
              v-for="(video, index) in videos?.data"
              :key="video.id"
              class="relative group"
            >
              <!-- Video Element -->
              <video
                :ref="(el) => setVideoRef(el, video.id, index)"
                :controls="isIOS || activeVideoId === video.id"
                :src="`${video.video_path}#t=0.001`"
                :data-video-id="video.id"
                preload="metadata"
                controlsList="nodownload"
                disablePictureInPicture
                playsinline
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
                <!-- Bottom overlay for title (always visible on mobile, hover on desktop) -->
                <div
                  class="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 ease-in-out pointer-events-none"
                  :class="isMobile ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'"
                >
                  <div class="bg-gradient-to-t from-black/80 to-transparent rounded-b-lg p-4 -m-4 pointer-events-auto">
                    <NuxtLink
                      :to="`/video/${video.video_slug}`"
                      class="block text-white hover:text-brand-300 transition-colors duration-200 pointer-events-auto"
                      :aria-label="`Baca artikel: ${video.title}`"
                      @click.stop
                    >
                      <h3 class="text-sm font-semibold line-clamp-2 leading-tight">
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
                v-for="i in (isMobile ? 1 : 4)"
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
import type { VideoPostListResponse } from '~/types'
import { isIOSDevice } from '~/utils/device'

const isIOS = computed(() => isIOSDevice())
const { isMobile, videosPerPage, calculateGridStyle } =
  useVideoCarouselResponsive()

// API state
const videos = ref<VideoPostListResponse>()
const currentPage = ref<number>(1)
const isLoading = ref(false)

// Video play state tracking
const playingVideoIds = ref<Set<number>>(new Set())

// Computed perPage based on screen size (mobile: 1, desktop: 4)
const perPage = computed(() => videosPerPage.value)

// Computed: Check if has next/prev page from API links
const hasNextPage = computed(() => videos.value?.links?.next !== null)
const hasPrevPage = computed(() => videos.value?.links?.prev !== null)

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
} = useVideoCarousel([], videosPerPage)

// Function to check if video is currently playing
const isVideoPlaying = (videoId: number): boolean => {
  // Use reactive state as primary source
  const isPlaying = playingVideoIds.value.has(videoId)

  // Fallback to video element check
  const videoElement = videoRefs.value.get(videoId)
  const elementIsPlaying = videoElement ? !videoElement.paused : false

  console.log('isVideoPlaying debug:', {
    videoId,
    reactiveState: isPlaying,
    elementState: elementIsPlaying,
    hasVideoElement: !!videoElement,
    paused: videoElement?.paused,
    playingVideoIds: Array.from(playingVideoIds.value)
  })

  return isPlaying || elementIsPlaying
}

// Function to toggle video play/pause when button is clicked
const toggleVideoPlayback = (videoId: number) => {
  const videoElement = videoRefs.value.get(videoId)
  const isCurrentlyPlaying = playingVideoIds.value.has(videoId)

  console.log('toggleVideoPlayback debug:', {
    videoId,
    hasVideoElement: !!videoElement,
    paused: videoElement?.paused,
    isCurrentlyPlaying,
    videoRefsSize: videoRefs.value.size,
    allVideoIds: Array.from(videoRefs.value.keys())
  })

  if (videoElement) {
    if (isCurrentlyPlaying || !videoElement.paused) {
      console.log('Pausing video:', videoId)
      // Pause the current video
      videoElement.pause()
      playingVideoIds.value.delete(videoId)
    } else {
      console.log('Playing video:', videoId)
      // Pause all other videos first
      handlePlay(videoId)
      // Clear all playing states
      playingVideoIds.value.clear()
      // Then play the selected video
      videoElement.play().then(() => {
        playingVideoIds.value.add(videoId)
      }).catch((error) => {
        console.warn('Error playing video:', error)
      })
    }
  } else {
    console.warn('Video element not found for ID:', videoId)
  }
}

async function getVideos() {
  try {
    isLoading.value = true
    const response = await $fetch<VideoPostListResponse>(`${useRuntimeConfig().public.apiBase}/api/v1/video-posts?${new URLSearchParams({
      page: currentPage.value.toString(),
      per_page: perPage.value.toString(),
    })}`)

    videos.value = response
  } catch (error) {
    console.error('Error fetching videos:', error)
  } finally {
    isLoading.value = false
  }
}

// Navigate to next page
async function goToNext() {
  if (hasNextPage.value && !isLoading.value) {
    pauseAllVideos()
    currentPage.value++
    await getVideos()
  }
}

// Navigate to previous page
async function goToPrev() {
  if (hasPrevPage.value && !isLoading.value) {
    pauseAllVideos()
    currentPage.value--
    await getVideos()
  }
}

// Watch for mobile/desktop switch and reset to page 1
const prevIsMobile = ref(isMobile.value)
watch(isMobile, async (newValue) => {
  if (prevIsMobile.value !== newValue) {
    pauseAllVideos()
    currentPage.value = 1
    await getVideos()
    prevIsMobile.value = newValue
  }
})

// Initial load
onMounted(() => {
  getVideos()
})

// Cleanup video refs on unmount
onUnmounted(() => {
  clearAllVideoRefs()
})
</script>

<style></style>
