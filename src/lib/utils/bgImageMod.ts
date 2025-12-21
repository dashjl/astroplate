const bgImageMod = (
  src: string,
  format?: "auto" | "avif" | "jpeg" | "png" | "svg" | "webp",
) => {
  // Simple function that just ensures we return a proper image path
  // Since we're not doing image optimization, just return the path as-is
  if (src.startsWith('/images/')) {
    return src; // Already properly formatted
  } else if (src.startsWith('images/')) {
    return `/${src}`; // Add leading slash
  } else {
    return `/images/${src}`; // Assume it's just a filename
  }
};

export default bgImageMod;
