/**
 * SEO & OpenGraph Social Sharing Handler
 * Dynamically updates document title and meta tags when viewing published memory sites
 */

const DEFAULT_META = {
  title: "ILOVE — แพลตฟอร์มสร้างเว็บไซต์ความทรงจำ & วันครบรอบสำหรับคู่รัก",
  description: "สร้างเว็บไซต์ของขวัญบอกรักสุดพิเศษ วันครบรอบ วาเลนไทน์ และความทรงจำที่คุณกับคนพิเศษไม่มีวันลืม",
  image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&auto=format&fit=crop&q=80"
};

function getOrCreateMetaTag(attribute, value) {
  let element = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  return element;
}

export function updatePageMetadata({ title, description, image, url } = {}) {
  const pageTitle = title
    ? `${title} — ILOVE ความทรงจำแสนพิเศษ 💖`
    : DEFAULT_META.title;
  const pageDesc = description || DEFAULT_META.description;
  const pageImage = image || DEFAULT_META.image;
  const pageUrl = url || window.location.href;

  // 1. Standard Document Title & Description
  document.title = pageTitle;

  const metaDesc = getOrCreateMetaTag("name", "description");
  metaDesc.setAttribute("content", pageDesc);

  // 2. OpenGraph Meta Tags (LINE, Facebook, Messenger)
  getOrCreateMetaTag("property", "og:title").setAttribute("content", pageTitle);
  getOrCreateMetaTag("property", "og:description").setAttribute("content", pageDesc);
  getOrCreateMetaTag("property", "og:image").setAttribute("content", pageImage);
  getOrCreateMetaTag("property", "og:url").setAttribute("content", pageUrl);
  getOrCreateMetaTag("property", "og:type").setAttribute("content", "website");

  // 3. Twitter Card
  getOrCreateMetaTag("name", "twitter:card").setAttribute("content", "summary_large_image");
  getOrCreateMetaTag("name", "twitter:title").setAttribute("content", pageTitle);
  getOrCreateMetaTag("name", "twitter:description").setAttribute("content", pageDesc);
  getOrCreateMetaTag("name", "twitter:image").setAttribute("content", pageImage);

  return () => {
    // Reset to default on unmount
    document.title = DEFAULT_META.title;
    getOrCreateMetaTag("name", "description").setAttribute("content", DEFAULT_META.description);
    getOrCreateMetaTag("property", "og:title").setAttribute("content", DEFAULT_META.title);
    getOrCreateMetaTag("property", "og:description").setAttribute("content", DEFAULT_META.description);
    getOrCreateMetaTag("property", "og:image").setAttribute("content", DEFAULT_META.image);
  };
}
