import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

/* Titres : Chapaza. Texte : Futura Std (Book en normal, Medium pour tout ce qui est
   en gras). Les deux polices sont des fichiers du projet (app/fonts) : le site ne
   dépend d'aucun appel à Google. Chapaza n'existe qu'en un seul graisse : la plage
   « 100 900 » évite tout faux gras du navigateur. */
const serif = localFont({
  src: [{ path: "./fonts/Chapaza.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "./fonts/FuturaStd-Book.woff2", weight: "300 400", style: "normal" },
    { path: "./fonts/FuturaStd-Medium.woff2", weight: "500 900", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

/* ------------------------------------------------------------------
   Domaine public du site — UNE SEULE LIGNE À CHANGER le jour de la mise
   en ligne : elle sert de base aux URLs absolues (canonique, Open Graph,
   sitemap, robots, données structurées).
------------------------------------------------------------------ */
const SITE = "https://exoticas.bj";

const NOM = "Exoticas";
const TITRE = "Exoticas | Aménagement paysager et plantes rares à Cotonou";
const DESCRIPTION =
  "Aménagement paysager sur mesure, plantes rares et locales, terrasse café conviviale et " +
  "coworking à Tokpa-hoho, Cotonou. Devis sur WhatsApp ou par téléphone.";
const ADRESSE_LONGUE =
  "2ème rue après Acropole, à 1 min de l'échangeur Ganhi, face à la boîte de nuit Z Club";
const TEL = "+2290153300000";
const MAIL = "exoticasbj@gmail.com";
const FICHE_MAPS =
  "https://www.google.com/maps/place/exoticas/data=!4m2!3m1!1s0x102355007b48f569:0x6ecd9c011dacc305";
const INSTAGRAM = "https://www.instagram.com/exoticasbj/";
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
    "monstera Cotonou",
    "orchidées Cotonou",
    "anthurium Bénin",
    "bonsaï Cotonou",
    "philodendron Bénin",
    "coworking Cotonou",
    "café Cotonou",
    "brunch Cotonou",
  ],
  authors: [{ name: NOM, url: SITE }],
  creator: NOM,
  publisher: NOM,
  category: "shopping",
  alternates: {
    canonical: "/",
    languages: { "fr-BJ": "/", "x-default": "/" },
  },
  formatDetection: { telephone: true, email: true, address: true },
  manifest: "/manifest.webmanifest",
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
  themeColor: "#237F3C",
  colorScheme: "light",
};

/* Fiche entreprise lue par Google (résultats locaux, Maps) — mêmes
   informations que le flyer : rien d'inventé, les horaires restent absents
   tant qu'ils ne sont pas connus. */
const BOUTIQUE = {
  "@type": ["Florist", "CafeOrCoffeeShop"],
  "@id": `${SITE}/#boutique`,
  name: NOM,
  alternateName: "Exoticas — La vie en vert",
  description: DESCRIPTION,
  url: SITE,
  logo: `${SITE}/logo/marque-verte.png`,
  image: [`${SITE}/og.png`],
  telephone: TEL,
  email: MAIL,
  sameAs: [INSTAGRAM, FICHE_MAPS],
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
  hasMap: FICHE_MAPS,
  areaServed: { "@type": "City", name: "Cotonou" },
  knowsAbout: [
    "plantes rares",
    "paysagisme",
    "plants café",
    "décoration végétale",
    "aménagement de terrasses",
  ],
};

const SERVICES = [
  "Plantes rares et d'intérieur",
  "Café et brunch",
  "Coworking",
  "Paysagisme et aménagement paysager",
  "Plants café",
  "Décoration végétale",
];

const FICHE = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...BOUTIQUE,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: TEL,
        email: MAIL,
        contactType: "customer service",
        areaServed: "BJ",
        availableLanguage: ["fr"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Produits et services Exoticas",
        itemListElement: SERVICES.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, provider: { "@id": `${SITE}/#boutique` } },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#site`,
      url: SITE,
      name: NOM,
      inLanguage: "fr-BJ",
      publisher: { "@id": `${SITE}/#boutique` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}/#page`,
      url: SITE,
      name: TITRE,
      description: DESCRIPTION,
      inLanguage: "fr-BJ",
      isPartOf: { "@id": `${SITE}/#site` },
      about: { "@id": `${SITE}/#boutique` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE}/og.png`, width: 1200, height: 630 },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
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
