<template>
  <section aria-labelledby="category-section-title">
    <ContentContainer class="py-6 space-y-4 px-4">
      <!-- Section Header -->
      <header class="flex items-center justify-between">
        <h2
          id="category-section-title"
          class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2"
        >
          Kategori Berita
        </h2>

        <nav
          aria-label="Category navigation controls"
          class="flex items-center gap-3 text-grayscale-40 flex-shrink-0"
        >
          <button
            type="button"
            aria-label="Scroll ke kategori sebelumnya"
            :disabled="!canScrollLeft"
            :class="[
              'transition-colors rounded-sm',
              !canScrollLeft
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:text-grayscale-100 cursor-pointer',
            ]"
            @click="scrollLeft"
          >
            <IconChevronLeft class="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Scroll ke kategori berikutnya"
            :disabled="!canScrollRight"
            :class="[
              'transition-colors rounded-sm',
              !canScrollRight
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:text-grayscale-100 cursor-pointer',
            ]"
            @click="scrollRight"
          >
            <IconChevronLeft class="size-3 rotate-180" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <!-- Horizontal Scrollable Category List -->
      <div
        ref="scrollContainer"
        role="region"
        aria-label="Daftar kategori berita"
        class="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2"
        tabindex="0"
        @scroll="updateScrollState"
        @keydown="handleKeyboardNavigation"
      >
        <article
          v-for="category in categories"
          :key="category.slug"
          class="flex-shrink-0 w-full md:w-[270px] p-3 border border-grayscale-20 rounded-lg min-h-[460px] snap-start"
        >
          <header class="mb-2">
            <h3 class="text-title text-xl font-bold">
              <NuxtLink
                :to="`/category/${category.slug}`"
                class="hover:text-brand-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 rounded-sm"
              >
                {{ category.name }}
              </NuxtLink>
            </h3>
          </header>

          <div class="divide-y divide-grayscale-10">
            <div
              v-for="article in category.articles"
              :key="article.slug"
              class="flex items-center justify-between gap-2 py-2"
            >
              <div class="flex-1 min-w-0">
                <NuxtLink
                  :to="`/${article.slug}`"
                  class="text-title text-sm font-semibold leading-snug line-clamp-3 hover:text-brand-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 rounded-sm"
                >
                  {{ article.title }}
                </NuxtLink>
              </div>

              <NuxtLink
                :to="`/${article.slug}`"
                :aria-label="`Baca artikel: ${article.title}`"
                class="shrink-0 overflow-hidden rounded-lg bg-grayscale-5 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
              >
                <NuxtImg
                  :src="article.image"
                  :alt="`Gambar artikel: ${article.title}`"
                  width="64"
                  height="64"
                  sizes="64px"
                  class="w-16 h-16 object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
                  loading="lazy"
                />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </ContentContainer>
  </section>
</template>

<script lang="ts" setup>
// Use horizontal scroll composable
const {
  scrollContainer,
  canScrollLeft,
  canScrollRight,
  scrollLeft,
  scrollRight,
  updateScrollState,
} = useHorizontalScroll();

// Keyboard navigation for accessibility
const handleKeyboardNavigation = (event: KeyboardEvent) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    scrollLeft();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    scrollRight();
  }
};

