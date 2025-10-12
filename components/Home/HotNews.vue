<template>
  <div class="py-10 flex flex-col xl:flex-row justify-between gap-5">
    <section class="w-full xl:w-[720px] xl:shrink-0 space-y-4">
      <h2
        class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2"
      >
        Hot News
      </h2>

      <!-- Main News of Hot News -->
      <article v-if="mainNews" class="space-y-4">
        <NuxtLink :to="`/articles/${mainNews.slug}`" class="block">
          <img
            :src="mainNews.image"
            :alt="mainNews.title"
            width="720"
            height="400"
            class="w-full max-h-[400px] object-cover rounded-lg hover:opacity-90 transition-opacity"
            loading="lazy"
          />
        </NuxtLink>
        <div class="space-y-1 pb-5 border-b border-grayscale-10">
          <div class="text-grayscale-40 font-normal flex items-center gap-2">
            <time :datetime="mainNews.dateISO" class="text-xs">
              {{ mainNews.date }}
            </time>
            <span
              class="text-[10px] leading-1.1 py-0.5 px-1 border border-brand-600 rounded-sm text-brand-600 uppercase"
            >
              {{ mainNews.category }}
            </span>
          </div>
          <h3 class="text-title text-2xl font-playfair font-bold">
            <NuxtLink
              :to="`/articles/${mainNews.slug}`"
              class="hover:text-brand-600 transition-colors"
            >
              {{ mainNews.title }}
            </NuxtLink>
          </h3>
        </div>
      </article>

      <!-- Secondary News of Hot News -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <article
          v-for="news in secondaryNews"
          :key="news.slug"
          class="flex items-center gap-2 py-3 border-b border-grayscale-10"
        >
          <div class="w-full h-auto">
            <div class="text-grayscale-40 font-normal flex items-center gap-2">
              <time :datetime="news.dateISO" class="text-xs">
                {{ news.date }}
              </time>
              <span
                class="text-[10px] leading-1.1 py-0.5 px-1 border border-brand-600 rounded-sm text-brand-600 uppercase"
              >
                {{ news.category }}
              </span>
            </div>
            <h3 class="text-title text-lg font-playfair font-bold">
              <NuxtLink
                :to="`/articles/${news.slug}`"
                class="hover:text-brand-600 transition-colors"
              >
                {{ news.title }}
              </NuxtLink>
            </h3>
          </div>
          <NuxtLink :to="`/articles/${news.slug}`" class="shrink-0">
            <img
              :src="news.image"
              :alt="news.title"
              width="96"
              height="96"
              class="w-24 h-24 rounded-lg object-cover hover:opacity-90 transition-opacity"
              loading="lazy"
            />
          </NuxtLink>
        </article>
      </div>
    </section>
    <aside class="w-full h-auto">
      <!-- TODO: Sidebar content (ads, popular posts, etc.) -->
    </aside>
  </div>
</template>

<script lang="ts" setup>
// Type definition for news item
interface NewsItem {
  slug: string;
  title: string;
  image: string;
  date: string;
  dateISO: string;
  category: string;
  isHighlightNews: boolean;
}

// Dummy data - In production, this should come from API with useFetch
const hotNews: NewsItem[] = [
  {
    slug: "mantan-pj-bupati-cilacap-didakwa-korupsi",
    title:
      "Mantan Pj Bupati Cilacap Didakwa Korupsi Rugikan Negara Rp 237 Miliar",
    image: "/images/dummy1.png",
    date: "12 Oct 2025",
    dateISO: "2025-10-12",
    category: "Hukum",
    isHighlightNews: true,
  },
  {
    slug: "polda-ntb-serahkan-tersangka-kematian-brigadir-nurhadi",
    title: "Polda NTB Serahkan 2 Tersangka Kematian Brigadir Nurhadi ke JPU",
    image: "/images/dummy1.png",
    date: "11 Oct 2025",
    dateISO: "2025-10-11",
    category: "Hukum",
    isHighlightNews: false,
  },
  {
    slug: "presiden-jokowi-resmikan-tol-trans-sumatera",
    title:
      "Presiden Jokowi Resmikan Jalan Tol Trans Sumatera Sepanjang 2.765 Km",
    image: "/images/dummy1.png",
    date: "11 Oct 2025",
    dateISO: "2025-10-11",
    category: "Infrastruktur",
    isHighlightNews: false,
  },
  {
    slug: "menteri-esdm-targetkan-energi-terbarukan-2025",
    title: "Menteri ESDM Targetkan Energi Terbarukan Capai 23% di Tahun 2025",
    image: "/images/dummy1.png",
    date: "10 Oct 2025",
    dateISO: "2025-10-10",
    category: "Ekonomi",
    isHighlightNews: false,
  },
  {
    slug: "dpr-setujui-ruu-kesehatan",
    title: "DPR Setujui RUU Kesehatan, Fokus Perkuat Layanan Primer",
    image: "/images/dummy1.png",
    date: "10 Oct 2025",
    dateISO: "2025-10-10",
    category: "Politik",
    isHighlightNews: false,
  },
];

// Computed properties untuk memisahkan berita utama dan sekunder
const mainNews = computed(() => hotNews.find((news) => news.isHighlightNews));
const secondaryNews = computed(() =>
  hotNews.filter((news) => !news.isHighlightNews)
);
</script>
