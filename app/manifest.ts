import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Exoticas — La vie en vert",
    short_name: "Exoticas",
    description: "Plantes rares, paysagisme et plants café à Cotonou (Bénin).",
    lang: "fr",
    start_url: "/",
    display: "standalone",
    background_color: "#F6EFE2",
    theme_color: "#17432C",
    icons: [
      { src: "/icon.png", sizes: "96x96", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
