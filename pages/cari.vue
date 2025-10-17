<template>
  <div class="w-full my-10 space-y-7">
    <!-- Search Component -->
    <div class="w-full py-7" :class="{ 'bg-grayscale-10': isDefaultSearch }">
      <ContentContainer class="space-y-20">
        <div class="space-y-4">
          <h1 class="text-title text-2xl font-bold text-center">Pencarian</h1>

          <!-- using function for action search -->
          <div class="flex items-center justify-center">
            <div class="relative w-full">
              <input
                type="text"
                placeholder="Cari artikel atau kata kunci"
                class="w-full px-7 py-4 pr-14 rounded-full text-lg leading-5 text-title border border-grayscale-30 focus:outline-none"
              />
              <button
                type="submit"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-grayscale-30 hover:text-primary-blue transition-colors duration-200"
                aria-label="Cari"
              >
                <IconSearch />
              </button>
            </div>
          </div>
        </div>

        <!-- Popular Articles -->
        <div v-if="isDefaultSearch" class="space-y-4">
          <h2 class="text-title text-2xl font-bold">Berita Populer</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ArticleCard
              v-for="article in dummyArticles"
              :key="article.id"
              :article="article"
              :with-category="false"
              with-background
              with-summary
            />
          </div>
        </div>
      </ContentContainer>
    </div>

    <!-- New Articles -->
     <ContentContainer class="space-y-8">
      <h2 class="text-title text-2xl font-bold">Berita Terbaru</h2>

      <div class="flex flex-col divide-y divide-grayscale-10">
        <ArticleCardLong
          v-for="article in dummyArticles"
          :key="article.id"
          :article="article"
          class="py-4 first:pt-0"
        />
      </div>
     </ContentContainer>

     <!-- Search Results -->
     <ContentContainer class="space-y-8">
      <div class="flex flex-col divide-y divide-grayscale-10">
        <ArticleCardLong
          v-for="article in dummyArticles"
          :key="article.id"
          :article="article"
          class="py-4 first:pt-0"
        />
      </div>
     </ContentContainer>
  </div>
</template>

<script lang="ts" setup>

const isDefaultSearch = ref(true);

const dummyArticles = [
  {
    id: 1,
    title: "Fufufafa Pintu Masuk Pemakzulan Gibran",
    title_slug: "fufufafa-pintu-masuk-pemakzulan-gibran",
    summary: "Wacana pemakzulan Gibran Rakabuming Raka dari jabatan wakil presiden berpotensi menjadi bom waktu politik di Indonesia.",
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
    summary: "Wacana pemakzulan Gibran Rakabuming Raka dari jabatan wakil presiden berpotensi menjadi bom waktu politik di Indonesia.",
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
    summary: "Wacana pemakzulan Gibran Rakabuming Raka dari jabatan wakil presiden berpotensi menjadi bom waktu politik di Indonesia.",
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