// Dummy data - replace with real data later
const categories = ref([
  {
    name: "Politik",
    slug: "politik",
    articles: [
      {
        title: "Polemik RUU Pemilu: Fraksi Sepakat Lanjutkan Pembahasan",
        slug: "polemik-ruu-pemilu-fraksi-sepakat-lanjutkan-pembahasan",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Presiden Tunjuk Pj Gubernur Baru untuk 5 Provinsi",
        slug: "presiden-tunjuk-pj-gubernur-baru-untuk-5-provinsi",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title:
          "KPK Panggil Saksi Terkait Kasus Dugaan Suap Proyek Infrastruktur",
        slug: "kpk-panggil-saksi-terkait-kasus-dugaan-suap-proyek-infrastruktur",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Koalisi Parlemen Bahas Arah Kebijakan Luar Negeri 2026",
        slug: "koalisi-parlemen-bahas-arah-kebijakan-luar-negeri-2026",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Koalisi Parlemen Bahas Arah Kebijakan Luar Negeri 2026",
        slug: "koalisi-parlemen-bahas-arah-kebijakan-luar-negeri-2026",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
    ],
  },
  {
    name: "Ekonomi",
    slug: "ekonomi",
    articles: [
      {
        title: "Rupiah Menguat, IHSG Dibuka Menghijau di Awal Pekan",
        slug: "rupiah-menguat-ihsg-dibuka-menghijau-di-awal-pekan",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Harga Pangan Naik, Pemerintah Siapkan Operasi Pasar",
        slug: "harga-pangan-naik-pemerintah-siapkan-operasi-pasar",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Investasi Asing Meningkat di Sektor Manufaktur dan Energi",
        slug: "investasi-asing-meningkat-di-sektor-manufaktur-dan-energi",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "UMKM Dorong Ekspor Melalui Platform Digital",
        slug: "umkm-dorong-ekspor-melalui-platform-digital",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
    ],
  },
  {
    name: "Teknologi",
    slug: "teknologi",
    articles: [
      {
        title: "Startup Lokal Rilis AI Asisten untuk UMKM",
        slug: "startup-lokal-rilis-ai-asisten-untuk-umkm",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Pemerintah Kaji Regulasi Keamanan Data Pribadi",
        slug: "pemerintah-kaji-regulasi-keamanan-data-pribadi",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Operator Seluler Uji 5G Advanced di 3 Kota Besar",
        slug: "operator-seluler-uji-5g-advanced-di-3-kota-besar",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Ekosistem Startup Deep Tech Mulai Bergeliat",
        slug: "ekosistem-startup-deep-tech-mulai-bergeliat",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
    ],
  },
  {
    name: "Olahraga",
    slug: "olahraga",
    articles: [
      {
        title: "Timnas U-23 Menang Tipis di Laga Persahabatan",
        slug: "timnas-u23-menang-tipis-di-laga-persahabatan",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Jelang Liga, Klub Lakukan Pemusatan Latihan di Luar Negeri",
        slug: "jelang-liga-klub-lakukan-pemusatan-latihan-di-luar-negeri",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Pebulu Tangkis Raih Gelar Super Series",
        slug: "pebulu-tangkis-raih-gelar-super-series",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Atletik Nasional Siapkan Roadmap Menuju Olimpiade",
        slug: "atletik-nasional-siapkan-roadmap-menuju-olimpiade",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
    ],
  },
  {
    name: "Kesehatan",
    slug: "kesehatan",
    articles: [
      {
        title: "Kasus ISPA Meningkat, Dokter Imbau Penggunaan Masker",
        slug: "kasus-ispa-meningkat-dokter-imbau-penggunaan-masker",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Vaksin Baru Untuk Lansia Masuk Tahap Uji Klinis",
        slug: "vaksin-baru-untuk-lansia-masuk-tahap-uji-klinis",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Tren Olahraga Ringan di Kantor Meningkat",
        slug: "tren-olahraga-ringan-di-kantor-meningkat",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Studi: Pola Tidur Sehat Kurangi Risiko Penyakit Kronis",
        slug: "studi-pola-tidur-sehat-kurangi-risiko-penyakit-kronis",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
    ],
  },
  {
    name: "Pendidikan",
    slug: "pendidikan",
    articles: [
      {
        title: "Kurikulum Baru Dorong Literasi Digital Sejak Dini",
        slug: "kurikulum-baru-dorong-literasi-digital-sejak-dini",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Beasiswa Pemerintah Dibuka untuk 10 Ribu Mahasiswa",
        slug: "beasiswa-pemerintah-dibuka-untuk-10-ribu-mahasiswa",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Sekolah Hybrid Diperluas ke 50 Kabupaten/Kota",
        slug: "sekolah-hybrid-diperluas-ke-50-kabupaten-kota",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Guru Penggerak Dapat Pelatihan Kepemimpinan",
        slug: "guru-penggerak-dapat-pelatihan-kepemimpinan",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
    ],
  },
  {
    name: "Hiburan",
    slug: "hiburan",
    articles: [
      {
        title: "Film Lokal Tembus Festival Internasional",
        slug: "film-lokal-tembus-festival-internasional",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Konser Musisi Dunia Siap Hibur Jakarta Akhir Pekan",
        slug: "konser-musisi-dunia-siap-hibur-jakarta-akhir-pekan",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Serial Baru Raih Rating Tertinggi Bulan Ini",
        slug: "serial-baru-raih-rating-tertinggi-bulan-ini",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
      {
        title: "Kolaborasi Seniman Muda Pamerkan Karya di Galeri Kota",
        slug: "kolaborasi-seniman-muda-pamerkan-karya-di-galeri-kota",
        image:
          "https://politikindonesia.id/uploads/images/2025/10/image_750x_68ee1be35635b.jpg",
      },
    ],
  },
]);
</script>

<style scoped>
/* Hide scrollbar for all browsers */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
