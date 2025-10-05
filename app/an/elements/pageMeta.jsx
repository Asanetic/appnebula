// utils/pageMeta.js
let metadataSet = false;

export function setClientMetadata({ title, icon, force = true }) {
  if (metadataSet && !force) return; // skip if already set unless forced

  if (title) document.title = title;

  if (icon) {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = icon;
  }

  metadataSet = true;
}
