<template>
  <ContentContainer class="space-y-7 my-10">
    <div class="flex items-center justify-between">
      <h1
        class="text-title text-4xl font-bold flex flex-col md:flex-row items-start md:items-end gap-2"
      >
        Berita {{ slug === "populer" ? "Populer" : "Terbaru" }}
      </h1>

      <div v-if="slug === 'terbaru'" class="w-[250px]">
        <VueDatePicker
          v-model="dateFilter"
          placeholder="Filter"
          range
          :formats="{ input: 'dd/MM/yyyy' }"
          :time-config="{ enableTimePicker: false }"
          @update:model-value="handleDateChange"
          @cleared="handleDateClear"
        />
          <!-- :range="{ partialRange: false }" -->
      </div>
    </div>

    <div class="space-y-5">
      <div
        v-if="articles.length > 0"
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

      <div v-else-if="!isLoading && articles.length === 0">
        <div class="text-subtitle text-center py-10">
          <p>Belum ada berita yang terkait.</p>
        </div>
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
import { VueDatePicker } from "@vuepic/vue-datepicker";
import type { Article, ArticleListResponse, PaginationLinks } from "~/types";
import { formatDateOnly } from "~/utils/date-format";

const route = useRoute();

const slug = route.params.slug as string;
const articles = ref<Article[]>([]);
const page = ref(1);
const perPage = ref(15);
const isLoading = ref(true);
const links = ref<PaginationLinks>();
const dateFilter = ref();

// validate slug value
if (slug !== "populer" && slug !== "terbaru") {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

async function fetchArticlePopular() {
  try {
    isLoading.value = true;
    const response = await $fetch<ArticleListResponse>(
      `${useRuntimeConfig().public.apiBase}/api/v1/posts/popular`,
      {
        query: {
          page: page.value,
          per_page: perPage.value,
        },
      }
    );

    const data = response?.data || [];
    links.value = response?.links || {};
    articles.value.push(...data);
  } catch (error) {
    console.error("Failed to fetch article popular:", error);
  } finally {
    isLoading.value = false;
  }
}

async function fetchArticles() {
  try {
    isLoading.value = true;

    const startDate = dateFilter.value?.[0] ? formatDateOnly(dateFilter.value?.[0]) : null;
    const endDate = dateFilter.value?.[1] ? formatDateOnly(dateFilter.value?.[1]) : null;

    const response = await $fetch<ArticleListResponse>(
      `${useRuntimeConfig().public.apiBase}/api/v1/posts`,
      {
        query: {
          page: page.value,
          per_page: perPage.value,
          date_from: startDate,
          date_to: endDate,
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

async function handleDateChange(value: Date | Date[] | null) {
  if (!value || !Array.isArray(value) || value.length !== 2) {
    return;
  }

  // reset
  page.value = 1;
  articles.value = [];
  links.value = undefined;

  await fetchArticles()
}

async function handleDateClear() {
  // reset
  page.value = 1;
  articles.value = [];
  links.value = undefined;
  dateFilter.value = null;

  await fetchArticles()
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

useHead({
  title: `Berita ${slug === "populer" ? "Populer" : "Terbaru"}`,
});

onMounted(async () => {
  if (slug === "populer") {
    await fetchArticlePopular();
  } else if (slug === "terbaru") {
    await fetchArticles();
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: "Page not found",
      fatal: true,
    });
  }
});
</script>
