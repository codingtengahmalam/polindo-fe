<template>
  <!-- This data send id & name because the API not provide author slug -->
  <NuxtLink
    :to="`/profil/${slug}?id=${id}&name=${name}`"
    class="text-subtitle font-normal text-xs flex items-center gap-1 min-w-0"
    :title="`Pelapor ${name}`"
  >
    <span class="text-grayscale-40 shrink-0">Pelapor</span>
    <span class="truncate">{{ name }}</span>
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
