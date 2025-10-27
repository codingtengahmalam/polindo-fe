<template>
  <aside
    class="w-full bg-white rounded-lg space-y-4"
    aria-labelledby="latest-news-title"
  >
    <h2 id="latest-news-title" class="text-title font-semibold">
      Berita {{ props.type === 'latest' ? 'Terbaru' : 'Populer' }}
    </h2>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex flex-col gap-3">
      <div v-for="i in 4" :key="i" class="flex items-center gap-2 border-b border-grayscale-10 pb-3 last:border-b-0 last:pb-0">
        <div class="shrink-0 w-16 h-16 bg-grayscale-10 rounded-lg animate-pulse" />
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-grayscale-10 rounded animate-pulse" />
          <div class="h-4 bg-grayscale-10 rounded w-3/4 animate-pulse" />
        </div>
      </div>
    </div>

    <div v-else-if="articles?.data && articles.data.length > 0" class="flex flex-col gap-3">
      <article
        v-for="article in articles?.data"
        :key="article.id"
        class="flex items-center gap-2 border-b border-grayscale-10 pb-3 last:border-b-0 last:pb-0"
      >
        <NuxtLink v-if="props.type === 'popular'" :to="`/${article.title_slug}`" class="shrink-0 overflow-hidden rounded-lg bg-grayscale-5">
          <NuxtImg
            :src="article.images?.big"
            :alt="article.title"
            width="64"
            height="64"
            sizes="64px"
            class="w-16 h-16 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            loading="lazy"
          />
        </NuxtLink>
        <time
          v-if="props.type === 'latest'"
          :datetime="article.created_at"
          class="text-xs text-brand-600 size-16 aspect-square shrink-0 flex items-center font-semibold"
        >
          {{ relativeTime(article.created_at) }}
        </time>
        <div class="flex flex-col items-start gap-3">
          <h3 class="w-full text-title text-sm font-semibold line-clamp-3">
            <NuxtLink
              :to="`/${article.title_slug}`"
              class="hover:text-brand-600 transition-colors"
            >
              {{ article.title }}
            </NuxtLink>
          </h3>
          <CategoryBadge :name="article.category?.name || ''" :slug="article.category?.slug || ''" />
        </div>
      </article>
      <div v-if="hasMoreNews" class="pt-1">
        <NuxtLink
          :to="`/article/${props.type === 'latest' ? 'terbaru' : 'populer'}`"
          class="text-brand-800 uppercase text-sm font-normal flex items-center gap-2 hover:text-brand-700 transition-colors"
          aria-label="Lihat semua berita terbaru lainnya"
        >
          BERITA {{ props.type === 'latest' ? 'TERBARU' : 'POPULER' }} LAINNYA
          <IconArrowRight aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
    <div v-else class="text-subtitle text-sm text-center py-4">
      Tidak ada berita tersedia saat ini.
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { ArticleListResponse } from '~/types';

interface Props {
  type: 'latest' | 'popular';
}

const props = defineProps<Props>();

const articles = ref<ArticleListResponse | null>(null);
const isLoading = ref(true);

// Fetch data client-side only
onMounted(async () => {
  try {
    const config = useRuntimeConfig();
    const endpoint = props.type === 'latest'
      ? `${config.public.apiBase}/api/v1/posts?per_page=8`
      : `${config.public.apiBase}/api/v1/posts/popular?limit=6`;

    articles.value = await $fetch<ArticleListResponse>(endpoint);
  } catch (error) {
    console.error(`Failed to fetch ${props.type} articles:`, error);
    articles.value = null;
  } finally {
    isLoading.value = false;
  }
});

const hasMoreNews = computed(() => {
  return articles.value?.links?.next !== null;
});
</script>
