<template>
  <ContentContainer class="space-y-7 my-10">
    <h1 class="text-title text-4xl font-bold border-l-4 border-brand-600 pl-2">
      Hukum
    </h1>

    <!-- Popular Articles -->
    <div class="space-y-2">
      <h2
        class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2"
      >
        Berita Populer
      </h2>

      <!-- Main Popular Articles -->
      <div
        class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-2"
      >
        <!-- Main Featured Article -->
        <article class="w-full lg:pr-4 lg:border-r lg:border-grayscale-10">
          <div class="flex flex-col md:flex-row gap-3 md:gap-4">
            <!-- Featured Image -->
            <NuxtImg
              src="images/dummy1.png"
              alt="Mantan Pj Bupati Cilacap Didakwa Korupsi Rugikan Negara Rp 237 Miliar"
              width="362"
              height="242"
              class="w-full md:w-[280px] lg:w-[362px] h-auto rounded-lg object-cover shrink-0"
            />

            <!-- Article Content -->
            <div class="flex flex-col gap-3 md:gap-4 flex-1">
              <div>
                <time class="text-xs text-grayscale-40 font-normal">
                  {{ relativeTime("2025-10-17T10:00:00+07:00") }}
                </time>
                <h3
                  class="text-title text-lg md:text-xl lg:text-2xl font-bold font-playfair line-clamp-2 hover:text-brand-600 transition-colors"
                >
                  <NuxtLink to="/">
                    Mantan Pj Bupati Cilacap Didakwa Korupsi Rugikan Negara Rp
                    237 Miliar
                  </NuxtLink>
                </h3>
              </div>

              <p class="text-subtitle text-sm line-clamp-3 md:line-clamp-4">
                Mantan Penjabat Bupati Cilacap, Awaluddin Muuri, diadili dalam
                kasus dugaan korupsi pengadaan lahan seluas 716 hektare (ha)
                oleh PT Cilacap Segara Artha, BUMD milik pemerintah daerah
                (Pemda) Cilacap yang merugikan negara Rp237 miliar.
              </p>

              <button
                class="inline-flex items-center gap-2 text-sm p-2 border border-title rounded-lg hover:bg-grayscale-10 transition-colors self-start"
              >
                Baca Berita Selengkapnya
                <IconArrowRight class="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>

        <!-- Side Article -->
        <article class="w-full lg:w-[266px] shrink-0">
          <div class="flex flex-row sm:flex-col gap-3 sm:gap-2">
            <!-- Side Image -->
            <NuxtImg
              src="images/dummy1.png"
              alt="Biro Haji Ramai-ramai Kembalikan Uang Terkait Kasus Kuota Haji"
              class="w-full lg:h-[150px] rounded-lg object-cover shrink-0"
            />

            <!-- Side Content -->
            <div class="flex-1 space-y-2">
              <h3
                class="text-title text-base sm:text-lg font-bold sm:leading-5 line-clamp-3 hover:text-brand-600 transition-colors"
              >
                <NuxtLink to="/">
                  Biro Haji Ramai-ramai Kembalikan Uang Terkait Kasus Kuota Haji
                </NuxtLink>
              </h3>
              <div class="flex items-center gap-1 text-xs">
                <Author name="John Doe" slug="john-doe" />
                <span class="text-grayscale-40">•</span>
                <time class="text-subtitle font-normal">
                  {{ relativeTime("2025-10-17T10:00:00+07:00") }}
                </time>
              </div>
            </div>
          </div>
        </article>
      </div>

      <hr class="border-grayscale-10" />

      <!-- Secondary Popular Articles -->
      <div class="grid grid-cols-1 md:grid-cols-2 pt-5">
        <!-- Column 1 -->
        <div class="md:pr-4 md:border-r md:border-grayscale-10">
          <article
            class="py-4 border-b border-grayscale-10"
            v-for="(article, index) in 2"
            :key="index"
          >
            <h4
              class="text-title text-lg font-semibold line-clamp-2 hover:text-brand-600 transition-colors leading-5"
            >
              Eksploitasi Sumber Daya Alam Berpotensi Rusak Lingkungan Secara
              Masif
            </h4>
            <time class="text-xs text-grayscale-40 font-normal">
              {{ relativeTime("2025-10-17T10:00:00+07:00") }}
            </time>
          </article>
        </div>

        <!-- Column 2 -->
        <div class="md:pl-4">
          <article
            class="py-4 border-b border-grayscale-10"
            v-for="(article, index) in 2"
            :key="index"
          >
            <h4
              class="text-title text-lg font-semibold line-clamp-2 hover:text-brand-600 transition-colors leading-5"
            >
              Eksploitasi Sumber Daya Alam Berpotensi Rusak Lingkungan Secara
              Masif
            </h4>
            <time class="text-xs text-grayscale-40 font-normal">
              {{ relativeTime("2025-10-17T10:00:00+07:00") }}
            </time>
          </article>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-10 md:items-start">
      <!-- Col 1 -->
      <div class="flex-1 space-y-6">
        <!-- Berita Terbaru -->
        <div class="space-y-5">
          <h2
            class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2"
          >
            Berita Terbaru
          </h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
          >
            <ArticleCard
              v-for="article in dummyArticles"
              :key="article.id"
              :article="article"
              :with-category="false"
              class="grid-article-divider"
            />
          </div>
        </div>

        <hr class="border-grayscale-10" />

        <!-- Berita Lainnya -->
        <div class="space-y-5">
          <h2
            class="text-title text-2xl font-bold border-l-4 border-brand-600 pl-2"
          >
            Berita Lainnya
          </h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
          >
            <ArticleCard
              v-for="article in dummyArticles"
              :key="article.id"
              :article="article"
              :with-category="false"
              class="grid-article-divider"
            />
          </div>

          <hr class="border-grayscale-10" />

          <div class="flex justify-center">
            <button
              class="text-sm p-2 border border-title rounded-lg hover:bg-grayscale-10 transition-colors"
            >
              Berita Lainnya
            </button>
          </div>
        </div>
      </div>
      <!-- Col 2 as Aside -->
      <aside
        class="w-full md:w-[250px] shrink-0 sticky top-32 self-start space-y-6"
      >
        <div class="w-full border bg-white rounded-lg p-4 text-title">
          <h5 class="text-lg font-semibold">Kata Kunci</h5>
          <span class="text-subtitle text-sm">
            Cari artikel berdasarkan kata kunci
          </span>

          <div class="flex flex-wrap md:flex-col items-start gap-2 mt-4">
            <NuxtLink
              v-for="tag in dummyTags"
              :key="tag.id"
              :to="`/tags/${tag.tag}`"
              class="text-xs font-semibold border border-brand-300 rounded-sm p-2 text-brand-800 uppercase inline-flex items-center gap-1 line-clamp-1"
              itemprop="keywords"
            >
              <IconCircleCheck class="size-3 shrink-0" />
              {{ tag.tag }}
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>
  </ContentContainer>
