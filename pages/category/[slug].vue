<template>
  <ContentContainer class="space-y-7 my-10">
    <h1 class="text-title text-4xl font-bold border-l-4 border-brand-600 pl-2">
      {{ normalizeTextCapitalize(category?.data?.name || "") }}
    </h1>

    <!-- Popular Articles -->
    <div class="space-y-2">
      <h2
        class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2"
      >
        Berita Populer
      </h2>

      <!-- Skeleton Popular Articles -->
      <div
        v-if="initialLoading"
        class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-2"
      >
        <!-- Main skeleton -->
        <div class="w-full lg:pr-4 lg:border-r lg:border-grayscale-10 animate-pulse">
          <div class="flex flex-col md:flex-row gap-3 md:gap-4">
            <div class="w-full md:w-[280px] lg:w-[362px] h-[242px] bg-grayscale-10 rounded-lg shrink-0"></div>
            <div class="flex flex-col gap-3 md:gap-4 flex-1">
              <div class="space-y-2">
                <div class="h-4 bg-grayscale-10 rounded w-24"></div>
                <div class="h-6 bg-grayscale-10 rounded w-full"></div>
                <div class="h-6 bg-grayscale-10 rounded w-4/5"></div>
              </div>
              <div class="space-y-2">
                <div class="h-4 bg-grayscale-10 rounded w-full"></div>
                <div class="h-4 bg-grayscale-10 rounded w-full"></div>
                <div class="h-4 bg-grayscale-10 rounded w-3/4"></div>
              </div>
              <div class="h-10 bg-grayscale-10 rounded w-48"></div>
            </div>
          </div>
        </div>

        <!-- Side skeleton -->
        <div class="w-full lg:w-[266px] shrink-0 animate-pulse">
          <div class="flex flex-row sm:flex-col gap-3 sm:gap-2">
            <div class="w-full lg:h-[150px] h-[100px] bg-grayscale-10 rounded-lg shrink-0"></div>
            <div class="flex-1 space-y-2">
              <div class="h-5 bg-grayscale-10 rounded w-full"></div>
              <div class="h-5 bg-grayscale-10 rounded w-4/5"></div>
              <div class="h-4 bg-grayscale-10 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Popular Articles -->
      <div
        v-else
        class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-2"
      >
        <!-- Main Featured Article -->
        <article
          v-if="mainArticlePopular"
          class="w-full lg:pr-4 lg:border-r lg:border-grayscale-10"
        >
          <div class="flex flex-col md:flex-row gap-3 md:gap-4">
            <!-- Featured Image -->
            <NuxtImg
              :src="mainArticlePopular?.images?.big"
              :alt="mainArticlePopular?.title"
              width="362"
              height="242"
              sizes="362px"
              class="w-full md:w-[280px] lg:w-[362px] h-auto rounded-lg object-cover shrink-0"
              loading="lazy"
              fetchpriority="high"
            />

            <!-- Article Content -->
            <div class="flex flex-col gap-3 md:gap-4 flex-1">
              <div>
                <time class="text-xs text-grayscale-40 font-normal">
                  {{ relativeTime(mainArticlePopular?.created_at || "") }}
                </time>
                <h3
                  class="text-title text-lg md:text-xl lg:text-2xl font-bold font-playfair line-clamp-2 hover:text-brand-600 transition-colors"
                >
                  <NuxtLink :to="`/${mainArticlePopular?.title_slug}`">
                    {{ mainArticlePopular?.title }}
                  </NuxtLink>
                </h3>
              </div>

              <p class="text-subtitle text-sm line-clamp-3 md:line-clamp-4">
                {{ mainArticlePopular?.summary }}
              </p>

              <NuxtLink
                :to="`/${mainArticlePopular?.title_slug}`"
                class="inline-flex items-center gap-2 text-sm p-2 border border-title rounded-lg hover:bg-grayscale-10 transition-colors self-start"
              >
                Baca Berita Selengkapnya
                <IconArrowRight class="size-4" aria-hidden="true" />
              </NuxtLink>
            </div>
          </div>
        </article>

        <!-- Side Article -->
        <article
          v-if="secondaryArticlePopular.length > 0"
          class="w-full lg:w-[266px] shrink-0"
        >
          <div class="flex flex-row sm:flex-col gap-3 sm:gap-2">
            <!-- Side Image -->
            <NuxtImg
              :src="secondaryArticlePopular[0]?.images?.big"
              :alt="secondaryArticlePopular[0]?.title"
              class="w-full lg:h-[150px] rounded-lg object-cover shrink-0"
              width="150"
              height="150"
              sizes="150px"
              loading="lazy"
              fetchpriority="high"
            />

            <!-- Side Content -->
            <div class="flex-1 space-y-2">
              <h3
                class="text-title text-base sm:text-lg font-bold sm:leading-5 line-clamp-3 hover:text-brand-600 transition-colors"
              >
                <NuxtLink :to="`/${secondaryArticlePopular[0]?.title_slug}`">
                  {{ secondaryArticlePopular[0]?.title }}
                </NuxtLink>
              </h3>
              <div class="flex items-center gap-1 text-xs">
                <Author
                  :id="secondaryArticlePopular[0]?.author?.id || 0"
                  :name="secondaryArticlePopular[0]?.author?.display_name || ''"
                  :slug="secondaryArticlePopular[0]?.author?.slug || ''"
                />
                <span class="text-grayscale-40">•</span>
                <time class="text-subtitle font-normal">
                  {{
                    relativeTime(secondaryArticlePopular[0]?.created_at || "")
                  }}
                </time>
              </div>
            </div>
          </div>
        </article>
      </div>

      <hr class="border-grayscale-10" />

      <!-- Skeleton Secondary Popular Articles -->
      <div v-if="initialLoading" class="grid grid-cols-1 md:grid-cols-2 pt-5">
        <div
          v-for="col in 2"
          :key="`skeleton-col-${col}`"
          :class="[
            col === 1
              ? 'md:pr-4 md:border-r md:border-grayscale-10'
              : 'md:pl-4',
          ]"
        >
          <div
            v-for="i in 2"
            :key="`skeleton-item-${i}`"
            class="min-h-24 py-4 border-b border-grayscale-10 animate-pulse space-y-2"
          >
            <div class="h-5 bg-grayscale-10 rounded w-full"></div>
            <div class="h-5 bg-grayscale-10 rounded w-4/5"></div>
            <div class="h-4 bg-grayscale-10 rounded w-24"></div>
          </div>
        </div>
      </div>

      <!-- Secondary Popular Articles -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 pt-5">
        <div
          v-for="(group, groupIndex) in tertiaryArticlePopular"
          :key="`group-${groupIndex}`"
          :class="[
            groupIndex === 0
              ? 'md:pr-4 md:border-r md:border-grayscale-10'
              : 'md:pl-4',
          ]"
        >
          <article
            class="min-h-24 py-4 border-b border-grayscale-10"
            v-for="article in group"
            :key="article.id"
          >
            <h4
              class="text-title text-lg font-semibold line-clamp-2 hover:text-brand-600 transition-colors leading-5"
            >
              {{ article.title }}
            </h4>
            <time class="text-xs text-grayscale-40 font-normal">
              {{ relativeTime(article.created_at || "") }}
            </time>
          </article>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-10 md:items-start">
      <!-- Col 1 -->
      <div class="flex-1 space-y-6">
        <!-- Berita Terbaru -->
        <div class="space-y-5">
          <h2
            class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2"
          >
            Berita
            {{ normalizeTextCapitalize(category?.data?.name || "") }} Terbaru
          </h2>

          <!-- Skeleton Berita Terbaru -->
          <div
            v-if="initialLoading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
          >
            <div
              v-for="i in 3"
              :key="`skeleton-latest-${i}`"
              class="bg-white flex flex-col gap-4 animate-pulse"
            >
              <div class="w-full h-40 bg-grayscale-10 rounded-t-lg"></div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <div class="h-6 bg-grayscale-10 rounded w-full"></div>
                  <div class="h-6 bg-grayscale-10 rounded w-4/5"></div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="h-4 bg-grayscale-10 rounded w-20"></div>
                  <div class="h-4 bg-grayscale-10 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
          >
            <ArticleCard
              v-for="article in articlesLatest"
              :key="article.id"
              :article="article"
              :with-category="false"
              img-height="h-40"
              class="grid-article-divider"
            />
          </div>
        </div>

        <hr class="border-grayscale-10" />

        <!-- Berita Lainnya -->
        <div class="space-y-5">
          <h2
            class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2"
          >
            Berita
            {{ normalizeTextCapitalize(category?.data?.name || "") }} Lainnya
          </h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
          >
            <ArticleCard
              v-for="article in otherArticles"
              :key="article.id"
              :article="article"
              :with-category="false"
              img-height="h-40"
              class="grid-article-divider"
            />

            <!-- Skeleton loading -->
            <div
              v-if="isLoading"
              v-for="i in 3"
              :key="`skeleton-${i}`"
              class="bg-white flex flex-col gap-4 animate-pulse"
            >
              <!-- Image skeleton -->
              <div class="w-full h-40 bg-grayscale-10 rounded-t-lg"></div>

              <!-- Content skeleton -->
              <div class="space-y-3">
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
      </div>
      <!-- Col 2 as Aside -->
      <aside
        class="w-full md:w-[250px] shrink-0 sticky top-32 self-start space-y-6"
      >
        <div class="w-full border bg-white rounded-lg p-4 text-title">
          <h5 class="text-lg font-semibold">Kata Kunci</h5>
          <span class="text-subtitle text-sm">
            Cari artikel berdasarkan kata kunci
          </span>

          <!-- Skeleton Tags -->
          <div
            v-if="initialLoading"
            class="flex flex-wrap md:flex-col items-start gap-2 mt-4"
          >
            <div
              v-for="i in 5"
              :key="`skeleton-tag-${i}`"
              class="h-8 bg-grayscale-10 rounded-sm animate-pulse"
              :class="i === 1 ? 'w-24' : i === 2 ? 'w-32' : i === 3 ? 'w-28' : i === 4 ? 'w-36' : 'w-20'"
            ></div>
          </div>

          <div
            v-else
            class="flex flex-wrap md:flex-col items-start gap-2 mt-4"
          >
            <NuxtLink
              v-for="tag in tags"
              :key="tag.id"
              :to="`/tag/${tag.tag_slug}`"
              class="text-xs font-semibold border border-brand-300 rounded-sm p-2 text-brand-800 uppercase inline-flex items-center gap-1 line-clamp-1"
              itemprop="keywords"
            >
              <IconCircleCheck class="size-3 shrink-0" />
              {{ tag.tag }}
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>
  </ContentContainer>
