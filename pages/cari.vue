<template>
  <div class="w-full my-10 space-y-7">
    <!-- Search Component -->
    <div class="w-full py-7" :class="{ 'bg-grayscale-10': isDefaultSearch }">
      <ContentContainer class="space-y-20">
        <div class="space-y-4">
          <h1 class="text-title text-2xl font-bold text-center">Pencarian</h1>

          <!-- using function for action search -->
          <div class="flex items-center justify-center">
            <div class="relative w-full">
              <input
                type="text"
                placeholder="Cari artikel atau kata kunci"
                class="w-full px-7 py-4 pr-14 rounded-full text-lg leading-5 text-title border border-grayscale-30 focus:outline-none"
                @keyup.enter="onSearch"
                v-model="search"
                />
              <button
                type="submit"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-grayscale-30 hover:text-primary-blue transition-colors duration-200"
                aria-label="Cari"
                @click="onSearch"
              >
                <IconSearch />
              </button>
            </div>
          </div>
        </div>

        <!-- Popular Articles -->
        <div v-if="isDefaultSearch" class="space-y-4">
          <h2 class="text-title text-2xl font-bold">Berita Populer</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ArticleCard
              v-for="(article) in articlesPopular?.data"
              :key="article.id"
              :article="article"
              with-background
              with-summary
            />
          </div>
        </div>
      </ContentContainer>
    </div>

     <ContentContainer class="space-y-8">
      <h2 v-if="isDefaultSearch" class="text-title text-2xl font-bold">Berita Terbaru</h2>

      <div v-if="!isLoading" class="flex flex-col divide-y divide-grayscale-10">
        <ArticleCardLong
          v-for="article in articles"
          :key="article.id"
          :article="article"
          with-author
          with-date
          class="py-4 first:pt-0"
        />
      </div>
      <!-- Skeleton Loading -->
      <div v-if="isLoading" class="space-y-6">
        <div v-for="i in 6" :key="i" class="bg-white flex flex-col md:flex-row gap-4 animate-pulse">
          <!-- Image skeleton -->
          <div class="shrink-0 w-full md:w-40 h-40 bg-grayscale-10 rounded-t-lg"></div>

          <!-- Content skeleton -->
          <div class="space-y-3 flex-1">
            <!-- Title skeleton -->
            <div class="space-y-2">
              <div class="h-6 bg-grayscale-10 rounded w-full"></div>
              <div class="h-6 bg-grayscale-10 rounded w-4/5"></div>
            </div>

            <!-- Meta info skeleton -->
            <div class="flex items-center gap-2">
              <div class="h-4 bg-grayscale-10 rounded w-20"></div>
              <div class="h-4 bg-grayscale-10 rounded w-24"></div>
            </div>

            <!-- Summary skeleton -->
            <div class="space-y-2 pt-2">
              <div class="h-4 bg-grayscale-10 rounded w-full"></div>
              <div class="h-4 bg-grayscale-10 rounded w-full"></div>
              <div class="h-4 bg-grayscale-10 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Articles No Data -->
      <div v-if="articles.length === 0" class="text-subtitle text-center py-4">
        Tidak ada berita yang ditemukan.
      </div>
    </ContentContainer>
  </div>
</template>

<script lang="ts" setup>
import type { ArticleListResponse } from '~/types';

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

// Server-side: Check search params dari URL
const searchQuery = (route.query.query as string) || ''
const hasSearchQuery = !!searchQuery

// Initialize state berdasarkan pengecekan server-side
const search = ref<string>(searchQuery);
const isDefaultSearch = ref(!hasSearchQuery);
const page = ref<number>(1)

// Server-side: Tentukan per_page berdasarkan ada/tidaknya search query
const initialPerPage = hasSearchQuery ? 10 : 5
const perPage = ref<number>(initialPerPage)

// Fetch popular articles (server-side)
const { data: articlesPopular, error: popularError } = await useFetch<ArticleListResponse>(
  `${config.public.apiBase}/api/v1/posts/popular?limit=3`
);

// Handle error gracefully
if (popularError.value) {
  throw createError({
    statusCode: popularError.value.statusCode || 500,
    statusMessage: popularError.value.statusMessage || 'Failed to fetch popular articles',
    fatal: false,
  });
}

const { data: articlesResponse, pending: isLoading, refresh } = await useFetch<ArticleListResponse>(
  `${config.public.apiBase}/api/v1/posts`,
  {
    query: {
      search: search,
      page: page,
      per_page: perPage
    },
    watch: false
  }
)

// Computed property untuk get articles array
const articles = computed(() => articlesResponse.value?.data || [])

async function onSearch() {
  if (search.value.trim() === '') {
    // Reset to default search
    isDefaultSearch.value = true
    page.value = 1
    perPage.value = 5
  } else {
    isDefaultSearch.value = false
    page.value = 1
    perPage.value = 10
  }

  // Update URL dengan search query tanpa reload page
  await router.push({
    path: '/cari',
    query: search.value ? { query: search.value } : {}
  })

  // Refresh data - ini akan fetch dari client-side
  await refresh()
}

useHead({
  title: `Pencarian: ${search.value}`,
  meta: [
    { name: "description", content: `Search: ${search.value}` },
    { name: "keywords", content: `Search, ${search.value}` },
    { name: "news_keywords", content: `Search, ${search.value}` },
  ],
});
</script>
