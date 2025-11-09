<template>
  <aside
    v-if="isLoading || ads.length > 0"
    class="w-full bg-white rounded-lg space-y-4"
    aria-labelledby="sidebar-ads-title"
  >
    <!-- Header with title and navigation -->
    <div
      v-if="showTitle"
      class="flex items-center justify-between"
    >
      <h2
        id="sidebar-ads-title"
        class="text-title font-semibold"
      >

      </h2>

      <!-- Navigation buttons - only show if multiple ads and not loading -->
      <div
        v-if="!isLoading && ads.length > 1"
        class="flex items-center gap-3 text-grayscale-40 flex-shrink-0"
      >
        <button
          type="button"
          aria-label="Previous advertisement"
          :disabled="isSliding"
          :class="[
            'cursor-pointer transition-colors',
            isSliding
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:text-grayscale-100',
          ]"
          @click="handleManualNavigation('prev')"
        >
          <IconChevronLeft class="size-3" />
        </button>
        <button
          type="button"
          aria-label="Next advertisement"
          :disabled="isSliding"
          :class="[
            'cursor-pointer transition-colors',
            isSliding
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:text-grayscale-100',
          ]"
          @click="handleManualNavigation('next')"
        >
          <IconChevronLeft class="size-3 rotate-180" />
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex flex-col gap-4">
      <div
        class="w-full aspect-[4/3] bg-grayscale-10 rounded-lg animate-pulse"
      />
    </div>

    <!-- Ads slider -->
    <div
      v-else-if="ads.length > 0"
      class="relative overflow-hidden rounded-lg"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        ref="sliderRef"
        class="flex"
        style="will-change: transform"
        :style="{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning
            ? `transform ${SLIDE_DURATION}ms ease-in-out`
            : 'none',
        }"
      >
        <article
          v-for="ad in ads"
          :key="ad.id"
          class="w-full flex-shrink-0"
        >
          <a
            :href="ad.ad_url"
            :target="getTargetAttribute(ad.ad_url)"
            :rel="getRelAttribute(ad.ad_url)"
            :aria-label="ad.ad_title || 'Advertisement'"
            class="block w-full overflow-hidden rounded-lg transition-transform duration-300 ease-in-out hover:scale-[1.02]"
          >
            <NuxtImg
              :src="ad.ad_content"
              :alt="ad.ad_title || 'Advertisement'"
              :width="300"
              :height="225"
              sizes="(max-width: 768px) 100vw, 300px"
              class="w-full h-auto object-cover"
              loading="lazy"
            />
          </a>
          <h3
            v-if="ad.ad_title_visible === '1' && ad.ad_title"
            class="mt-2 text-sm text-subtitle font-medium text-center"
          >
            {{ ad.ad_title }}
          </h3>
        </article>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { AdsListResponse, Ad } from '~/types';

// Constants
const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds
const SLIDE_DURATION = 500; // milliseconds

interface Props {
  location?: string;
  showTitle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  location: 'default',
  showTitle: true,
});

const ads = ref<Ad[]>([]);
const isLoading = ref(true);

// Get base URL for target attribute detection
const { baseUrl } = useBaseUrl();

// Slider state
const currentIndex = ref(0);
const isSliding = ref(false);
const isTransitioning = ref(true);
const sliderRef = ref<HTMLElement | null>(null);

// Auto slide timer
let autoSlideTimer: ReturnType<typeof setInterval> | null = null;
let shouldAutoResume = true; // Track if auto-slide should resume after hover

// Fetch ads data client-side only
onMounted(async () => {
  try {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.apiBase}/api/v1/ad-space?ad_location=${props.location}`;

    const response = await $fetch<AdsListResponse>(endpoint);

    console.log(response);

    ads.value = response?.data || [];
  } catch (error) {
    console.error('Failed to fetch ads:', error);
    ads.value = [];
  } finally {
    isLoading.value = false;
    // Start auto-slide after data is loaded
    if (ads.value.length > 1) {
      startAutoSlide();
    }
  }
});

// Watch ads to reset index when ads change
watch(ads, (newAds, oldAds) => {
  if (newAds.length > 0 && currentIndex.value >= newAds.length) {
    currentIndex.value = 0;
  }

  // If ads list changed significantly, reset auto-resume flag
  if (oldAds && newAds.length !== oldAds.length) {
    shouldAutoResume = true;
  }

  // Manage auto-slide based on ads count
  if (newAds.length <= 1) {
    stopAutoSlide();
  } else if (!autoSlideTimer && shouldAutoResume && !isLoading.value) {
    // Only start auto-slide if it should be running
    startAutoSlide();
  }
});

// ============================================================================
// Navigation Functions
// ============================================================================

// Navigate to next ad
function goToNext() {
  if (ads.value.length <= 1 || isSliding.value) return;

  isSliding.value = true;
  isTransitioning.value = true;

  if (currentIndex.value < ads.value.length - 1) {
    currentIndex.value += 1;
  } else {
    // Loop to first ad
    currentIndex.value = 0;
  }

  setTimeout(() => {
    isSliding.value = false;
  }, SLIDE_DURATION);
}

// Navigate to previous ad
function goToPrev() {
  if (ads.value.length <= 1 || isSliding.value) return;

  isSliding.value = true;
  isTransitioning.value = true;

  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  } else {
    // Loop to last ad
    currentIndex.value = ads.value.length - 1;
  }

  setTimeout(() => {
    isSliding.value = false;
  }, SLIDE_DURATION);
}

// ============================================================================
// Auto Slide Functions
// ============================================================================

const startAutoSlide = () => {
  if (ads.value.length <= 1) return;

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

// Handle mouse enter (pause auto-slide temporarily)
const handleMouseEnter = () => {
  if (autoSlideTimer) {
    stopAutoSlide();
    // Note: shouldAutoResume remains as-is
    // If user manually navigated (shouldAutoResume = false), it stays false
    // If auto-slide was running (shouldAutoResume = true), it stays true
  }
};

// Handle mouse leave (resume auto-slide if it should)
const handleMouseLeave = () => {
  if (shouldAutoResume && ads.value.length > 1) {
    startAutoSlide();
  }
};

// Handle manual navigation (stops auto slide permanently)
const handleManualNavigation = (direction: 'prev' | 'next') => {
  // Prevent rapid clicks
  if (isSliding.value) return;

  // Stop auto-slide and don't auto-resume
  stopAutoSlide();
  shouldAutoResume = false;

  if (direction === 'prev') {
    goToPrev();
  } else {
    goToNext();
  }
};

// ============================================================================
// Helper Functions
// ============================================================================

// Get target attribute based on URL
function getTargetAttribute(url: string): string {
  if (!url || url === '#' || url.startsWith('/')) {
    return '_self';
  }
  // Check if URL is external
  try {
    const urlObj = new URL(url);
    const baseUrlObj = new URL(baseUrl);
    if (urlObj.origin !== baseUrlObj.origin) {
      return '_blank';
    }
  } catch {
    // If URL parsing fails, treat as internal
    return '_self';
  }
  return '_self';
}

// Get rel attribute for external links
function getRelAttribute(url: string): string {
  const target = getTargetAttribute(url);
  return target === '_blank' ? 'noopener noreferrer' : '';
}

// ============================================================================
// Lifecycle
// ============================================================================

// Cleanup on unmount
onUnmounted(() => {
  stopAutoSlide();
});
</script>
