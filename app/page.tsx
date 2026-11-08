"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Informations récupérées du flyer Exoticas (Cotonou, Bénin)
------------------------------------------------------------------ */

const BRAND = {
  nom: "exoticas",
  signature: "La vie en vert",
  tel: "01 53 30 00 00",
  telHref: "tel:+2290153300000",
  wa: "2290153300000",
  mail: "exoticasbj@gmail.com",
  instagram: "https://www.instagram.com/exoticasbj/",
  fiche:
    "https://www.google.com/maps/place/exoticas/data=!4m2!3m1!1s0x102355007b48f569:0x6ecd9c011dacc305",
  adresseCourte: "Tokpa-hoho, 5ème arrondissement, Cotonou",
  adresseLongue:
    "2ème rue après Acropole, à 1 min de l'échangeur Ganhi, face à la boîte de nuit Z Club",
};

/* Position d'Exoticas. « Tokpa-hoho » n'existe dans aucune base de géocodage :
   ce point est le milieu entre les deux repères cités sur ton flyer et tous deux
   géocodés par OpenStreetMap — Acropole (6.35726, 2.43610) et l'échangeur Ganhi
   (6.35476, 2.43810). Il pilote la carte, le marqueur et l'itinéraire.
   Pour la corriger : Google Maps → appui long sur la porte d'entrée → remplace les
   deux valeurs ci-dessous. */
const MAP = { lat: 6.35601, lng: 2.4371 };
const ZOOM = 16;

function itinLink(depuis?: { lat: number; lng: number }) {
  const d = `destination=${MAP.lat},${MAP.lng}`;
  const o = depuis ? `origin=${depuis.lat},${depuis.lng}&` : "";
  return `https://www.google.com/maps/dir/?api=1&${o}${d}`;
}

/* distance à vol d'oiseau, en km */
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const m =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(m), Math.sqrt(1 - m));
}

/* Plantes photographiées à la boutique. Les noms sont repris tels quels des
   fichiers fournis (dossier Drive drive-download-20261028T191730Z-1-001) ; les HEIC
   ont été convertis en JPEG sans recadrage ni retouche : mini/ = 640 px pour la
   grille, pleine/ = 1600 px ouverte au clic. Les originaux restent sur le disque. */
const PLANTES = [
  { n: "Alocasia sanderiana nain ou oreille d’âne", s: "alocasia-sanderiana-nain-ou-oreille-d-ane" },
  { n: "Anthurium hookeri black", s: "anthurium-hookeri-black" },
  { n: "Anthurium hookerie aurea", s: "anthurium-hookerie-aurea" },
  { n: "Anthurium", s: "anthurium" },
  { n: "Anthurium", s: "anthurium-2" },
  { n: "Asparagus", s: "asparagus" },
  { n: "Bégonia masoniana ou bégonia croix de fer", s: "begonia-masoniana-ou-begonia-croix-de-fer" },
  { n: "Bonsaï Araucaria Cunninghamii", s: "bonsai-araucaria-cunninghamii" },
  { n: "Bonsai", s: "bonsai" },
  { n: "Bonsaï", s: "bonsai-2" },
  { n: "Bonsai", s: "bonsai-3" },
  { n: "Bonsaï", s: "bonsai-4" },
  { n: "Cocotier", s: "cocotier" },
  { n: "colocasia cintho aloha", s: "colocasia-cintho-aloha" },
  { n: "Dendrobium", s: "dendrobium" },
  { n: "Epipremnum", s: "epipremnum" },
  { n: "Epipremnum", s: "epipremnum-2" },
  { n: "Epiprenum variegata", s: "epiprenum-variegata" },
  { n: "Frangipanier", s: "frangipanier" },
  { n: "Goyavier blanc", s: "goyavier-blanc" },
  { n: "Goyavier", s: "goyavier" },
  { n: "Grenadier", s: "grenadier" },
  { n: "Hosta africain", s: "hosta-africain" },
  { n: "Lys du Bengale variegata", s: "lys-du-bengale-variegata" },
  { n: "Monstera adansonii", s: "monstera-adansonii" },
  { n: "Monstera Albo", s: "monstera-albo" },
  { n: "Monstera burle marx", s: "monstera-burle-marx" },
  { n: "Monstera delicioca variegata", s: "monstera-delicioca-variegata" },
  { n: "Monstera deliciosa", s: "monstera-deliciosa" },
  { n: "Monstera deliciosa", s: "monstera-deliciosa-2" },
  { n: "Monstera thai constellation", s: "monstera-thai-constellation" },
  { n: "Murier platane rouge et blanc", s: "murier-platane-rouge-et-blanc" },
  { n: "Orchidée chauve souris", s: "orchidee-chauve-souris" },
  { n: "Orchidée dendrobium", s: "orchidee-dendrobium" },
  { n: "Orchidée dendrobium", s: "orchidee-dendrobium-2" },
  { n: "Orchidée phalaenopsis", s: "orchidee-phalaenopsis" },
  { n: "Papayer", s: "papayer" },
  { n: "Peperomia lemon lime", s: "peperomia-lemon-lime" },
  { n: "Peperomia raindrop", s: "peperomia-raindrop" },
  { n: "Phalaenopsis", s: "phalaenopsis" },
  { n: "Phalaenopsis", s: "phalaenopsis-2" },
  { n: "Phalaenopsis", s: "phalaenopsis-3" },
  { n: "Philodendron erubescens", s: "philodendron-erubescens" },
  { n: "Philodendron pink princess", s: "philodendron-pink-princess" },
  { n: "Philodendron xanadu", s: "philodendron-xanadu" },
  { n: "Pink princess", s: "pink-princess" },
  { n: "Spathiphyllium", s: "spathiphyllium" },
  { n: "Tradescantia zebrina", s: "tradescantia-zebrina" },
];
/* Avis publiés sur la fiche Google Maps d'Exoticas, repris tels quels
   (l'avis de Hadyr K est traduit de l'anglais). Mettre à jour « quand » de temps en temps. */
const AVIS = [
  {
    nom: "Claudia Jordá",
    etoiles: 5,
    lang: "fr",
    quand: "il y a 10 mois",
    texte:
      "Excellente boutique de plantes, sans aucun doute le meilleur endroit au Bénin pour trouver des espèces exotiques. Ils ont également un coin café parfait pour se détendre et profiter de l’ambiance : un petit paradis caché. Le manager est très sympathique et toujours attentif, ce qui rend la visite encore plus agréable. Je recommande vivement !",
    notes: "Cuisine 5/5 · Service 5/5 · Ambiance 5/5",
  },
  {
    nom: "Hamza Lechhb",
    etoiles: 5,
    lang: "fr",
    quand: "il y a 6 mois",
    texte:
      "Endroit super agréable avec beaucoup de plantes, ambiance relaxante et un iced latte parfait pour se poser.",
    notes: "Cuisine 5/5 · Service 5/5 · Ambiance 5/5",
  },
  {
    nom: "Hadyr K",
    etoiles: 4,
    lang: "fr",
    quand: "il y a 5 mois",
    texte:
      "Les plats étaient bons, surtout la salade. Seul bémol : ça a pris beaucoup de temps, je m’attendais à plus de rapidité pour un coffee restaurant. L’intérieur est magnifique avec beaucoup de verdure ; de meilleures chaises et tables seraient un plus, car ce n’est pas très confortable pour travailler longtemps sur ordinateur. (Traduit de l’anglais)",
    notes: "Cuisine 4/5 · Service 4/5 · Ambiance 3/5",
  },
];


/* Fiches de la galerie : descriptions générales de chaque plante (rien sur
   les prix ni les stocks : on les confirme par WhatsApp). */
const CAT = {
  interieur: { t: "Plante d'intérieur", l: "Lumière vive, sans soleil direct", a: "Substrat légèrement humide", lc: "Lumière vive", ac: "Arrosage modéré", f: "interieur" },
  rare: { t: "Plante rare", l: "Lumière vive, sans soleil direct", a: "Laisser sécher le dessus du terreau", lc: "Lumière vive", ac: "Arrosage prudent", f: "rare" },
  orchidee: { t: "Orchidée", l: "Lumière vive, sans soleil direct", a: "Peu d'eau, bien drainée", lc: "Lumière vive", ac: "Peu d'eau", f: "orchidee" },
  bonsai: { t: "Bonsaï", l: "Lumière vive, un peu de soleil", a: "Arroser dès que le terreau sèche", lc: "Lumière vive", ac: "Arrosage régulier", f: "bonsai" },
  arbre: { t: "Arbre tropical", l: "Plein soleil", a: "Arrosage régulier", lc: "Plein soleil", ac: "Arrosage régulier", f: "arbre" },
  retombante: { t: "Plante retombante", l: "Lumière vive à mi-ombre", a: "Arrosage modéré", lc: "Lumière vive", ac: "Arrosage modéré", f: "interieur" },
} as const;

/* Filtres de la galerie */
const FILTRES = [
  { k: "toutes", n: "Toutes" },
  { k: "interieur", n: "D'intérieur" },
  { k: "rare", n: "Rares" },
  { k: "orchidee", n: "Orchidées" },
  { k: "bonsai", n: "Bonsaïs" },
  { k: "arbre", n: "Arbres" },
] as const;

