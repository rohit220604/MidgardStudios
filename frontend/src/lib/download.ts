/**
 * Converts a Cloudinary image URL to use the `fl_attachment` flag,
 * which forces the browser to download the file instead of displaying it.
 *
 * Example:
 *   /image/upload/v123/...  →  /image/upload/fl_attachment/v123/...
 */
export function getDownloadUrl(imageUrl: string): string {
  if (!imageUrl) return imageUrl;

  // Only transform Cloudinary URLs
  if (!imageUrl.includes("/image/upload/")) {
    return imageUrl;
  }

  // Insert fl_attachment right after /image/upload/
  return imageUrl.replace("/image/upload/", "/image/upload/fl_attachment/");
}

/**
 * Downloads an image to the user's machine.
 *
 * For Cloudinary URLs, uses the `fl_attachment` transformation so the
 * browser triggers a native download without navigating away.
 *
 * For non-Cloudinary URLs, falls back to fetch → blob → Object URL.
 *
 * @param imageUrl  - The source image URL.
 * @param generationId - Optional ID used to name the file.
 * @returns A promise that resolves when the download is triggered.
 */
export async function downloadImage(
  imageUrl: string,
  generationId?: string,
): Promise<void> {
  const filename = generationId
    ? `midgard-artwork-${generationId}.jpg`
    : "midgard-artwork.jpg";

  const isCloudinary = imageUrl.includes("/image/upload/");

  if (isCloudinary) {
    // Use Cloudinary's fl_attachment flag for a native download
    const downloadUrl = getDownloadUrl(imageUrl);
    triggerAnchorDownload(downloadUrl, filename);
    return;
  }

  // Fallback for non-Cloudinary URLs: fetch → blob → Object URL
  try {
    const response = await fetch(imageUrl, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    triggerAnchorDownload(objectUrl, filename);
    // Clean up the Object URL after a short delay so the download starts
    setTimeout(() => URL.revokeObjectURL(objectUrl), 10_000);
  } catch {
    throw new Error("Download failed. Please try again.");
  }
}

/**
 * Creates a temporary <a> element and clicks it to trigger a download.
 * The element is removed immediately after.
 */
function triggerAnchorDownload(href: string, filename: string): void {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}