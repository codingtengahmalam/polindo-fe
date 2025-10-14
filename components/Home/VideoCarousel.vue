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
        <div
          class="grid gap-4 transition-transform duration-500 ease-in-out"
          :class="isMobile ? 'grid-cols-1' : 'grid-cols-4'"
          :style="gridStyle"
        >
          <video
            v-for="video in dummyData"
            :ref="(el) => setVideoRef(el, video.id)"
            :key="video.id"
            :src="video.url"
            playsinline
            :controls="activeVideoId === video.id"
            controlsList="nodownload"
            class="w-full aspect-[9/16] object-cover rounded-lg"
            @play="handlePlay(video.id)"
            @mouseenter="handleMouseEnter(video.id)"
            @mouseleave="handleMouseLeave(video.id)"
            @touchstart="handleTouchStart(video.id)"
          ></video>
        </div>
      </div>
    </ContentContainer>
  </section>
</template>

<script lang="ts" setup>
const dummyData = [
  {
    id: 1,
    title: "Video 1",
    url: "https://politikindonesia.id/uploads/videos/2025/10/pengamat-otomotif.mp4",
  },
  {
    id: 2,
    title: "Video 2",
    url: "https://politikindonesia.id/uploads/videos/2025/10/ini-alasan.mp4",
  },
  {
    id: 3,
    title: "Video 3",
    url: "https://politikindonesia.id/uploads/videos/2025/10/istana-bongkar.mp4",
  },
  {
    id: 4,
    title: "Video 4",
    url: "https://politikindonesia.id/uploads/videos/2025/10/rocky-gerung-menduga.mp4",
  },
  {
    id: 5,
    title: "Video 5",
    url: "https://politikindonesia.id/uploads/videos/2025/10/pengamat-otomotif.mp4",
  },
  {
    id: 6,
    title: "Video 6",
    url: "https://politikindonesia.id/uploads/videos/2025/10/ini-alasan.mp4",
  },
];

// Video refs management
const videoRefs = ref<Map<number, HTMLVideoElement>>(new Map());
const activeVideoId = ref<number | null>(null);
const isTouchDevice = ref(false);

// Carousel state
const currentPage = ref(0);
const isMobile = ref(false);

// Update mobile state
const updateMobileState = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 768;
  }
};

// Computed: Videos per page based on screen size
// Mobile: 1 video per page, Desktop: 4 videos per page
const videosPerPage = computed(() => {
  return isMobile.value ? 1 : 4;
});

const totalPages = computed(() => {
  return Math.ceil(dummyData.length / videosPerPage.value);
});

// Computed: Grid style with gap calculation
const gridStyle = computed(() => {
  if (isMobile.value) {
    // Mobile: Each video takes 100% + gap (1rem = 16px)
    // So each "slide" is calc(100% + 1rem)
    // TranslateX needs to move by (100% + 1rem) per page
    const translateValue = `calc(-${currentPage.value * 100}% - ${
      currentPage.value * 1
    }rem)`;

    return {
      transform: `translateX(${translateValue})`,
      gridTemplateColumns: `repeat(${dummyData.length}, 100%)`,
    };
  } else {
    // Desktop: 4 videos per page, account for gap between videos
    // Each video = (100% - 3 gaps) / 4 = 25% - 0.75rem
    return {
      transform: `translateX(-${currentPage.value * 100}%)`,
      gridTemplateColumns: `repeat(${dummyData.length}, calc(25% - 0.75rem))`,
    };
  }
});

// Set video element ref
const setVideoRef = (el: any, id: number) => {
  if (el) {
    videoRefs.value.set(id, el as HTMLVideoElement);
  }
};

// Carousel navigation
const goToNext = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    pauseAllVideos();
  }
};

const goToPrev = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    pauseAllVideos();
  }
};

// Pause all videos
const pauseAllVideos = () => {
  videoRefs.value.forEach((video) => {
    if (!video.paused) {
      video.pause();
    }
  });
  activeVideoId.value = null;
};

// Handle play event - pause other videos when one plays
const handlePlay = (playingId: number) => {
  videoRefs.value.forEach((video, id) => {
    if (id !== playingId && !video.paused) {
      video.pause();
    }
  });
};

// Handle mouse enter - only for non-touch devices
const handleMouseEnter = (id: number) => {
  if (!isTouchDevice.value) {
    activeVideoId.value = id;
  }
};

// Handle mouse leave - hide controls if video is paused (non-touch only)
const handleMouseLeave = (id: number) => {
  if (!isTouchDevice.value) {
    const video = videoRefs.value.get(id);
    if (video && video.paused) {
      activeVideoId.value = null;
    }
  }
};

// Handle touch start for mobile/tablet devices
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

// Handle window resize
const handleResize = () => {
  const wasMobile = isMobile.value;
  updateMobileState();

  // Reset to first page when switching between mobile/desktop
  if (wasMobile !== isMobile.value) {
    currentPage.value = 0;
    pauseAllVideos();
  }
};

// Add resize listener
onMounted(() => {
  updateMobileState();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style></style>
