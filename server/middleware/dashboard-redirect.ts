/**
 * Server middleware to redirect /dashboard/login to DASHBOARD_URL
 * Works for both SSR and API routes
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // Check if the path is /dashboard/login
  if (url.pathname === '/dashboard/login') {
    const config = useRuntimeConfig(event)
    const dashboardUrl = config.public.dashboardUrl

    // Only redirect if dashboard URL is set and not '#'
    if (dashboardUrl && dashboardUrl !== '#') {
      // Perform 302 redirect to external dashboard URL
      setResponseStatus(event, 302, 'Found')
      setHeader(event, 'Location', dashboardUrl)
      return
    }
  }
})

