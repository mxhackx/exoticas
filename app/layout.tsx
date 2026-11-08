import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

/* Titres : mincho (serif japonais). Texte : gothique doux, très lisible.
   Polices (licence OFL) embarquées dans app/fonts : le site ne dépend d'aucun
   appel à Google, ni à la compilation ni chez le visiteur. */
const serif = localFont({
  src: [
    { path: "./fonts/ShipporiMincho-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ShipporiMincho-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "./fonts/ZenKakuGothicNew-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ZenKakuGothicNew-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ZenKakuGothicNew-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

/* ------------------------------------------------------------------
   À REMPLACER : domaine public et informations du restaurant.
   SITE sert de base aux URLs absolues (canonique, Open Graph, sitemap, robots).
------------------------------------------------------------------ */
const SITE = "https://exemple.com";

const NOM = "Akai";
const TITRE = "Akai | Restaurant japonais : sushis, ramen et traiteur";
const DESCRIPTION =
  "Restaurant japonais : sushis, makis, ramen et plats chauds préparés à la minute. " +
  "Sur place, à emporter ou en traiteur. Réservation par WhatsApp ou par téléphone.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITRE,
  description: DESCRIPTION,
  applicationName: NOM,
  keywords: [
    "restaurant japonais",
    "sushi",
    "maki",
    "ramen",
    "cuisine japonaise",
    "traiteur japonais",
    "plats à emporter",
    "réservation restaurant",
  ],
  authors: [{ name: NOM, url: SITE }],
  creator: NOM,
  publisher: NOM,
  category: "restaurant",
  alternates: { canonical: "/" },
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
    locale: "fr_FR",
    url: "/",
    siteName: NOM,
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${NOM}, cuisine japonaise` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITRE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#B5122B",
  colorScheme: "light",
};

/* Fiche entreprise lue par Google. Adresse, téléphone et horaires sont à ajouter
   quand ils sont connus (une adresse factice nuirait au référencement). */
const FICHE = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE}/#restaurant`,
  name: NOM,
  description: DESCRIPTION,
  url: SITE,
  image: [`${SITE}/og.png`],
  servesCuisine: ["Japonaise", "Sushi", "Ramen"],
  hasMenu: `${SITE}/#carte`,
  acceptsReservations: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FICHE) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
