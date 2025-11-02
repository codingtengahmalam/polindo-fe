<template>
  <header
    :class="['fixed top-0 w-full bg-grayscale-90', HEADER_Z_INDEX]"
    :style="{ height: HEADER_HEIGHT }"
  >
    <div class="container h-full">
      <nav
        class="flex items-center justify-between h-full"
        aria-label="Main navigation"
      >
        <!-- Left Side: Logo & Menu -->
        <div class="flex items-center gap-4 xl:gap-6">
          <!-- Logo -->
          <NuxtLink to="/" aria-label="Politik Indonesia Home" class="shrink-0">
            <img
              src="/logo.png"
              alt="Politik Indonesia - Jaringan Informasi Politik"
              width="160"
              height="40"
              class="w-auto h-8 md:h-9 xl:h-10"
            />
          </NuxtLink>

          <!-- Desktop Menu (≥1024px) -->
          <ul class="hidden lg:flex items-center text-base font-semibold">
            <li v-for="category in categories?.data" :key="category.id">
              <NuxtLink
                :to="`/category/${category.name_slug}`"
                :class="[
                  'block px-2.5 py-2.5 transition-colors leading-1.3',
                  isActiveRoute(`/category/${category.name_slug}`)
                    ? 'text-brand-600'
                    : 'text-white hover:text-brand-600',
                ]"
                :aria-current="
                  isActiveRoute(`/category/${category.name_slug}`)
                    ? 'page'
                    : undefined
                "
              >
                {{ category.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Right Side: Search & Hamburger -->
        <div class="flex items-center gap-4">

          <div class="flex items-center gap-2">
            <NuxtLink
            to="/cari"
            class="transition-colors text-white hover:text-brand-600"
            aria-label="Search"
          >
            <IconSearch />
          </NuxtLink>
          <a :href="config.public.dashboardUrl" target="_blank" rel="noopener noreferrer">
            <IconUserCircle class="transition-colors text-white hover:text-brand-600 size-6" />
          </a>
          </div>

          <!-- Hamburger Button (Mobile & Tablet <1024px) -->
          <button
            type="button"
            class="lg:hidden text-white hover:text-brand-600 transition-colors"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="isMenuOpen"
            @click="toggleMenu"
          >
            <IconMenu v-if="!isMenuOpen" />
            <IconClose v-else />
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu (Slide-in from right) -->
    <Transition name="slide">
      <div
        v-if="isMenuOpen"
        :class="[
          'lg:hidden fixed inset-0 bg-grayscale-90',
          MOBILE_MENU_Z_INDEX,
        ]"
        :style="{ top: HEADER_HEIGHT }"
      >
        <nav class="container py-6" aria-label="Mobile navigation">
          <ul class="space-y-1">
            <li v-for="category in categories?.data" :key="category.id">
              <NuxtLink
                :to="`/category/${category.name_slug}`"
                :class="[
                  'block px-4 py-3 text-base font-semibold transition-colors leading-1.3',
                  isActiveRoute(`/category/${category.name_slug}`)
                    ? 'text-brand-600'
                    : 'text-white',
                ]"
                :aria-current="
                  isActiveRoute(`/category/${category.name_slug}`)
                    ? 'page'
                    : undefined
                "
                @click="closeMenu"
              >
                {{ category.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>

    <!-- Backdrop Overlay -->
    <Transition name="fade">
      <div
        v-if="isMenuOpen"
        :class="['lg:hidden fixed inset-0 bg-black/50', BACKDROP_Z_INDEX]"
        :style="{ top: HEADER_HEIGHT }"
        @click="closeMenu"
      ></div>
    </Transition>
  </header>
</template>

<script lang="ts" setup>
import type { CategoryListResponse } from "~/types";

// Constants
const HEADER_HEIGHT = "68px";
const HEADER_Z_INDEX = "z-50";
const MOBILE_MENU_Z_INDEX = "z-40";
const BACKDROP_Z_INDEX = "z-30";

// Composables
const route = useRoute();
const config = useRuntimeConfig();

const { data: categories, error } = await useFetch<CategoryListResponse>(
  `${config.public.apiBase}/api/v1/categories?show_on_menu=true`,
  {
    headers: {
      "User-Agent": "PolitikIndonesia/1.0",
    },
    server: true,
  }
);

// Handle error gracefully
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || "Failed to fetch categories",
    fatal: false,
  });
}

// Reactive state
const isMenuOpen = ref(false);

// Methods
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = (): void => {
  isMenuOpen.value = false;
};

const isActiveRoute = (path: string): boolean => {
  return route.path === path || route.path.startsWith(path + "/");
};

// Watchers
// Close menu when route changes
watch(
  () => route.path,
  () => {
    closeMenu();
  }
);

// Prevent body scroll when menu is open
watch(isMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Lifecycle hooks
// Close menu on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isMenuOpen.value) {
      closeMenu();
    }
  };

  window.addEventListener("keydown", handleEscape);

  // Store cleanup function
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleEscape);
    // Reset body scroll on component unmount
    document.body.style.overflow = "";
  });
});
</script>

<style scoped>
/* Slide transition for mobile menu */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

/* Fade transition for backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
