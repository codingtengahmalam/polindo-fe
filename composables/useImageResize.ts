/**
 * Composable sederhana untuk menangani resize gambar berdasarkan atribut width/height
 */
export const useImageResize = () => {
  const resizeImages = () => {
    if (!process.client) return;

    const images = document.querySelectorAll(
      ".prose img[width], .prose img[height]"
    );

    images.forEach((img) => {
      const htmlImg = img as HTMLImageElement;
      const width = htmlImg.getAttribute("width");
      const height = htmlImg.getAttribute("height");

      // Reset default styling
      htmlImg.style.maxWidth = "none";
      htmlImg.style.maxHeight = "none";

      // Apply size from attributes
      if (width) htmlImg.style.width = `${width}px`;
      if (height) htmlImg.style.height = `${height}px`;

      // Jika gambar ada dalam link, pastikan tetap inline
      if (htmlImg.parentElement?.tagName === "A") {
        htmlImg.style.display = "inline-block";
        htmlImg.style.verticalAlign = "middle";
        htmlImg.style.marginTop = "0";
        htmlImg.style.marginBottom = "0";
      }
    });
  };

  const initImageResize = () => {
    if (!process.client) return;

    // Run immediately
    resizeImages();

    // Watch for content changes (SPA navigation)
    const observer = new MutationObserver(() => {
      setTimeout(resizeImages, 50);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  return { resizeImages, initImageResize };
};
