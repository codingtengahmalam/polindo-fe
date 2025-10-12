<template>
  <nav
    class="bg-brand-25 min-h-14 flex items-center"
    aria-label="Trending articles carousel"
    @mouseenter="stopAutoSlide"
    @mouseleave="startAutoSlide"
  >
    <div class="container mx-auto px-4 md:px-6 xl:px-0 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 md:gap-5 min-w-0 flex-1">
        <div class="flex items-center gap-2 flex-shrink-0">
          <IconAnnouncement class="sm:size-4" />
          <span class="text-brand-600 hidden md:block text-sm font-semibold">TRENDING</span>
        </div>
        <NuxtLink
          v-if="currentItem"
          :to="currentItem.link"
          class="text-xs md:text-sm text-subtitle overflow-hidden text-ellipsis whitespace-nowrap transition-opacity ease-in-out min-w-0"
          :class="{ 'opacity-0': isFading, 'opacity-100': !isFading }"
          :style="{ transitionDuration: `${FADE_DURATION}ms` }"
        >
          {{ currentItem.title }}
        </NuxtLink>
      </div>
      <div class="flex items-center gap-3 text-grayscale-40 flex-shrink-0">
        <button
          type="button"
          aria-label="Previous trending article"
          class="cursor-pointer transition-colors hover:text-grayscale-100"
          :disabled="isFading"
          @click="goToPrev"
        >
          <IconChevronLeft class="size-3" />
        </button>
        <button
          type="button"
          aria-label="Next trending article"
          class="cursor-pointer transition-colors hover:text-grayscale-100"
          :disabled="isFading"
          @click="goToNext"
        >
          <IconChevronLeft class="size-3 rotate-180" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
// Constants
const FADE_DURATION = 400 // milliseconds
const AUTO_SLIDE_INTERVAL = 3000 // milliseconds

interface TrendingItem {
  id: number
  title: string
  link: string
}

// TODO: Replace with actual API call using useFetch
const dummyData: TrendingItem[] = [
  {
    id: 1,
    title: 'Roy Suryo Desak KPK Tuntaskan Laporan Dugaan Korupsi Jokowi dan Keluarga',
    link: 'https://www.google.com',
  },
  {
    id: 2,
    title: 'Wakil Presiden janjikan 19 lapangan pekerjaan',
    link: 'https://www.google.com',
  },
  {
    id: 3,
    title: '130 Anak Keracunan MBG di Banjar Kalsel',
    link: 'https://www.google.com',
  },
]

// Reactive state
const currentIndex = ref(0)
const isFading = ref(false)

// Computed properties
const currentItem = computed<TrendingItem | undefined>(() => dummyData[currentIndex.value])

// Methods
const goToNext = () => {
  if (isFading.value || dummyData.length === 0) return

  isFading.value = true

  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % dummyData.length
    isFading.value = false
  }, FADE_DURATION)
}

const goToPrev = () => {
  if (isFading.value || dummyData.length === 0) return

  isFading.value = true

  setTimeout(() => {
    currentIndex.value = currentIndex.value === 0 ? dummyData.length - 1 : currentIndex.value - 1
    isFading.value = false
  }, FADE_DURATION)
}

let autoSlideInterval: ReturnType<typeof setInterval> | null = null

const startAutoSlide = () => {
  if (dummyData.length <= 1) return

  autoSlideInterval = setInterval(() => {
    goToNext()
  }, AUTO_SLIDE_INTERVAL)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

// Lifecycle hooks
onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>
