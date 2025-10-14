/**
 * Device detection utilities
 */

/**
 * Check if the current device is iOS (iPhone, iPad, iPod)
 * Uses minimal UA-based check per MDN guidance
 * Avoids deprecated navigator.platform
 */
export const isIOSDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

/**
 * Check if the current device is a mobile device
 * Based on screen width breakpoint
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

/**
 * Check if the current device is a touch device
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};
