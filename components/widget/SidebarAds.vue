<template>
  <aside
    v-if="isLoading || filteredAds.length > 0"
    class="w-full bg-white rounded-lg space-y-4"
    aria-labelledby="sidebar-ads-title"
  >
    <h2
      v-if="showTitle && !isLoading"
      id="sidebar-ads-title"
      class="text-title font-semibold"
    >
      Iklan
    </h2>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex flex-col gap-4">
      <div
        v-for="i in 3"
        :key="i"
        class="w-full aspect-[4/3] bg-grayscale-10 rounded-lg animate-pulse"
      />
    </div>

    <!-- Ads list -->
    <div v-else-if="filteredAds.length > 0" class="flex flex-col gap-4">
      <article
        v-for="ad in filteredAds"
        :key="ad.id"
        class="w-full"
      >
        <a
          :href="ad.content.url"
          :target="ad.content.target"
          :rel="getRelAttribute(ad.content.target)"
          :aria-label="ad.title || 'Advertisement'"
          class="block w-full overflow-hidden rounded-lg transition-transform duration-300 ease-in-out hover:scale-[1.02]"
        >
          <NuxtImg
            :src="ad.content.image"
            :alt="ad.title || 'Advertisement'"
            :width="300"
            :height="225"
            sizes="(max-width: 768px) 100vw, 300px"
            class="w-full h-auto object-cover"
            loading="lazy"
          />
        </a>
        <h3
          v-if="ad.visible_title && ad.title"
          class="mt-2 text-sm text-subtitle font-medium text-center"
        >
          {{ ad.title }}
        </h3>
      </article>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { AdsListResponse, Ad } from '~/types';

interface Props {
  location?: string;
  limit?: number;
  showTitle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  location: 'default',
  limit: undefined,
  showTitle: true,
});

const ads = ref<Ad[]>([]);
const isLoading = ref(true);

// Fetch ads data client-side
onMounted(async () => {
  try {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.apiBase}/api/v1/widgets/ads`;

    const response = await $fetch<AdsListResponse>(endpoint, {
      query: {
        location: props.location,
      },
    });

    ads.value = response?.data || [];
  } catch (error) {
    console.error('Failed to fetch ads:', error);
    ads.value = [];
  } finally {
    isLoading.value = false;
  }
});

// Filter ads by date range and visibility
const filteredAds = computed(() => {
  const now = new Date();

  let filtered = ads.value.filter((ad) => {
    // Filter by visibility
    if (!ad.visibility) {
      return false;
    }

    // Filter by location
    if (ad.location !== props.location) {
      return false;
    }

    // Filter by date range
    if (ad.content.date_start && ad.content.date_end) {
      const startDate = parseDate(ad.content.date_start);
      const endDate = parseDate(ad.content.date_end);

      if (startDate && endDate) {
        // Set start date to beginning of day and end date to end of day
        const startOfStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const endOfEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999);

        return now >= startOfStartDate && now <= endOfEndDate;
      }
    }

    return true;
  })
  .sort((a, b) => a.widget_order - b.widget_order);

  // Apply limit if specified
  if (props.limit && props.limit > 0) {
    return filtered.slice(0, props.limit);
  }

  return filtered;
});

// Parse date string (DD-MM-YYYY format)
function parseDate(dateString: string): Date | null {
  if (!dateString) return null;

  try {
    const [day, month, year] = dateString.split('-').map(Number);
    if (day && month && year) {
      return new Date(year, month - 1, day);
    }
  } catch (error) {
    console.error('Failed to parse date:', dateString, error);
  }

  return null;
}

// Get rel attribute for external links
function getRelAttribute(target: string): string {
  return target === '_blank' ? 'noopener noreferrer' : '';
}
</script>
