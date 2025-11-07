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
          <!-- Featured Image with Figure -->

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
                :id="data?.author?.id || 0"
                :name="data?.author?.display_name || ''"
                :slug="data?.author?.slug || ''"
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
              <CategoryBadge
                :name="data?.category?.name || ''"
                :slug="data?.category?.slug || ''"
              />
            </div>
          </header>

          <figure
            itemprop="image"
            itemscope
            itemtype="https://schema.org/ImageObject"
          >
            <NuxtImg
              :src="data?.images?.big || ''"
              :alt="data?.title || ''"
              width="720"
              height="400"
              sizes="sm:100vw md:720px"
              class="w-full max-h-[500px] object-cover rounded-lg"
              loading="eager"
              fetchpriority="high"
              itemprop="url contentUrl"
            />
            <figcaption class="text-subtitle font-normal text-sm mt-2">
              {{ data?.images?.description }}
            </figcaption>
            <!-- Hidden meta for schema.org -->
            <meta itemprop="width" content="720" />
            <meta itemprop="height" content="400" />
          </figure>

          <!-- Article Body -->
          <section
            itemprop="articleBody"
            class="prose prose-sm md:prose-base max-w-none text-subtitle"
            v-html="renderedContent"
          />

          <!-- Article Editor -->
          <p class="flex items-center gap-2 text-subtitle">
            Editor :
            <span class="!font-title">{{ data?.editor?.display_name }}</span>
          </p>

          <!-- Article Footer (Tags) -->
          <footer class="space-y-2">
            <h2 class="text-xs text-grayscale-40 uppercase">Kata Kunci</h2>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="tag in data?.tags || []"
                :key="tag.id"
                :to="`/tag/${tag.tag_slug}`"
                class="text-xs font-semibold border border-brand-300 rounded-sm p-2 text-brand-800 uppercase flex items-center gap-1"
                itemprop="keywords"
              >
                <IconCircleCheck class="size-3" />
                {{ tag.tag }}
              </NuxtLink>
            </div>
          </footer>

          <!-- Hidden Schema.org metadata -->
          <meta itemprop="dateModified" :content="data?.updated_at" />
          <div
            itemprop="publisher"
            itemscope
            itemtype="https://schema.org/Organization"
            class="hidden"
          >
            <meta itemprop="name" content="Politik Indonesia" />
            <div
              itemprop="logo"
              itemscope
              itemtype="https://schema.org/ImageObject"
            >
              <meta
                itemprop="url"
                content="https://politikindonesia.id/logo.png"
              />
            </div>
          </div>
        </article>
      </section>

      <!-- Sidebar -->
      <aside class="w-full pl-0 xl:pl-4 space-y-10  top-32 self-start">
        <!-- <WidgetUpcomingEvent /> -->
        <WidgetLatestNews type="popular" />

        <WidgetSocialMedia />
      </aside>
    </div>

    <hr class="border-grayscale-10" />

    <!-- Related Articles -->
    <section class="space-y-5 pb-10">
      <h2 class="text-lg text-title font-bold">Berita Terkait</h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-8">
        <ArticleCard
          v-for="article in relatedArticles"
          :key="article.id"
          :article="article"
          class="grid-article-divider"
        />
      </div>
    </section>

  </ContentContainer>
</template>

<script lang="ts" setup>
import type {
  Article,
  ArticleDetailResponse,
  ArticleListResponse,
  ArticleTag,
} from "~/types";
import WidgetSocialMedia from "~/components/widget/SocialMedia.vue";


// Composables
const route = useRoute();
const { renderContent, extractPlainText } = useMarkdown();
const isLoading = ref(true);
const relatedArticles = ref<Article[]>();

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
const { data: articleResponse, error: fetchError } =
  await useFetch<ArticleDetailResponse>(
    `${useRuntimeConfig().public.apiBase}/api/v1/posts/${fullPath}`,
    {
      headers: {
        "User-Agent": "PolitikIndonesia/1.0",
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
if (!articleResponse.value?.data) {
  throw createError({
    statusCode: 404,
    statusMessage: articleResponse.value?.message || "Article not found",
    fatal: true,
  });
}

// Computed Properties
const data = computed(() => articleResponse.value?.data);
const renderedContent = computed(() =>
  renderContent(data.value?.content || "")
);

// Extract plain text for meta description
const plainTextContent = computed(() => {
  const plain = extractPlainText(data.value?.content || "");
  return plain.substring(0, 160); // Limit to 160 chars for meta description
});

async function fetchRelatedArticles() {
  try {
    isLoading.value = true;
    const response = await $fetch<ArticleListResponse>(
      `${useRuntimeConfig().public.apiBase}/api/v1/posts/${
        data.value?.id
      }/related`,
      {
        query: {
          limit: 3,
        },
      }
    );
    relatedArticles.value = response?.data || [];
  } catch (error) {
    console.error("Failed to fetch related articles:", error);
  } finally {
    isLoading.value = false;
  }
}

useHead({
  title: `${data?.value?.title}`,
  meta: [
    { name: "description", content: `${data?.value?.summary || ""}` },
    { name: "keywords", content: tagsToString(data?.value?.tags || []) },
    { name: "news_keywords", content: tagsToString(data?.value?.tags || []) },
    {
      name: "article:author",
      content: data?.value?.author?.display_name || "",
    },
  ],
});

const { baseUrl } = useBaseUrl();

useSeoMeta({
  title: `${data?.value?.title}`,
  ogTitle: `${data?.value?.title}`,
  description: `${data?.value?.summary || ""}`,
  ogDescription: `${data?.value?.summary || ""}`,
  ogImage: data?.value?.images?.big || "",
  ogImageWidth: "750",
  ogImageHeight: "422",
  ogUrl: `${baseUrl}/article/${data?.value?.title_slug}`,
  author: data?.value?.author?.display_name || "",
});

function tagsToString(tags: ArticleTag[]) {
  return tags.map((tag) => tag.tag).join(", ");
}

onMounted(async () => {
  await fetchRelatedArticles();
});
</script>
