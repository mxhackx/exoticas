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
   Pour la corriger : Google Maps → appui long sur la porte d'entrée → remplace les
   deux valeurs ci-dessous. */
const MAP = { lat: 6.35601, lng: 2.4371 };
const ZOOM = 16;

function itinLink(depuis?: { lat: number; lng: number }) {
  const d = `destination=${MAP.lat},${MAP.lng}`;
  const o = depuis ? `origin=${depuis.lat},${depuis.lng}&` : "";
  return `https://www.google.com/maps/dir/?api=1&${o}${d}`;
}

/* Plantes photographiées à la boutique. Les noms sont repris tels quels des
   fichiers fournis (dossier Drive drive-download-20261028T191730Z-1-001) ; les HEIC
   ont été convertis en JPEG sans recadrage ni retouche : mini/ = 640 px pour la
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
   (Alain tête koussi : sans mention « Local Guide »). Mettre à jour « quand » de temps en temps. */
const AVIS = [
  {
    nom: "Claudia Jordá",
    etoiles: 5,
    lang: "fr",
    quand: "il y a 10 mois",
    texte:
      "Excellente boutique de plantes, sans aucun doute le meilleur endroit au Bénin pour trouver des espèces exotiques. Ils ont également un coin café parfait pour se détendre et profiter de l’ambiance : un petit paradis caché. Le manager est très sympathique et toujours attentif, ce qui rend la visite encore plus agréable. Je recommande vivement !",
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
    nom: "Alain tête koussi",
    guide: false,
    etoiles: 5,
    lang: "fr",
    quand: "il y a 10 mois",
    texte:
      "Expérience au top et le gérant est vraiment un connaisseur des plantes et très sympathique ;) un plaisir de travailler dans un cadre relaxation luxuriant et une bouffée d’oxygène grâce aux plantes",
    notes: "Cuisine 5/5 · Service 5/5 · Ambiance 5/5 · Très calme · Pas d'attente",
  },
];


/* Fiches de la galerie : descriptions générales de chaque plante (rien sur
   les prix ni les stocks : on les confirme par WhatsApp). */
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
  "anthurium-hookeri-black": ["rare", "Variété d'anthurium hookeri : une rosette dense de grandes feuilles brillantes, au port spectaculaire."],
  "anthurium-hookerie-aurea": ["rare", "Variété d'anthurium hookeri à rosette de grandes feuilles lancéolées, très décorative en intérieur lumineux."],
  "anthurium": ["interieur", "Feuillage lustré et fleurs colorées qui durent des semaines : l'une des plantes d'intérieur les plus élégantes."],
  "anthurium-2": ["interieur", "Feuillage lustré et fleurs colorées qui durent des semaines : l'une des plantes d'intérieur les plus élégantes."],
  "asparagus": ["retombante", "Un feuillage fin et plumeux, aérien, qui s'étale ou retombe en cascade. Facile à vivre en pot suspendu."],
  "begonia-masoniana-ou-begonia-croix-de-fer": ["rare", "Feuilles bosselées vert vif marquées d'une croix brun-pourpre en leur centre, d'où son nom de bégonia croix de fer."],
  "bonsai-araucaria-cunninghamii": ["bonsai", "Un araucaria cunninghamii (pin de Moreton Bay) conduit en bonsaï : silhouette de conifère en miniature."],
  "bonsai": ["bonsai", "Un arbre miniature taillé et formé avec patience : une pièce de caractère pour un bureau ou une terrasse."],
  "bonsai-2": ["bonsai", "Un arbre miniature taillé et formé avec patience : une pièce de caractère pour un bureau ou une terrasse."],
  "bonsai-3": ["bonsai", "Un arbre miniature taillé et formé avec patience : une pièce de caractère pour un bureau ou une terrasse."],
  "bonsai-4": ["bonsai", "Un arbre miniature taillé et formé avec patience : une pièce de caractère pour un bureau ou une terrasse."],
  "cocotier": ["arbre", "Le palmier emblématique des côtes tropicales, ici en jeune plant : feuilles arquées et silhouette élancée."],
  "colocasia-cintho-aloha": ["rare", "Un colocasia aux grandes feuilles en forme de cœur, qui donne un effet jungle immédiat. Il apprécie un sol frais."],
  "dendrobium": ["orchidee", "Une orchidée à cannes qui fleurit en grappes. Résistante et généreuse, elle convient bien au climat chaud."],
  "epipremnum": ["retombante", "Le pothos : une liane robuste aux feuilles en cœur, parfaite pour débuter. Elle pousse en retombant ou en grimpant."],
  "epipremnum-2": ["retombante", "Le pothos : une liane robuste aux feuilles en cœur, parfaite pour débuter. Elle pousse en retombant ou en grimpant."],
  "epiprenum-variegata": ["retombante", "Un pothos panaché : des feuilles marbrées de crème ou de jaune, qui éclairent un coin sombre."],
  "frangipanier": ["arbre", "L'arbuste aux fleurs parfumées des tropiques, utilisé en bouquets et en jardins. Il aime le plein soleil."],
  "goyavier-blanc": ["arbre", "Un goyavier : arbre fruitier tropical, au feuillage dense et aux fruits parfumés."],
  "goyavier": ["arbre", "Un goyavier : arbre fruitier tropical, au feuillage dense et aux fruits parfumés."],
  "grenadier": ["arbre", "Un arbuste fruitier aux fleurs orangées qui donne des grenades. Idéal en grand pot ou au jardin."],
  "hosta-africain": ["interieur", "Un feuillage décoratif qui se plaît à la mi-ombre : une valeur sûre pour garnir un coin de terrasse."],
  "lys-du-bengale-variegata": ["interieur", "Un feuillage panaché élégant, qui apporte de la lumière dans un massif ou un grand pot."],
  "monstera-adansonii": ["interieur", "Le monstera aux feuilles percées de trous, qui grimpe ou retombe. Très graphique sur une étagère."],
  "monstera-albo": ["rare", "Une variété panachée de blanc, très recherchée par les collectionneurs. Chaque feuille est unique."],
  "monstera-burle-marx": ["rare", "Un feuillage découpé, graphique et compact, très prisé des amateurs de plantes tropicales."],
  "monstera-delicioca-variegata": ["rare", "Le monstera deliciosa en version panachée : de grandes feuilles découpées marbrées de crème."],
  "monstera-deliciosa": ["interieur", "La grande classique : d'immenses feuilles découpées et perforées, qui donnent un style tropical à toute pièce."],
  "monstera-deliciosa-2": ["interieur", "La grande classique : d'immenses feuilles découpées et perforées, qui donnent un style tropical à toute pièce."],
  "monstera-thai-constellation": ["rare", "Une variété panachée aux feuilles étoilées de crème, comme un ciel de constellations. Rare et très décorative."],
  "murier-platane-rouge-et-blanc": ["arbre", "Un mûrier à grandes feuilles, aussi beau qu'utile : il donne des mûres sucrées."],
  "orchidee-chauve-souris": ["rare", "Une plante surprenante aux fleurs sombres à longs filaments, qui évoquent des ailes de chauve-souris."],
  "orchidee-dendrobium": ["orchidee", "Une orchidée à cannes qui fleurit en grappes. Résistante et généreuse, elle convient bien au climat chaud."],
  "orchidee-dendrobium-2": ["orchidee", "Une orchidée à cannes qui fleurit en grappes. Résistante et généreuse, elle convient bien au climat chaud."],
  "orchidee-phalaenopsis": ["orchidee", "L'orchidée papillon : des fleurs élégantes qui durent plusieurs semaines. La plus simple pour débuter."],
  "papayer": ["arbre", "Un papayer, à croissance rapide : un arbre fruitier tropical au feuillage découpé très décoratif."],
  "peperomia-lemon-lime": ["interieur", "Un petit péperomia au feuillage vert tendre et citron, compact et facile. Il éclaire n'importe quelle étagère."],
  "peperomia-raindrop": ["interieur", "Des feuilles rondes et charnues, en forme de gouttes de pluie. Compact, facile et très mignon sur un bureau."],
  "phalaenopsis": ["orchidee", "L'orchidée papillon : des fleurs élégantes qui durent plusieurs semaines. La plus simple pour débuter."],
  "phalaenopsis-2": ["orchidee", "L'orchidée papillon : des fleurs élégantes qui durent plusieurs semaines. La plus simple pour débuter."],
  "phalaenopsis-3": ["orchidee", "L'orchidée papillon : des fleurs élégantes qui durent plusieurs semaines. La plus simple pour débuter."],
  "philodendron-erubescens": ["rare", "Un philodendron aux tiges et feuilles teintées de rouge-bordeaux, au port grimpant et élégant."],
  "philodendron-pink-princess": ["rare", "Un philodendron aux feuilles sombres éclaboussées de rose. L'une des plantes les plus prisées du moment."],
  "philodendron-xanadu": ["interieur", "Un philodendron touffu aux feuilles lobées, au port compact. Très généreux en volume, facile à vivre."],
  "pink-princess": ["rare", "Un philodendron aux feuilles sombres éclaboussées de rose. L'une des plantes les plus prisées du moment."],
  "spathiphyllium": ["interieur", "Le « lys de la paix » : feuillage vert profond et fleurs blanches, qui supporte les pièces peu éclairées."],
  "tradescantia-zebrina": ["retombante", "Des feuilles rayées d'argent et de violet, qui retombent en cascade. Se bouture très facilement."],
};

