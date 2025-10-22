<template>
  <div class="w-full space-y-4">
    <h2 class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2">
      Hot News
    </h2>

    <!-- Main News of Hot News -->
    <article v-if="mainNews" class="space-y-4">
      <NuxtLink :to="`/${mainNews.title_slug}`" class="block overflow-hidden rounded-lg bg-grayscale-5">
        <NuxtImg
          :src="mainNews.images?.big"
          :alt="mainNews.title"
          width="720"
          height="400"
          sizes="sm:100vw md:720px"
          class="w-full max-h-[400px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          loading="eager"
          fetchpriority="high"
        />
      </NuxtLink>
      <div class="space-y-1 pb-5 border-b border-grayscale-10">
        <div class="text-grayscale-40 font-normal flex items-center gap-2">
          <time :datetime="mainNews.created_at" class="text-xs">
            {{ relativeTime(mainNews.created_at) }}
          </time>
          <CategoryBadge :name="mainNews.category?.name || ''" :slug="mainNews.category?.slug || ''" />
        </div>
        <h3 class="text-title text-2xl font-playfair font-bold">
          <NuxtLink
            :to="`/${mainNews.title_slug}`"
            class="hover:text-brand-600 transition-colors"
          >
            {{ mainNews.title }}
          </NuxtLink>
        </h3>
      </div>
    </article>

    <!-- Secondary News of Hot News -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <article
        v-for="news in secondaryNews"
        :key="news.id"
        class="flex items-center gap-2 py-3 border-b border-grayscale-10"
      >
        <div class="w-full h-auto">
          <div class="text-grayscale-40 font-normal flex items-center gap-2">
            <time :datetime="news.created_at" class="text-xs">
              {{ relativeTime(news.created_at) }}
            </time>
            <CategoryBadge :name="news.category?.name || ''" :slug="news.category?.slug || ''" />
          </div>
          <h3 class="text-title text-lg font-playfair font-bold">
            <NuxtLink
              :to="`/${news.title_slug}`"
              class="hover:text-brand-600 transition-colors"
            >
              {{ news.title }}
            </NuxtLink>
          </h3>
        </div>
        <NuxtLink :to="`/${news.title_slug}`" class="shrink-0 overflow-hidden rounded-lg bg-grayscale-5">
          <NuxtImg
            :src="news.images?.big"
            :alt="news.title"
            width="96"
            height="96"
            sizes="96px"
            class="w-24 h-24 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            loading="lazy"
          />
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ArticleListResponse } from '~/types';


const { data: articles, error } = await useFetch<ArticleListResponse>(
  `${useRuntimeConfig().public.apiBase}/api/v1/posts/popular?limit=5`,
  {
    headers: {
      'User-Agent': 'PolitikIndonesia/1.0',
    },
    server: true,
  }
);

// Handle error gracefully
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || 'Failed to fetch hot news',
    fatal: false,
  });
}

const mainNews = computed(() => articles.value?.data[0]);
const secondaryNews = computed(() => articles.value?.data.slice(1));
</script>