</template>

<script lang="ts" setup>
import type {
  Article,
  ArticleListResponse,
  CategoryDetailResponse,
  PaginationLinks,
  Tag,
  TagListResponse,
} from "~/types";

const route = useRoute();
const slug = route.params.slug;
const articlePopular = ref<Article[]>([]);
const articlesLatest = ref<Article[]>([]);
const otherArticles = ref<Article[]>([]);
const tags = ref<Tag[]>([]);
const page = ref(1);
const perPage = ref(15);
const isLoading = ref(true);
const initialLoading = ref(true);
const links = ref<PaginationLinks>();

const { data: category, status } = await useFetch<CategoryDetailResponse>(
  `${useRuntimeConfig().public.apiBase}/api/v1/categories/${slug}`
);

async function fetchArticlePopular() {
  try {
    initialLoading.value = true;
    const response = await $fetch<ArticleListResponse>(
      `${useRuntimeConfig().public.apiBase}/api/v1/posts/popular?limit=6`,
      {
        query: {
          category_id: category?.value?.data?.id,
        },
      }
    );

    articlePopular.value = response?.data || [];
  } catch (error) {
    console.error("Failed to fetch article popular:", error);
  } finally {
    initialLoading.value = false;
  }
}

async function fetchLatestArticles() {
  try {
    initialLoading.value = true;
    const response = await $fetch<ArticleListResponse>(
      `${useRuntimeConfig().public.apiBase}/api/v1/posts`,
      {
        query: {
          category_id: category?.value?.data?.id,
          page: 1,
          per_page: 3,
        },
      }
    );
    articlesLatest.value = response?.data || [];
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  } finally {
    initialLoading.value = false;
  }
}