/* Photos du lieu (fiche Google Maps) : boutique, salle, coin café. */
const LIEU = {
  arbre: { src: "/lieu/boutique-arbre.webp", w: 382, h: 510, alt: "Salle d'Exoticas : grand arbre, étagères de plantes et fauteuil, à Cotonou" },
  tasses: { src: "/lieu/salle-tasses.webp", w: 382, h: 510, alt: "Table avec deux cafés au milieu des plantes chez Exoticas, Cotonou" },
  etageres: { src: "/lieu/boutique-etageres.webp", w: 382, h: 510, alt: "Étagères de plantes en pots et tables du coin café d'Exoticas" },
  brunch: { src: "/lieu/cafe-brunch.webp", w: 382, h: 510, alt: "Brunch chez Exoticas : gaufres au chocolat, croissant, omelette, jus et café" },
  crepes: { src: "/lieu/cafe-crepes-sandwich.webp", w: 287, h: 510, alt: "Crêpes, sandwich grillé et jus frais au café d'Exoticas" },
  jus: { src: "/lieu/cafe-jus.webp", w: 287, h: 510, alt: "Jus frais devant les étagères de plantes du café Exoticas" },
};

/* Carte du café : aperçu des plats vus sur place et cités dans les avis (sans prix) */
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

/* Vidéos du site. Vide pour l'instant : la section « Le lieu en vidéo » (et son
   lien dans le menu) n'apparaît que lorsqu'il y a au moins une entrée.
   • Fichier du site : déposer le .mp4 dans public/videos/ (court, ≤ 720 p, idéalement
     < 6 Mo) et une image d'aperçu .jpg, puis ajouter
     { src: "/videos/cafe.mp4", poster: "/videos/cafe.jpg", titre: "Le café d'Exoticas" }.
   • YouTube (vidéos longues ou lourdes) : { youtube: "ID_DE_LA_VIDEO", titre: "…" }.
     Le lecteur YouTube ne se charge qu'au clic (pas de suivi avant). */
type Video = { titre: string; src?: string; poster?: string; youtube?: string };
const VIDEOS: Video[] = [];

/* Plantes mises à la une dans la vitrine (identifiants de PLANTES, par nom de fichier) */
const VITRINE_SLUGS = [
  "monstera-albo", "philodendron-pink-princess", "anthurium-hookeri-black", "orchidee-phalaenopsis",
  "monstera-thai-constellation", "frangipanier", "alocasia-sanderiana-nain-ou-oreille-d-ane", "bonsai-araucaria-cunninghamii",
];
const VITRINE = VITRINE_SLUGS.map((sl) => PLANTES.findIndex((p) => p.s === sl)).filter((i) => i >= 0);

/* Nom unique d'une photo de la galerie : « Anthurium (photo 2) » quand le même
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
   Logo : le symbole recadré depuis le fichier fourni
   « Exoticas logo H1.png » (279 × 289 px, vert #237F3C), décliné en blanc
   pour les fonds verts. Aucune retouche de tracé : recadrage seul.
------------------------------------------------------------------ */

