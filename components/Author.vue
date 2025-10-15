<template>
  <NuxtLink
    :to="`profil/${slug}`"
    class="text-subtitle font-normal text-xs flex items-center gap-1"
  >
    <span class="text-grayscale-40">Oleh</span> {{ name }}
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  name: string;
  slug: string;
}

const props = defineProps<Props>();
</script>