async function fetchOtherArticles(initial = false) {
  try {
    isLoading.value = true;
    const response = await $fetch<ArticleListResponse>(
      `${useRuntimeConfig().public.apiBase}/api/v1/posts`,
      {
        query: {
          category_id: category?.value?.data?.id,
          page: page.value,
          per_page: perPage.value,
        },
      }
    );
    const data = response?.data || [];
    links.value = response?.links || {};

    // if initial true cut 3 items first
    if (initial) {
      otherArticles.value.push(...data.slice(3));
    } else {
      otherArticles.value.push(...data);
    }
  } catch (error) {
    console.error("Failed to fetch other articles:", error);
  } finally {
    isLoading.value = false;
  }
}

async function fetchTags() {
  try {
    const response = await $fetch<TagListResponse>(
      `${useRuntimeConfig().public.apiBase}/api/v1/tags/${category?.value?.data?.id}`,
    );

    tags.value = response?.data || [];
  } catch (error) {
    console.error("Failed to fetch tags:", error);
  } finally {
    initialLoading.value = false;
  }
}

const hasNextPage = computed(() => {
  return links.value?.next !== null;
});

async function fetchNextPage() {
  if (hasNextPage.value) {
    page.value++;
    await fetchOtherArticles();
  }
}

const mainArticlePopular = computed(() => articlePopular.value[0]);
const secondaryArticlePopular = computed(() => articlePopular.value.slice(1));
const tertiaryArticlePopular = computed(() => {
  const articles = articlePopular.value.slice(2);

  // Group articles by 2 per sub-array
  const grouped = [];
  for (let i = 0; i < articles.length; i += 2) {
    grouped.push(articles.slice(i, i + 2));
  }

  return grouped;
});

function normalizeTextCapitalize(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

onMounted(async () => {
  fetchArticlePopular();
  fetchLatestArticles();
  fetchOtherArticles(true);
  fetchTags();
});
</script>
