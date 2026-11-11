import type { MetadataRoute } from "next";

/* Domaine public — même valeur que dans app/layout.tsx */
const SITE = "https://exoticas.bj";

/* Deux pages : l'accueil et la galerie des plantes. L'image Open Graph est déclarée
   en sitemap d'images pour qu'elle serve aussi de vignette dans les résultats. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE}/og.png`],
    },
    {
      url: `${SITE}/plantes`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
