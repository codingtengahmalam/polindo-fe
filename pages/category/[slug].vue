<template>
  <div>test value of slug: {{ slug }}</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const slug = route.params.slug;
</script>

<style></style>
