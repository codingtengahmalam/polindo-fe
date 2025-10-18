<template>
  <nav
    class="bg-brand-25 min-h-12 flex items-center"
    aria-label="Trending articles carousel"
    @mouseenter="stopAutoSlide"
    @mouseleave="startAutoSlide"
  >
    <div class="container mx-auto px-0 md:px-10 xl:px-20 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 md:gap-5 min-w-0 flex-1">
        <div class="flex items-center gap-2 flex-shrink-0">
          <IconAnnouncement class="sm:size-4" />
          <span class="text-brand-600 hidden md:block text-sm font-semibold">TRENDING</span>
        </div>
        <div class="relative min-w-0 flex-1 overflow-hidden">
          <div
            ref="sliderRef"
            class="flex"
            :style="{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning ? `transform ${SLIDE_DURATION}ms ease-in-out` : 'none'
            }"
          >
            <!-- Clone of last item for seamless loop (next) -->
            <NuxtLink
              v-if="lastItem"
              :to="`/${lastItem.title_slug}`"
              class="text-xs md:text-sm text-subtitle whitespace-nowrap flex-shrink-0 w-full"
              tabindex="-1"
            >
              <span class="overflow-hidden text-ellipsis block">
                {{ lastItem.title }}
              </span>
            </NuxtLink>

            <!-- Original items -->
            <NuxtLink
              v-for="item in trendingData"
              :key="item.id"
              :to="`/${item.title_slug}`"
              class="text-xs md:text-sm text-subtitle whitespace-nowrap flex-shrink-0 w-full"
            >
              <span class="overflow-hidden text-ellipsis block">
                {{ item.title }}
              </span>
            </NuxtLink>

            <!-- Clone of first item for seamless loop (prev) -->
            <NuxtLink
              v-if="firstItem"
              :to="`/${firstItem.title_slug}`"
              class="text-xs md:text-sm text-subtitle whitespace-nowrap flex-shrink-0 w-full"
              tabindex="-1"
            >
              <span class="overflow-hidden text-ellipsis block">
                {{ firstItem.title }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3 text-grayscale-40 flex-shrink-0">
        <button
          type="button"
          aria-label="Previous trending article"
          class="cursor-pointer transition-colors hover:text-grayscale-100"
          :disabled="isSliding"
          @click="goToPrev"
        >
          <IconChevronLeft class="size-3" />
        </button>
        <button
          type="button"
          aria-label="Next trending article"
          class="cursor-pointer transition-colors hover:text-grayscale-100"
          :disabled="isSliding"
          @click="goToNext"
        >
          <IconChevronLeft class="size-3 rotate-180" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { Article, ArticleListResponse } from '~/types'

// Constants
const SLIDE_DURATION = 800 // milliseconds
const AUTO_SLIDE_INTERVAL = 5000 // milliseconds

const trendingData = ref<Article[]>([])

// Reactive state
const currentIndex = ref(1) // Start at 1 because we have a cloned item at index 0
const isSliding = ref(false)
const isTransitioning = ref(true)
const sliderRef = ref<HTMLElement | null>(null)

// Computed properties
const firstItem = computed(() => trendingData.value[0])
const lastItem = computed(() => trendingData.value[trendingData.value.length - 1])

// Methods
const goToNext = () => {
  if (isSliding.value || trendingData.value.length === 0) return

  isSliding.value = true
  isTransitioning.value = true

  currentIndex.value++

  setTimeout(() => {
    // If we're at the cloned last item (index = length + 1)
    if (currentIndex.value > trendingData.value.length) {
      // Disable transition for instant jump
      isTransitioning.value = false
      // Jump to the real first item (index 1)
      currentIndex.value = 1

      // Re-enable transition after a tiny delay
      setTimeout(() => {
        isTransitioning.value = true
        isSliding.value = false
      }, 50)
    } else {
      isSliding.value = false
    }
  }, SLIDE_DURATION)
}

const goToPrev = () => {
  if (isSliding.value || trendingData.value.length === 0) return

  isSliding.value = true
  isTransitioning.value = true

  currentIndex.value--

  setTimeout(() => {
    // If we're at the cloned first item (index = 0)
    if (currentIndex.value < 1) {
      // Disable transition for instant jump
      isTransitioning.value = false
      // Jump to the real last item (index = length)
      currentIndex.value = trendingData.value.length

      // Re-enable transition after a tiny delay
      setTimeout(() => {
        isTransitioning.value = true
        isSliding.value = false
      }, 50)
    } else {
      isSliding.value = false
    }
  }, SLIDE_DURATION)
}

let autoSlideInterval: ReturnType<typeof setInterval> | null = null

const startAutoSlide = () => {
  if (trendingData.value.length <= 1) return

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

async function getTrendingData() {
  try {
    const response = await $fetch<ArticleListResponse>(`${useRuntimeConfig().public.apiBase}/api/v1/posts/trending`)

    trendingData.value = response.data
  } catch (error) {
    console.error('Failed to fetch trending data:', error)
    trendingData.value = []
  }
}

// Lifecycle hooks
onMounted(async () => {
  await getTrendingData()
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>