const INFOS: Record<string, [keyof typeof CAT, string]> = {
  "alocasia-sanderiana-nain-ou-oreille-d-ane": ["rare", "Feuilles en fer de lance vert sombre, aux nervures blanches très contrastées. Elle aime l'humidité ambiante."],
  "anthurium-hookeri-black": ["rare", "Variété d'anthurium hookeri : une rosette dense de grandes feuilles brillantes, au port spectaculaire."],
  "anthurium-hookerie-aurea": ["rare", "Variété d'anthurium hookeri à rosette de grandes feuilles lancéolées, très décorative en intérieur lumineux."],
  "anthurium": ["interieur", "Feuillage lustré et fleurs colorées qui durent des semaines : l'une des plantes d'intérieur les plus élégantes."],
  "anthurium-2": ["interieur", "Feuillage lustré et fleurs colorées qui durent des semaines : l'une des plantes d'intérieur les plus élégantes."],
  "asparagus": ["retombante", "Un feuillage fin et plumeux, aérien, qui s'étale ou retombe en cascade. Facile à vivre en pot suspendu."],
  "begonia-masoniana-ou-begonia-croix-de-fer": ["rare", "Feuilles bosselées vert vif marquées d'une croix brun-pourpre en leur centre, d'où son nom de bégonia croix de fer."],
  "bonsai-araucaria-cunninghamii": ["bonsai", "Un araucaria cunninghamii (pin de Moreton Bay) conduit en bonsaï : silhouette de conifère en miniature."],
  "bonsai": ["bonsai", "Un arbre miniature taillé et formé avec patience : une pièce de caractère pour un bureau ou une terrasse."],
  "bonsai-2": ["bonsai", "Un arbre miniature taillé et formé avec patience : une pièce de caractère pour un bureau ou une terrasse."],
  "bonsai-3": ["bonsai", "Un arbre miniature taillé et formé avec patience : une pièce de caractère pour un bureau ou une terrasse."],
  "bonsai-4": ["bonsai", "Un arbre miniature taillé et formé avec patience : une pièce de caractère pour un bureau ou une terrasse."],
  "cocotier": ["arbre", "Le palmier emblématique des côtes tropicales, ici en jeune plant : feuilles arquées et silhouette élancée."],
  "colocasia-cintho-aloha": ["rare", "Un colocasia aux grandes feuilles en forme de cœur, qui donne un effet jungle immédiat. Il apprécie un sol frais."],
  "dendrobium": ["orchidee", "Une orchidée à cannes qui fleurit en grappes. Résistante et généreuse, elle convient bien au climat chaud."],
  "epipremnum": ["retombante", "Le pothos : une liane robuste aux feuilles en cœur, parfaite pour débuter. Elle pousse en retombant ou en grimpant."],
  "epipremnum-2": ["retombante", "Le pothos : une liane robuste aux feuilles en cœur, parfaite pour débuter. Elle pousse en retombant ou en grimpant."],
  "epiprenum-variegata": ["retombante", "Un pothos panaché : des feuilles marbrées de crème ou de jaune, qui éclairent un coin sombre."],
  "frangipanier": ["arbre", "L'arbuste aux fleurs parfumées des tropiques, utilisé en bouquets et en jardins. Il aime le plein soleil."],
  "goyavier-blanc": ["arbre", "Un goyavier : arbre fruitier tropical, au feuillage dense et aux fruits parfumés."],
  "goyavier": ["arbre", "Un goyavier : arbre fruitier tropical, au feuillage dense et aux fruits parfumés."],
  "grenadier": ["arbre", "Un arbuste fruitier aux fleurs orangées qui donne des grenades. Idéal en grand pot ou au jardin."],
  "hosta-africain": ["interieur", "Un feuillage décoratif qui se plaît à la mi-ombre : une valeur sûre pour garnir un coin de terrasse."],
  "lys-du-bengale-variegata": ["interieur", "Un feuillage panaché élégant, qui apporte de la lumière dans un massif ou un grand pot."],
  "monstera-adansonii": ["interieur", "Le monstera aux feuilles percées de trous, qui grimpe ou retombe. Très graphique sur une étagère."],
  "monstera-albo": ["rare", "Une variété panachée de blanc, très recherchée par les collectionneurs. Chaque feuille est unique."],
  "monstera-burle-marx": ["rare", "Un feuillage découpé, graphique et compact, très prisé des amateurs de plantes tropicales."],
  "monstera-delicioca-variegata": ["rare", "Le monstera deliciosa en version panachée : de grandes feuilles découpées marbrées de crème."],
  "monstera-deliciosa": ["interieur", "La grande classique : d'immenses feuilles découpées et perforées, qui donnent un style tropical à toute pièce."],
  "monstera-deliciosa-2": ["interieur", "La grande classique : d'immenses feuilles découpées et perforées, qui donnent un style tropical à toute pièce."],
  "monstera-thai-constellation": ["rare", "Une variété panachée aux feuilles étoilées de crème, comme un ciel de constellations. Rare et très décorative."],
  "murier-platane-rouge-et-blanc": ["arbre", "Un mûrier à grandes feuilles, aussi beau qu'utile : il donne des mûres sucrées."],
  "orchidee-chauve-souris": ["rare", "Une plante surprenante aux fleurs sombres à longs filaments, qui évoquent des ailes de chauve-souris."],
  "orchidee-dendrobium": ["orchidee", "Une orchidée à cannes qui fleurit en grappes. Résistante et généreuse, elle convient bien au climat chaud."],
  "orchidee-dendrobium-2": ["orchidee", "Une orchidée à cannes qui fleurit en grappes. Résistante et généreuse, elle convient bien au climat chaud."],
  "orchidee-phalaenopsis": ["orchidee", "L'orchidée papillon : des fleurs élégantes qui durent plusieurs semaines. La plus simple pour débuter."],
  "papayer": ["arbre", "Un papayer, à croissance rapide : un arbre fruitier tropical au feuillage découpé très décoratif."],
  "peperomia-lemon-lime": ["interieur", "Un petit péperomia au feuillage vert tendre et citron, compact et facile. Il éclaire n'importe quelle étagère."],
  "peperomia-raindrop": ["interieur", "Des feuilles rondes et charnues, en forme de gouttes de pluie. Compact, facile et très mignon sur un bureau."],
  "phalaenopsis": ["orchidee", "L'orchidée papillon : des fleurs élégantes qui durent plusieurs semaines. La plus simple pour débuter."],
  "phalaenopsis-2": ["orchidee", "L'orchidée papillon : des fleurs élégantes qui durent plusieurs semaines. La plus simple pour débuter."],
  "phalaenopsis-3": ["orchidee", "L'orchidée papillon : des fleurs élégantes qui durent plusieurs semaines. La plus simple pour débuter."],
  "philodendron-erubescens": ["rare", "Un philodendron aux tiges et feuilles teintées de rouge-bordeaux, au port grimpant et élégant."],
  "philodendron-pink-princess": ["rare", "Un philodendron aux feuilles sombres éclaboussées de rose. L'une des plantes les plus prisées du moment."],
  "philodendron-xanadu": ["interieur", "Un philodendron touffu aux feuilles lobées, au port compact. Très généreux en volume, facile à vivre."],
  "pink-princess": ["rare", "Un philodendron aux feuilles sombres éclaboussées de rose. L'une des plantes les plus prisées du moment."],
  "spathiphyllium": ["interieur", "Le « lys de la paix » : feuillage vert profond et fleurs blanches, qui supporte les pièces peu éclairées."],
  "tradescantia-zebrina": ["retombante", "Des feuilles rayées d'argent et de violet, qui retombent en cascade. Se bouture très facilement."],
};

/* Photos du lieu (fiche Google Maps) : boutique, salle, coin café. */
const LIEU = {
  arbre: { src: "/lieu/boutique-arbre.webp", w: 382, h: 510, alt: "Salle d'Exoticas : grand arbre, étagères de plantes et fauteuil, à Cotonou" },
  tasses: { src: "/lieu/salle-tasses.webp", w: 382, h: 510, alt: "Table avec deux cafés au milieu des plantes chez Exoticas, Cotonou" },
  etageres: { src: "/lieu/boutique-etageres.webp", w: 382, h: 510, alt: "Étagères de plantes en pots et tables du coin café d'Exoticas" },
  brunch: { src: "/lieu/cafe-brunch.webp", w: 382, h: 510, alt: "Brunch chez Exoticas : gaufres au chocolat, croissant, omelette, jus et café" },
  crepes: { src: "/lieu/cafe-crepes-sandwich.webp", w: 287, h: 510, alt: "Crêpes, sandwich grillé et jus frais au café d'Exoticas" },
  jus: { src: "/lieu/cafe-jus.webp", w: 287, h: 510, alt: "Jus frais devant les étagères de plantes du café Exoticas" },
};

/* Carte du café : aperçu des plats vus sur place et cités dans les avis (sans prix) */
const CARTE = [
  { t: "Brunch et salé", items: ["Brunch", "Omelette", "Sandwichs grillés", "Salades"] },
  { t: "Sucré", items: ["Gaufres", "Crêpes", "Croissant"] },
  { t: "Boissons", items: ["Jus frais", "Iced latte", "Café"] },
];

/* Réalisations d'aménagement paysager (avant / après). Vide pour l'instant :
   déposer les photos dans public/realisations/ puis ajouter ici
   { avant: "/realisations/x-avant.jpg", apres: "/realisations/x-apres.jpg", alt: "…" }.
   Le comparateur s'affiche dès qu'il y a au moins une entrée. */
const REALISATIONS: { avant: string; apres: string; alt: string }[] = [];

/* Vidéos du site. Vide pour l'instant : la section « Le lieu en vidéo » (et son
   lien dans le menu) n'apparaît que lorsqu'il y a au moins une entrée.
   • Fichier du site : déposer le .mp4 dans public/videos/ (court, ≤ 720 p, idéalement
     < 6 Mo) et une image d'aperçu .jpg, puis ajouter
     { src: "/videos/cafe.mp4", poster: "/videos/cafe.jpg", titre: "Le café d'Exoticas" }.
   • YouTube (vidéos longues ou lourdes) : { youtube: "ID_DE_LA_VIDEO", titre: "…" }.
     Le lecteur YouTube ne se charge qu'au clic (pas de suivi avant). */
type Video = { titre: string; src?: string; poster?: string; youtube?: string };
const VIDEOS: Video[] = [];

/* Nom unique d'une photo de la galerie : « Anthurium (photo 2) » quand le même
   nom existe plusieurs fois, pour que les liens et les textes alternatifs
   ne soient jamais identiques. */
function nomUnique(i: number) {
  const n = PLANTES[i].n;
  const total = PLANTES.filter((x) => x.n.toLowerCase() === n.toLowerCase()).length;
  if (total < 2) return n;
  const rang = PLANTES.slice(0, i + 1).filter((x) => x.n.toLowerCase() === n.toLowerCase()).length;
  return `${n} (photo ${rang})`;
}

function waLink(message: string) {
  return `https://wa.me/${BRAND.wa}?text=${encodeURIComponent(message)}`;
}

/* ------------------------------------------------------------------
   Logo : le symbole recadré depuis le fichier fourni
   « Exoticas logo H1.png » (279 × 289 px, vert #237F3C), décliné en blanc
   pour les fonds verts. Aucune retouche de tracé : recadrage seul.
------------------------------------------------------------------ */

function Logo({ size = 34 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mark"
      src="/logo/marque-blanche.png"
      alt=""
      width={size}
      height={Math.round((size * 289) / 279)}
      aria-hidden="true"
      decoding="async"
    />
  );
}

function Wordmark({ light = true }: { light?: boolean }) {
  return (
    <span className="wordmark" style={{ color: light ? "#fff" : "#1E2B28" }}>
      <Logo size={30} />
      <span className="wordmark-text">
        <span className="wordmark-nom">{BRAND.nom}</span>
        <span className="wordmark-sig">{BRAND.signature}</span>
      </span>
    </span>
  );
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 13.9c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1a11 11 0 0 1-5.9-5.1c-.5-.9-.6-1.7-.4-2.2.2-.6.6-1 .9-1.2.3-.2.6-.2.8-.2h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.6l-.4.5c-.2.2-.2.3-.1.5.3.6 1.5 1.9 2.7 2.4.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.8.9c.3.2.3.3.3.5v.6Z" />
    </svg>
  );
}

function PhoneIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17.2 17.2 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.1 2.3Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

/* Feuille décorative : très discrète, ondule lentement et suit un peu le défilement */
function Feuille({ className = "" }: { className?: string }) {
  return (
    <svg className={`feuille ${className}`} viewBox="0 0 120 160" aria-hidden="true" focusable="false">
      <path d="M60 4C102 40 114 94 60 156 6 94 18 40 60 4Z" fill="currentColor" />
      <path d="M60 28V150M60 70 34 52M60 96 30 76M60 70l26-18M60 96l30-20" stroke="rgba(255,255,255,.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Comparateur avant / après au curseur (clavier compris) */
function AvantApres({ avant, apres, alt }: { avant: string; apres: string; alt: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="aa" style={{ "--p": `${pos}%` } as React.CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="aa-apres" src={apres} alt={`${alt} — après`} loading="lazy" decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="aa-avant" src={avant} alt={`${alt} — avant`} loading="lazy" decoding="async" />
      <span className="aa-tag aa-tag-a">Avant</span>
      <span className="aa-tag aa-tag-b">Après</span>
      <span className="aa-poignee" aria-hidden="true" />
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(+e.target.value)}
        aria-label="Comparer l'avant et l'après"
      />
    </div>
  );
}

/* Lecteur vidéo léger : rien ne se télécharge avant d'être proche de l'écran ;
   un fichier local joue en boucle, muet, uniquement quand on le voit ; un clic
   donne le son et les commandes. Mouvement réduit : pas de lecture automatique. */
function LecteurVideo({ v }: { v: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [actif, setActif] = useState(false); // YouTube chargé / commandes affichées
  const [lecture, setLecture] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !v.src) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.preload = "auto";
          el.play().then(() => setLecture(true)).catch(() => {});
        } else {
          el.pause();
          setLecture(false);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [v.src]);

  if (v.youtube) {
    return (
      <div className="video">
        {actif ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&rel=0`}
            title={v.titre}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video-facade" onClick={() => setActif(true)} aria-label={`Lire la vidéo : ${v.titre}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="video-play" aria-hidden="true">▶</span>
          </button>
        )}
        <span className="video-titre">{v.titre}</span>
      </div>
    );
  }
  return (
    <div className="video">
      <video
        ref={ref}
        src={v.src}
        poster={v.poster}
        muted={!actif}
        controls={actif}
        loop
        playsInline
        preload="none"
        aria-label={v.titre}
        onClick={() => {
          if (!actif) {
            setActif(true);
            if (ref.current) ref.current.muted = false;
          }
        }}
      />
      {!actif && !lecture && <span className="video-play" aria-hidden="true">▶</span>}
      <span className="video-titre">{v.titre}</span>
    </div>
  );
}

function PinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.6" fill="currentColor" />
    </svg>
  );
}

/* tuile OSM contenant un point (projection web mercator) */
function tuileDe(lat: number, lng: number, z: number) {
  const n = 2 ** z;
  const x = ((lng + 180) / 360) * n;
  const s = Math.sin((lat * Math.PI) / 180);
  const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n;
  return { x, y };
}

