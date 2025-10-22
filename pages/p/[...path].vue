<template>
  <ContentContainer class="px-4 md:px-10 xl:px-20 space-y-5">
    <div class="flex flex-col xl:flex-row xl:items-start justify-between pt-10">
      <section
        class="w-full xl:w-[750px] xl:shrink-0 space-y-8 xl:pr-5 xl:border-r border-grayscale-10"
      >
        <!-- Article -->
        <article
          itemscope
          itemtype="https://schema.org/BlogPosting"
          class="space-y-8 mb-8"
        >
          <!-- Article Header -->
          <header class="space-y-2">
            <h1
              itemprop="headline"
              class="text-title text-2xl font-playfair font-bold"
            >
              {{ data?.title }}
            </h1>

            <!-- Author & Category & Date -->
            <div class="flex items-center gap-2 text-xs">
              <time
                :datetime="data?.created_at"
                itemprop="datePublished"
                class="text-subtitle font-normal"
              >
                {{ relativeTime(data?.created_at || "") }}
              </time>
            </div>
          </header>

          <!-- Article Body -->
          <section
            itemprop="articleBody"
            class="prose prose-sm md:prose-base max-w-none text-subtitle"
            v-html="data?.page_content || ''"
          />
        </article>
      </section>

      <!-- Sidebar -->
      <aside class="w-full pl-0 xl:pl-4 space-y-10 sticky top-32 self-start">
        <!-- <WidgetUpcomingEvent /> -->
        <WidgetLatestNews type="popular" class="pb-5 md:pb-0" />
      </aside>
    </div>
  </ContentContainer>
</template>

<script lang="ts" setup>
import type { PageDetailResponse } from "~/types";

// Composables
const route = useRoute();
const { initImageResize } = useImageResize();

// Get the full path from catch-all route parameter
const fullPath = Array.isArray(route.params.path)
  ? route.params.path.join("/")
  : route.params.path;

// Validate path - prevent empty or invalid paths
if (!fullPath || fullPath.trim() === "") {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

// Fetch article with proper error handling
const { data: video, error: fetchError } = await useFetch<PageDetailResponse>(
  `${useRuntimeConfig().public.apiBase}/api/v1/pages/${fullPath}`,
  {
    headers: {
      'User-Agent': 'PolitikIndonesia/1.0',
    },
    server: true,
    // Add proper error handling
    onResponseError({ response }) {
      console.error(
        "API Error Response:",
        response.status,
        response.statusText
      );
    },
  }
);

// Handle errors gracefully
if (fetchError.value) {
  throw createError({
    statusCode: fetchError.value.statusCode || 404,
    statusMessage: fetchError.value.statusMessage || "Article not found",
    fatal: true,
  });
}

// Check if article data exists
if (!video.value?.data) {
  throw createError({
    statusCode: 404,
    statusMessage: video.value?.message || "Video not found",
    fatal: true,
  });
}

// Computed Properties
const data = computed(() => video.value?.data);

useHead({
  title: `${data?.value?.title}`,
  meta: [
    { name: "description", content: `${data?.value?.description || ""}` },
    { name: "keywords", content: data?.value?.keywords || "" },
    { name: "news_keywords", content: data?.value?.keywords || "" },
    { name: "article:author", content: "Politik Indonesia" },
  ],
});

const { baseUrl } = useBaseUrl();

useSeoMeta({
  title: `${data?.value?.title}`,
  ogTitle: `${data?.value?.title}`,
  description: `${data?.value?.description || ""}`,
  ogDescription: `${data?.value?.description || ""}`,
  ogUrl: `${baseUrl}/p/${data?.value?.slug}`,
  author: "Politik Indonesia",
});

// Initialize image resize untuk memastikan gambar mengikuti ukuran asli
onMounted(() => {
  initImageResize();
});

// Watch untuk perubahan data dan re-initialize image resize
watch(
  data,
  () => {
    nextTick(() => {
      initImageResize();
    });
  },
  { deep: true }
);
</script>
