<template>
  <section aria-labelledby="category-section-title">
    <ContentContainer class="py-6 space-y-4 px-4">
      <!-- Section Header -->
      <header class="flex items-center justify-between">
        <h2
          id="category-section-title"
          class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2"
        >
          Kategori Berita
        </h2>

        <nav
          aria-label="Category navigation controls"
          class="flex items-center gap-3 text-grayscale-40 flex-shrink-0"
        >
          <button
            type="button"
            aria-label="Scroll ke kategori sebelumnya"
            :disabled="!canScrollLeft"
            :class="[
              'transition-colors rounded-sm',
              !canScrollLeft
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:text-grayscale-100 cursor-pointer',
            ]"
            @click="scrollLeft"
          >
            <IconChevronLeft class="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Scroll ke kategori berikutnya"
            :disabled="!canScrollRight"
            :class="[
              'transition-colors rounded-sm',
              !canScrollRight
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:text-grayscale-100 cursor-pointer',
            ]"
            @click="scrollRight"
          >
            <IconChevronLeft class="size-3 rotate-180" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <!-- Horizontal Scrollable Category List -->
      <div
        ref="scrollContainer"
        role="region"
        aria-label="Daftar kategori berita"
        class="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2"
        tabindex="0"
        @scroll="updateScrollState"
        @keydown="handleKeyboardNavigation"
      >
        <!-- Skeleton Loading -->
        <div
          v-if="isLoading"
          v-for="i in 4"
          :key="i"
          class="flex-shrink-0 w-full md:w-[270px] p-3 border border-grayscale-20 rounded-lg min-h-[460px] snap-start"
        >
          <div class="w-1/2 h-5 bg-grayscale-10 rounded-lg"></div>
          <div class="divide-y divide-grayscale-10">
            <div v-for="j in 5" :key="j" class="flex items-center justify-between gap-2 py-2">
              <div class="flex flex-col gap-2 w-full">
                <div class="h-4 bg-grayscale-10 rounded w-full"></div>
                <div class="h-4 bg-grayscale-10 rounded w-4/5"></div>
              </div>
              <div class="size-16 shrink-0 bg-grayscale-10 rounded-lg"></div>
            </div>
          </div>
        </div>
        <article
          v-else
          v-for="category in categoriesPosts"
          :key="category.category.id"
          class="flex-shrink-0 w-full md:w-[270px] p-3 border border-grayscale-20 rounded-lg min-h-[460px] snap-start"
        >
          <header class="mb-2">
            <h3 class="text-title text-xl font-bold">
              <NuxtLink
                :to="`/category/${category.category.slug}`"
                class="hover:text-brand-600 transition-colors rounded-sm"
              >
                {{ category.category.name }}
              </NuxtLink>
            </h3>
          </header>

          <div class="divide-y divide-grayscale-10">
            <div
              v-if="category.posts.length > 0"
              v-for="article in category.posts"
              :key="article.title_slug"
              class="flex items-center justify-between gap-2 py-2"
            >
              <div class="flex-1 min-w-0">
                <NuxtLink
                  :to="`/${article.title_slug}`"
                  class="text-title text-sm font-semibold leading-snug line-clamp-3 hover:text-brand-600 transition-colors rounded-sm"
                >
                  {{ article.title }}
                </NuxtLink>
              </div>

              <NuxtLink
                :to="`/${article.title_slug}`"
                :aria-label="`Baca artikel: ${article.title}`"
                class="shrink-0 overflow-hidden rounded-lg bg-grayscale-5"
              >
                <NuxtImg
                  :src="article.images?.default"
                  :alt="`Gambar artikel: ${article.title}`"
                  width="64"
                  height="64"
                  sizes="64px"
                  class="w-16 h-16 object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
                  loading="lazy"
                />
              </NuxtLink>
            </div>
            <div v-else class="flex items-center justify-center py-2">
              <p class="text-sm text-grayscale-40">Belum ada artikel di kategori ini.</p>
            </div>
          </div>
        </article>
      </div>
    </ContentContainer>
  </section>
</template>

<script lang="ts" setup>
import type { PostCategory, PostCategoryResponse } from "~/types";

// Use horizontal scroll composable
const {
  scrollContainer,
  canScrollLeft,
  canScrollRight,
  scrollLeft,
  scrollRight,
  updateScrollState,
} = useHorizontalScroll();

const categoriesPosts = ref<PostCategory[]>();
const isLoading = ref(true);

// Keyboard navigation for accessibility
const handleKeyboardNavigation = (event: KeyboardEvent) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    scrollLeft();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    scrollRight();
  }
};

async function getCategoriesPosts() {
  try {
    isLoading.value = true;
    const response = await $fetch<PostCategoryResponse>(
      `${useRuntimeConfig().public.apiBase}/api/v1/posts/category`
    );
    categoriesPosts.value = response.data;
  } catch (error) {
    console.error("Failed to fetch categories posts:", error);
  } finally {
    isLoading.value = false;
    // Update scroll state after data is loaded and DOM is updated
    await nextTick();
    updateScrollState();
  }
}

// Watch for changes in categories data and update scroll state
watch(categoriesPosts, async () => {
  if (categoriesPosts.value && !isLoading.value) {
    await nextTick();
    updateScrollState();
  }
}, { immediate: false });

onMounted(async () => {
  await getCategoriesPosts();
});
</script>

<style scoped>
/* Hide scrollbar for all browsers */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
