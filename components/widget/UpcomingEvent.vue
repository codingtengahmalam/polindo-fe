<template>
  <div class="w-full border bg-white rounded-lg p-4 space-y-4">
    <div class="flex items-center gap-2">
      <IconCalendar />
      <h4 class="text-title font-semibold">Agenda Terdekat</h4>
    </div>

    <div class="flex flex-col gap-3">
      <div
        v-for="event in getThreeUpcomingEvent"
        :key="event.id"
        class="border-b border-grayscale-10 pb-3"
      >
        <time class="text-xs text-grayscale-40" :datetime="event.dateISO">
          {{ event.date }}
        </time>
        <h5 class="text-title font-semibold line-clamp-2" :title="event.title">
          {{ event.title }}
        </h5>
      </div>
      <div v-if="upcomingEvent.length > maxEvent">
        <NuxtLink
          to="/events"
          class="text-brand-600 uppercase text-sm font-normal flex items-center gap-2"
        >
          Lihat Agenda Lainnya <IconArrowRight />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const maxEvent = 3;

const upcomingEvent = [
  {
    id: 1,
    date: "20 Oktober 2025",
    dateISO: "2025-10-20",
    title:
      "Sosialisasi Program Kerja Sama Ekonomi Indonesia-Polandia Tahun 2026",
  },
  {
    id: 2,
    date: "21 Oktober 2025",
    dateISO: "2025-10-21",
    title: "Webinar: Peluang Investasi dan Bisnis di Sektor Teknologi Polandia",
  },
  {
    id: 3,
    date: "25 Oktober 2025",
    dateISO: "2025-10-25",
    title: "Workshop Ekspor Produk UMKM Indonesia ke Pasar Eropa Timur",
  },
  {
    id: 4,
    date: "28 Oktober 2025",
    dateISO: "2025-10-28",
    title: "Networking Event: Pertemuan Pengusaha Indonesia dan Polandia",
  },
  {
    id: 5,
    date: "1 November 2025",
    dateISO: "2025-11-01",
    title: "Seminar Kebijakan Perdagangan Internasional dan Regulasi Bea Cukai",
  },
];

const getThreeUpcomingEvent = computed(() => {
  return upcomingEvent.slice(0, maxEvent);
});
</script>
