<template>
  <header class="fixed top-0 z-50 w-full h-[68px] bg-grayscale-90">
    <div class="container h-full">
      <nav
        class="flex items-center justify-between h-full"
        aria-label="Main navigation"
      >
        <div class="flex items-center gap-4">
          <!-- Logo -->
          <NuxtLink to="/" aria-label="Politik Indonesia Home">
            <img
              src="/logo.png"
              alt="Politik Indonesia - Jaringan Informasi Politik"
              width="160"
              height="40"
              class="w-auto h-10"
            />
          </NuxtLink>

          <!-- Main Menu -->
          <ul class="flex items-center text-base font-semibold">
            <li v-for="item in MAIN_MENU" :key="item.label">
              <NuxtLink
                :to="item.to"
                class="block p-2.5 transition-colors text-white hover:text-brand-600"
                :aria-current="route.path === item.to ? 'page' : undefined"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Search Button -->
        <NuxtLink
          to="/search"
          class="transition-colors text-white hover:text-brand-600"
          aria-label="Search"
        >
          <IconSearch />
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
// Types
interface MenuItem {
  label: string;
  to: string;
}

// Constants
const MAIN_MENU: MenuItem[] = [
  { label: "Politik", to: "/categories/politik" },
  { label: "Hukum", to: "/categories/hukum" },
  { label: "Ekonomi", to: "/categories/ekonomi" },
  { label: "Politisiana", to: "/categories/politisiana" },
  { label: "Wawancara", to: "/categories/wawancara" },
  { label: "Pendapat", to: "/categories/pendapat" },
  { label: "Nusantara", to: "/categories/nusantara" },
  { label: "Teknologi", to: "/categories/teknologi" },
];

// Composables
const route = useRoute();
</script>
