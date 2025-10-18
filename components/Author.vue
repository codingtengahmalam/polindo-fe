<template>
  <!-- This data send id & name because the API not provide author slug -->
  <NuxtLink
    :to="`/profil/${slug}?id=${id}&name=${name}`"
    class="text-subtitle font-normal text-xs flex items-center gap-1"
  >
    <span class="text-grayscale-40">Oleh</span> {{ name }}
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  id: number;
  name: string;
  slug: string;
}

const props = defineProps<Props>();
</script>
