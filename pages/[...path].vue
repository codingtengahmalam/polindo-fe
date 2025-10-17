<template>
  <ContentContainer class="px-4 md:px-10 xl:px-20 space-y-5">
    <div
      class="flex flex-col xl:flex-row xl:items-start justify-between gap-5 pt-10"
    >
      <section class="w-full xl:w-[720px] xl:shrink-0 space-y-8">
        <!-- Article -->
        <article
          itemscope
          itemtype="https://schema.org/BlogPosting"
          class="space-y-8"
        >
          <!-- Featured Image with Figure -->
          <figure itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
            <NuxtImg
              :src="data.images.big"
              :alt="data.title"
              width="720"
              height="400"
              sizes="sm:100vw md:720px"
              class="w-full object-cover rounded-lg"
              loading="eager"
              fetchpriority="high"
              itemprop="url contentUrl"
            />
            <figcaption class="text-subtitle font-normal text-sm mt-2">
              {{ data.images.description }}
            </figcaption>
            <!-- Hidden meta for schema.org -->
            <meta itemprop="width" content="720">
            <meta itemprop="height" content="400">
          </figure>

          <!-- Article Header -->
          <header class="space-y-2">
            <h1
              itemprop="headline"
              class="text-title text-2xl font-playfair font-bold"
            >
              {{ data.title }}
            </h1>

            <!-- Author & Category & Date -->
            <div class="flex items-center gap-2 text-xs">
              <Author
                :name="data.author.display_name"
                :slug="data.author.slug"
                itemprop="author"
              />
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
          </header>

          <!-- Article Body -->
          <section
            itemprop="articleBody"
            class="prose prose-sm md:prose-base max-w-none text-subtitle"
            v-html="renderedContent"
          />

          <!-- Article Footer (Tags) -->
          <footer class="space-y-2">
            <h2 class="text-xs text-grayscale-40 uppercase">Kata Kunci</h2>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="tag in data.tags"
                :key="tag.id"
                :to="`/tags/${tag.tag}`"
                class="text-xs font-semibold border border-brand-300 rounded-sm p-2 text-brand-800 uppercase flex items-center gap-1"
                itemprop="keywords"
              >
                <IconCircleCheck class="size-3" />
                {{ tag.tag }}
              </NuxtLink>
            </div>
          </footer>

          <!-- Hidden Schema.org metadata -->
          <meta itemprop="dateModified" :content="data.updated_at">
          <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization" class="hidden">
            <meta itemprop="name" content="Politik Indonesia">
            <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
              <meta itemprop="url" content="https://politikindonesia.id/logo.png">
            </div>
          </div>
        </article>
      </section>

      <!-- Sidebar -->
      <aside class="w-full pl-0 xl:pl-10 space-y-10 sidebar-divider">
        <WidgetUpcomingEvent />
        <WidgetLatestNews type="popular" />
      </aside>
    </div>

    <hr class="border-grayscale-10">

    <!-- Related Articles -->
    <section class="space-y-5 pb-10">
      <h2 class="text-lg text-title font-bold">Berita Terkait</h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-8">
        <ArticleCard
          v-for="article in relatedArticles"
          :key="article.id"
          :article="article"
          class="grid-article-divider"
        />
      </div>
    </section>
  </ContentContainer>
</template>

<script lang="ts" setup>

// Composables
const route = useRoute()
const { renderContent, extractPlainText } = useMarkdown()

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

// Computed Properties
const renderedContent = computed(() => renderContent(data.content))

// TODO: Add SEO meta tags when real API data is ready
// - useSeoMeta() for title, description, OG tags
// - Canonical URL
// - Schema.org JSON-LD structured data

// dummy data
const relatedArticles = [
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
