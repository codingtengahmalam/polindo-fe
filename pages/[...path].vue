<template>
  <ContentContainer class="px-4 md:px-10 xl:px-20 space-y-5">
    <div
      class="flex flex-col xl:flex-row justify-between gap-5 lg:divide-x divide-grayscale-10 pt-10"
    >
      <section class="w-full xl:w-[720px] xl:shrink-0 space-y-8">
        <!-- Hero -->
        <div class="space-y-2">
          <!-- Main Image -->
          <NuxtImg
            :src="data.images.big"
            :alt="data.title"
            width="720"
            height="400"
            sizes="sm:100vw md:720px"
            class="w-full object-cover rounded-lg"
            loading="eager"
            fetchpriority="high"
          />
          <!-- description of image -->
          <p class="text-subtitle font-normal text-sm">
            {{ data.images.description }}
          </p>
        </div>
        <!-- Content -->
        <article
          itemscope
          itemtype="https://schema.org/BlogPosting"
          class="space-y-2"
        >
          <!-- Author & Category & Date -->
          <div class="flex items-center gap-2 text-xs">
            <Author :name="data.author.display_name" :slug="data.author.slug" />
            <span class="text-grayscale-40">•</span>
            <time
              :datetime="data.created_at"
              itemprop="datePublished"
              class="text-subtitle font-normal"
            >
              {{ relativeTime(data.created_at) }}
            </time>
            <CategoryBadge
              :name="data.category.name"
              :slug="data.category.slug"
            />
          </div>

          <h1
            itemprop="headline"
            class="text-title text-2xl font-playfair font-bold"
          >
            {{ data.title }}
          </h1>

          <!-- Article Body with Markdown/HTML Support -->
          <div
            itemprop="articleBody"
            class="prose prose-sm md:prose-base max-w-none text-subtitle"
            v-html="renderedContent"
          />
        </article>

        <!-- Tags -->
        <div class="space-y-2">
          <h6 class="text-xs text-grayscale-40 uppercase">Kata Kunci</h6>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="tag in data.tags"
              :key="tag.id"
              :to="`/tags/${tag.tag}`"
              class="text-xs font-semibold border border-brand-300 rounded-sm p-2 text-brand-800 uppercase flex items-center gap-1"
            >
              <IconCircleCheck class="size-3" />
              {{ tag.tag }}
            </NuxtLink>
          </div>
        </div>
      </section>
      <section class="w-full pl-0 lg:pl-5 space-y-10">
        <WidgetUpcomingEvent />
        <WidgetLatestNews type="popular" />
      </section>
    </div>

    <hr class="border-grayscale-10">

    <!-- Related Articles -->
    <div class="space-y-5 pb-10">
      <h6 class="text-lg text-title font-bold">Berita Terkait</h6>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
        <ArticleCard
          v-for="article in relatedArticles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </ContentContainer>
</template>

<script lang="ts" setup>
const { renderContent, extractPlainText } = useMarkdown();

// dummy data
const data = {
  id: 95643,
  title: "Fufufafa Pintu Masuk Pemakzulan Gibran",
  title_slug: "fufufafa-pintu-masuk-pemakzulan-gibran",
  content: `<p><strong>USULAN</strong> Forum Purnawirawan Prajurit (FPP) TNI untuk memakzulkan Gibran Rakabuming Raka dari jabatan wakil presiden berpotensi menjadi bom waktu politik.&nbsp;</p>
<p>Wacana pemberhentian Gibran tidak bisa dilepaskan dari kontroversi di sekitar proses pencalonannya pada Pilpres 2024.&nbsp;</p>
<p>Keputusan Mahkamah Konstitusi (MK) yang mengubah batas usia minimal calon presiden dan wakil presiden membuka jalan bagi Gibran, yang saat itu belum berusia 40 tahun, untuk bisa maju dalam kontentasi pilpres.&nbsp;</p>
<p>Namun keputusan tersebut dibayangi konflik kepentingan karena Ketua MK kala itu, Anwar Usman yang merupakan ipar Jokowi sekaligus paman Gibran. Meskipun akhirnya Anwar Usman dinyatakan melanggar etik berat dan dicopot dari jabatan Ketua MK, dampak politiknya tetap bergema dan menjadi bahan tuntutan moral serta hukum.</p>
... (potong untuk ringkas, isinya tetap sama seperti JSON aslinya) ...
<p><em><strong>*Penulis adalah Ketua Himpunan Masyarakat Nusantara (Hasrat)</strong></em></p>`,
  summary: null,
  is_featured: false,
  is_slider: false,
  is_recommended: false,
  is_breaking: false,
  status: true,
  visibility: true,
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
  tags: [
    { id: 46035, tag: "Fufufafa" },
    { id: 46036, tag: "Pintu Masuk" },
    { id: 46037, tag: "Pemakzulan Gibran" },
    { id: 46038, tag: "Sugiyanto" },
  ],
  created_at: "2025-06-02T10:45:22.000000Z",
  updated_at: "2025-06-02T03:45:22.000000Z",
};

const renderedContent = computed(() => renderContent(data.content));

// dummy data
const relatedArticles = [
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
