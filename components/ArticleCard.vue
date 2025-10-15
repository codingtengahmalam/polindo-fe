<template>
  <div class="rounded-lg space-y-5">
    <NuxtLink
      :to="`/${article.title_slug}`"
      class="block overflow-hidden rounded-lg bg-grayscale-5"
    >
      <NuxtImg
        :src="article.images.default"
        :alt="article.title"
        width="380"
        height="226"
        sizes="380px"
        class="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
      />
    </NuxtLink>
    <div class="space-y-4">
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
          :name="article.author.display_name"
          :slug="article.author.slug"
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
          :name="article.category.name"
          :slug="article.category.slug"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  withAuthor?: boolean;
  withCategory?: boolean;
  withDate?: boolean;
  article: {
    id: number;
    title: string;
    title_slug: string;
    images: {
      big: string;
      default: string;
      slider: string;
      mid: string;
      small: string;
      url: string;
      mime: string;
      description: string | null;
    };
    category: {
      id: number;
      name: string;
      slug: string;
      description: string | null;
      color: string;
    };
    author: {
      id: number;
      username: string;
      slug: string;
      avatar: string | null;
      display_name: string;
    };
    created_at: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  withAuthor: true,
  withCategory: true,
  withDate: true,
});
</script>
