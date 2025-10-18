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
            <!-- the controls always show in IOS -->
            <!-- #t=0.001 for fix thumbnail video not render in IOS -->
            <video
              v-for="(video, index) in videos?.data"
              :key="video.id"
              :ref="(el) => setVideoRef(el, video.id, index)"
              :controls="isIOS || activeVideoId === video.id"
              :src="`${video.video_path}#t=0.001`"
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
} = useVideoCarousel([], videosPerPage)

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
