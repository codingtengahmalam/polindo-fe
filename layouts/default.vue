<template>
  <div class="overflow-x-hidden">
    <Header />
    <main class="min-h-[calc(100vh-80px)] pt-[68px]">
      <TrendingCarousel />
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
