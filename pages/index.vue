<template>
  <ContentContainer class="px-4 md:px-10 xl:px-20">
    <div class="py-10 flex flex-col xl:flex-row justify-between gap-5 lg:divide-x divide-grayscale-10">
      <section class="w-full xl:w-[720px] xl:shrink-0">
        <HeroLatestNews />
      </section>
      <section class="w-full pl-0 lg:pl-5 space-y-10">
        <!-- <WidgetUpcomingEvent /> -->
        <WidgetLatestNews type="popular" />
        <WidgetSocialMedia />
      </section>
    </div>
  </ContentContainer>
  <HomeVideoCarousel />
  <HomeCategory />
</template>

<script lang="ts" setup>
import HeroLatestNews from '~/components/Home/HeroLatestNews.vue';
import WidgetSocialMedia from '~/components/widget/SocialMedia.vue';
</script>

<style></style>
