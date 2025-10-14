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
            :disabled="currentPage === 0"
            :class="[
              'cursor-pointer transition-colors',
              currentPage === 0
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
            :disabled="currentPage >= totalPages - 1"
            :class="[
              'cursor-pointer transition-colors',
              currentPage >= totalPages - 1
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
          <div
            class="grid gap-4 transition-transform duration-500 ease-in-out"
            :class="isMobile ? 'grid-cols-1' : 'grid-cols-4'"
            :style="gridStyle"
          >
            <!-- Only render visible videos (current page + next page for preloading) -->
            <!-- the controls always show in IOS -->
            <!-- #t=0.001 for fix thumbnail video not render in IOS -->
            <template v-for="(video, index) in DUMMY_VIDEOS" :key="video.id">
              <video
                v-if="shouldRenderVideo(index)"
                :ref="(el) => setVideoRef(el, video.id)"
                :controls="isIOS || activeVideoId === video.id"
                :src="`${video.url}#t=0.001`"
                preload="metadata"
                controlsList="nodownload"
                loading="lazy"
                playsinline
                class="w-full aspect-[9/16] object-cover rounded-lg"
                @play="handlePlay(video.id)"
                @mouseenter="handleMouseEnter(video.id)"
                @mouseleave="handleMouseLeave(video.id)"
                @touchstart="handleTouchStart(video.id)"
              >
                Your browser doesn't support video formats.
              </video>
              <!-- Placeholder for non-visible videos to maintain grid layout -->
              <div
                v-else
                class="w-full aspect-[9/16] rounded-lg bg-grayscale-20"
              />
            </template>
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
import { isIOSDevice } from '~/utils/device'

const DUMMY_VIDEOS = [
  {
    id: 1,
    title: 'Video 1',
    url: 'https://politikindonesia.id/uploads/videos/2025/10/pengamat-otomotif.mp4',
  },
  {
    id: 2,
    title: 'Video 2',
    url: 'https://politikindonesia.id/uploads/videos/2025/10/ini-alasan.mp4',
  },
  {
    id: 3,
    title: 'Video 3',
    url: 'https://politikindonesia.id/uploads/videos/2025/10/istana-bongkar.mp4',
  },
  {
    id: 4,
    title: 'Video 4',
    url: 'https://politikindonesia.id/uploads/videos/2025/10/rocky-gerung-menduga.mp4',
  },
  {
    id: 5,
    title: 'Video 5',
    url: 'https://politikindonesia.id/uploads/videos/2025/10/pengamat-otomotif.mp4',
  },
  {
    id: 6,
    title: 'Video 6',
    url: 'https://politikindonesia.id/uploads/videos/2025/10/ini-alasan.mp4',
  },
]

// Responsive video carousel state (automatically reactive to window resize)
const { isMobile, videosPerPage, calculateGridStyle } =
  useVideoCarouselResponsive()

// Video carousel management
const {
  activeVideoId,
  currentPage,
  totalPages,
  shouldRenderVideo,
  isCurrentPageVideo,
  setVideoRef,
  handlePlay,
  handleMouseEnter,
  handleMouseLeave,
  handleTouchStart,
  goToNext,
  goToPrev,
  resetToFirstPage,
  clearAllVideoRefs,
} = useVideoCarousel(DUMMY_VIDEOS, videosPerPage)

const isIOS = computed(() => isIOSDevice())

const gridStyle = computed(() =>
  calculateGridStyle(currentPage.value, DUMMY_VIDEOS.length)
)

// Watch for mobile/desktop switch and reset carousel
const prevIsMobile = ref(isMobile.value)
watch(isMobile, (newValue) => {
  if (prevIsMobile.value !== newValue) {
    resetToFirstPage()
    prevIsMobile.value = newValue
  }
})

// Cleanup video refs on unmount
onUnmounted(() => {
  clearAllVideoRefs()
})
</script>

<style></style>
