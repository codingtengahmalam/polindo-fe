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
          class="space-y-8"
        >
          <figure class="space-y-2">
            <div
              class="w-full h-[250px] md:h-[400px] xl:h-[450px] bg-black rounded-lg flex items-center justify-center overflow-hidden"
            >
              <video
                :src="data?.video_path || undefined"
                :poster="data?.image_thumbnail || undefined"
                controls
                preload="metadata"
                controlsList="nodownload"
                disablePictureInPicture
                playsinline
                class="w-full h-full object-contain"
                :aria-label="data?.title"
              >
                <track
                  kind="captions"
                  :src="data?.video_path || undefined"
                  srclang="id"
                  label="Indonesian"
                  default
                />
                Your browser doesn't support the video tag.
              </video>
            </div>

            <figcaption class="text-subtitle font-normal text-sm mt-2">
              {{ data?.summary }}
            </figcaption>
          </figure>

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
              <Author
                :id="data?.user?.id || 0"
                :name="data?.user?.display_name || ''"
                :slug="data?.user?.slug || ''"
                itemprop="author"
              />
              <span class="text-grayscale-40">•</span>
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
            v-html="data?.video_description || ''"
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
import type { VideoPostDetailResponse } from "~/types";

// Composables
const route = useRoute();

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
const { data: video, error: fetchError } =
  await useFetch<VideoPostDetailResponse>(
    `${useRuntimeConfig().public.apiBase}/api/v1/video-posts/${fullPath}`,
    {
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
    { name: "description", content: `${data?.value?.summary || ""}` },
    { name: "keywords", content: data?.value?.keywords || "" },
    { name: "news_keywords", content: data?.value?.keywords || "" },
    { name: "article:author", content: data?.value?.user?.display_name || "" },
  ],
});

const { baseUrl } = useBaseUrl();

useSeoMeta({
  title: `${data?.value?.title}`,
  ogTitle: `${data?.value?.title}`,
  description: `${data?.value?.summary || ""}`,
  ogDescription: `${data?.value?.summary || ""}`,
  ogImage: data?.value?.image_thumbnail || "",
  ogImageWidth: "750",
  ogImageHeight: "422",
  ogUrl: `${baseUrl}/video/${data?.value?.video_slug}`,
  author: data?.value?.user?.display_name || "",
});
</script>