/* Carte composée de 9 tuiles OSM : pas de WebGL, pas de cookie, cliquable vers Google Maps */
function Plan({ lat, lng }: { lat: number; lng: number }) {
  const { x, y } = tuileDe(lat, lng, ZOOM);
  const x0 = Math.floor(x) - 1;
  const y0 = Math.floor(y) - 1;
  const u = (x - x0) / 3;
  const v = (y - y0) / 3;
  const tuiles = [];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      tuiles.push(
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${i}-${j}`}
          src={`https://tile.openstreetmap.org/${ZOOM}/${x0 + i}/${y0 + j}.png`}
          width={256}
          height={256}
          alt=""
        />
      );
    }
  }
  return (
    <a
      className="map"
      href={itinLink()}
      target="_blank"
      rel="noopener"
      aria-label="Ouvrir l'accès à Exoticas dans Google Maps"
    >
      <span
        className="map-layer"
        style={
          {
            left: `${(0.5 - 1.5 * u) * 100}%`,
            top: `${(0.5 - 1.5 * v) * 100}%`,
            transformOrigin: `${u * 100}% ${v * 100}%`,
          } as React.CSSProperties
        }
      >
        {tuiles}
      </span>
      <span className="map-pin">
        <PinIcon size={28} />
      </span>
      <span className="map-cta">Ouvrir dans Google Maps</span>
      <span className="map-cred">© OpenStreetMap</span>
    </a>
  );
}

/* ------------------------------------------------------------------
   Page
------------------------------------------------------------------ */

type Geo = {
  etat: "repos" | "demande" | "ok" | "refus" | "absent";
  lat?: number;
  lng?: number;
  km?: number;
};

