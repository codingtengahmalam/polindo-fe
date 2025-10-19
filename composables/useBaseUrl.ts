/**
 * Get base URL dynamically based on current environment
 * Works for both SSR and client-side
 */
export const useBaseUrl = () => {
  const getBaseUrl = () => {
    // Server-side: use request URL
    if (process.server) {
      const event = useRequestEvent();
      const protocol = event?.node.req.headers["x-forwarded-proto"] || "https";
      const host = event?.node.req.headers.host || "politikindonesia.id";
      return `${protocol}://${host}`;
    }

    // Client-side: use window.location
    if (process.client) {
      return window.location.origin;
    }

    // Fallback
    return "https://politikindonesia.id";
  };

  return {
    baseUrl: getBaseUrl(),
  };
};