</template>

<script lang="ts" setup>
const route = useRoute();
const slug = route.params.slug;

const dummyTags = [
  {
    id: 1,
    tag: "Korupsi",
  },
  {
    id: 2,
    tag: "Hukum",
  },
  {
    id: 3,
    tag: "Ekonomi",
  },
  {
    id: 4,
    tag: "Pendidikan",
  },
  {
    id: 5,
    tag: "Olahraga",
  },
  {
    id: 6,
    tag: "Seni",
  },
  {
    id: 7,
    tag: "Teknologi",
  },
  {
    id: 8,
    tag: "Politik",
  },
  {
    id: 9,
    tag: "Ekonomi",
  },
  {
    id: 10,
    tag: "Pendidikan",
  },
];

// dummy data
const dummyArticles = [
  {
    id: 1,
    title: "Fufufafa Pintu Masuk Pemakzulan Gibran",
    title_slug: "fufufafa-pintu-masuk-pemakzulan-gibran",
    images: {
      big: "https://politikindonesia.id/uploads/images/2024/09/image_750x500_66d7b54ec0101.jpg",
      default:
        "https://politikindonesia.id/uploads/images/2024/09/image_750x_66d7b54edfa0a.jpg",
      slider:
        "https://politikindonesia.id/uploads/images/2024/09/image_600x460_66d7b54f08a9d.jpg",
      mid: "https://politikindonesia.id/uploads/images/2024/09/image_380x226_66d7b54f230eb.jpg",
      small:
        "https://politikindonesia.id/uploads/images/2024/09/image_140x98_66d7b54f34a6b.jpg",
      url: "https://politikindonesia.id/",
      mime: "jpg",
      description: "Ilustrasi Akun Fufufafa. /Polindo",
    },
    author: {
      id: 10,
      username: "Nita Nawangwulan",
      slug: "nita",
      avatar: null,
      display_name: "Nita Nawangwulan",
    },
    category: {
      id: 6,
      name: "PENDAPAT",
      slug: "pendapat",
      description: null,
      color: "#ff0000",
    },
    created_at: "2025-06-02T10:45:22.000000Z",
  },
  {
    id: 2,
    title: "Fufufafa Pintu Masuk Pemakzulan Gibran",
    title_slug: "fufufafa-pintu-masuk-pemakzulan-gibran",
    images: {
      big: "https://politikindonesia.id/uploads/images/2024/09/image_750x500_66d7b54ec0101.jpg",
      default:
        "https://politikindonesia.id/uploads/images/2024/09/image_750x_66d7b54edfa0a.jpg",
      slider:
        "https://politikindonesia.id/uploads/images/2024/09/image_600x460_66d7b54f08a9d.jpg",
      mid: "https://politikindonesia.id/uploads/images/2024/09/image_380x226_66d7b54f230eb.jpg",
      small:
        "https://politikindonesia.id/uploads/images/2024/09/image_140x98_66d7b54f34a6b.jpg",
      url: "https://politikindonesia.id/",
      mime: "jpg",
      description: "Ilustrasi Akun Fufufafa. /Polindo",
    },
    author: {
      id: 10,
      username: "Nita Nawangwulan",
      slug: "nita",
      avatar: null,
      display_name: "Nita Nawangwulan",
    },
    category: {
      id: 6,
      name: "PENDAPAT",
      slug: "pendapat",
      description: null,
      color: "#ff0000",
    },
    created_at: "2025-06-02T10:45:22.000000Z",
  },
  {
    id: 3,
    title: "Fufufafa Pintu Masuk Pemakzulan Gibran",
    title_slug: "fufufafa-pintu-masuk-pemakzulan-gibran",
    images: {
      big: "https://politikindonesia.id/uploads/images/2024/09/image_750x500_66d7b54ec0101.jpg",
      default:
        "https://politikindonesia.id/uploads/images/2024/09/image_750x_66d7b54edfa0a.jpg",
      slider:
        "https://politikindonesia.id/uploads/images/2024/09/image_600x460_66d7b54f08a9d.jpg",
      mid: "https://politikindonesia.id/uploads/images/2024/09/image_380x226_66d7b54f230eb.jpg",
      small:
        "https://politikindonesia.id/uploads/images/2024/09/image_140x98_66d7b54f34a6b.jpg",
      url: "https://politikindonesia.id/",
      mime: "jpg",
      description: "Ilustrasi Akun Fufufafa. /Polindo",
    },
    author: {
      id: 10,
      username: "Nita Nawangwulan",
      slug: "nita",
      avatar: null,
      display_name: "Nita Nawangwulan",
    },
    category: {
      id: 6,
      name: "PENDAPAT",
      slug: "pendapat",
      description: null,
      color: "#ff0000",
    },
    created_at: "2025-06-02T10:45:22.000000Z",
  },
];
</script>

<style></style>
