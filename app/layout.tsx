import type { Metadata, Viewport } from "next";

/* ------------------------------------------------------------------
   Domaine public du site — UNE SEULE LIGNE À CHANGER le jour de la mise
   en ligne : elle sert de base aux URLs absolues (canonique, Open Graph,
   sitemap, robots, données structurées).
------------------------------------------------------------------ */
const SITE = "https://exoticas.bj";

const NOM = "Exoticas";
const TITRE = "Exoticas — Plantes, paysagisme et plants café à Cotonou";
const DESCRIPTION =
  "Plantes rares, paysagisme et plants café à Tokpa-hoho, Cotonou (Bénin). " +
  "49 plantes photographiées à la boutique. Devis sur WhatsApp ou par téléphone.";
const ADRESSE_LONGUE =
  "2ème rue après Acropole, à 1 min de l'échangeur Ganhi, face à la boîte de nuit Z Club";
const TEL = "+2290153300000";
const MAIL = "exoticasbj@gmail.com";
const GEO = { lat: 6.35601, lng: 2.4371 };

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITRE,
  description: DESCRIPTION,
  applicationName: NOM,
  keywords: [
    "Exoticas",
    "boutique de plantes Cotonou",
    "plantes rares Bénin",
    "paysagisme Cotonou",
    "plants café Cotonou",
    "décoration végétale Cotonou",
    "aménagement paysager Bénin",
    "plantes d'intérieur Cotonou",
    "Tokpa-hoho",
  ],
  authors: [{ name: NOM, url: SITE }],
  creator: NOM,
  publisher: NOM,
  category: "shopping",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "96x96" }],
    shortcut: ["/icon.png"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "fr_BJ",
    alternateLocale: ["fr_FR"],
    url: "/",
    siteName: NOM,
    title: TITRE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Exoticas — La vie en vert, Cotonou",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITRE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  other: {
    "geo.region": "BJ-LI",
    "geo.placename": "Cotonou",
    "geo.position": `${GEO.lat};${GEO.lng}`,
    ICBM: `${GEO.lat}, ${GEO.lng}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#466931",
  colorScheme: "light",
};

/* Fiche entreprise lue par Google (résultats locaux, Maps) — mêmes
   informations que le flyer : rien d'inventé, les horaires restent absents
   tant qu'ils ne sont pas connus. */
const FICHE = {
  "@context": "https://schema.org",
  "@type": "Florist",
  "@id": `${SITE}/#boutique`,
  name: NOM,
  alternateName: "Exoticas — La vie en vert",
  description: DESCRIPTION,
  url: SITE,
  logo: `${SITE}/logo/marque-verte.png`,
  image: [`${SITE}/og.png`],
  telephone: TEL,
  email: MAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${ADRESSE_LONGUE}, Tokpa-hoho`,
    addressLocality: "Cotonou",
    addressRegion: "Littoral",
    addressCountry: "BJ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GEO.lat,
    longitude: GEO.lng,
  },
  hasMap: `https://www.google.com/maps/dir/?api=1&destination=${GEO.lat},${GEO.lng}`,
  areaServed: { "@type": "City", name: "Cotonou" },
  knowsAbout: [
    "plantes rares",
    "paysagisme",
    "plants café",
    "décoration végétale",
    "aménagement de terrasses",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://tile.openstreetmap.org" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FICHE) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
