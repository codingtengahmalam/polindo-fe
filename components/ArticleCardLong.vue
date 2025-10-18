<template>
  <div class="bg-white flex flex-col md:flex-row gap-4">
    <NuxtLink
      :to="`/${article.title_slug}`"
      class="block overflow-hidden rounded-lg bg-grayscale-5 shrink-0 w-full md:w-40 h-40"
    >
      <NuxtImg
        :src="article.images?.default"
        :alt="article.title"
        width="160"
        height="160"
        sizes="160px"
        class="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
      />
    </NuxtLink>
    <div class="space-y-1">
      <h3 class="text-title text-lg md:text-2xl font-semibold leading-snug line-clamp-2">
        <NuxtLink
          :to="`/${article.title_slug}`"
          class="hover:text-brand-600 transition-colors"
        >
          {{ article.title }}
        </NuxtLink>
      </h3>

      <div class="flex items-center text-xs gap-1">
        <Author
          v-if="withAuthor"
          :id="article.author?.id ?? 0"
          :name="article.author?.display_name ?? ''"
          :slug="article.author?.slug ?? ''"
        />
        <span v-if="withAuthor && withDate" class="text-grayscale-40">•</span>
        <time
          v-if="withDate"
          :datetime="article.created_at"
          class="text-subtitle font-normal"
        >
          {{ relativeTime(article.created_at) }}
        </time>
        <CategoryBadge
          v-if="withCategory"
          :name="article.category?.name ?? ''"
          :slug="article.category?.slug ?? ''"
        />
      </div>

      <p v-if="withSummary" class="text-subtitle text-base pt-4 line-clamp-3">
        {{ article.summary }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Article } from '~/types';

interface Props {
  withAuthor?: boolean;
  withCategory?: boolean;
  withDate?: boolean;
  withSummary?: boolean;
  article: Article;
}

const props = withDefaults(defineProps<Props>(), {
  withAuthor: false,
  withCategory: true,
  withDate: false,
  withSummary: true,
});
</script>
