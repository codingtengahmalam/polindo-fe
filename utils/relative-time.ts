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

  // Format: "7 Nov 2025, 08:52"
  const day = timestamp.getDate();
  const month = timestamp.toLocaleDateString("en-US", { month: "short" });
  const year = timestamp.getFullYear();
  const hours = timestamp.getHours().toString().padStart(2, "0");
  const minutes = timestamp.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}