export default function Home() {
  const [form, setForm] = useState({ nom: "", contact: "", objet: "Aménagement paysager (devis)", message: "" });
  const [envoye, setEnvoye] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [geo, setGeo] = useState<Geo>({ etat: "repos" });
  const [fiche, setFiche] = useState<number | null>(null);
  const [filtre, setFiltre] = useState<string>("toutes");
  /* galerie : deux rangées d'abord, puis « Voir plus » en ajoute deux à chaque clic */
  const [cols, setCols] = useState(4);
  const [paliers, setPaliers] = useState(1);
  /* indices (dans PLANTES) des plantes du filtre ; « affichees » = celles montrées */
  const visibles = PLANTES.map((p, i) => i).filter(
    (i) => filtre === "toutes" || CAT[(INFOS[PLANTES[i].s] ?? ["interieur"])[0]].f === filtre
  );
  const affiche = cols * 2 * paliers;
  const affichees = visibles.slice(0, affiche);

  /* menu mobile : Échap pour fermer, page figée derrière */
  useEffect(() => {
    if (!menu) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", touche);
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", touche);
      document.body.style.overflow = avant;
    };
  }, [menu]);

  /* nombre de colonnes de la galerie, aux mêmes seuils que le CSS */
  useEffect(() => {
    const calc = () => setCols(window.innerWidth > 900 ? 4 : window.innerWidth > 620 ? 3 : 2);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* fiche plante : Échap, flèches, et page figée derrière */
  useEffect(() => {
    if (fiche === null) return;
    const liste = PLANTES.map((p, i) => i).filter(
      (i) => filtre === "toutes" || CAT[(INFOS[PLANTES[i].s] ?? ["interieur"])[0]].f === filtre
    );
    const n = liste.length;
    const pas = (i: number | null, d: number) => {
      if (i === null || n === 0) return i;
      const pos = Math.max(0, liste.indexOf(i));
      return liste[(pos + d + n) % n];
    };
    function touche(e: KeyboardEvent) {
      if (e.key === "Escape") setFiche(null);
      else if (e.key === "ArrowRight") setFiche((i) => pas(i, 1));
      else if (e.key === "ArrowLeft") setFiche((i) => pas(i, -1));
    }
    window.addEventListener("keydown", touche);
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", touche);
      document.body.style.overflow = avant;
    };
  }, [fiche, filtre]);

  /* Bienvenue dactylographiée, à la première visite seulement : un rideau de la
     couleur du hero porte le texte qui se tape caractère par caractère, puis se
     lève et les entrées du hero jouent (elles sont en pause tant qu'il est up).
     Le passage est marqué dans localStorage ; prefers-reduced-motion coupe tout,
     et un localStorage inaccessible (navigation privée) n'empêche pas l'affichage.
     Volontairement sans cleanup : en dev, StrictMode montez/démontez reminderait
     l'effet après que la trace a été posée, et le rideau resterait baissé sans
     que rien ne se tape. Le garde en ref ne lance la séquence qu'une fois, et les
     trois temporaires se terminent d'eux-mêmes en moins de 3 s. */
  const [bienvenue, setBienvenue] = useState<"off" | "frappe" | "leve">("off");
  const [frappe, setFrappe] = useState("");
  const lancee = useRef(false);

  useEffect(() => {
    if (lancee.current) return;
    let dejaVue = false;
    try {
      dejaVue = localStorage.getItem("exo-bienvenue") === "1";
    } catch {
      dejaVue = false;
    }
    if (dejaVue || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    lancee.current = true;
    try {
      localStorage.setItem("exo-bienvenue", "1");
    } catch {
      /* pas de trace : la bienvenue se rejouera, ce n'est pas grave */
    }
    const chars = [..."Bienvenue à Exoticas"];
    const PAS = 62; // ms entre deux caractères
    const FIN = chars.length * PAS + 900; // + une pose avant que le rideau se lève
    setBienvenue("frappe");
    let i = 0;
    const typer = window.setInterval(() => {
      i += 1;
      setFrappe(chars.slice(0, i).join(""));
      if (i >= chars.length) window.clearInterval(typer);
    }, PAS);
    window.setTimeout(() => setBienvenue("leve"), FIN);
    window.setTimeout(() => setBienvenue("off"), FIN + 800);
  }, []);

  function localiser() {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setGeo({ etat: "absent" });
      return;
    }
    setGeo({ etat: "demande" });
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const { latitude: lat, longitude: lng } = p.coords;
        setGeo({ etat: "ok", lat, lng, km: distanceKm({ lat, lng }, MAP) });
      },
      () => setGeo({ etat: "refus" }),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  }

  /* révélation au scroll : chaque élément apparaît quand il entre à l'écran.
     Sans IntersectionObserver (très vieux navigateur), tout est montré d'emblée,
     pour que le contenu ne reste jamais caché. */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const cibles = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    /* « in » lance l'apparition ; « done » (une fois finie) rend aux cartes leurs
       transitions de survol, sans le délai d'échelonnage. */
    const montrer = (el: Element) => {
      if (el.classList.contains("in")) return;
      el.classList.add("in");
      const d = parseInt((el as HTMLElement).style.getPropertyValue("--d")) || 0;
      window.setTimeout(() => el.classList.add("done"), d + 1500);
    };

    // déjà visible au chargement -> on révèle tout de suite
    const dansVue = () => {
      cibles.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) montrer(el);
      });
    };
    dansVue();

    let io: IntersectionObserver | null = null;
    if (!("IntersectionObserver" in window)) {
      cibles.forEach(montrer);
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              montrer(e.target);
              io?.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
      );
      cibles.forEach((el) => io?.observe(el));
    }

    return () => io?.disconnect();
  }, [affiche, filtre]);

  /* en-tête compact + parallaxe du hero */
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 1400) document.documentElement.style.setProperty("--sy", String(y));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg =
      `Bonjour Exoticas,\n\n` +
      `Objet : ${form.objet}\n` +
      `Je m'appelle ${form.nom || "—"}. ${form.message}\n\n` +
      `Me joindre : ${form.contact || "—"}`;
    window.open(waLink(msg), "_blank", "noopener");
    setEnvoye(true);
  }

  return (
    <>
      <style>{css}</style>

      <header className={`site-head${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap head-in">
          <a href="#top" className="head-logo" aria-label="Exoticas, accueil">
            <Logo size={28} />
            <span className="head-nom">exoticas</span>
          </a>
          <nav className="head-nav" aria-label="Navigation principale">
            <a href="#lieu">Le lieu</a>
            {VIDEOS.length > 0 && <a href="#videos">Vidéos</a>}
            <a href="#cafe">Café</a>
            <a href="#coworking">Coworking</a>
            <a href="#paysagisme">Paysagisme</a>
            <a href="#galerie">Plantes</a>
            <a href="#avis">Avis</a>
            <a href="#contact">Contact</a>
            <a className="btn btn-light btn-sm" href={BRAND.telHref} aria-label="Appeler Exoticas">
              <PhoneIcon size={16} /> <span className="btn-txt">Appeler</span>
            </a>
            <button
              type="button"
              className={`burger${menu ? " ouvert" : ""}`}
              aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menu}
              aria-controls="menu-mobile"
              onClick={() => setMenu((m) => !m)}
            >
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </header>

      <div id="menu-mobile" className={`menu-mobile${menu ? " ouvert" : ""}`} aria-hidden={!menu}>
        <nav aria-label="Menu mobile">
          {[
            ["#lieu", "Le lieu"],
            ["#cafe", "Café"],
            ["#coworking", "Coworking"],
            ["#paysagisme", "Paysagisme"],
            ["#galerie", "Plantes"],
            ["#avis", "Avis"],
            ["#contact", "Contact"],
          ].map(([h, n], i) => (
            <a key={h} href={h} tabIndex={menu ? 0 : -1} onClick={() => setMenu(false)} style={{ "--i": i } as React.CSSProperties}>
              {n}
            </a>
          ))}
        </nav>
        <div className="menu-cta">
          <a className="btn btn-moutarde" tabIndex={menu ? 0 : -1} href={waLink("Bonjour Exoticas,")} target="_blank" rel="noopener">
            <WhatsAppIcon size={18} /> Écrire sur WhatsApp
          </a>
          <a className="btn btn-ghost" tabIndex={menu ? 0 : -1} href={BRAND.telHref}>
            <PhoneIcon size={16} /> {BRAND.tel}
          </a>
        </div>
      </div>

      <main id="top">
        {/* HERO */}
        <section
          className={`hero${bienvenue !== "off" ? " is-welcome" : ""}`}
          style={{ "--hero-img": "url('/galerie/00-mosaic.jpg')" } as React.CSSProperties}
        >
          <div className="hero-bg" aria-hidden="true" />
          <Feuille className="feuille-h1" />
          <Feuille className="feuille-h2" />
          {bienvenue !== "off" && (
            <div
              className={`welcome${bienvenue === "leve" ? " welcome-up" : ""}`}
              aria-hidden="true"
            >
              <p className="welcome-texte">
                {frappe}
                <span className="welcome-caret" />
              </p>
            </div>
          )}
          <div className="wrap hero-in">
            <div className="hero-copy">
              <span className="rise" style={{ "--d": "60ms" } as React.CSSProperties}>
                <Wordmark />
              </span>
              <p className="eyebrow eyebrow-clair rise" style={{ "--d": "110ms" } as React.CSSProperties}>
                Tokpa-hoho · Cotonou
              </p>
              <h1 className="rise" style={{ "--d": "160ms" } as React.CSSProperties}>
                Aménagement paysager et plantes rares à Cotonou.
              </h1>
              <p className="rise" style={{ "--d": "260ms" } as React.CSSProperties}>
                Un lieu unique où la nature rencontre l'élégance : espaces verts
                sur mesure, terrasse café conviviale et coworking, à Tokpa-hoho.
              </p>
              <div className="hero-cta rise" style={{ "--d": "360ms" } as React.CSSProperties}>
                <a className="btn btn-moutarde btn-fl" href="#contact">
                  Demander un devis
                </a>
                <a className="btn btn-ghost btn-fl" href="#galerie">
                  Voir les plantes
                </a>
              </div>
              <p className="hero-adr rise" style={{ "--d": "460ms" } as React.CSSProperties}>
                {BRAND.adresseCourte}
              </p>
            </div>
            <div className="hero-photo rise" style={{ "--d": "320ms" } as React.CSSProperties}>
              <div className="collage">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="collage-a" src={LIEU.tasses.src} width={LIEU.tasses.w} height={LIEU.tasses.h} alt={LIEU.tasses.alt} fetchPriority="high" decoding="async" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="collage-b" src={LIEU.arbre.src} width={LIEU.arbre.w} height={LIEU.arbre.h} alt={LIEU.arbre.alt} decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* ACTIVITÉS */}
        <nav className="bande" aria-label="Nos activités">
          <div className="wrap bande-in">
            {[
              { h: "#paysagisme", n: "Espaces verts sur mesure" },
              { h: "#cafe", n: "Terrasse café conviviale" },
              { h: "#coworking", n: "Coworking" },
              { h: "#galerie", n: "Plantes rares et locales" },
            ].map((a, i) => (
              <a key={a.h} href={a.h} data-reveal className="rv-pop" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                {a.n}
              </a>
            ))}
          </div>
        </nav>

        {/* LE LIEU */}
        <section id="lieu" className="section">
          <div className="wrap lieu-in">
            <div data-reveal className="reveal rv-left">
              <p className="eyebrow">Le lieu</p>
              <h2>Un lieu unique où la nature rencontre l'élégance</h2>
              <p className="lede">
                Exoticas, votre partenaire nature et design : une boutique de
                plantes rares et locales, une terrasse café conviviale et un
                espace de coworking, dans un décor de murs vert profond, de bois
                brut et d'étagères de plantes.
              </p>
              <ul className="puces">
                {["Espaces verts sur mesure", "Terrasse café conviviale", "Coworking", "Plantes rares et locales"].map((t, i) => (
                  <li key={t} data-reveal className="rv-pop" style={{ "--d": `${200 + i * 90}ms` } as React.CSSProperties}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="lieu-photos">
              {[LIEU.arbre, LIEU.tasses, LIEU.etageres].map((im, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={im.src} data-reveal style={{ "--d": `${i * 140}ms` } as React.CSSProperties} className={`lieu-p lieu-p${i} rv-photo`} src={im.src} width={im.w} height={im.h} alt={im.alt} loading="lazy" decoding="async" />
              ))}
            </div>
          </div>
        </section>

        {/* VIDÉOS (affichée seulement s'il y en a) */}
        {VIDEOS.length > 0 && (
          <section id="videos" className="section">
            <div className="wrap">
              <p data-reveal className="eyebrow reveal">En mouvement</p>
              <h2 data-reveal className="reveal">Le lieu en vidéo</h2>
              <div className="videos">
                {VIDEOS.map((v, i) => (
                  <div key={v.src ?? v.youtube} data-reveal className="rv-photo" style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                    <LecteurVideo v={v} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* LE CAFÉ */}
        <section id="cafe" className="section cafe">
          <div className="wrap cafe-in">
            <div className="cafe-photos">
              {[LIEU.brunch, LIEU.crepes, LIEU.jus].map((im, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={im.src} data-reveal style={{ "--d": `${i * 140}ms` } as React.CSSProperties} className={`cafe-p cafe-p${i} rv-photo`} src={im.src} width={im.w} height={im.h} alt={im.alt} loading="lazy" decoding="async" />
              ))}
            </div>
            <div data-reveal className="rv-right" style={{ "--d": "120ms" } as React.CSSProperties}>
              <p className="eyebrow eyebrow-clair">Le café</p>
              <h2>Brunch, douceurs et boissons fraîches</h2>
              <p className="lede">
                Brunch, gaufres, crêpes, sandwichs grillés, jus frais et café :
                à savourer dans un décor de plantes et de bois brut.
              </p>
              <div className="carte" data-reveal style={{ "--d": "240ms" } as React.CSSProperties}>
                <h3>La carte</h3>
                {CARTE.map((g) => (
                  <div key={g.t} className="carte-groupe">
                    <h4>{g.t}</h4>
                    <ul>
                      {g.items.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="carte-note">Carte et prix sur place.</p>
              </div>
            </div>
          </div>
        </section>

        {/* COWORKING */}
        <section id="coworking" className="section cow">
          <div className="wrap lieu-in">
            <div data-reveal className="reveal rv-left">
              <p className="eyebrow">Coworking</p>
              <h2>Travaillez entouré de verdure</h2>
              <p className="lede">
                Exoticas met un espace de travail à disposition dans la
                boutique-jardin, avec le coin café à deux pas. Un cadre
                végétal et apaisant pour avancer sur vos dossiers, recevoir un
                client ou changer d'air.
              </p>
              <div className="cow-cards">
                {[
                  { t: "Cadre végétal", d: "Murs verts, bois brut et plantes" },
                  { t: "Café sur place", d: "Brunch, jus frais et café" },
                  { t: "Stationnement gratuit", d: "Parking devant la boutique" },
                  { t: "Facile à trouver", d: "À 1 min de l'échangeur Ganhi" },
                ].map((c, i) => (
                  <div key={c.t} className="cow-card rv-pop" data-reveal style={{ "--d": `${200 + i * 90}ms` } as React.CSSProperties}>
                    <strong>{c.t}</strong>
                    <span>{c.d}</span>
                  </div>
                ))}
              </div>
              <p className="cow-note">Tarifs, horaires et réservation d'un poste : demandez-nous.</p>
              <a
                className="btn btn-moutarde"
                href={waLink("Bonjour Exoticas, je voudrais des informations sur le coworking (tarifs, horaires).")}
                target="_blank"
                rel="noopener"
              >
                <WhatsAppIcon size={18} /> Se renseigner sur le coworking
              </a>
            </div>
            <div className="cow-photos">
              {[LIEU.etageres, LIEU.tasses].map((im, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={im.src} data-reveal style={{ "--d": `${i * 160}ms` } as React.CSSProperties} className={`cow-p cow-p${i} rv-photo`} src={im.src} width={im.w} height={im.h} alt={im.alt} loading="lazy" decoding="async" />
              ))}
            </div>
          </div>
        </section>

        {/* AMÉNAGEMENT PAYSAGER */}
        <section id="paysagisme" className="section pays">
          <Feuille className="feuille-p1" />
          <div className="wrap lieu-in">
            <div data-reveal className="reveal rv-left">
              <p className="eyebrow eyebrow-clair">Aménagement paysager</p>
              <h2>Un jardin sur mesure, sur devis</h2>
              <p className="lede">
                Terrasse, jardin, cour ou espace d'accueil : Exoticas conçoit
                et plante des espaces verts à Cotonou. Décrivez-nous votre
                projet, nous revenons vers vous avec un devis.
              </p>
              <ul className="puces">
                {["Terrasses et jardins", "Cours et intérieurs", "Commerces et bureaux"].map((t, i) => (
                  <li key={t} data-reveal className="rv-pop" style={{ "--d": `${200 + i * 90}ms` } as React.CSSProperties}>{t}</li>
                ))}
              </ul>
              <div className="pays-cta">
                <a
                  className="btn btn-moutarde"
                  href={waLink("Bonjour Exoticas, je souhaite un devis pour un aménagement paysager.")}
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsAppIcon size={18} /> Demander un devis
                </a>
                <a className="btn btn-ghost" href={BRAND.telHref}>
                  <PhoneIcon size={16} /> {BRAND.tel}
                </a>
              </div>
            </div>
            <div className="pays-visuel" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              {REALISATIONS.length > 0 ? (
                REALISATIONS.map((r) => <AvantApres key={r.avant} {...r} />)
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={LIEU.arbre.src} width={LIEU.arbre.w} height={LIEU.arbre.h} alt={LIEU.arbre.alt} loading="lazy" decoding="async" />
              )}
            </div>
          </div>
        </section>

        {/* GALERIE */}
        <section id="galerie" className="section">
          <div className="wrap">
            <p data-reveal className="eyebrow reveal">La boutique</p>
            <h2 data-reveal className="reveal">Galerie de plantes rares et d'intérieur</h2>
            <p data-reveal className="reveal lede" style={{ "--d": "90ms" } as React.CSSProperties}>
              {visibles.length} plantes de la boutique, photographiées ici. Touchez une
              carte pour voir sa fiche.
            </p>
            <div className="filtres" role="group" aria-label="Filtrer les plantes">
              {FILTRES.map((f) => (
                <button
                  key={f.k}
                  type="button"
                  className={`filtre${filtre === f.k ? " on" : ""}`}
                  aria-pressed={filtre === f.k}
                  onClick={() => {
                    setFiltre(f.k);
                    setPaliers(1);
                  }}
                >
                  {f.n}
                </button>
              ))}
            </div>
            <div className="grid">
              {affichees.map((i) => {
                const p = PLANTES[i];
                const [cat] = INFOS[p.s] ?? ["interieur"];
                return (
                  <a
                    className="card reveal"
                    data-reveal
                    style={{ "--d": `${(i % 4) * 70}ms` } as React.CSSProperties}
                    href={`/galerie/pleine/${p.s}.jpg`}
                    key={p.s}
                    aria-label={`Voir la fiche : ${nomUnique(i)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setFiche(i);
                    }}
                    aria-haspopup="dialog"
                  >
                    <span className="card-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/galerie/mini/${p.s}.jpg`}
                        alt={`${nomUnique(i)}, plante de la boutique Exoticas à Cotonou`}
                        title={nomUnique(i)}
                        width={480}
                        height={640}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="card-voir" aria-hidden="true">Voir la fiche</span>
                    </span>
                    <span className="card-cap">
                      <span className="card-tag">{CAT[cat].t}</span>
                      <span className="card-nom">{p.n}</span>
                      <span className="card-soins">
                        <span>{CAT[cat].lc}</span>
                        <span>{CAT[cat].ac}</span>
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
            {visibles.length > affiche && (
              <div className="centre voir-plus">
                <button type="button" className="btn btn-primary" onClick={() => setPaliers((n) => n + 1)}>
                  Voir plus de plantes
                  <span className="voir-plus-reste">{visibles.length - affiche} restantes</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* AVIS */}
        <section id="avis" className="section">
          <div className="wrap">
            <p data-reveal className="eyebrow reveal">Avis</p>
            <h2 data-reveal className="reveal">Avis clients</h2>
            <p data-reveal className="reveal lede" style={{ "--d": "90ms" } as React.CSSProperties}>
              Ce que disent nos clients sur Google.
            </p>
            <div className="avis-liste">
              {AVIS.map((a, i) => (
                <blockquote
                  data-reveal
                  className="reveal avis"
                  style={{ "--d": `${140 + i * 80}ms` } as React.CSSProperties}
                  key={a.nom}
                >
                  <p className="avis-etoiles" role="img" aria-label={`${a.etoiles} étoiles sur 5`}>
                    {"★".repeat(a.etoiles)}
                    <span>{"★".repeat(5 - a.etoiles)}</span>
                  </p>
                  <p lang={a.lang}>« {a.texte} »</p>
                  <footer>
                    <strong>{a.nom}</strong>, Local Guide Google · {a.quand}
                    <span className="avis-notes">{a.notes}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
            <p className="avis-hint">Faites glisser pour lire les autres avis</p>
            <div className="centre">
              <a className="btn btn-wa" href={BRAND.fiche} target="_blank" rel="noopener me">
                <PinIcon size={18} /> Voir tous les avis sur Google
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section section-alt">
          <div className="wrap contact-in">
            <div data-reveal className="reveal rv-left">
              <p className="eyebrow">Contact</p>
              <h2>Venez nous voir</h2>
              <p className="lede">
                Écrivez-nous sur WhatsApp : remplissez le formulaire, votre
                message s'ouvre prêt à envoyer, et on vous répond rapidement.
              </p>
              <form onSubmit={onSubmit} className="form">
                <label>
                  Nom
                  <input
                    required
                    value={form.nom}
                    onChange={set("nom")}
                    placeholder="Votre nom"
                    autoComplete="name"
                  />
                </label>
                <label>
                  Téléphone ou e-mail
                  <input
                    required
                    value={form.contact}
                    onChange={set("contact")}
                    placeholder="01 …  ou  vous@exemple.com"
                    autoComplete="tel"
                  />
                </label>
                <label>
                  Objet
                  <select
                    value={form.objet}
                    onChange={(e) => setForm((f) => ({ ...f, objet: e.target.value }))}
                  >
                    {["Aménagement paysager (devis)", "Coworking", "Café et brunch", "Plantes", "Autre"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Message
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Je souhaite aménager une terrasse de 40 m²…"
                  />
                </label>
                <p className="form-hint">
                  Ce formulaire ne s'envoie pas par e-mail : il ouvre WhatsApp
                  avec votre message déjà écrit. Il n'est envoyé qu'une fois
                  validé dans WhatsApp.
                </p>
                <button className="btn btn-moutarde" type="submit">
                  <WhatsAppIcon size={18} /> Continuer sur WhatsApp
                </button>
                <p className={`note${envoye ? " show" : ""}`} role="status">
                  WhatsApp s'est ouvert avec votre message : il ne reste qu'à l'envoyer. Vous pouvez aussi nous appeler au{" "}
                  <a href={BRAND.telHref}>{BRAND.tel}</a> ou écrire à{" "}
                  <a href={`mailto:${BRAND.mail}`}>{BRAND.mail}</a>.
                </p>
              </form>
            </div>

            <aside data-reveal className="reveal rv-right coords" style={{ "--d": "160ms" } as React.CSSProperties}>
              <Plan lat={MAP.lat} lng={MAP.lng} />

              <dl>
                <dt>Téléphone</dt>
                <dd>
                  <a href={BRAND.telHref}>{BRAND.tel}</a>
                </dd>
                <dt>Courriel</dt>
                <dd>
                  <a href={`mailto:${BRAND.mail}`}>{BRAND.mail}</a>
                </dd>
                <dt>Adresse</dt>
                <dd>{BRAND.adresseCourte}</dd>
                <dd className="muted">{BRAND.adresseLongue}</dd>
              </dl>

              <div className="geo">
                <button
                  type="button"
                  className="btn btn-geo"
                  onClick={localiser}
                  disabled={geo.etat === "demande"}
                >
                  <PinIcon size={17} />
                  {geo.etat === "demande" ? "Localisation en cours…" : "Itinéraire depuis ma position"}
                </button>
                <p className="geo-msg" role="status" key={geo.etat}>
                  {geo.etat === "ok" && (
                    <>
                      Exoticas est à environ{" "}
                      <strong>{geo.km! < 10 ? geo.km!.toFixed(1).replace(".", ",") : Math.round(geo.km!)} km</strong>{" "}
                      de toi (à vol d'oiseau).{" "}
                      <a href={itinLink({ lat: geo.lat!, lng: geo.lng! })} target="_blank" rel="noopener">
                        Ouvrir l'itinéraire
                      </a>
                    </>
                  )}
                  {geo.etat === "refus" && (
                    <>
                      Position indisponible — autorise l'accès, ou lance l'itinéraire et indique ton
                      départ.{" "}
                      <a href={itinLink()} target="_blank" rel="noopener">
                        Ouvrir Google Maps
                      </a>
                    </>
                  )}
                  {geo.etat === "demande" && (
                    <>Calcul de la distance depuis ta position…</>
                  )}
                  {geo.etat === "absent" && (
                    <>
                      Ce navigateur ne fournit pas de position.{" "}
                      <a href={itinLink()} target="_blank" rel="noopener">
                        Ouvrir Google Maps
                      </a>
                    </>
                  )}
                  {geo.etat === "repos" && (
                    <>
                      Le repère sur la carte est approximatif :{" "}
                      <a href={itinLink()} target="_blank" rel="noopener">
                        itinéraire vers Exoticas
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>

              <a className="btn btn-wa" href={waLink("Bonjour Exoticas, j'aimerais avoir des informations.")} target="_blank" rel="noopener">
                <WhatsAppIcon size={18} /> Écrire sur WhatsApp
              </a>
              <a className="btn btn-wa" href={BRAND.fiche} target="_blank" rel="noopener me" style={{ marginTop: 10 }}>
                <PinIcon size={18} /> Voir la fiche Google Maps
              </a>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-foot">
        <div className="wrap foot-in">
          <div data-reveal className="reveal">
            <Wordmark />
          </div>
          <div data-reveal className="reveal foot-col" style={{ "--d": "90ms" } as React.CSSProperties}>
            <p>
              <strong>Téléphone</strong>
              <a href={BRAND.telHref}>{BRAND.tel}</a>
            </p>
            <p>
              <strong>Courriel</strong>
              <a href={`mailto:${BRAND.mail}`}>{BRAND.mail}</a>
            </p>
            <p>
              <strong>Réseaux</strong>
              <span className="foot-pills">
                <a href={BRAND.instagram} target="_blank" rel="noopener me" className="foot-pill foot-pill-insta">
                  <InstagramIcon size={18} /> Instagram
                </a>
                <a href={BRAND.fiche} target="_blank" rel="noopener me" className="foot-pill">
                  <PinIcon size={18} /> Google Maps
                </a>
                <a href={waLink("Bonjour Exoticas,")} target="_blank" rel="noopener me" className="foot-pill">
                  <WhatsAppIcon size={18} /> WhatsApp
                </a>
              </span>
            </p>
          </div>
          <div data-reveal className="reveal foot-col" style={{ "--d": "180ms" } as React.CSSProperties}>
            <p>
              <strong>Adresse</strong>
              {BRAND.adresseCourte}
              <span className="muted">{BRAND.adresseLongue}</span>
            </p>
          </div>
        </div>
        <div className="wrap foot-bottom">
          <span>© {new Date().getFullYear()} Exoticas — votre partenaire nature &amp; design</span>
        </div>
      </footer>

      {fiche !== null && (() => {
        const p = PLANTES[fiche];
        const [cat, desc] = INFOS[p.s] ?? ["interieur", ""];
        const c = CAT[cat];
        const pos = Math.max(0, visibles.indexOf(fiche));
        const aller = (d: number) =>
          setFiche(visibles[(pos + d + visibles.length) % visibles.length]);
        return (
          <div
            className="fiche-fond"
            role="dialog"
            aria-modal="true"
            aria-label={`Fiche : ${nomUnique(fiche)}`}
            onClick={(e) => { if (e.target === e.currentTarget) setFiche(null); }}
          >
            <div className="fiche">
              <button className="fiche-x" onClick={() => setFiche(null)} aria-label="Fermer la fiche">×</button>
              <div className="fiche-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={p.s} src={`/galerie/pleine/${p.s}.jpg`} alt={`${nomUnique(fiche)}, plante de la boutique Exoticas à Cotonou`} />
                <button className="fiche-nav fiche-prec" onClick={() => aller(-1)} aria-label="Plante précédente">‹</button>
                <button className="fiche-nav fiche-suiv" onClick={() => aller(1)} aria-label="Plante suivante">›</button>
              </div>
              <div className="fiche-txt" key={`t-${p.s}`}>
                <span className="card-tag">{c.t}</span>
                <h3>{p.n}</h3>
                <p>{desc}</p>
                <ul className="fiche-soin">
                  <li><strong>Lumière</strong>{c.l}</li>
                  <li><strong>Arrosage</strong>{c.a}</li>
                </ul>
                <p className="fiche-note">Photographiée à la boutique. Prix et disponibilité : demandez-nous sur WhatsApp.</p>
                <a
                  className="btn btn-moutarde"
                  href={waLink(`Bonjour Exoticas, je suis intéressé(e) par : ${p.n}. Est-elle disponible ?`)}
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsAppIcon size={18} /> Demander cette plante
                </a>
                <span className="fiche-compte">{pos + 1} / {visibles.length}</span>
              </div>
            </div>
          </div>
        );
      })()}

      <a
        className="wa-fixed"
        href={waLink("Bonjour Exoticas,")}
        target="_blank"
        rel="noopener"
        aria-label="Écrire sur WhatsApp"
      >
        <WhatsAppIcon size={24} />
      </a>
    </>
  );
}

/* ------------------------------------------------------------------
   Styles + animations
------------------------------------------------------------------ */

const css = `
:root{
  /* palette : bleu-vert sombre (vert sapin des murs), avec les accents du lieu (bois brut, jaune moutarde, terre cuite) */
  --vert:#23403B;
  --vert-fonce:#1A322E;
  --vert-nuit:#122421;
  --vert-accent:#E1A32D;
  --moutarde:#E1A32D;
  --terre:#B25832;
  --bois:#8B5A34;
  --creme:#F6EFE2;
  --texte:#1E2B28;
  --muted:#6B726B;
  --line:#E3DACA;
  --serif:var(--font-serif),"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
  --sans:var(--font-sans),ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --r:8px;
  --ease:cubic-bezier(.22,.61,.36,1);
  --ease-out:cubic-bezier(.16,1,.3,1);
  /* étiquettes : meme écriture partout (champ, footer, carte) */
  --lbl:600 .74rem/1.2 ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --lbl-space:.16em;
  /* glace / cristal : seule la carte est translucide, jamais les photos.
     --flou ne sert que devant un fond réellement occupé (tuiles de la carte). */
  --glace:rgba(255,255,255,.62);
  --glace-forte:rgba(255,255,255,.78);
  /* liseré sombre : une glace ne se lit que si son bord est plus foncé que sa face */
  --glace-bord:1px solid rgba(20,35,12,.09);
  --glace-relu:inset 0 1px 0 rgba(255,255,255,.95),inset 0 0 0 1px rgba(255,255,255,.28);
  --glace-ombre:0 1px 2px rgba(20,35,12,.06),0 14px 34px rgba(20,35,12,.12);
  --glace-ombre-h:0 3px 7px rgba(20,35,12,.09),0 22px 48px rgba(20,35,12,.18);
  --flou:blur(14px) saturate(1.25);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;color:var(--texte);background:var(--creme);
  font:16.5px/1.62 var(--sans);
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}
h1,h2,h3{margin:0 0 .55rem;font-weight:550;text-wrap:balance}
h1,h2,.head-nom,.wordmark-nom,.welcome-texte{font-family:var(--serif);font-weight:500;font-variation-settings:"SOFT" 100}
h1{font-size:clamp(2.35rem,4.6vw,3.45rem);line-height:1.04;letter-spacing:-.035em}
h2{font-size:clamp(1.65rem,2.6vw,2.15rem);line-height:1.1;letter-spacing:-.03em}
h3{font-size:1.02rem;line-height:1.2;letter-spacing:-.015em}
p{margin:0 0 1rem;text-wrap:pretty}
a{color:inherit}
img{display:block;max-width:100%}
.wrap{max-width:1240px;margin:0 auto;padding:0 20px}
.wrap.head-in{max-width:1080px}
.muted{color:var(--muted)}
a[href^="tel"]{font-variant-numeric:tabular-nums}
/* Chaque section occupe au moins toute la hauteur de l'écran (svh : tient compte
   des barres d'adresse mobiles), en-tête fixe compris : le contenu est centré
   dans la zone visible sous l'en-tête. Une section plus longue que l'écran
   (galerie, contact) grandit simplement. */
main>section{min-height:100vh;min-height:100svh;display:flex;flex-direction:column;justify-content:center}
main>section.section{padding-top:calc(76px + clamp(20px,3.5vw,48px));padding-bottom:clamp(40px,6vw,80px)}
main{overflow-x:clip}
main>section>.wrap{width:100%}
section[id]{scroll-margin-top:0}


/* ---------- header ---------- */
.site-head{position:fixed;top:0;left:0;right:0;z-index:50;color:#fff;
  background:transparent;transition:background .45s var(--ease),box-shadow .45s var(--ease),padding .45s var(--ease);padding:6px 0}
.site-head::before{content:"";position:absolute;inset:0;background:var(--vert);
  opacity:0;transition:opacity .45s var(--ease);z-index:-1}
.site-head.is-scrolled::before{opacity:1}
.site-head.is-scrolled{box-shadow:0 6px 24px rgba(20,35,12,.18)}
.head-in{display:flex;align-items:center;justify-content:space-between;height:60px;
  transition:height .45s var(--ease)}
.site-head.is-scrolled .head-in{height:54px}
.head-logo{display:flex;align-items:center;gap:9px;color:#fff;text-decoration:none}
.head-nom{font-size:1.15rem;letter-spacing:.01em}
.mark{transition:transform .6s var(--ease-out)}
.head-logo:hover .mark{transform:rotate(-8deg) scale(1.06)}
.head-nav{display:flex;align-items:center;gap:22px;font-size:.95rem}
.head-nav a:not(.btn){text-decoration:none;color:#fff;position:relative}
.head-nav a:not(.btn)::after{content:"";position:absolute;left:0;bottom:-6px;height:1.5px;width:100%;
  background:currentColor;transform:scaleX(0);transform-origin:0 50%;transition:transform .35s var(--ease-out)}
.head-nav a:not(.btn):hover::after{transform:scaleX(1)}

/* ---------- boutons ---------- */
.btn{font-family:inherit;display:inline-flex;align-items:center;justify-content:center;gap:10px;
  border:1.5px solid transparent;border-radius:999px;padding:14px 26px;min-height:48px;text-decoration:none;
  font-size:.97rem;font-weight:700;letter-spacing:.01em;line-height:1.1;cursor:pointer;position:relative;overflow:hidden;
  transition:transform .3s var(--ease-out),box-shadow .3s var(--ease-out),background .3s var(--ease),color .3s var(--ease),border-color .3s var(--ease)}
.btn::after{content:"";position:absolute;inset:0;background:rgba(255,255,255,.2);
  transform:translateX(-101%);transition:transform .55s var(--ease-out)}
.btn:hover::after{transform:translateX(0)}
.btn:hover{transform:translateY(-2px)}
.btn:active{transform:translateY(0) scale(.98)}
.btn:focus-visible{outline:3px solid #F0C469;outline-offset:3px}
/* flèche qui glisse au survol */
.btn-fl::before{content:"→";order:2;display:inline-block;transition:transform .3s var(--ease-out)}
.btn-fl:hover::before{transform:translateX(5px)}
.btn-light{background:#fff;color:var(--vert);border-color:#fff;box-shadow:0 4px 14px rgba(20,35,12,.18)}
.btn-light:hover{background:var(--creme);box-shadow:0 10px 24px rgba(20,35,12,.22)}
.btn-primary{background:var(--vert);color:#fff;box-shadow:0 6px 16px rgba(35,64,59,.3)}
.btn-primary:hover{background:var(--vert-fonce);box-shadow:0 12px 26px rgba(35,64,59,.35)}
.btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.7)}
.btn-ghost:hover{background:#fff;color:var(--vert);border-color:#fff}
.btn-sm{padding:9px 18px;min-height:40px;font-size:.9rem}
.btn-wa{background:#fff;color:var(--vert);border-color:var(--line);box-shadow:0 4px 12px rgba(20,35,12,.08)}
.btn-wa:hover{background:var(--creme);border-color:var(--vert)}

/* ---------- hero ---------- */
.hero{position:relative;background:var(--vert);color:#fff;padding:150px 0 96px;overflow:hidden}
/* PC : le hero occupe la hauteur de la fenêtre, contenu centré dans la zone
   utile (le padding haut dégage toujours l'en-tête fixe). Mobile : même
   hauteur de fenêtre, mais contenu calé en bas sur sa bande, l'image restant
   visible au-dessus. La colonne unique en minmax(0,1fr) garde au .wrap ses
   1080 px : sans elle, ses marges auto le réduiraient à la largeur de son
   contenu (892 px au lieu de 1040). */
@media (min-width:821px){
  .hero{min-height:100vh;min-height:100svh;display:grid;
    grid-template-columns:minmax(0,1fr);align-content:center}
  /* dans une grille, les marges auto du .wrap le font rétrécir à son contenu
     (892 px au lieu de 1040) : width:100% lui rend sa largeur mesurée. */
  .hero .hero-in{width:100%}
  /* le cadre suit la hauteur de la fenêtre (340 px → la largeur de sa colonne,
     ~423 px) : sinon il flotte, minuscule, dans un hero de 900 px de haut.
     Sélecteur doublé pour passer devant la règle .frame placée plus bas. */
  .hero .frame{max-width:clamp(340px,46vh,440px)}
}
.hero-bg{position:absolute;inset:0;background-image:var(--hero-img);background-size:cover;background-position:50% 34%;
  opacity:0;transition:opacity .8s var(--ease)}
.hero-in{position:relative;z-index:1;display:grid;grid-template-columns:1.15fr .85fr;gap:44px;align-items:center}
.wordmark{display:inline-flex;align-items:center;gap:10px}
.wordmark-text{display:flex;flex-direction:column;line-height:1.1}
.wordmark-nom{font-size:1.5rem}
.wordmark-sig{font-size:.72rem;letter-spacing:.32em;text-transform:uppercase;opacity:.85}
.hero-copy h1{margin:24px 0 18px;max-width:15ch}
.hero-copy p{max-width:44ch;font-size:1.06rem;line-height:1.55;color:rgba(255,255,255,.92)}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.hero-adr{margin:24px 0 0;font-size:.95rem;color:rgba(255,255,255,.82)}
.hero-photo{display:flex;justify-content:flex-end}
.frame{position:relative;width:100%;max-width:340px;aspect-ratio:1/1;border-radius:14px;overflow:hidden;
  border:1px solid rgba(255,255,255,.28);box-shadow:0 24px 60px rgba(15,30,8,.35);
  background:var(--vert-fonce)}
.frame img{width:100%;height:100%;object-fit:cover;object-position:50% 38%}
.kenburns{animation:kb 22s ease-in-out infinite alternate}
@keyframes kb{from{transform:scale(1.02)}to{transform:scale(1.14) translate(-2%,-3%)}}

/* ---------- bienvenue dactylographiée (première visite) ----------
   Le rideau reprend le vert du hero — il ne voile pas la photo, il la remplace
   le temps de la frappe, puis glisse vers le haut (le hero est en overflow:hidden).
   min-height sur le texte : la ligne ne saute pas quand elle est encore vide. */
.hero.is-welcome .rise{animation-play-state:paused}
.welcome{position:absolute;inset:0;z-index:2;display:grid;place-items:center;padding:0 24px;
  background:var(--vert);color:#fff;text-align:center;
  transition:transform .8s var(--ease)}
.welcome-up{transform:translateY(-100%)}
.welcome-texte{margin:0;min-height:1.2em;font-size:clamp(1.4rem,4.6vw,2.15rem);
  line-height:1.15;letter-spacing:-.02em}
.welcome-caret{display:inline-block;width:2px;height:1.05em;margin-left:3px;
  vertical-align:-.12em;background:currentColor;animation:caret 1.05s steps(1,end) infinite}
@keyframes caret{50%{opacity:0}}

/* entrées échelonnées au chargement */
.rise{animation:rise .9s var(--ease-out) both;animation-delay:var(--d,0ms)}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}

/* ---------- révélation au scroll ---------- */
.js [data-reveal]{opacity:0;transform:translateY(28px);
  transition:opacity .8s var(--ease-out) var(--d,0ms),transform .9s var(--ease-out) var(--d,0ms),
    filter .8s var(--ease-out) var(--d,0ms)}
.js [data-reveal].in{opacity:1;transform:none;filter:none}
/* Règles du système (jamais au hasard) :
   1. Un mouvement de base : monter en fondu. Les titres s'y ajoutent un léger flou qui se précise.
   2. Un bloc de texte arrive du côté où il se trouve (colonne gauche : de la gauche, droite : de la droite).
   3. Les photos se dévoilent par le bas (rideau) et se posent en se dézoomant.
   4. Les pastilles et petites cartes « poppent » l'une après l'autre.
   5. Tout ce qui est en grille ou en liste est échelonné dans l'ordre de lecture. */
.js h2[data-reveal]{filter:blur(7px)}
.js .rv-left{transform:translateX(-64px)}
.js .rv-right{transform:translateX(64px)}
.js .rv-pop{transform:translateY(16px) scale(.9)}
/* le rideau laisse la moitié haute visible : un élément entièrement masqué
   ne serait jamais détecté comme « entré à l'écran » */
.js .rv-photo{opacity:0;transform:scale(1.07);clip-path:inset(0 0 50% 0);
  transition:clip-path 1.2s var(--ease-out) var(--d,0ms),transform 1.4s var(--ease-out) var(--d,0ms),opacity .9s var(--ease-out) var(--d,0ms)}
.js .rv-photo.in{transform:none;clip-path:inset(-40px)}
/* cartes de la galerie : la photo se pose quand la carte arrive */
.js .card:not(.in) .card-img img{transform:scale(1.14)}
/* repères du hero : le titre et le texte montent à l'arrivée */
.js [data-reveal].done{transition-delay:0ms;transition-duration:.4s}
.js .card.done{transition:transform .45s var(--ease-out),box-shadow .45s var(--ease-out),border-color .3s var(--ease)}
/* léger parallaxe sur le collage du hero */
.collage-a{transform:translateY(calc(var(--sy,0) * -.03px))}
.collage-b{transform:translateY(calc(var(--sy,0) * -.09px))}

/* ---------- sections ---------- */
.section{padding:clamp(64px,8vw,104px) 0}
.section-alt{background:var(--creme);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.avis-liste{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:26px 0}
.avis{margin:0;background:var(--glace);border:var(--glace-bord);border-radius:var(--r);
  padding:22px 24px;box-shadow:var(--glace-relu),var(--glace-ombre)}
.avis-etoiles{margin:0 0 10px!important;font-size:1.2rem!important;letter-spacing:2px;color:#E0A526;line-height:1!important}
.avis-etoiles span{color:var(--line)}
.avis p{margin:0 0 14px;font-size:1.05rem;line-height:1.6}
.avis footer{font-size:.9rem;color:var(--muted)}
.avis-notes{display:block;margin-top:4px}
.lede{color:var(--muted);font-size:1.04rem;line-height:1.6;max-width:52ch;margin:0 0 8px}

/* ---------- le lieu ---------- */
.lieu-in{display:grid;grid-template-columns:1fr 1.05fr;gap:clamp(32px,5vw,72px);align-items:center}
.puces{list-style:none;margin:22px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.puces li{padding:7px 15px;border-radius:99px;font-size:.92rem;background:#fff;border:1px solid var(--line)}
.lieu-photos{display:grid;grid-template-columns:1.1fr 1fr;grid-template-rows:minmax(0,1fr) minmax(0,1fr);gap:12px;height:clamp(380px,46vw,560px)}
.lieu-p{width:100%;height:100%;min-height:0;object-fit:cover;border-radius:var(--r);box-shadow:0 14px 34px rgba(20,35,12,.2)}
.lieu-p0{grid-row:1 / span 2;border-radius:120px 120px var(--r) var(--r)}
.lieu-p1{grid-column:2;grid-row:1}
.lieu-p2{grid-column:2;grid-row:2}

/* ---------- le café ---------- */
.cafe{background:var(--vert);color:#fff;position:relative}
.cafe h2{color:#fff}
.cafe .lede{color:rgba(255,255,255,.82)}
.cafe-in{display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(32px,5vw,72px);align-items:center}
.cafe-photos{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:minmax(0,1fr) minmax(0,1fr);gap:12px;height:clamp(380px,44vw,540px)}
.cafe-p{width:100%;object-fit:cover;border-radius:var(--r);box-shadow:0 14px 34px rgba(0,0,0,.35)}
.cafe-p{height:100%;min-height:0}
.cafe-p0{grid-row:1 / span 2}
.btn-moutarde{background:var(--terre);color:#fff;box-shadow:0 6px 18px rgba(178,88,50,.38)}
.btn-moutarde:hover{background:#9A4A27;box-shadow:0 12px 28px rgba(178,88,50,.42)}

/* collage du hero */
.collage{position:relative;width:min(100%,400px);aspect-ratio:1/1.12}
.collage img{position:absolute;object-fit:cover;border-radius:var(--r);
  border:3px solid rgba(255,255,255,.9);box-shadow:0 24px 60px rgba(8,20,18,.45)}
.collage-a{left:0;top:0;width:66%;height:84%;border-radius:140px 140px var(--r) var(--r)!important}
.collage-b{right:0;bottom:0;width:50%;height:58%}

/* ---------- galerie : planche-contact sur plaque de glace ----------
   La photo garde son ratio 3:4 (aucun recadrage) et ne recoit ni filtre ni nappe :
   c'est la plaque autour qui est translucide, éclairée par un liseré intérieur. */
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:30px}
.card{display:flex;flex-direction:column;text-decoration:none;color:inherit;overflow:hidden;
  background:#fff;border:1px solid var(--line);border-radius:14px;
  box-shadow:0 1px 2px rgba(20,35,12,.05),0 10px 26px rgba(20,35,12,.08);
  transition:transform .45s var(--ease-out),box-shadow .45s var(--ease-out),border-color .3s var(--ease)}
.card:hover{transform:translateY(-6px)!important;
  box-shadow:0 2px 4px rgba(20,35,12,.06),0 22px 44px rgba(20,35,12,.18)}
.card:focus-visible{outline:2px solid var(--moutarde);outline-offset:3px}
.card-img{position:relative;display:block;overflow:hidden;aspect-ratio:3/4;background:var(--creme)}
.card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s var(--ease-out)}
.card:hover .card-img img{transform:scale(1.07)}
.card-voir{position:absolute;left:50%;bottom:14px;z-index:1;transform:translate(-50%,12px);opacity:0;
  padding:7px 15px;border-radius:99px;background:var(--terre);color:#fff;
  font-size:.82rem;font-weight:600;white-space:nowrap;
  transition:opacity .35s var(--ease),transform .4s var(--ease-out)}
.card:hover .card-voir,.card:focus-visible .card-voir{opacity:1;transform:translate(-50%,0)}
.card-cap{display:grid;gap:3px;padding:12px 14px 15px}
.card-tag{font:600 .68rem/1.2 ui-sans-serif,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--terre)}
.card-nom{font:500 1.02rem/1.25 var(--serif);color:var(--texte)}

/* ---------- fiche plante (clic sur une carte) ---------- */
.fiche-fond{position:fixed;inset:0;z-index:80;display:grid;place-items:center;padding:20px;
  background:rgba(12,26,23,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
  animation:fadein .3s var(--ease-out) both}
.fiche{position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);width:min(980px,100%);
  max-height:min(640px,92vh);background:var(--creme);border-radius:18px;overflow:hidden;
  box-shadow:0 40px 90px rgba(0,0,0,.5);animation:ficheIn .5s var(--ease-out) both}
@keyframes ficheIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:none}}
.fiche-photo{position:relative;background:var(--vert-nuit);min-height:0}
.fiche-photo img{width:100%;height:100%;object-fit:cover;display:block;animation:fadein .5s var(--ease-out) both}
.fiche-txt{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:clamp(24px,4vw,44px);
  overflow-y:auto;animation:fadein .5s var(--ease-out) both}
.fiche-txt h3{margin:0;font:500 clamp(1.6rem,3vw,2.2rem)/1.1 var(--serif);letter-spacing:-.02em}
.fiche-txt p{margin:0;color:var(--muted);font-size:1.02rem}
.fiche-soin{list-style:none;margin:6px 0;padding:0;display:grid;gap:8px;width:100%}
.fiche-soin li{padding:10px 14px;border-radius:10px;background:#fff;border:1px solid var(--line);font-size:.95rem}
.fiche-soin strong{display:block;font:600 .68rem/1.2 ui-sans-serif,system-ui,sans-serif;letter-spacing:.14em;
  text-transform:uppercase;color:var(--terre);margin-bottom:2px}
.fiche-txt .fiche-note{font-size:.86rem}
.fiche-compte{margin-top:auto;font-size:.8rem;color:var(--muted)}
.fiche-x{position:absolute;top:12px;right:12px;z-index:3;width:40px;height:40px;border-radius:50%;border:0;
  background:rgba(255,255,255,.92);color:var(--vert-nuit);font-size:1.6rem;line-height:1;cursor:pointer;
  box-shadow:0 4px 14px rgba(0,0,0,.25);transition:transform .3s var(--ease-out)}
.fiche-x:hover{transform:rotate(90deg) scale(1.06)}
.fiche-nav{position:absolute;top:50%;z-index:2;width:42px;height:42px;margin-top:-21px;border-radius:50%;border:0;
  background:rgba(255,255,255,.9);color:var(--vert-nuit);font-size:1.7rem;line-height:1;cursor:pointer;
  box-shadow:0 4px 14px rgba(0,0,0,.25);transition:transform .3s var(--ease-out),background .3s var(--ease)}
.fiche-nav:hover{background:#fff;transform:scale(1.1)}
.fiche-prec{left:12px}.fiche-suiv{right:12px}
@media (max-width:760px){
  .fiche{grid-template-columns:1fr;grid-template-rows:minmax(0,42vh) auto;max-height:94vh;overflow-y:auto}
  .fiche-txt{overflow:visible}
}

/* ---------- contact ---------- */
.contact-in{display:grid;grid-template-columns:1.1fr .9fr;gap:52px;align-items:start}
.form{display:grid;gap:18px;width:100%;max-width:560px;margin:26px auto 0;
  padding:26px 26px 28px;background:var(--glace);border:var(--glace-bord);border-radius:var(--r);
  box-shadow:var(--glace-relu),var(--glace-ombre);
  backdrop-filter:var(--flou);-webkit-backdrop-filter:var(--flou)}
.form label{display:grid;gap:7px;font:var(--lbl);letter-spacing:var(--lbl-space);
  text-transform:uppercase;color:var(--muted)}
.form input,.form textarea{font-family:inherit;font-size:1rem;line-height:1.5;color:var(--texte);
  background:rgba(255,255,255,.72);border:var(--glace-bord);
  box-shadow:var(--glace-relu),inset 0 1px 2px rgba(20,35,12,.05);
  border-radius:var(--r);padding:11px 13px;width:100%;
  transition:border-color .3s var(--ease),box-shadow .3s var(--ease),transform .3s var(--ease-out),background .3s var(--ease)}
.form input:hover,.form textarea:hover{border-color:#D2C5AC;background:rgba(255,255,255,.85)}
.form input:focus,.form textarea:focus{outline:none;border-color:var(--vert);background:#fff;
  box-shadow:0 0 0 3px rgba(225,163,45,.32),inset 0 1px 2px rgba(20,35,12,.04)}
.form .btn{justify-self:start;margin-top:4px}
.note{font-size:.88rem;color:var(--muted);border-left:2px solid var(--vert-accent);padding-left:12px;margin:0;
  max-height:0;opacity:0;overflow:hidden;transition:max-height .6s var(--ease-out),opacity .6s var(--ease)}
.note.show{max-height:120px;opacity:1}
.coords{background:var(--glace);border:var(--glace-bord);border-radius:var(--r);
  padding:0 26px 24px;overflow:hidden;box-shadow:var(--glace-relu),var(--glace-ombre);
  transition:transform .5s var(--ease-out),box-shadow .5s var(--ease-out)}
.coords:hover{transform:translateY(-4px);box-shadow:var(--glace-relu),var(--glace-ombre-h)}
.coords dl{display:grid;grid-template-columns:88px 1fr;gap:9px 16px;margin:22px 0;font-size:.96rem}
.coords dt{font:var(--lbl);letter-spacing:var(--lbl-space);text-transform:uppercase;color:var(--muted);
  padding-top:4px}
.coords dd{margin:0;overflow-wrap:anywhere}
.coords dd.muted{grid-column:2}
.coords a{text-decoration:none;border-bottom:1px solid var(--line);transition:border-color .3s var(--ease),color .3s var(--ease)}
.coords a:hover{color:var(--vert);border-color:var(--vert)}

/* carte + géolocalisation — la carte prend tout le parent, équarrie pour coller à la
   géométrie des tuiles (carré = épingle pile au centre) */
.map{position:relative;display:block;overflow:hidden;border:0;border-bottom:1px solid var(--line);
  aspect-ratio:1/1;margin:0 -26px 22px;background:var(--creme);text-decoration:none}
.map-layer{position:absolute;width:150%;aspect-ratio:1/1;display:grid;grid-template-columns:repeat(3,1fr);
  transition:transform .9s var(--ease-out)}
.map:hover .map-layer{transform:scale(1.07)}
.map-layer img{width:100%;height:auto;display:block}
.map-pin{position:absolute;left:50%;top:50%;color:var(--vert);
  transform:translate(-50%,-92%);filter:drop-shadow(0 4px 8px rgba(20,35,12,.35))}
.map-pin svg{animation:pin 2.8s var(--ease) infinite}
@keyframes pin{0%,55%,100%{transform:translateY(0)}70%{transform:translateY(-7px)}85%{transform:translateY(0)}}
.map-cta{position:absolute;right:9px;bottom:9px;color:var(--vert);font-size:.76rem;font-weight:600;
  padding:6px 11px;border-radius:var(--r);opacity:0;transform:translateY(8px);
  background:var(--glace-forte);border:var(--glace-bord);
  box-shadow:var(--glace-relu),0 6px 16px rgba(20,35,12,.2);
  backdrop-filter:blur(9px) saturate(1.3);-webkit-backdrop-filter:blur(9px) saturate(1.3);
  transition:opacity .4s var(--ease),transform .4s var(--ease-out),box-shadow .3s var(--ease)}
.map:hover .map-cta,.map:focus-visible .map-cta{opacity:1;transform:none}
.map-cred{position:absolute;left:8px;bottom:7px;font-size:.66rem;color:#3d4c36;
  background:rgba(255,255,255,.66);border:var(--glace-bord);
  box-shadow:var(--glace-relu);padding:2px 7px;border-radius:4px;
  backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.geo{display:grid;gap:10px;margin:0 0 18px}
.btn-geo{background:var(--glace-forte);color:var(--vert);border:var(--glace-bord);
  box-shadow:var(--glace-relu),0 2px 8px rgba(20,35,12,.08);width:100%}
.btn-geo:hover:not(:disabled){background:#fff}
.btn-geo:disabled{opacity:.65;cursor:progress;transform:none;box-shadow:none}
.btn-geo svg{animation:nudge 2.4s var(--ease) infinite}
@keyframes nudge{0%,70%,100%{transform:translateY(0)}80%{transform:translateY(-3px)}90%{transform:translateY(0)}}
.geo-msg{margin:0;font-size:.85rem;color:var(--muted);animation:fadein .6s var(--ease-out) both}
.geo-msg strong{color:var(--texte);font-weight:600}
.geo-msg a{color:var(--vert);border-bottom:1px solid var(--line)}
@keyframes fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}

/* ---------- footer ---------- */
.site-foot{background:var(--vert);color:#fff;padding:clamp(68px,8vw,96px) 0 40px}
.foot-in{display:grid;grid-template-columns:1.2fr 1fr 1.2fr;gap:32px}
.foot-col p{margin:0 0 14px;font-size:1rem;color:rgba(255,255,255,.92)}
.foot-col strong{display:block;font:var(--lbl);font-size:.8rem;letter-spacing:.12em;
  text-transform:uppercase;color:rgba(255,255,255,.62);margin-bottom:9px}
.foot-col a{text-decoration:none;border-bottom:1px solid transparent;
  transition:border-color .3s var(--ease)}
.foot-col a:hover{border-color:rgba(255,255,255,.7)}
.foot-social{display:inline-flex;align-items:center;gap:8px}
.foot-col .muted{display:block;color:rgba(255,255,255,.62);font-size:.9rem;margin-top:5px}
.foot-bottom{margin-top:28px;padding-top:14px;border-top:1px solid rgba(255,255,255,.16);
  font-size:.82rem;color:rgba(255,255,255,.62)}


.centre{text-align:center;margin-top:8px}
.voir-plus{margin-top:30px}
.voir-plus-reste{font-weight:400;opacity:.8;font-size:.85rem}
.voir-plus .btn{flex-direction:column;gap:2px}


/* ---------- vidéos ---------- */
.videos{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:16px;margin-top:26px}
.video{position:relative;border-radius:14px;overflow:hidden;background:var(--vert-nuit);aspect-ratio:16/9;
  box-shadow:0 14px 34px rgba(20,35,12,.22)}
.video video,.video iframe,.video-facade{position:absolute;inset:0;width:100%;height:100%;border:0;object-fit:cover}
.video-facade{padding:0;cursor:pointer;background:none}
.video-facade img{width:100%;height:100%;object-fit:cover}
.video-play{position:absolute;left:50%;top:50%;display:grid;place-items:center;width:64px;height:64px;margin:-32px 0 0 -32px;
  border-radius:50%;background:var(--terre);color:#fff;font-size:1.3rem;padding-left:4px;pointer-events:none;
  box-shadow:0 8px 24px rgba(0,0,0,.35)}
.video-titre{position:absolute;left:12px;bottom:10px;padding:4px 10px;border-radius:99px;
  background:rgba(18,36,33,.72);color:#fff;font-size:.8rem;pointer-events:none}

/* ---------- surtitres ---------- */
.eyebrow{margin:0 0 12px;font:700 .74rem/1.2 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--terre)}
.eyebrow-clair{color:#F0C469}
.hero-copy .eyebrow{margin:18px 0 -6px;font-size:.74rem;line-height:1.2;color:#F0C469}

/* ---------- bande des activités ---------- */
.bande{background:var(--vert-fonce);color:#fff}
.bande-in{display:flex;justify-content:space-between;gap:12px 28px;flex-wrap:wrap;padding-top:18px;padding-bottom:18px}
.bande a{text-decoration:none;font-size:.95rem;font-weight:600;position:relative;padding:4px 0}
.bande a::after{content:"";position:absolute;left:0;bottom:0;height:2px;width:100%;background:#F0C469;
  transform:scaleX(0);transform-origin:0 50%;transition:transform .35s var(--ease-out)}
.bande a:hover::after{transform:scaleX(1)}

/* ---------- coworking : points forts ---------- */
.cow-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:22px 0 0}
.cow-card{display:grid;gap:2px;padding:14px 16px;border-radius:var(--r);background:#fff;border:1px solid var(--line)}
.cow-card strong{font-weight:700;font-size:.95rem}
.cow-card span{font-size:.85rem;color:var(--muted)}

/* ---------- café : la carte ---------- */
.carte{margin-top:22px;padding:24px 26px;border-radius:14px;background:#fff;color:var(--texte);
  box-shadow:0 14px 34px rgba(0,0,0,.25)}
.carte h3{margin:0 0 6px;font:500 1.3rem/1.2 var(--serif)}
.carte-groupe{padding:12px 0 4px;border-top:1px solid var(--line)}
.carte-groupe:first-of-type{border-top:0}
.carte-groupe h4{margin:0 0 6px;font:700 .72rem/1.2 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--terre)}
.carte-groupe ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:4px 18px}
.carte-groupe li{font-size:1rem}
.carte-note{margin:12px 0 0;font-size:.85rem;color:var(--muted)}

/* ---------- galerie : filtres et soins ---------- */
.filtres{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 0}
.filtre{font:600 .88rem/1 var(--sans);padding:9px 16px;border-radius:99px;border:1px solid var(--line);
  background:#fff;color:var(--texte);cursor:pointer;
  transition:background .25s var(--ease),color .25s var(--ease),border-color .25s var(--ease)}
.filtre:hover{border-color:var(--vert)}
.filtre.on{background:var(--vert);border-color:var(--vert);color:#fff}
.filtre:focus-visible{outline:2px solid var(--terre);outline-offset:2px}
.card-soins{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
.card-soins span{font:600 .72rem/1 var(--sans);padding:4px 8px;border-radius:99px;background:var(--creme);color:var(--vert)}
.form select{font-family:inherit;font-size:1rem;line-height:1.5;color:var(--texte);background:rgba(255,255,255,.72);
  border:var(--glace-bord);border-radius:var(--r);padding:11px 13px;width:100%}

/* ---------- coworking ---------- */
.cow{background:var(--creme);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.cow-photos{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start}
.cow-p{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:var(--r);box-shadow:0 10px 24px rgba(20,35,12,.18)}
.cow-p0{border-radius:var(--r) var(--r) 120px 120px}
.cow-p1{margin-top:40px}
.cow-note{margin:20px 0 14px;font-size:.95rem;color:var(--muted)}

/* ---------- aménagement paysager ---------- */
.pays{position:relative;overflow:hidden;background:var(--vert-fonce);color:#fff}
.pays h2{color:#fff}
.pays .lede{color:rgba(255,255,255,.82)}
.pays .puces li{background:transparent;border-color:rgba(255,255,255,.3);color:rgba(255,255,255,.92)}
.pays-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}
.pays-visuel img{width:100%;max-height:520px;object-fit:cover;border-radius:var(--r);box-shadow:0 14px 34px rgba(0,0,0,.35)}
.aa{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:var(--r);user-select:none}
.aa img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.aa-avant{clip-path:inset(0 calc(100% - var(--p)) 0 0)}
.aa-poignee{position:absolute;top:0;bottom:0;left:var(--p);width:3px;margin-left:-1.5px;background:#fff;pointer-events:none}
.aa input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0}
.aa input:focus-visible~.aa-poignee{box-shadow:0 0 0 3px var(--moutarde)}
.aa-tag{position:absolute;top:12px;padding:4px 10px;border-radius:99px;background:rgba(18,36,33,.7);color:#fff;font-size:.78rem}
.aa-tag-a{left:12px}.aa-tag-b{right:12px}

/* ---------- feuilles décoratives (micro-animation) ---------- */
.feuille{position:absolute;z-index:0;pointer-events:none;color:#fff;opacity:.09;
  animation:balance 9s ease-in-out infinite alternate;
  translate:0 calc(var(--sy,0) * -.04px)}
.feuille-h1{width:150px;right:6%;top:14%;transform-origin:50% 100%}
.feuille-h2{width:90px;right:34%;bottom:9%;animation-duration:12s;animation-delay:-4s;transform-origin:50% 100%}
.feuille-p1{width:200px;left:-40px;bottom:-30px;transform-origin:50% 100%;opacity:.07}
@keyframes balance{from{transform:rotate(-7deg)}to{transform:rotate(8deg)}}
.hero-in{z-index:1}

/* ---------- formulaire : indication WhatsApp ---------- */
.form-hint{margin:0;font-size:.88rem;color:var(--muted);padding:10px 12px;background:rgba(225,163,45,.14);border-radius:var(--r)}

.foot-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:2px}
.foot-col a.foot-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:99px;
  border:1px solid rgba(255,255,255,.35);font-size:.92rem}
.foot-col a.foot-pill:hover{background:rgba(255,255,255,.12);border-color:#fff}
.foot-col a.foot-pill-insta{background:var(--terre);color:#fff;border-color:transparent;font-weight:600}

/* ---------- texture : feuilles au trait, seulement sur le hero et l'aménagement paysager ---------- */
.hero,.pays{background-image:url(/texture-claire.svg);background-size:520px 520px}

/* ---------- whatsapp flottant ---------- */
.wa-fixed{position:fixed;right:18px;bottom:18px;z-index:55;width:54px;height:54px;border-radius:50%;
  background:var(--vert);color:#fff;display:grid;place-items:center;text-decoration:none;
  box-shadow:0 8px 22px rgba(20,35,12,.3);
  transition:transform .35s var(--ease-out),background .3s var(--ease)}
.wa-fixed::before{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid var(--vert-accent);
  animation:pulse 2.6s var(--ease-out) infinite}
.wa-fixed:hover{background:var(--vert-fonce);transform:scale(1.08)}
@keyframes pulse{0%{transform:scale(1);opacity:.7}70%{transform:scale(1.55);opacity:0}100%{opacity:0}}

/* ---------- responsive ---------- */
@media (max-width:900px){
  .lieu-in,.cafe-in{grid-template-columns:1fr}
  .bande-in{justify-content:center}
  .cafe-photos{order:2}
  .grid{grid-template-columns:repeat(3,1fr)}
  .contact-in,.foot-in{grid-template-columns:1fr;gap:30px}
}
@media (max-width:820px){
  .head-nav .burger{display:block}
  /* mobile : les entrées latérales deviennent verticales (sinon la page déborde à droite) */
  .js .rv-left,.js .rv-right{transform:translateY(28px)}
  .js .rv-left.in,.js .rv-right.in{transform:none}
  /* avis : on les fait défiler d'un geste, au lieu de les empiler */
  .avis-liste{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;margin:22px -20px 0;
    padding:4px 20px 18px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .avis-liste::-webkit-scrollbar{display:none}
  .avis{flex:0 0 86%;scroll-snap-align:center}
  .avis-hint{display:block;margin:0 0 14px;text-align:center;font-size:.82rem;color:var(--muted)}
  /* bande des activités : grille 2 × 2 */
  .bande-in{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:14px;padding-bottom:14px}
  .bande a{text-align:center;padding:10px 8px;border:1px solid rgba(255,255,255,.25);border-radius:999px;font-size:.85rem}
  .bande a::after{display:none}
  /* Mobile : la photo (collage) et le texte tiennent ensemble sur le premier écran.
     Le logo du hero et l'adresse, déjà présents dans l'en-tête et le pied de page,
     sont masqués pour gagner de la place. */
  .hero{min-height:100vh;min-height:100svh;display:grid;align-content:center;padding:84px 0 22px}
  .hero-bg{opacity:0}
  .hero-in{grid-template-columns:1fr;gap:16px}
  .hero-photo{display:flex;order:-1;justify-content:center}
  .collage{width:min(100%,330px);aspect-ratio:1/.6}
  .collage-a{width:42%;height:100%;border-radius:90px 90px var(--r) var(--r)!important}
  .collage-b{width:62%;height:80%}
  .hero-copy{background:none;padding:0;box-shadow:none}
  .hero-copy .wordmark,.hero-adr{display:none}
  .hero-copy .eyebrow{margin:0 0 6px}
  .hero-copy h1{margin:0 0 10px;font-size:clamp(1.85rem,8.4vw,2.4rem);max-width:none}
  .hero-copy p{font-size:1rem;line-height:1.5}
  .hero-cta{margin-top:18px}
  .hero-cta{display:grid;grid-template-columns:1fr;gap:10px}
  .hero-cta .btn{padding:14px 16px}
  .head-nav{gap:12px;font-size:.88rem}
  .head-nav a:not(.btn){display:none}
  .lieu-photos,.cafe-photos{height:420px}
  .section{padding:48px 0}
  .grid{grid-template-columns:repeat(3,1fr);gap:12px}
}
@media (max-width:620px){
  .grid{grid-template-columns:repeat(2,1fr)}
  .card-nom{font-size:.95rem}.card-cap{padding:10px 11px 13px}
}
@media (max-width:460px){
  .hero-cta{grid-template-columns:1fr}
}
/* tablettes en portrait : collage et titre plus grands */
@media (min-width:600px) and (max-width:820px){
  .collage{width:min(100%,520px)}
  .hero-copy h1{font-size:2.8rem}
  .hero-copy p{font-size:1.1rem;max-width:52ch}
  .hero-cta{grid-template-columns:1fr 1fr}
}
/* très petits écrans : l'en-tête garde le logo lisible, « Appeler » ne garde que son icône */
@media (max-width:400px){
  .head-nav .btn-sm .btn-txt{display:none}
  .head-nav .btn-sm{width:44px;height:44px;padding:0;min-height:44px}
  .form .btn{padding:14px 18px}
}


/* ---------- burger + menu mobile ---------- */
.burger{display:none;width:44px;height:44px;margin-left:4px;border:0;border-radius:50%;background:rgba(255,255,255,.14);
  cursor:pointer;position:relative;flex:none}
.burger span{position:absolute;left:12px;right:12px;height:2px;border-radius:2px;background:#fff;
  transition:transform .35s var(--ease-out),opacity .2s var(--ease),top .35s var(--ease-out)}
.burger span:nth-child(1){top:15px}.burger span:nth-child(2){top:21px}.burger span:nth-child(3){top:27px}
.burger.ouvert span:nth-child(1){top:21px;transform:rotate(45deg)}
.burger.ouvert span:nth-child(2){opacity:0}
.burger.ouvert span:nth-child(3){top:21px;transform:rotate(-45deg)}
.burger:focus-visible{outline:3px solid #F0C469;outline-offset:2px}
.menu-mobile{position:fixed;inset:0;z-index:49;display:flex;flex-direction:column;justify-content:center;gap:28px;
  padding:96px 28px 32px;background:var(--vert-fonce);background-image:url(/texture-claire.svg);background-size:520px 520px;
  color:#fff;visibility:hidden;opacity:0;transform:translateY(-12px);
  transition:opacity .35s var(--ease),transform .45s var(--ease-out),visibility 0s linear .45s}
.menu-mobile.ouvert{visibility:visible;opacity:1;transform:none;transition-delay:0s}
.menu-mobile nav{display:grid;gap:2px}
.menu-mobile nav a{font:500 1.9rem/1.25 var(--serif);text-decoration:none;color:#fff;padding:8px 0;
  opacity:0;transform:translateY(14px);transition:opacity .45s var(--ease-out),transform .5s var(--ease-out)}
.menu-mobile.ouvert nav a{opacity:1;transform:none;transition-delay:calc(var(--i) * 45ms + 120ms)}
.menu-cta{display:grid;gap:10px}
@media (min-width:821px){.menu-mobile{display:none}}
.avis-hint{display:none}

/* ---------- accessibilité : mouvement réduit ---------- */
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important;transition:none!important}
  .js [data-reveal]{opacity:1;transform:none;filter:none;clip-path:none}
  .rise{opacity:1}
}
`;
