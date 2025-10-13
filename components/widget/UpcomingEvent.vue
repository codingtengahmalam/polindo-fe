<template>
  <aside
    class="w-full border bg-white rounded-lg p-4 space-y-4"
    aria-labelledby="upcoming-events-title"
  >
    <div class="flex items-center gap-2">
      <IconCalendar aria-hidden="true" />
      <h2 id="upcoming-events-title" class="text-title font-semibold">
        Agenda Terdekat
      </h2>
    </div>

    <div class="flex flex-col gap-3">
      <article
        v-for="event in displayedEvents"
        :key="event.id"
        class="border-b border-grayscale-10 pb-3 last:border-b-0"
      >
        <time
          class="block text-xs text-grayscale-40"
          :datetime="event.dateISO"
        >
          {{ event.date }}
        </time>
        <h3 class="text-title font-semibold line-clamp-2" :title="event.title">
          {{ event.title }}
        </h3>
      </article>

      <div v-if="hasMoreEvents" class="pt-1">
        <NuxtLink
          to="/events"
          class="text-brand-600 uppercase text-sm font-normal flex items-center gap-2 hover:text-brand-700 transition-colors"
          aria-label="Lihat semua agenda lainnya"
        >
          Lihat Agenda Lainnya
          <IconArrowRight aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
// Constants
const MAX_DISPLAYED_EVENTS = 3

// Dummy data
const upcomingEvents = [
  {
    id: 1,
    date: '20 Oktober 2025',
    dateISO: '2025-10-20',
    title: 'Sosialisasi Program Kerja Sama Ekonomi Indonesia-Polandia Tahun 2026',
  },
  {
    id: 2,
    date: '21 Oktober 2025',
    dateISO: '2025-10-21',
    title: 'Webinar: Peluang Investasi dan Bisnis di Sektor Teknologi Polandia',
  },
  {
    id: 3,
    date: '25 Oktober 2025',
    dateISO: '2025-10-25',
    title: 'Workshop Ekspor Produk UMKM Indonesia ke Pasar Eropa Timur',
  },
  {
    id: 4,
    date: '28 Oktober 2025',
    dateISO: '2025-10-28',
    title: 'Networking Event: Pertemuan Pengusaha Indonesia dan Polandia',
  },
  {
    id: 5,
    date: '1 November 2025',
    dateISO: '2025-11-01',
    title: 'Seminar Kebijakan Perdagangan Internasional dan Regulasi Bea Cukai',
  },
]

// Computed properties
const displayedEvents = computed(() => {
  return upcomingEvents.slice(0, MAX_DISPLAYED_EVENTS)
})

const hasMoreEvents = computed(() => {
  return upcomingEvents.length > MAX_DISPLAYED_EVENTS
})
</script>