function Logo({ size = 34, verte = false }: { size?: number; verte?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mark"
      src={verte ? "/logo/marque-verte.png" : "/logo/marque-blanche.png"}
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
    <span className="wordmark" style={{ color: light ? "#fff" : "#1E2B28" }}>
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

/* Feuille décorative : très discrète, ondule lentement et suit un peu le défilement */
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

/* Lecteur vidéo léger : rien ne se télécharge avant d'être proche de l'écran ;
   un fichier local joue en boucle, muet, uniquement quand on le voit ; un clic
   donne le son et les commandes. Mouvement réduit : pas de lecture automatique. */
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
        ) : (
          <button type="button" className="video-facade" onClick={() => setActif(true)} aria-label={`Lire la vidéo : ${v.titre}`}>
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

function FeuilleIcone({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M5 19 14 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function TasseIcone({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 11h2a2.5 2.5 0 0 1 0 5h-2M8 3c0 1.5 1.5 1.5 1.5 3M12 3c0 1.5 1.5 1.5 1.5 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function BureauIcone({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 19h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function GoutteIcone({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function SoleilIcone({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function CiseauxIcone({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 7.5 20 18M8 16.5 20 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MailIcone({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
function HorlogeIcone({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
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

/* Carte composée de 9 tuiles OSM : pas de WebGL, pas de cookie, cliquable vers Google Maps */
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

export default function Home() {
  const [form, setForm] = useState({ nom: "", contact: "", objet: "Aménagement paysager (devis)", message: "" });
  const [envoye, setEnvoye] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [fiche, setFiche] = useState<number | null>(null);
  const [vedette, setVedette] = useState(0);
  const [pause, setPause] = useState(false);
  const ouvrirPlante = (i: number) => {
    setFiltre("toutes");
    setFiche(i);
  };
  const [filtre, setFiltre] = useState<string>("toutes");
  /* galerie : deux rangées d'abord, puis « Voir plus » en ajoute deux à chaque clic */
  const [cols, setCols] = useState(3);
  const [paliers, setPaliers] = useState(1);
  /* indices (dans PLANTES) des plantes du filtre ; « affichees » = celles montrées */
  const visibles = PLANTES.map((p, i) => i).filter(
    (i) => filtre === "toutes" || CAT[(INFOS[PLANTES[i].s] ?? ["interieur"])[0]].f === filtre
  );
  const affiche = cols * 2 * paliers;
  const affichees = visibles.slice(0, affiche);

  /* vitrine : la plante à la une change toute seule (sauf survol, fiche ouverte, mouvement réduit) */
  useEffect(() => {
    if (pause || fiche !== null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setVedette((v) => (v + 1) % VITRINE.length), 4500);
    return () => window.clearInterval(t);
  }, [pause, fiche]);

  /* menu mobile : Échap pour fermer, page figée derrière */
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
    const calc = () => setCols(window.innerWidth > 620 ? 3 : 2);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* fiche plante : Échap, flèches, et page figée derrière */
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

  /* Bienvenue dactylographiée, à la première visite seulement : un rideau de la
     couleur du hero porte le texte qui se tape caractère par caractère, puis se
     lève et les entrées du hero jouent (elles sont en pause tant qu'il est up).
     Le passage est marqué dans localStorage ; prefers-reduced-motion coupe tout,
     et un localStorage inaccessible (navigation privée) n'empêche pas l'affichage.
     Volontairement sans cleanup : en dev, StrictMode montez/démontez reminderait
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
      /* pas de trace : la bienvenue se rejouera, ce n'est pas grave */
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

  /* révélation au scroll : chaque élément apparaît quand il entre à l'écran.
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
      `Objet : ${form.objet}\n` +
      `Je m'appelle ${form.nom || "—"}. ${form.message}\n\n` +
      `Me joindre : ${form.contact || "—"}`;
    window.open(waLink(msg), "_blank", "noopener");
    setEnvoye(true);
  }

  return (
    <>
      <style>{css}</style>

      <header className={`site-head${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap head-in">
          <a href="#top" className="head-logo" aria-label="Exoticas, accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-complet" src="/logo/logo-complet-vert.png" width={946} height={289} alt="Exoticas" decoding="async" />
          </a>
          <nav className="head-nav" aria-label="Navigation principale">
            {VIDEOS.length > 0 && <a href="#videos">Vidéos</a>}
            <a href="#cafe">Café</a>
            <a href="#coworking">Coworking</a>
            <a href="#paysagisme">Paysagisme</a>
            <a href="#galerie">Plantes</a>
            <a className="btn btn-primary btn-sm" href={BRAND.telHref} aria-label="Appeler Exoticas">
              <PhoneIcon size={16} /> <span className="btn-txt">Appeler</span>
            </a>
            <button
              type="button"
              className={`burger${menu ? " ouvert" : ""}`}
              aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menu}
              aria-controls="menu-mobile"
              onClick={() => setMenu((m) => !m)}
            >
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </header>

      <div id="menu-mobile" className={`menu-mobile${menu ? " ouvert" : ""}`} aria-hidden={!menu}>
        <nav aria-label="Menu mobile">
          {[
            ["#cafe", "Café"],
            ["#coworking", "Coworking"],
            ["#paysagisme", "Paysagisme"],
            ["#galerie", "Plantes"],
            ["#avis", "Avis"],
            ["#contact", "Contact"],
          ].map(([h, n], i) => (
            <a key={h} href={h} tabIndex={menu ? 0 : -1} onClick={() => setMenu(false)} style={{ "--i": i } as React.CSSProperties}>
              {n}
            </a>
          ))}
        </nav>
        <div className="menu-cta">
          <a className="btn btn-moutarde" tabIndex={menu ? 0 : -1} href={waLink("Bonjour Exoticas,")} target="_blank" rel="noopener">
            <WhatsAppIcon size={18} /> Écrire sur WhatsApp
          </a>
          <a className="btn btn-ghost" tabIndex={menu ? 0 : -1} href={BRAND.telHref}>
            <PhoneIcon size={16} /> {BRAND.tel}
          </a>
        </div>
      </div>

      <main id="top">
        {/* HERO */}
        <section
          className={`hero${bienvenue !== "off" ? " is-welcome" : ""}`}
          style={{ "--hero-img": "url('/galerie/00-mosaic.jpg')" } as React.CSSProperties}
        >
          <div className="hero-bg" aria-hidden="true" />
          {bienvenue !== "off" && (
            <div
              className={`welcome${bienvenue === "leve" ? " welcome-up" : ""}`}
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
              <p className="eyebrow eyebrow-clair rise" style={{ "--d": "110ms" } as React.CSSProperties}>
                Tokpa-hoho · Cotonou
              </p>
              <h1 className="rise" style={{ "--d": "160ms" } as React.CSSProperties}>
                Aménagement paysager et plantes rares à Cotonou.
              </h1>
              <p className="rise" style={{ "--d": "260ms" } as React.CSSProperties}>
                Un lieu unique où la nature rencontre l'élégance : espaces verts
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
            </div>
            <div className="hero-photo rise" style={{ "--d": "320ms" } as React.CSSProperties}>
              <div className="arche">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={LIEU.tasses.src} width={LIEU.tasses.w} height={LIEU.tasses.h} alt={LIEU.tasses.alt} fetchPriority="high" decoding="async" />
              </div>
              <span className="pastille-ronde">Café<br />&amp; plantes</span>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <div className="services">
          <div className="wrap services-in">
            {[
              { i: <FeuilleIcone />, t: "Espaces verts sur mesure", d: "Conception et plantation, sur devis" },
              { i: <TasseIcone />, t: "Terrasse café conviviale", d: "Brunch, jus frais et café" },
              { i: <BureauIcone />, t: "Coworking", d: "Travaillez entouré de verdure" },
            ].map((x, k) => (
              <div key={x.t} className="service rv-pop" data-reveal style={{ "--d": `${k * 100}ms` } as React.CSSProperties}>
                <span className="service-ico">{x.i}</span>
                <span className="service-txt"><strong>{x.t}</strong><span>{x.d}</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* VITRINE : plante à la une + défilé de plantes */}
        <section id="vitrine" className="vitrine" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
          <div className="wrap">
            <div className="vit-panneau">
              <div className="vit-tete">
                <div>
                  <p className="vit-k">À la boutique</p>
                  <h2>Le monde des plantes rares</h2>
                </div>
                <p className="vit-intro">
                  Découvrez les plantes de la boutique, leurs besoins et leurs
                  petites habitudes : chacune se choisit et s'entretient avec
                  nos conseils.
                </p>
              </div>
              <p className="vit-label">À la une cette semaine</p>
              <div className="vit-scene" aria-roledescription="carrousel" aria-label="Plantes à la une">
                <button
                  type="button"
                  className="vit-vedette"
                  key={`v-${vedette}`}
                  onClick={() => ouvrirPlante(VITRINE[vedette % VITRINE.length])}
                  aria-label={`Voir la fiche : ${nomUnique(VITRINE[vedette % VITRINE.length])}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/galerie/pleine/${PLANTES[VITRINE[vedette % VITRINE.length]].s}.jpg`} alt={`${nomUnique(VITRINE[vedette % VITRINE.length])}, plante de la boutique Exoticas à Cotonou`} width={480} height={640} decoding="async" />
                  <span className="vit-vedette-txt">
                    <strong>{PLANTES[VITRINE[vedette % VITRINE.length]].n}</strong>
                    <span>{INFOS[PLANTES[VITRINE[vedette % VITRINE.length]].s]?.[1]}</span>
                    <em>Voir la fiche →</em>
                  </span>
                </button>
                <div className="vit-piste" key={`p-${vedette}`}>
                  {[1, 2, 3, 4].map((k) => {
                    const idx = VITRINE[(vedette + k) % VITRINE.length];
                    return (
                      <button
                        type="button"
                        className="vit-carte"
                        key={idx}
                        style={{ "--k": k } as React.CSSProperties}
                        onClick={() => ouvrirPlante(idx)}
                        aria-label={`Voir la fiche : ${nomUnique(idx)}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/galerie/mini/${PLANTES[idx].s}.jpg`} alt={`${nomUnique(idx)}, plante de la boutique Exoticas à Cotonou`} width={480} height={640} loading="lazy" decoding="async" />
                        <span>{PLANTES[idx].n}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="vit-commandes">
                <button type="button" className="vit-fleche" onClick={() => setVedette((v) => (v - 1 + VITRINE.length) % VITRINE.length)} aria-label="Plante précédente">‹</button>
                <span className="vit-points" aria-hidden="true">
                  {VITRINE.map((_, i) => (
                    <i key={i} className={i === vedette % VITRINE.length ? "on" : ""} />
                  ))}
                </span>
                <button type="button" className="vit-fleche" onClick={() => setVedette((v) => (v + 1) % VITRINE.length)} aria-label="Plante suivante">›</button>
              </div>
            </div>
            <div id="paysagisme" className="paysa rv-pop" data-reveal>
              <div>
                <strong>Aménagement paysager sur devis</strong>
                <span>Conception et plantation d'espaces verts : décrivez-nous votre projet.</span>
              </div>
              <a className="btn btn-moutarde" href={waLink("Bonjour Exoticas, je souhaite un devis pour un aménagement paysager.")} target="_blank" rel="noopener">
                Demander un devis
              </a>
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

        {/* GALERIE */}
        <section id="galerie" className="section galerie">
          <div className="wrap">
            <p data-reveal className="eyebrow reveal">La boutique</p>
            <h2 data-reveal className="reveal">Nos plantes</h2>
            <p data-reveal className="reveal lede" style={{ "--d": "90ms" } as React.CSSProperties}>
              {visibles.length} plantes de la boutique, photographiées ici. Touchez une
              carte pour voir sa fiche.
            </p>
            <div className="filtres" role="group" aria-label="Filtrer les plantes">
              {FILTRES.map((f) => (
                <button
                  key={f.k}
                  type="button"
                  className={`filtre${filtre === f.k ? " on" : ""}`}
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
                    aria-label={`Voir la fiche : ${nomUnique(i)}`}
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

        {/* BANDEAU : une bande verte, deux photos rondes, titre, texte et bouton */}
        <div className="bandeau">
          <div className="wrap bandeau-in">
            <div className="bandeau-ronds">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="rond rond-a" src="/galerie/mini/anthurium.jpg" width={480} height={640} alt="Anthurium" loading="lazy" decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="rond rond-b" src="/galerie/mini/monstera-adansonii.jpg" width={480} height={640} alt="Monstera adansonii" loading="lazy" decoding="async" />
            </div>
            <h2 data-reveal className="reveal">Des plantes pour une vie plus verte</h2>
            <div className="bandeau-txt" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              <p>
                Plantes rares, plantes d'intérieur, arbres tropicaux : choisissez
                en boutique ou écrivez-nous, nous vous conseillons la plante qui
                convient à votre espace.
              </p>
              <a className="btn btn-moutarde btn-sm" href={waLink("Bonjour Exoticas, je cherche une plante pour mon espace.")} target="_blank" rel="noopener">
                Demander conseil
              </a>
            </div>
          </div>
        </div>

        {/* CONSEILS */}
        <section id="conseils" className="section conseils">
          <div className="wrap">
            <p data-reveal className="eyebrow reveal">Conseils</p>
            <h2 data-reveal className="reveal">Bien prendre soin de vos plantes</h2>
            <p data-reveal className="reveal lede" style={{ "--d": "90ms" } as React.CSSProperties}>
              Trois gestes simples pour que vos plantes restent en bonne santé.
            </p>
            <div className="conseils-grille">
              {[
                { i: <SoleilIcone size={30} />, t: "Lumière", d: "La plupart des plantes d'intérieur aiment une lumière vive, sans soleil direct qui brûle les feuilles." },
                { i: <GoutteIcone size={30} />, t: "Arrosage", d: "Arrosez quand le dessus du terreau est sec, et ne laissez jamais d'eau stagner dans la soucoupe." },
                { i: <CiseauxIcone size={30} />, t: "Entretien", d: "Retirez les feuilles abîmées, essuyez la poussière et rempotez tous les un à deux ans." },
              ].map((c, k) => (
                <div key={c.t} className="conseil rv-pop" data-reveal style={{ "--d": `${140 + k * 100}ms` } as React.CSSProperties}>
                  <span className="conseil-ico">{c.i}</span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGE + TEXTE : café et coworking */}
        <section id="cafe" className="section duo">
          <span id="coworking" aria-hidden="true" />
          <div className="wrap">
           <div className="duo-in">
            <div className="duo-photo rv-photo" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LIEU.brunch.src} width={LIEU.brunch.w} height={LIEU.brunch.h} alt={LIEU.brunch.alt} loading="lazy" decoding="async" />
            </div>
            <div className="duo-carte rv-right" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              <h2>Terrasse café et coworking, au milieu des plantes</h2>
              <p>
                Brunch, gaufres, crêpes, sandwichs grillés, jus frais et café, à
                savourer dans un décor de plantes et de bois brut. Un espace de
                coworking est aussi à votre disposition dans la boutique-jardin.
              </p>
              <p className="duo-note">Carte, tarifs et horaires : demandez-nous.</p>
              <a className="btn btn-moutarde" href={waLink("Bonjour Exoticas, je voudrais des informations sur le café et le coworking.")} target="_blank" rel="noopener">
                <WhatsAppIcon size={18} /> Se renseigner
              </a>
            </div>
           </div>
          </div>
        </section>

        {/* AVIS */}
        <section id="avis" className="section avisband">
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
                    <strong>{a.nom}</strong>{a.guide === false ? ", avis Google" : ", Local Guide Google"} · {a.quand}
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
        <section id="contact" className="section contact">
          <div className="wrap contact-in">
            <div data-reveal className="reveal rv-left">
              <h3 className="ct-titre">Informations pratiques</h3>
              <p className="ct-texte">
                Passez nous voir à Tokpa-hoho, appelez-nous ou écrivez-nous sur
                WhatsApp : nous répondons rapidement.
              </p>
              <ul className="ct-liste">
                <li><span className="ct-ico"><PhoneIcon size={15} /></span><a href={BRAND.telHref}>{BRAND.tel}</a></li>
                <li><span className="ct-ico"><WhatsAppIcon size={15} /></span><a href={waLink("Bonjour Exoticas, j'aimerais avoir des informations.")} target="_blank" rel="noopener">Écrire sur WhatsApp</a></li>
                <li><span className="ct-ico"><MailIcone size={15} /></span><a href={`mailto:${BRAND.mail}`}>{BRAND.mail}</a></li>
                <li><span className="ct-ico"><HorlogeIcone size={15} /></span><span>Horaires : demandez-nous par téléphone ou WhatsApp</span></li>
              </ul>
              <h3 className="ct-titre ct-loc">Adresse et accès :</h3>
              <p className="ct-texte ct-adr">
                {BRAND.adresseCourte}
                <span>{BRAND.adresseLongue}</span>
              </p>
              <div className="loc-map">
                <Plan lat={MAP.lat} lng={MAP.lng} />
              </div>
            </div>

            <div data-reveal className="reveal rv-right ct-droite" style={{ "--d": "160ms" } as React.CSSProperties}>
              <h2 className="ct-grand">Contactez-nous !</h2>
              <form onSubmit={onSubmit} className="form ct-form">
                <label>
                  Nom
                  <input required name="nom" value={form.nom} onChange={set("nom")} placeholder="Votre nom" autoComplete="name" />
                </label>
                <label>
                  Téléphone ou e-mail
                  <input required name="contact" value={form.contact} onChange={set("contact")} placeholder="01 …  ou  vous@exemple.com" autoComplete="on" />
                </label>
                <label>
                  Objet
                  <select name="objet" value={form.objet} onChange={(e) => setForm((f) => ({ ...f, objet: e.target.value }))}>
                    {["Aménagement paysager (devis)", "Coworking", "Café et brunch", "Plantes", "Autre"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Message
                  <textarea required name="message" rows={5} value={form.message} onChange={set("message")} placeholder="Je souhaite aménager une terrasse de 40 m²…" />
                </label>
                <p className="form-hint">
                  Ce formulaire ne s'envoie pas par e-mail : il ouvre WhatsApp
                  avec votre message déjà écrit. Il n'est envoyé qu'une fois
                  validé dans WhatsApp.
                </p>
                <button className="btn btn-moutarde" type="submit">
                  <WhatsAppIcon size={18} /> Continuer sur WhatsApp
                </button>
                <p className={`note${envoye ? " show" : ""}`} role="status">
                  WhatsApp s'est ouvert avec votre message : il ne reste qu'à l'envoyer.
                  Vous pouvez aussi nous appeler au <a href={BRAND.telHref}>{BRAND.tel}</a> ou
                  écrire à <a href={`mailto:${BRAND.mail}`}>{BRAND.mail}</a>.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-foot">
        <div className="wrap foot-in">
          <div data-reveal className="reveal foot-marque">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-complet logo-pied" src="/logo/logo-complet-blanc.png" width={946} height={289} alt="Exoticas, la vie en vert" loading="lazy" decoding="async" />
            <p>Un lieu unique où la nature rencontre l'élégance : espaces verts sur mesure, terrasse café et coworking à Tokpa-hoho, Cotonou.</p>
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
          </div>
          <div data-reveal className="reveal foot-col" style={{ "--d": "90ms" } as React.CSSProperties}>
            <h3 className="foot-titre">Adresse</h3>
            <p>
              {BRAND.adresseCourte}
              <span className="muted">{BRAND.adresseLongue}</span>
            </p>
            <h3 className="foot-titre">Contact</h3>
            <p>
              <a href={BRAND.telHref}>{BRAND.tel}</a>
              <br />
              <a href={`mailto:${BRAND.mail}`}>{BRAND.mail}</a>
            </p>
          </div>
          <div data-reveal className="reveal foot-col foot-pages" style={{ "--d": "180ms" } as React.CSSProperties}>
            <h3 className="foot-titre">Pages</h3>
            <a href="#galerie">Plantes</a>
            <a href="#cafe">Café et coworking</a>
            <a href="#paysagisme">Paysagisme</a>
            <a href="#avis">Avis</a>
            <a href="#contact">Contact</a>
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
            aria-label={`Fiche : ${nomUnique(fiche)}`}
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
                <p className="fiche-note">Photographiée à la boutique. Prix et disponibilité : demandez-nous sur WhatsApp.</p>
                <a
                  className="btn btn-moutarde"
                  href={waLink(`Bonjour Exoticas, je suis intéressé(e) par : ${p.n}. Est-elle disponible ?`)}
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
  /* palette : vert Exoticas d'origine, avec les accents du lieu (bois brut, jaune moutarde, terre cuite) */
  --vert:#237F3C;
  --vert-fonce:#1B6430;
  --vert-nuit:#134A24;
  --vert-accent:#E1A32D;
  --moutarde:#E1A32D;
  --terre:#E56717;
  --bois:#8B5A34;
  --creme:#EEF0E6;
  --texte:#1E2B28;
  --muted:#6B726B;
  --line:#E3DACA;
  --serif:var(--font-serif),"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
  --sans:var(--font-sans),ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --r:8px;
  --ease:cubic-bezier(.22,.61,.36,1);
  --ease-out:cubic-bezier(.16,1,.3,1);
  /* étiquettes : meme écriture partout (champ, footer, carte) */
  --lbl:600 .74rem/1.2 var(--sans);
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
h1,h2,.wordmark-nom,.welcome-texte{font-family:var(--serif);font-weight:400}
h1{font-size:clamp(2.35rem,4.6vw,3.45rem);line-height:1.04;letter-spacing:-.035em}
h2{font-size:clamp(1.65rem,2.6vw,2.15rem);line-height:1.1;letter-spacing:-.03em}
h3{font-size:1.02rem;line-height:1.2;letter-spacing:-.015em}
p{margin:0 0 1rem;text-wrap:pretty}
a{color:inherit}
img{display:block;max-width:100%}
.wrap{max-width:1240px;margin:0 auto;padding:0 20px}
.muted{color:var(--muted)}
a[href^="tel"]{font-variant-numeric:tabular-nums}
/* Chaque section occupe au moins toute la hauteur de l'écran (svh : tient compte
   des barres d'adresse mobiles), en-tête fixe compris : le contenu est centré
   dans la zone visible sous l'en-tête. Une section plus longue que l'écran
   (galerie, contact) grandit simplement. */
/* Design « boutique » : seul le hero occupe tout l'écran ; les autres sections
   ont une hauteur naturelle, avec des marges régulières entre elles. */
main>section.hero{min-height:calc(100vh - 80px);min-height:calc(100svh - 80px)}
main>section.section{padding-top:clamp(44px,5vw,72px);padding-bottom:clamp(44px,5vw,72px)}
main{overflow-x:clip}
main>section>.wrap{width:100%}
section[id]{scroll-margin-top:16px}


/* ---------- header ---------- */
/* en-tête : en haut de page seulement, il défile avec le contenu et disparaît (pas fixe) */
.site-head{position:relative;z-index:50;color:var(--vert-nuit);
  background:transparent;transition:background .45s var(--ease),box-shadow .45s var(--ease),padding .45s var(--ease);padding:0}
.site-head::before{content:"";position:absolute;inset:0;background:#fff;border-bottom:1px solid #E3E5DC;z-index:-1}
.site-head.is-scrolled{box-shadow:0 6px 24px rgba(20,35,12,.18)}
.head-in{display:flex;align-items:center;justify-content:space-between;height:80px;
  transition:height .45s var(--ease)}
.head-logo{display:flex;align-items:center;gap:9px;color:var(--vert-nuit);text-decoration:none}
.logo-complet{display:block;height:50px;width:auto}
.logo-pied{height:60px}
.mark{transition:transform .6s var(--ease-out)}
.head-logo:hover .mark{transform:rotate(-8deg) scale(1.06)}
/* mêmes tailles que le texte du site (16,5 px) */
.head-nav{display:flex;align-items:center;gap:22px;font-size:16.5px}
.head-nav .btn-sm{font-size:16.5px}
.head-nav a:not(.btn){text-decoration:none;color:var(--vert-nuit);position:relative}
.head-nav a:not(.btn)::after{content:"";position:absolute;left:0;bottom:-6px;height:1.5px;width:100%;
  background:var(--terre);transform:scaleX(0);transform-origin:0 50%;transition:transform .35s var(--ease-out)}
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
.btn-light{background:#fff;color:var(--vert);border-color:#fff;box-shadow:0 4px 14px rgba(20,35,12,.18)}
.btn-light:hover{background:var(--creme);box-shadow:0 10px 24px rgba(20,35,12,.22)}
.btn-primary{background:var(--vert);color:#fff;box-shadow:0 6px 16px rgba(35,127,60,.3)}
.btn-primary:hover{background:var(--vert-fonce);box-shadow:0 12px 26px rgba(35,127,60,.35)}
.btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.7)}
.btn-ghost:hover{background:#fff;color:var(--vert);border-color:#fff}
.btn-sm{padding:9px 18px;min-height:40px;font-size:.9rem}
.btn-wa{background:#fff;color:var(--vert);border-color:var(--line);box-shadow:0 4px 12px rgba(20,35,12,.08)}
.btn-wa:hover{background:var(--creme);border-color:var(--vert)}

/* ---------- hero ---------- */
.hero{position:relative;background:var(--vert);color:#fff;padding:56px 0 64px;overflow:hidden}
/* PC : le hero occupe la hauteur de la fenêtre, contenu centré dans la zone
   utile (le padding haut dégage toujours l'en-tête fixe). Mobile : même
   hauteur de fenêtre, mais contenu calé en bas sur sa bande, l'image restant
   visible au-dessus. La colonne unique en minmax(0,1fr) garde au .wrap ses
   1080 px : sans elle, ses marges auto le réduiraient à la largeur de son
   contenu (892 px au lieu de 1040). */
@media (min-width:821px){
  .hero{min-height:calc(100vh - 80px);min-height:calc(100svh - 80px);display:grid;
    grid-template-columns:minmax(0,1fr);align-content:center}
  /* dans une grille, les marges auto du .wrap le font rétrécir à son contenu
     (892 px au lieu de 1040) : width:100% lui rend sa largeur mesurée. */
  .hero .hero-in{width:100%}
  /* le cadre suit la hauteur de la fenêtre (340 px → la largeur de sa colonne,
     ~423 px) : sinon il flotte, minuscule, dans un hero de 900 px de haut.
     Sélecteur doublé pour passer devant la règle .frame placée plus bas. */
  .hero .frame{max-width:clamp(340px,46vh,440px)}
  .hero-photo{justify-content:center}
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
.welcome{position:absolute;inset:0;z-index:5;display:grid;place-items:center;padding:0 24px;
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
.lieu-p0{grid-row:1 / span 2}
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
.btn-moutarde{background:var(--terre);color:#fff;box-shadow:0 6px 18px rgba(229,103,23,.38)}
.btn-moutarde:hover{background:#C9560F;box-shadow:0 12px 28px rgba(229,103,23,.42)}


/* ---------- galerie : planche-contact sur plaque de glace ----------
   La photo garde son ratio 3:4 (aucun recadrage) et ne recoit ni filtre ni nappe :
   c'est la plaque autour qui est translucide, éclairée par un liseré intérieur. */
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:30px}
.card{display:flex;flex-direction:column;text-decoration:none;color:inherit;overflow:hidden;
  background:#fff;border:1px solid var(--line);border-radius:14px;
  box-shadow:0 1px 2px rgba(20,35,12,.05),0 10px 26px rgba(20,35,12,.08);
  transition:transform .45s var(--ease-out),box-shadow .45s var(--ease-out),border-color .3s var(--ease)}
.card:hover{transform:translateY(-6px)!important;
  box-shadow:0 2px 4px rgba(20,35,12,.06),0 22px 44px rgba(20,35,12,.18)}
.card:focus-visible{outline:2px solid var(--moutarde);outline-offset:3px}
.card-img{position:relative;display:block;overflow:hidden;aspect-ratio:1/1;background:var(--creme)}
.card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s var(--ease-out)}
.card:hover .card-img img{transform:scale(1.07)}
.card-voir{position:absolute;left:50%;bottom:14px;z-index:1;transform:translate(-50%,12px);opacity:0;
  padding:7px 15px;border-radius:99px;background:var(--terre);color:#fff;
  font-size:.82rem;font-weight:600;white-space:nowrap;
  transition:opacity .35s var(--ease),transform .4s var(--ease-out)}
.card:hover .card-voir,.card:focus-visible .card-voir{opacity:1;transform:translate(-50%,0)}
.card-cap{display:grid;gap:3px;padding:12px 14px 15px}
.card-tag{font:600 .68rem/1.2 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--terre)}
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
.fiche-soin strong{display:block;font:600 .68rem/1.2 var(--sans);letter-spacing:.14em;
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

.hero-copy .eyebrow{margin:18px 0 -6px;font-size:.74rem;line-height:1.2;color:#F0C469}
/* collage du hero */
.collage{position:relative;width:min(100%,470px);aspect-ratio:1/1.12}
.collage img{position:absolute;object-fit:cover;border-radius:var(--r);
  border:3px solid rgba(255,255,255,.9);box-shadow:0 24px 60px rgba(8,20,18,.45)}
.collage-a{left:0;top:0;width:66%;height:84%}
.collage-b{right:0;bottom:0;width:50%;height:58%}

/* ---------- surtitres ---------- */
.eyebrow{margin:0 0 12px;font:700 .74rem/1.2 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--terre)}
.eyebrow-clair{color:#F0C469}


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
.feuille-p1{width:200px;left:-40px;bottom:-30px;transform-origin:50% 100%;opacity:.07}
@keyframes balance{from{transform:rotate(-7deg)}to{transform:rotate(8deg)}}

/* ---------- formulaire : indication WhatsApp ---------- */
.form-hint{margin:0;font-size:.88rem;color:var(--muted);padding:10px 12px;background:#F0F3EA;border-radius:var(--r)}

.foot-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:2px}
.foot-col a.foot-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:99px;
  border:1px solid rgba(255,255,255,.35);font-size:.92rem}
.foot-col a.foot-pill:hover{background:rgba(255,255,255,.12);border-color:#fff}
.foot-col a.foot-pill-insta{background:var(--terre);color:#fff;border-color:transparent;font-weight:600}

/* ---------- texture : grandes feuilles en filigrane (fournie), sur le hero, l'en-tête, le café et l'aménagement paysager ---------- */
.cafe,.pays{background-image:url(/texture-feuilles.png);background-size:cover;background-position:center}
/* header et hero partagent UNE seule texture : même taille, même point d'ancrage
   (haut de la page), donc le motif se prolonge sans coupure sous le header */
.hero{background-image:url(/texture-feuilles.png);background-size:cover;background-position:center}

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
  .cafe-photos{order:2}
  .grid{grid-template-columns:repeat(3,1fr)}
  .contact-in,.foot-in{grid-template-columns:1fr;gap:30px}
  /* pied de page centré sur mobile et tablette */
  .site-foot{text-align:center}
  .foot-in{justify-items:center}
  .site-foot .wordmark{justify-content:center}
  .foot-pills{justify-content:center}
  .foot-bottom{text-align:center;padding-bottom:56px}  /* dégage la ligne du bouton WhatsApp flottant */
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
  /* Mobile : la photo (collage) et le texte tiennent ensemble sur le premier écran.
     Le logo du hero et l'adresse, déjà présents dans l'en-tête et le pied de page,
     sont masqués pour gagner de la place. */
  .hero{min-height:calc(100vh - 80px);min-height:calc(100svh - 80px);display:grid;align-content:center;padding:28px 0 22px}
  .hero-bg{opacity:0}
  .hero-in{grid-template-columns:1fr;gap:16px}
  .hero-photo{display:flex;order:-1;justify-content:center}
  .hero-copy{background:none;padding:0;box-shadow:none}
  .hero-copy .eyebrow{margin:0 0 6px}
  .hero-copy h1{margin:0 0 10px;font-size:clamp(1.85rem,8.4vw,2.4rem);max-width:none}
  .hero-copy p{font-size:1rem;line-height:1.5}
  .hero-cta{margin-top:18px}
  .hero-cta{display:grid;grid-template-columns:1fr;gap:10px}
  .hero-cta .btn{padding:14px 16px}
  .head-nav{gap:12px}
  .head-nav a:not(.btn){display:none}
  .lieu-photos,.cafe-photos{height:420px}
  .section{padding:48px 0}
  .grid{grid-template-columns:repeat(3,1fr);gap:12px}
}
@media (max-width:620px){
  .grid{grid-template-columns:repeat(2,1fr)}
  .card-nom{font-size:.95rem}.card-cap{padding:10px 11px 13px}
}
/* tablettes en portrait : collage et titre plus grands */
@media (min-width:600px) and (max-width:820px){
  .collage{width:min(100%,400px);aspect-ratio:1/.78}
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
.burger{display:none;width:44px;height:44px;margin-left:4px;border:0;border-radius:50%;background:#EEF0E6;
  cursor:pointer;position:relative;flex:none}
.burger span{position:absolute;left:12px;right:12px;height:2px;border-radius:2px;background:var(--vert-nuit);
  transition:transform .35s var(--ease-out),opacity .2s var(--ease),top .35s var(--ease-out)}
.burger span:nth-child(1){top:15px}.burger span:nth-child(2){top:21px}.burger span:nth-child(3){top:27px}
.burger.ouvert span:nth-child(1){top:21px;transform:rotate(45deg)}
.burger.ouvert span:nth-child(2){opacity:0}
.burger.ouvert span:nth-child(3){top:21px;transform:rotate(-45deg)}
.burger:focus-visible{outline:3px solid var(--terre);outline-offset:2px}
.menu-mobile{position:fixed;inset:0;z-index:49;display:flex;flex-direction:column;justify-content:center;gap:28px;
  padding:96px 28px 32px;background:var(--vert-fonce);background-image:url(/texture-feuilles.png);background-size:cover;background-position:center;
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

/* ---------- survol des images : un léger battement ----------
   La propriété « scale » est indépendante de « transform » : elle ne gêne ni le
   parallaxe, ni l'apparition au défilement, ni le zoom des cartes. */
@keyframes pouls{0%,100%{scale:1}50%{scale:1.045}}
.collage img:hover,.lieu-p:hover,.cafe-p:hover,.cow-p:hover,.pays-visuel img:hover,.video:hover{animation:pouls 1.3s ease-in-out infinite}
.card:hover .card-img img,.card:focus-visible .card-img img{animation:pouls 1.3s ease-in-out infinite}


/* ---------- design « boutique de plantes » (inspiré de la maquette) ---------- */
.hero-photo{position:relative;display:flex;justify-content:center}
.arche{width:min(100%,380px);aspect-ratio:3/4;overflow:hidden;border-radius:999px 999px 24px 24px;
  background:var(--creme);padding:10px;box-shadow:0 24px 60px rgba(0,0,0,.35)}
.arche img{width:100%;height:100%;object-fit:cover;border-radius:999px 999px 16px 16px}
.pastille-ronde{position:absolute;right:6%;bottom:30%;display:grid;place-items:center;width:84px;height:84px;
  border-radius:50%;background:var(--vert-nuit);color:#fff;text-align:center;font:600 .78rem/1.2 var(--sans);
  border:2px solid rgba(255,255,255,.35);box-shadow:0 10px 24px rgba(0,0,0,.35)}
.services{background:var(--vert-nuit);color:#fff}
.services-in{display:grid;grid-template-columns:repeat(3,1fr);padding-top:26px;padding-bottom:26px}
.service{display:flex;align-items:center;gap:14px;padding:0 24px;border-left:1px solid rgba(255,255,255,.18)}
.service:first-child{border-left:0;padding-left:0}
.service-ico{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;flex:none;
  border:1px solid rgba(255,255,255,.35);color:#fff}
.service-txt{display:grid;gap:1px;min-width:0}
.service-txt strong{font-weight:700;font-size:.98rem}
.service-txt span{font-size:.84rem;color:rgba(255,255,255,.72)}
.bandeau{background:var(--vert-nuit);color:#fff}
.bandeau h2{color:#fff}
.bandeau .lede{color:rgba(255,255,255,.8)}
.bandeau-in{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(28px,5vw,72px);align-items:center}
.bandeau-ronds{position:relative;height:clamp(260px,30vw,380px)}
.rond{position:absolute;height:auto;border-radius:50%;object-fit:cover;border:6px solid var(--creme);box-shadow:0 18px 40px rgba(0,0,0,.4)}
.rond-a{left:0;bottom:0;width:62%;aspect-ratio:1}
.rond-b{right:0;top:0;width:52%;aspect-ratio:1}
.conseils{background:var(--creme)}
.conseils-grille{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:30px}
.conseil{display:grid;gap:8px;justify-items:center;text-align:center;padding:28px 22px;border-radius:14px;background:#fff;
  border:1px solid var(--line)}
.conseil-ico{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;background:var(--vert);color:#fff;margin-bottom:4px}
.conseil h3{margin:0;font:500 1.3rem/1.2 var(--serif)}
.conseil p{margin:0;color:var(--muted);font-size:.96rem}
/* cartes plantes : tuile grise, étiquette orange */
.card{background:#E3E5DC;border-color:transparent;box-shadow:none}
.card-cap{background:transparent}
.card-tag{color:var(--terre)}
.filtre.on{background:var(--vert)}
@media (max-width:900px){
  .services-in{grid-template-columns:1fr;gap:16px}
  .service{border-left:0;padding:0}
  .bandeau-in{grid-template-columns:1fr}
  .conseils-grille{grid-template-columns:1fr}
  .pastille-ronde{width:72px;height:72px;right:0}
  .arche{width:min(100%,250px)}
}


/* ---------- page « boutique de plantes » : cartes promo, galerie, duo, avis ---------- */
.galerie .eyebrow,.galerie h2,.galerie .lede{text-align:center}
.galerie .lede{margin-left:auto;margin-right:auto}
.galerie .filtres{justify-content:center}
.avisband{background:#DDE0D7}
.avisband .eyebrow,.avisband h2,.avisband .lede{text-align:center}
.avisband .lede{margin-left:auto;margin-right:auto}
.duo{background:var(--creme)}
.duo-in{display:grid;grid-template-columns:1.1fr 1fr;gap:0;align-items:stretch;border-radius:16px;overflow:hidden;background:#E3E5DC}
.duo-photo{position:relative;min-height:380px}
.duo-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.duo-carte{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:12px;padding:clamp(24px,4vw,48px)}
.duo-carte h2{margin:0}
.duo-carte p{margin:0;color:var(--muted)}
.duo-note{font-size:.9rem}
.conseil{background:transparent;border:0;padding:10px 18px}
.conseils .eyebrow,.conseils h2,.conseils .lede{text-align:center}
.conseils .lede{margin-left:auto;margin-right:auto}
.site-foot a.foot-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:99px;border:1px solid rgba(255,255,255,.35);font-size:.92rem;text-decoration:none}
.site-foot a.foot-pill:hover{background:rgba(255,255,255,.12);border-color:#fff}
.site-foot a.foot-pill-insta{background:var(--terre);color:#fff;border-color:transparent;font-weight:600}
.foot-in{grid-template-columns:1.1fr 1.3fr .7fr}
.foot-marque{display:grid;gap:12px;justify-items:center;text-align:center}
.foot-marque p{margin:0;max-width:34ch;color:rgba(255,255,255,.8);font-size:.95rem}
.foot-pages{display:grid;gap:6px;align-content:start;justify-items:start}
.foot-pages strong{margin-bottom:4px}
@media (max-width:900px){
    .duo-in{grid-template-columns:1fr}
  .foot-in{grid-template-columns:1fr}
  .foot-pages{justify-items:center}
}


/* ---------- finitions « maquette » ---------- */
/* section des cartes promo : fond vert très pâle, cartes grises */
/* titre de la galerie : filet court dessous, comme la maquette */
.galerie h2::after{content:"";display:block;width:72px;height:2px;margin:12px auto 0;background:var(--vert)}
.galerie .eyebrow{display:none}
/* cartes plantes : tuile grise, photo dedans, légende dessous */
.card{background:transparent;border:0;box-shadow:none;overflow:visible;gap:10px}
.card:hover{box-shadow:none}
.card-img{background:#DCDCD4;padding:14px;border-radius:14px;transition:background .35s var(--ease)}
.card-img img{border-radius:9px}
.card:hover .card-img,.card:focus-visible .card-img{background:#8FCB7C}
.card-cap{padding:0 4px}
.card-soins{display:none}
/* bandeau vert compact */
.bandeau{padding:30px 0;overflow:hidden}
.conseils .eyebrow,.avisband .eyebrow{display:none}
.bandeau-in{grid-template-columns:auto 1.1fr 1.2fr;gap:clamp(20px,4vw,56px);align-items:center}
.bandeau-ronds{position:relative;width:210px;height:130px}
.rond{border-width:4px;box-shadow:none}
.rond-a{left:0;bottom:0;width:104px}
.rond-b{right:0;top:0;width:124px}
.bandeau h2{margin:0;font-size:clamp(1.6rem,3vw,2.5rem)}
.bandeau-txt{display:grid;gap:12px;justify-items:start}
.bandeau-txt p{margin:0;font-size:.92rem;color:rgba(255,255,255,.82)}
/* bloc image + texte : titre en gras, comme la maquette */
.duo-carte h2{font-family:var(--sans);font-weight:700;font-size:clamp(1.15rem,1.9vw,1.5rem);line-height:1.3;letter-spacing:0}
@media (max-width:900px){
  .bandeau-in{grid-template-columns:1fr;justify-items:center;text-align:center}
  .bandeau-txt{justify-items:center}
}

/* ---------- contact : deux colonnes, carte blanche à champs pointillés ---------- */
.contact{background:var(--creme)}
.contact-in{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,64px);align-items:start}
.ct-titre{margin:0 0 10px;font:700 1.25rem/1.2 var(--sans);color:var(--vert-nuit)}
.ct-texte{margin:0 0 16px;color:var(--muted);font-size:.95rem}
.ct-liste{list-style:none;margin:0 0 26px;padding:0;display:grid;gap:12px}
.ct-liste li{display:flex;align-items:center;gap:12px;font-size:.98rem}
.ct-liste a{text-decoration:none;color:inherit}
.ct-liste a:hover{color:var(--vert);text-decoration:underline}
.ct-ico{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--vert);color:#fff;flex:none}
.ct-loc{margin-top:6px}
.ct-adr{display:grid;gap:2px;margin-bottom:14px}
.ct-adr span{color:var(--muted);font-size:.9rem}
.loc-map{width:min(100%,440px);margin-bottom:16px;border-radius:18px;overflow:hidden;box-shadow:0 10px 26px rgba(20,35,12,.14)}
.loc-map .map{margin:0;border:0;border-radius:18px}
.contact .geo{max-width:440px}
.ct-droite{display:grid;justify-items:start}
.ct-pastille{display:inline-block;padding:5px 22px;border:1px solid var(--vert-nuit);border-radius:999px;font-size:.9rem;color:var(--vert-nuit);background:#fff}
.ct-grand{margin:14px 0 22px;font:700 clamp(2rem,4.4vw,3.2rem)/1.1 var(--serif);color:var(--vert-nuit);letter-spacing:-.02em}
.ct-form{width:100%;max-width:none;margin:0;padding:clamp(20px,3vw,32px);background:#fff;border:0;border-radius:24px;
  box-shadow:0 14px 40px rgba(20,35,12,.16);backdrop-filter:none;-webkit-backdrop-filter:none;gap:16px}
.ct-form label{font:700 .88rem/1.2 var(--sans);letter-spacing:0;text-transform:none;color:var(--vert-nuit)}
.ct-form input,.ct-form select,.ct-form textarea{background:#fff;border:1.5px solid #C9D2C0;border-radius:20px;box-shadow:none;
  padding:12px 18px;font-weight:400}
.ct-form textarea{border-radius:22px;resize:vertical}
.ct-form input:hover,.ct-form select:hover,.ct-form textarea:hover{background:#fff;border-color:#9DB092}
.ct-form input:focus,.ct-form select:focus,.ct-form textarea:focus{background:#fff;border-color:var(--vert);
  box-shadow:0 0 0 3px rgba(35,127,60,.2)}
@media (max-width:900px){.contact-in{grid-template-columns:1fr}.ct-droite{order:-1}}

/* ---------- harmonisation : mêmes rayons, mêmes ombres, mêmes titres, fonds alternés ---------- */
:root{--r-carte:16px;--ombre-carte:0 10px 28px rgba(20,35,12,.10)}
.card-img,.duo-in,.avis,.conseil,.loc-map,.loc-map .map,.carte{border-radius:var(--r-carte)}
.ct-form{border-radius:20px}
.avis,.duo-in,.loc-map{box-shadow:var(--ombre-carte)}
/* titres de section : même taille, même filet court sous les titres centrés */
.galerie h2,.conseils h2,.avisband h2{font-size:clamp(1.8rem,3vw,2.4rem)}
.conseils h2::after,.avisband h2::after{content:"";display:block;width:72px;height:2px;margin:12px auto 0;background:var(--vert)}
.duo-carte h2,.ct-grand{letter-spacing:-.01em}
/* fonds : crème / blanc en alternance, fonds colorés pour les bandes */
.galerie{background:var(--creme)}
.conseils{background:#fff}
.duo{background:var(--creme)}
.avisband{background:#E3E7DB}
.contact .loc-map{box-shadow:var(--ombre-carte)}
.ct-form{box-shadow:0 14px 40px rgba(20,35,12,.14);border:1px solid #E9ECE2}
.conseil{border:0}
/* un seul style de bouton secondaire */
.btn-wa{background:#fff;color:var(--vert);border:1.5px solid var(--vert);box-shadow:none}
.btn-wa:hover{background:var(--vert);color:#fff;border-color:var(--vert)}
.btn-geo{background:#fff;color:var(--vert);border:1.5px solid var(--vert);box-shadow:none}
.btn-geo:hover:not(:disabled){background:var(--vert);color:#fff}

/* ---------- vitrine de plantes (plante à la une + défilé) ---------- */
.vitrine{background:var(--creme);padding:clamp(40px,5vw,64px) 0}
.vit-panneau{background:#DDE8E1;border-radius:26px;padding:clamp(22px,3.4vw,44px);overflow:hidden}
.vit-tete{display:grid;grid-template-columns:1.2fr 1fr;gap:clamp(20px,4vw,56px);align-items:end}
.vit-k{margin:0 0 6px;font-family:var(--serif);font-size:1.35rem;color:var(--vert)}
.vit-tete h2{margin:0;font-size:clamp(2rem,4.4vw,3.4rem);line-height:1.04;color:var(--vert-nuit)}
.vit-intro{margin:0;color:#4B5A52;max-width:40ch}
.vit-label{margin:26px 0 12px;font-weight:700;font-size:.9rem;color:var(--vert-nuit)}
.vit-scene{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,2.6fr);gap:clamp(14px,2vw,26px);align-items:end}
.vit-vedette,.vit-carte{font:inherit;color:inherit;cursor:pointer;border:0;padding:0;text-align:left}
.vit-vedette{position:relative;display:block;border-radius:20px;overflow:hidden;background:#EAF1EC;
  box-shadow:0 18px 40px rgba(20,35,12,.18);aspect-ratio:3/4;animation:vitEntree .7s var(--ease-out) both}
.vit-vedette img{width:100%;height:100%;object-fit:cover;display:block;animation:vitZoom 5s ease-out both}
.vit-vedette-txt{position:absolute;inset:auto 0 0 0;display:grid;gap:4px;padding:46px 16px 16px;
  background:linear-gradient(to top,rgba(11,36,23,.78),rgba(11,36,23,0));color:#fff}
.vit-vedette-txt strong{font:400 1.3rem/1.15 var(--serif)}
.vit-vedette-txt span{font-size:.85rem;line-height:1.4;color:rgba(255,255,255,.88);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.vit-vedette-txt em{font-style:normal;font-weight:700;font-size:.82rem;color:#F6C26B}
.vit-piste{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(10px,1.6vw,20px)}
.vit-carte{display:grid;gap:10px;justify-items:start;background:#EAF1EC;border-radius:16px;padding:10px 10px 14px;
  box-shadow:0 10px 26px rgba(20,35,12,.10);animation:vitGlisse .65s var(--ease-out) both;animation-delay:calc(var(--k) * 70ms);
  transition:transform .35s var(--ease-out),box-shadow .35s var(--ease-out)}
.vit-carte:hover,.vit-carte:focus-visible{transform:translateY(-6px);box-shadow:0 18px 36px rgba(20,35,12,.2)}
.vit-carte img{width:100%;height:auto;aspect-ratio:4/5;object-fit:cover;border-radius:11px;display:block}
.vit-carte span{font:700 .88rem/1.25 var(--sans);color:var(--vert-nuit);padding:0 4px}
.vit-commandes{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:22px}
.vit-fleche{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;border:1.5px solid var(--vert);
  background:#fff;color:var(--vert);font-size:1.4rem;line-height:1;cursor:pointer;transition:background .25s,color .25s}
.vit-fleche:hover{background:var(--vert);color:#fff}
.vit-points{display:flex;gap:7px}
.vit-points i{width:8px;height:8px;border-radius:50%;background:#B9CBBF;transition:width .35s var(--ease-out),background .3s}
.vit-points i.on{width:24px;border-radius:99px;background:var(--vert)}
@keyframes vitEntree{from{opacity:0;transform:translateX(-26px) scale(.96)}to{opacity:1;transform:none}}
@keyframes vitGlisse{from{opacity:0;transform:translateX(70px)}to{opacity:1;transform:none}}
@keyframes vitZoom{from{transform:scale(1.12)}to{transform:scale(1)}}
.paysa{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:18px;padding:20px 26px;
  background:#fff;border-radius:var(--r-carte,16px);box-shadow:var(--ombre-carte,0 10px 28px rgba(20,35,12,.1))}
.paysa strong{display:block;font:400 1.4rem/1.2 var(--serif);color:var(--vert-nuit)}
.paysa span{color:var(--muted);font-size:.94rem}
@media (max-width:900px){
  .vit-tete{grid-template-columns:1fr}
  .vit-scene{grid-template-columns:1fr}
  .vit-vedette{aspect-ratio:4/3}
  .vit-piste{grid-template-columns:repeat(4,64%);overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;
    margin:0 calc(-1 * clamp(22px,3.4vw,44px));padding:4px clamp(22px,3.4vw,44px) 14px;scrollbar-width:none}
  .vit-piste::-webkit-scrollbar{display:none}
  .vit-carte{scroll-snap-align:start}
  .paysa{flex-direction:column;align-items:flex-start}
}

/* ---------- pied de page : 3 colonnes alignées en haut, titres identiques ---------- */
.site-foot{padding:clamp(48px,6vw,72px) 0 28px}
.foot-in{grid-template-columns:1.5fr 1.1fr .8fr;gap:clamp(28px,5vw,64px);align-items:start}
.foot-marque{justify-items:start;text-align:left;gap:16px}
.foot-marque p{max-width:36ch}
.foot-titre{margin:0 0 8px;font:700 .8rem/1.2 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.62)}
.foot-col p{margin:0 0 20px}
.foot-pages{gap:8px}
.foot-pages .foot-titre{margin-bottom:6px}
.foot-bottom{margin-top:36px}
@media (max-width:900px){
  .site-foot{text-align:center}
  .foot-in{grid-template-columns:1fr;justify-items:center;gap:30px}
  .foot-marque{justify-items:center;text-align:center}
  .foot-pills{justify-content:center}
  .foot-pages{justify-items:center}
}

/* ---------- harmonisation (2) : tous les titres en Chapaza, mêmes tailles, mêmes fonds de cartes ---------- */
.duo-carte h2{font-family:var(--serif);font-weight:400;font-size:clamp(1.8rem,3vw,2.4rem);line-height:1.1}
.ct-grand{font-weight:400;font-size:clamp(1.8rem,3vw,2.4rem);margin:0 0 20px}
.ct-titre{font:400 1.5rem/1.2 var(--serif)}
.duo-in{background:#fff}
.duo-note{margin-top:2px}
.vit-label{font-weight:500}
/* ---------- accessibilité : mouvement réduit ---------- */
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important;transition:none!important}
  .js [data-reveal]{opacity:1;transform:none;filter:none;clip-path:none}
  .rise{opacity:1}
}
`;
