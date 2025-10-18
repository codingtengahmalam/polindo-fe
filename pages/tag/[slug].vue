<template>
  <ContentContainer class="space-y-7 my-10">
    <h1 class="text-title text-4xl font-bold flex flex-col md:flex-row items-start md:items-end gap-2">
      Tag : {{ slugToName(slug) }}
      <span
        v-if="articles.length > 0"
        class="!text-subtitle text-2xl font-normal"
        >({{ articles.length }} Artikel)</span
      >
    </h1>

    <div class="space-y-5">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
      >
        <ArticleCard
          v-if="articles.length > 0"
          v-for="article in articles"
          :key="article.id"
          :article="article"
          class="grid-article-divider"
        />
      </div>

      <div v-if="isLoading">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
        >
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white flex flex-col md:flex-row gap-4 animate-pulse"
          >
            <!-- Image skeleton -->
            <div
              class="shrink-0 w-full md:w-40 h-40 bg-grayscale-10 rounded-t-lg"
            ></div>

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
            </div>
          </div>
        </div>
      </div>

      <hr class="border-grayscale-10" />

      <div v-if="hasNextPage && !isLoading" class="flex justify-center">
        <button
          @click="fetchNextPage"
          class="text-sm p-2 border border-title rounded-lg hover:bg-grayscale-10 transition-colors"
        >
          Berita Lainnya
        </button>
      </div>
    </div>
  </ContentContainer>
</template>

<script lang="ts" setup>
import type { Article, ArticleListResponse, PaginationLinks } from "~/types";

const route = useRoute();

const articles = ref<Article[]>([]);
const page = ref(1);
const perPage = ref(15);
const isLoading = ref(true);
const links = ref<PaginationLinks>();

const slug = route.params.slug as string;

async function fetchArticles() {
  try {
    isLoading.value = true;
    const response = await $fetch<ArticleListResponse>(
      `${useRuntimeConfig().public.apiBase}/api/v1/posts`,
      {
        query: {
          tag_slug: slug,
          page: page.value,
          per_page: perPage.value,
        },
      }
    );

    const data = response?.data || [];
    links.value = response?.links || {};
    articles.value.push(...data);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  } finally {
    isLoading.value = false;
  }
}

const hasNextPage = computed(() => {
  return links.value?.next !== null;
});

async function fetchNextPage() {
  if (hasNextPage.value) {
    page.value++;
    await fetchArticles();
  }
}

function slugToName(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

onMounted(async () => {
  await fetchArticles();
});
</script>

<style></style>
