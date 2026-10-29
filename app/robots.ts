import type { MetadataRoute } from "next";

/* Domaine public — même valeur que dans app/layout.tsx */
const SITE = "https://exoticas.bj";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
