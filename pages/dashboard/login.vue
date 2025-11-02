<script lang="ts" setup>
definePageMeta({
  layout: false
})

const config = useRuntimeConfig()
const dashboardUrl: string = config.public.dashboardUrl

// Properly handle SSR external redirect in Nuxt 4 using H3 response utilities
if (dashboardUrl && dashboardUrl !== '#') {
  if (import.meta.server) {
    // Use H3 event utilities for SSR external redirect
    const event = useRequestEvent()
    if (event) {
      event.node.res.statusCode = 302
      event.node.res.setHeader('Location', dashboardUrl)
      event.node.res.end()
    }
  } else {
    // Client-side external redirect
    window.location.href = dashboardUrl
  }
} else {
  // No dashboard URL, fallback to Nuxt home navigation (works both SSR/CSR)
  await navigateTo('/')
}
</script>
