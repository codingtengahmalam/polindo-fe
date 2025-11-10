/**
 * Format date to relative time string
 * Uses UTC to ensure consistent formatting between server and client (prevents hydration mismatches)
 * @param time - ISO date string
 * @returns Formatted date string in format "7 Nov 2025, 08:52"
 */
export default (time: string) => {
  if (!time) {
    return "";
  }

  // Handle microseconds (6 digits) - convert to milliseconds (3 digits)
  // Format: 2025-11-07T08:52:49.000000Z -> 2025-11-07T08:52:49.000Z
  const normalizedTime = time.replace(/\.(\d{3})(\d{3})Z$/, ".$1Z");
  const timestamp = new Date(normalizedTime);

  // Validate date parsing
  if (isNaN(timestamp.getTime())) {
    return "";
  }

  // Use UTC methods to ensure consistent formatting between server and client
  // This prevents hydration mismatches due to timezone differences
  const day = timestamp.getUTCDate();
  const monthIndex = timestamp.getUTCMonth();
  const year = timestamp.getUTCFullYear();
  const hours = timestamp.getUTCHours().toString().padStart(2, "0");
  const minutes = timestamp.getUTCMinutes().toString().padStart(2, "0");

  // Manual month mapping to avoid locale-dependent methods
  // This ensures consistent output on both server and client
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[monthIndex];

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}
