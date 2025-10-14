<template>
  <ContentContainer>
    <div class="py-10 flex flex-col xl:flex-row justify-between gap-5 lg:divide-x divide-grayscale-10">
      <section class="w-full xl:w-[720px] xl:shrink-0">
        <HomeHotNews />
      </section>
      <section class="w-full pl-0 lg:pl-5 space-y-10">
        <WidgetUpcomingEvent />
        <WidgetLatestNews />
      </section>
    </div>
    <div>main</div>
  </ContentContainer>
</template>

<script lang="ts" setup></script>

<style></style>
