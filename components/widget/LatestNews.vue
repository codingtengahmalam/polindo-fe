<template>
  <aside
    class="w-full bg-white rounded-lg space-y-4"
    aria-labelledby="latest-news-title"
  >
    <h2 id="latest-news-title" class="text-title font-semibold">
      Berita {{ props.type === 'latest' ? 'Terbaru' : 'Populer' }}
    </h2>

    <div class="flex flex-col gap-3">
      <article
        v-for="news in displayedNews"
        :key="news.id"
        class="flex items-center gap-2 border-b border-grayscale-10 pb-3 last:border-b-0 last:pb-0"
      >
        <time
          v-if="props.type === 'latest'"
          :datetime="news.dateISO"
          class="text-xs text-brand-600 size-16 aspect-square shrink-0 flex items-center font-semibold"
        >
          {{ news.time }}
        </time>
        <NuxtLink v-if="props.type === 'popular'" :to="news.to" class="shrink-0 overflow-hidden rounded-lg bg-grayscale-5">
          <NuxtImg
            :src="news.image"
            :alt="news.title"
            width="64"
            height="64"
            sizes="64px"
            class="w-16 h-16 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            loading="lazy"
          />
        </NuxtLink>
        <div class="flex flex-col items-start gap-3">
          <h3 class="w-full text-title text-sm font-semibold line-clamp-3">
            <NuxtLink
              :to="news.to"
              class="hover:text-brand-600 transition-colors"
            >
              {{ news.title }}
            </NuxtLink>
          </h3>
          <CategoryBadge :name="news.category" :slug="news.category" />
        </div>
      </article>
      <div v-if="hasMoreNews" class="pt-1">
        <NuxtLink
          to=""
          class="text-brand-800 uppercase text-sm font-normal flex items-center gap-2 hover:text-brand-700 transition-colors"
          aria-label="Lihat semua berita terbaru lainnya"
        >
          BERITA {{ props.type === 'latest' ? 'TERBARU' : 'POPULER' }} LAINNYA
          <IconArrowRight aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>

interface Props {
  type: 'latest' | 'popular';
}

const props = defineProps<Props>();

// Constants
const MAX_DISPLAYED_NEWS = 4;

// Dummy data
const latestNews = [
  {
    id: 1,
    title:
      "Presiden Polandia Bertemu Delegasi Indonesia Bahas Kerjasama Bilateral",
    time: "5 min",
    dateISO: "2025-10-13T10:30:00+07:00",
    date: "13 Oct 2025",
    category: "Politik",
    to: "/presiden-polandia-bertemu-delegasi-indonesia",
    image: "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
  },
  {
    id: 2,
    title: "Ekspor Kopi Indonesia ke Polandia Meningkat 45% di Kuartal III",
    time: "12 min",
    dateISO: "2025-10-12T14:20:00+07:00",
    date: "12 Oct 2025",
    category: "Ekonomi",
    to: "/ekspor-kopi-indonesia-ke-polandia-meningkat",
    image: "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
  },
  {
    id: 3,
    title:
      "Mahasiswa Indonesia Raih Juara di Kompetisi Robotik Internasional Warsawa",
    time: "25 min",
    dateISO: "2025-10-12T09:45:00+07:00",
    date: "12 Oct 2025",
    category: "Pendidikan",
    to: "/mahasiswa-indonesia-juara-kompetisi-robotik-warsawa",
    image: "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
  },
  {
    id: 4,
    title:
      "Pengusaha Polandia Tertarik Investasi di Sektor Energi Terbarukan Indonesia",
    time: "1 jam",
    dateISO: "2025-10-11T16:00:00+07:00",
    date: "11 Oct 2025",
    category: "Investasi",
    to: "/pengusaha-polandia-investasi-energi-terbarukan",
    image: "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
  },
  {
    id: 5,
    title:
      "Festival Budaya Indonesia di Kraków Sukses Dihadiri 5000 Pengunjung",
    time: "2 jam",
    dateISO: "2025-10-11T15:30:00+07:00",
    date: "11 Oct 2025",
    category: "Budaya",
    to: "/festival-budaya-indonesia-di-krakow",
    image: "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
  },
];

// Computed properties
const displayedNews = computed(() => {
  return latestNews.slice(0, MAX_DISPLAYED_NEWS);
});

const hasMoreNews = computed(() => {
  return latestNews.length > MAX_DISPLAYED_NEWS;
});
</script>
