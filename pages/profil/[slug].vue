<template>
  <ContentContainer class="space-y-7 my-10">
    <h1 class="text-title text-4xl font-bold flex items-end gap-2">
      Author : Nur Iwan Tri Hendrawan
      <span class="!text-subtitle text-2xl font-normal">(129 Artikel)</span>
    </h1>

    <div class="space-y-5">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
      >
        <ArticleCard
          v-for="article in dummyArticles"
          :key="article.id"
          :article="article"
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
  </ContentContainer>
</template>

<script lang="ts" setup>
// dummy data
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
