import type { MetadataRoute } from "next";

/* Domaine public — même valeur que dans app/layout.tsx */
const SITE = "https://exoticas.bj";

/* Site d'une seule page : l'accueil. L'image Open Graph est déclarée en
   sitemap d'images pour qu'elle serve aussi de vignette dans les résultats. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE}/og.png`],
    },
  ];
}
