<template>
  <NuxtLayout>
    <ContentContainer class="px-4 md:px-10 xl:px-20">
      <div class="flex flex-col items-center justify-center min-h-[60vh] py-20">
        <div class="text-center space-y-6 max-w-2xl">
          <!-- Error Icon -->
          <div class="flex justify-center">
            <div
              class="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center"
            >
              <IconClose class="w-12 h-12 text-red-600" />
            </div>
          </div>

          <!-- Error Code -->
          <h1 class="text-6xl font-bold text-title">
            {{ error.statusCode }}
          </h1>

          <!-- Error Message -->
          <h2 class="text-2xl font-semibold text-title">
            {{ errorTitle }}
          </h2>

          <p class="text-subtitle text-lg">
            {{ errorMessage }}
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <NuxtLink
              to="/"
              class="px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
            >
              Kembali ke Beranda
            </NuxtLink>
          </div>
        </div>
      </div>
    </ContentContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
interface NuxtError {
  statusCode: number;
  statusMessage: string;
  message?: string;
  fatal?: boolean;
}

interface Props {
  error: NuxtError;
}

const props = defineProps<Props>();

// Computed error title based on status code
const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return "Halaman Tidak Ditemukan";
    case 500:
      return "Terjadi Kesalahan Server";
    case 403:
      return "Akses Ditolak";
    case 401:
      return "Tidak Terautentikasi";
    default:
      return "Terjadi Kesalahan";
  }
});

// Computed error message
const errorMessage = computed(() => {
  if (props.error.statusMessage) {
    return props.error.statusMessage;
  }

  switch (props.error.statusCode) {
    case 404:
      return "Maaf, halaman yang Anda cari tidak ditemukan. Mungkin artikel telah dihapus atau alamatnya salah.";
    case 500:
      return "Maaf, terjadi kesalahan pada server. Silakan coba lagi nanti.";
    case 403:
      return "Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.";
    case 401:
      return "Maaf, Anda harus login terlebih dahulu untuk mengakses halaman ini.";
    default:
      return "Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.";
  }
});

// Handle error - try to clear and reload
const handleError = () => {
  clearError({ redirect: "/" });
};

// SEO Meta
useSeoMeta({
  title: `${errorTitle.value} - Politik Indonesia`,
  description: errorMessage.value,
  robots: "noindex, nofollow", // Don't index error pages
});
</script>
