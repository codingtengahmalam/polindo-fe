<template>
  <NuxtLink :to="`categories/${category}`">
    <span
      class="text-[10px] leading-1.1 py-0.5 px-1 border border-brand-600 rounded-sm text-brand-600 uppercase"
    >
      <slot />
    </span>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  category: string;
}

const props = defineProps<Props>();
</script>
