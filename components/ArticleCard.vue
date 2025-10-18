<template>
  <div class="bg-white rounded-lg" :class="{ 'space-y-5': !withBackground }">
    <NuxtLink
      :to="`/${article.title_slug}`"
      class="block overflow-hidden rounded-t-lg bg-grayscale-5"
    >
      <NuxtImg
        :src="article.images?.default"
        :alt="article.title"
        width="380"
        sizes="380px"
        class="w-full object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-105"
        :class="imgHeight"
      />
    </NuxtLink>
    <div class="space-y-4" :class="{ 'p-4': withBackground }">
      <h3 class="text-title font-semibold leading-snug line-clamp-3">
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
          class="ml-auto"
          :name="article.category?.name ?? ''"
          :slug="article.category?.slug ?? ''"
        />
      </div>

      <p v-if="withSummary" class="text-subtitle text-sm line-clamp-3">
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
  withBackground?: boolean;
  withSummary?: boolean;
  article: Article;
  imgHeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  withAuthor: true,
  withCategory: true,
  withDate: true,
  withBackground: false,
  withSummary: false,
  imgHeight: 'h-52',
});
</script>
