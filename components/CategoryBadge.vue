<template>
  <NuxtLink :to="`category/${slug}`" class="text-[10px] leading-1.1 py-0.5 px-1 border border-brand-600 rounded-sm text-brand-600 uppercase">
      {{ name }}
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  name: string;
  slug: string;
}

const props = defineProps<Props>();
</script>
