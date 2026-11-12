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
  "colocasia-cintho-aloha": ["rare", "Un colocasia aux grandes feuilles en forme de cœur, qui donne un effet tropical immédiat. Il apprécie un sol frais."],
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

/* Posts Instagram d'Exoticas (@exoticasbj). Les photos sont enregistrées dans
   public/instagram/ ; chaque tuile renvoie au post d'origine sur Instagram. */
const INSTAGRAM_POSTS = [
  { src: "/instagram/etagere-plantes.jpg", post: "https://www.instagram.com/exoticasbj/p/DezeDSMAP3b/",
    alt: "Plantes vertes en pots et suspensions sur des étagères, à la boutique Exoticas" },
  { src: "/instagram/monstera-feuilles.jpg", post: "https://www.instagram.com/exoticasbj/p/DeSAQNVgABW/",
    alt: "Grandes feuilles de monstera devant une fenêtre, chez Exoticas" },
  { src: "/instagram/succulentes.jpg", post: "https://www.instagram.com/exoticasbj/reel/DerGnqLAWJ1/",
    alt: "Rangée de succulentes et de cactus à la pépinière Exoticas" },
  { src: "/instagram/terrasse-cafe.jpg", post: "https://www.instagram.com/exoticasbj/reel/De9x7_FASdC/",
    alt: "Chaises et tables de la terrasse café d'Exoticas, à Cotonou" },
  { src: "/instagram/boutique-interieur.jpg", post: "https://www.instagram.com/exoticasbj/reel/DdjrLlIB4jx/",
    alt: "Intérieur de la boutique Exoticas, plantes et mobilier chiné" },
  { src: "/instagram/boutique-plante.jpg", post: "https://www.instagram.com/exoticasbj/reel/Dd1rxYQAmpg/",
    alt: "Une cliente tenant une plante dans la boutique Exoticas" },
];

/* Vitrine animée : plantes de la boutique détourées (public/plantes) avec leur pot
   d'origine, recouvert par un même pot blanc dessiné à sa place.
   Pour chaque photo : w × h en pixels, et la boîte du pot d'origine en fractions de
   l'image (x0-x1 en largeur, yr = haut du rebord, yb = fond). Le pot blanc reprend
   cette boîte, élargie de 12 % et rehaussée de 7 % pour la masquer entièrement.
   Il en faut au moins 7 pour que le défilé ait toujours une plante qui sort à gauche
   et une qui entre à droite. */
const VITRINE_PLANTES = [
  { s: "pink-princess", w: 570, h: 760, x0: 0.14, x1: 0.75, yr: 0.65, yb: 0.99 },
  { s: "begonia-masoniana-ou-begonia-croix-de-fer", w: 666, h: 760, x0: 0.2, x1: 0.62, yr: 0.47, yb: 0.86 },
  { s: "monstera-delicioca-variegata", w: 471, h: 653, x0: 0.1, x1: 0.64, yr: 0.605, yb: 1 },
  { s: "peperomia-raindrop", w: 449, h: 760, x0: 0.4, x1: 0.97, yr: 0.61, yb: 1 },
  { s: "colocasia-cintho-aloha", w: 760, h: 665, x0: 0.2, x1: 0.56, yr: 0.55, yb: 0.99 },
  { s: "spathiphyllium", w: 550, h: 760, x0: 0.13, x1: 0.6, yr: 0.66, yb: 0.98 },
  { s: "epipremnum-2", w: 747, h: 760, x0: 0.2, x1: 0.69, yr: 0.47, yb: 0.93 },
  { s: "tradescantia-zebrina", w: 662, h: 760, x0: 0.27, x1: 0.8, yr: 0.57, yb: 0.98 },
];
/* liens de navigation, communs à l'en-tête et au menu mobile (ancres de l'accueil : /#…) */
const LIENS: [string, string][] = [
  ["/plantes", "Plantes"],
  ["/#paysagisme", "Paysagisme"],
  ["/#cafe", "Café & coworking"],
  ["/#conseils", "Conseils"],
  ["/#avis", "Avis"],
  ["/#contact", "Contact"],
];

const POT_LARGE = 1.12;
const POT_HAUT = 1.07;
const VITRINE = VITRINE_PLANTES.map((v) => {
  const iw = 1 / ((v.x1 - v.x0) * POT_LARGE); // largeur de la photo, en largeurs de pot
  const ratio = ((v.yb - v.yr) * v.h * POT_HAUT) / ((v.x1 - v.x0) * v.w * POT_LARGE); // hauteur / largeur du pot
  const fh = iw * (v.h / v.w); // hauteur du feuillage, en largeurs de pot
  return {
    s: v.s,
    i: PLANTES.findIndex((p) => p.s === v.s),
    vars: { "--iw": iw.toFixed(4), "--cx": ((v.x0 + v.x1) / 2).toFixed(4), "--yb": v.yb, "--ratio": ratio.toFixed(4), "--fh": fh.toFixed(4) },
  };
}).filter((v) => v.i >= 0);


/* Pot blanc commun à toutes les plantes de la vitrine : rebord, corps légèrement
   conique, ombré à droite comme sous une lumière venant de gauche. */
function Pot() {
  return (
    <svg className="pot" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="pot-corps" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#F4F6F3" />
          <stop offset=".22" stopColor="#FFFFFF" />
          <stop offset=".62" stopColor="#F6F8F5" />
          <stop offset="1" stopColor="#D5DDD8" />
        </linearGradient>
        <linearGradient id="pot-bord" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#F7F9F6" />
          <stop offset=".3" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DFE6E1" />
        </linearGradient>
      </defs>
      <path d="M0 10H100L97 95.5Q96.5 100 92 100H8Q3.5 100 3 95.5Z" fill="url(#pot-corps)" />
      <path d="M0 10H100L99.6 15H.4Z" fill="#000" opacity=".06" />
      <rect x="0" y="0" width="100" height="10.5" rx="2" fill="url(#pot-bord)" />
    </svg>
  );
}

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

/* ------------------------------------------------------------------
   « 4 astuces » : un jardinier illustré montre chaque geste, une astuce
   après l'autre (emplacement, arrosage, terreau, humidité). La scène est
   rejouée à chaque changement (clé = étape) ; la liste à côté indique
   l'astuce en cours avec une barre de progression. Pause au survol.
------------------------------------------------------------------ */
const ASTUCES = [
  { t: "Choisir le bon emplacement", d: "Une lumière vive, sans soleil direct qui brûle les feuilles." },
  { t: "Arroser avec modération", d: "Quand le dessus du terreau est sec, jamais d'eau dans la soucoupe." },
  { t: "Choisir le bon terreau", d: "Léger et drainant, et un rempotage tous les un à deux ans." },
  { t: "Surveiller l'humidité", d: "Les plantes tropicales aiment l'air humide : brumisez leurs feuilles." },
];
const DUREE_ASTUCE = 5200;

function SceneAstuce({ etape }: { etape: number }) {
  const peau = "#8A5634";
  return (
    <svg key={etape} className={`scene e${etape}`} viewBox="0 0 420 400" role="img" aria-label={ASTUCES[etape].t}>
      {/* fenêtre et soleil */}
      <g className="fenetre">
        <rect x="232" y="34" width="124" height="112" rx="8" fill="#D9EEF3" stroke="#B07A4B" strokeWidth="7" />
        <path d="M294 34V146M232 90H356" stroke="#B07A4B" strokeWidth="5" />
        <g className="soleil">
          <circle cx="326" cy="62" r="13" fill="#F2B53A" />
          <g className="rayons" stroke="#F2B53A" strokeWidth="3" strokeLinecap="round">
            <path d="M326 40v-6M326 90v-6M304 62h-6M354 62h-6M311 47l-4-4M345 81l-4-4M341 47l4-4M307 81l4-4" />
          </g>
        </g>
      </g>
      <polygon className="rayon-lumiere" points="244,146 344,146 352,252 258,252" fill="#FFD95A" />
      {/* sol */}
      <ellipse cx="210" cy="352" rx="170" ry="10" fill="#000" opacity=".08" />
      {/* tabouret */}
      <rect x="250" y="300" width="110" height="12" rx="4" fill="#B07A4B" />
      <rect x="262" y="312" width="10" height="40" rx="3" fill="#8F5F38" />
      <rect x="338" y="312" width="10" height="40" rx="3" fill="#8F5F38" />
      {/* plante */}
      <g className="plante-scene">
        <g className="feuilles">
          <path d="M305 250C300 222 290 206 276 192M305 250C309 218 320 198 336 182M305 250C304 222 306 196 306 168" stroke="#2E7D3A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="268" cy="184" rx="27" ry="15" transform="rotate(-32 268 184)" fill="#3E9B4F" />
          <ellipse cx="343" cy="174" rx="29" ry="16" transform="rotate(26 343 174)" fill="#2F8A43" />
          <ellipse cx="306" cy="148" rx="18" ry="31" fill="#4FAE5F" />
          <path d="M306 124V172M252 194L284 174M330 166L358 184" stroke="#A7D9A2" strokeWidth="2" strokeLinecap="round" opacity=".7" />
          <g className="gouttelettes" fill="#CFEFFA" stroke="#9FD3E6" strokeWidth="1">
            <circle cx="262" cy="180" r="3" /><circle cx="300" cy="140" r="3" /><circle cx="312" cy="160" r="2.5" /><circle cx="348" cy="170" r="3" /><circle cx="336" cy="180" r="2.5" />
          </g>
        </g>
        <path d="M276 252H334L328 300H282Z" fill="#D9824B" />
        <rect x="272" y="246" width="66" height="12" rx="3" fill="#E5925A" />
        <ellipse cx="305" cy="249" rx="28" ry="3.5" fill="#5B3A24" />
      </g>
      {/* gouttes d'eau, terreau, brume (hors du bras, en coordonnées de la scène) */}
      <g className="eau" fill="#7CC4E4">
        <ellipse cx="282" cy="128" rx="3" ry="5" /><ellipse cx="287" cy="126" rx="3" ry="5" /><ellipse cx="284" cy="132" rx="3" ry="5" />
      </g>
      <g className="terre" fill="#5B3A24">
        <circle cx="255" cy="142" r="3.5" /><circle cx="259" cy="138" r="3" /><circle cx="251" cy="140" r="2.5" /><circle cx="257" cy="146" r="3" />
      </g>
      <g className="brume" fill="#FFFFFF">
        <circle cx="212" cy="92" r="6" /><circle cx="212" cy="92" r="6" /><circle cx="212" cy="92" r="6" />
      </g>
      {/* jardinier */}
      <g className="perso">
        <rect x="100" y="250" width="18" height="92" rx="8" fill="#2B3A4A" />
        <rect x="124" y="250" width="18" height="92" rx="8" fill="#26333F" />
        <ellipse cx="111" cy="344" rx="15" ry="6" fill="#1E1E1E" />
        <ellipse cx="136" cy="344" rx="15" ry="6" fill="#1E1E1E" />
        <rect x="82" y="152" width="14" height="80" rx="7" fill="#1D6B32" />
        <circle cx="89" cy="234" r="7.5" fill={peau} />
        <path d="M92 162Q92 146 108 146H134Q150 146 150 162V258H92Z" fill="#237F3C" />
        <path d="M100 196H142V258H100Z" fill="#E9DCC6" opacity=".9" />
        <path d="M108 196V182M134 196V182" stroke="#E9DCC6" strokeWidth="3" />
        <rect x="114" y="132" width="14" height="18" rx="4" fill={peau} />
        <circle cx="121" cy="116" r="24" fill={peau} />
        <path d="M96 114Q95 88 121 88Q148 88 146 112Q139 102 122 102Q104 102 96 114Z" fill="#1F1A17" />
        <ellipse className="oeil" cx="133" cy="117" rx="2.6" ry="2.8" fill="#1F1A17" />
        <path d="M130 127Q136 131 141 126" stroke="#1F1A17" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* bras droit + accessoire tenu en main */}
        <g className="bras">
          <g className="acc acc-1 arrosoir">
            <path d="M200 140Q218 118 236 140" stroke="#5E8FA3" strokeWidth="5" fill="none" />
            <rect x="196" y="140" width="46" height="34" rx="7" fill="#8DB3C2" />
            <path d="M242 152L276 128" stroke="#8DB3C2" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="279" cy="126" rx="5" ry="7" transform="rotate(-35 279 126)" fill="#5E8FA3" />
          </g>
          <g className="acc acc-2 sac">
            <path d="M194 128H236L240 182H190Z" fill="#C9A27A" />
            <rect x="196" y="146" width="40" height="18" fill="#237F3C" />
            <text x="216" y="159" textAnchor="middle" fontSize="8" fontWeight="600" fill="#fff" fontFamily="sans-serif">TERREAU</text>
            <path d="M194 128L236 128L246 120L204 120Z" fill="#B38B62" />
          </g>
          <g className="acc acc-3 spray">
            <rect x="194" y="136" width="20" height="36" rx="6" fill="#EAF4F7" stroke="#9FC1CF" strokeWidth="2" />
            <rect x="196" y="124" width="26" height="12" rx="3" fill="#237F3C" />
            <rect x="221" y="127" width="8" height="4" rx="1" fill="#1A5E2C" />
            <path className="gachette" d="M206 136L202 146" stroke="#1A5E2C" strokeWidth="3" strokeLinecap="round" />
          </g>
          <rect x="136" y="150" width="60" height="14" rx="7" fill="#237F3C" />
          <circle cx="198" cy="157" r="8" fill={peau} />
        </g>
      </g>
    </svg>
  );
}

/* Jardinière souriante, chapeau de paille, arrosoir à la main : illustration de la
   section paysagisme. Dégradés pour le relief (même lumière que les pots : haut gauche).
   Animée en CSS : respiration, chapeau qui bouge, arrosoir qui verse, pousse qui grandit. */
function Jardiniere() {
  return (
    <svg className="jardiniere" viewBox="0 0 400 460" role="img" aria-label="Une jardinière d'Exoticas, souriante, chapeau de paille sur la tête, arrose de jeunes plantes">
      <defs>
        <radialGradient id="j-peau" cx=".38" cy=".32" r=".75">
          <stop offset="0" stopColor="#A86E47" />
          <stop offset="1" stopColor="#74452A" />
        </radialGradient>
        <linearGradient id="j-paille" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6DC9C" />
          <stop offset="1" stopColor="#D6A247" />
        </linearGradient>
        <linearGradient id="j-tablier" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#30A050" />
          <stop offset="1" stopColor="#1C6B33" />
        </linearGradient>
        <linearGradient id="j-chemise" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FBF1DE" />
          <stop offset="1" stopColor="#E6D3B2" />
        </linearGradient>
        <linearGradient id="j-arrosoir" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A9D2E0" />
          <stop offset="1" stopColor="#5B93A9" />
        </linearGradient>
        <linearGradient id="j-pot" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F09C62" />
          <stop offset="1" stopColor="#C4672F" />
        </linearGradient>
      </defs>

      <ellipse cx="230" cy="452" rx="165" ry="7" fill="#000" opacity=".07" />

      {/* pots arrosés */}
      <g className="j-pots">
        <g className="j-pousse">
          <path d="M365 400Q363 380 366 362" stroke="#2E7D3A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="352" cy="372" rx="13" ry="6.5" transform="rotate(-28 352 372)" fill="#45A457" />
          <ellipse cx="380" cy="366" rx="14" ry="6.5" transform="rotate(24 380 366)" fill="#2F8A43" />
          <ellipse cx="366" cy="352" rx="7" ry="12" fill="#5DBB6C" />
        </g>
        <path d="M338 404H392L386 452H344Z" fill="url(#j-pot)" />
        <rect x="333" y="397" width="64" height="11" rx="3" fill="#F2A36C" />
        <ellipse cx="365" cy="401" rx="26" ry="3" fill="#4E3220" />
        <path d="M304 438Q302 424 306 414M306 424Q296 418 292 410M306 420Q316 414 320 406" stroke="#2E7D3A" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <circle cx="306" cy="410" r="5" fill="#F2B53A" />
        <path d="M288 432H324L320 456H292Z" fill="url(#j-pot)" />
        <rect x="285" y="427" width="42" height="8" rx="2.5" fill="#F2A36C" />
        <g className="j-eclats" fill="#F2B53A">
          <path d="M392 340l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
          <path d="M334 352l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z" />
        </g>
      </g>

      {/* eau */}
      <g className="j-eau" fill="#7CC4E4">
        <ellipse cx="380" cy="334" rx="2.6" ry="4.5" /><ellipse cx="385" cy="332" rx="2.6" ry="4.5" />
        <ellipse cx="382" cy="338" rx="2.6" ry="4.5" /><ellipse cx="377" cy="336" rx="2.6" ry="4.5" />
      </g>

      <g className="j-corps">
        {/* cheveux (arrière) et tresses */}
        <path d="M128 172Q120 118 175 110Q232 114 224 176Q226 212 214 236H136Q124 208 128 172Z" fill="#1E1612" />
        <g fill="#1E1612">
          <circle cx="136" cy="238" r="9.5" /><circle cx="133" cy="255" r="9" /><circle cx="131" cy="271" r="8.5" /><circle cx="130" cy="286" r="8" />
          <circle cx="214" cy="238" r="9.5" /><circle cx="217" cy="255" r="9" /><circle cx="219" cy="271" r="8.5" /><circle cx="220" cy="286" r="8" />
        </g>
        <circle cx="130" cy="298" r="5" fill="#237F3C" /><circle cx="220" cy="298" r="5" fill="#237F3C" />

        {/* buste */}
        <rect x="160" y="208" width="30" height="44" rx="11" fill="url(#j-peau)" />
        <path d="M98 300Q102 256 150 246H200Q248 256 252 300L264 460H86Z" fill="url(#j-chemise)" />
        <path d="M158 246L175 270L192 246" fill="none" stroke="#D9C29C" strokeWidth="3" strokeLinejoin="round" />
        <path d="M124 304H226L238 460H112Z" fill="url(#j-tablier)" />
        <rect x="140" y="282" width="70" height="52" rx="9" fill="url(#j-tablier)" />
        <path d="M141 290L132 252M209 290L218 252" stroke="#1F7136" strokeWidth="9" strokeLinecap="round" />
        <circle cx="141" cy="292" r="4.5" fill="#F2B53A" /><circle cx="209" cy="292" r="4.5" fill="#F2B53A" />
        <rect x="157" y="302" width="36" height="26" rx="6" fill="#000" opacity=".13" />
        <path d="M168 302Q168 290 178 286Q180 296 172 302" fill="#7FCB8B" />

        {/* bras gauche, main sur la poche */}
        <path d="M106 268Q86 300 90 352" stroke="url(#j-chemise)" strokeWidth="28" fill="none" strokeLinecap="round" />
        <path d="M90 352Q92 382 104 400" stroke="#8A5634" strokeWidth="19" fill="none" strokeLinecap="round" />
        <circle cx="106" cy="404" r="12" fill="#8A5634" />

        {/* tête */}
        <ellipse cx="131" cy="172" rx="7" ry="10" fill="#7E4D2F" />
        <ellipse cx="219" cy="172" rx="7" ry="10" fill="#7E4D2F" />
        <circle cx="131" cy="190" r="5" fill="none" stroke="#F2B53A" strokeWidth="3" />
        <circle cx="219" cy="190" r="5" fill="none" stroke="#F2B53A" strokeWidth="3" />
        <ellipse cx="175" cy="166" rx="44" ry="50" fill="url(#j-peau)" />
        <path d="M150 150Q160 144 170 148M182 148Q192 144 202 150" stroke="#1E1612" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M152 168Q160 160 168 168M184 168Q192 160 200 168" stroke="#1E1612" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M176 174Q171 186 178 188" stroke="#5E331C" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M153 194Q176 222 199 194Q176 203 153 194Z" fill="#FFFFFF" stroke="#4A2614" strokeWidth="2.4" strokeLinejoin="round" />
        <ellipse cx="147" cy="188" rx="9" ry="5" fill="#E3735E" opacity=".35" />
        <ellipse cx="205" cy="188" rx="9" ry="5" fill="#E3735E" opacity=".35" />

        {/* chapeau de paille */}
        <g className="j-chapeau">
          <ellipse cx="175" cy="126" rx="106" ry="23" fill="url(#j-paille)" />
          <ellipse cx="175" cy="126" rx="90" ry="17" fill="none" stroke="#C38F3A" strokeWidth="1.5" opacity=".5" />
          <ellipse cx="175" cy="127" rx="72" ry="12" fill="none" stroke="#C38F3A" strokeWidth="1.5" opacity=".45" />
          <path d="M128 124Q126 72 175 68Q224 72 222 124Q175 132 128 124Z" fill="url(#j-paille)" />
          <path d="M131 96Q175 86 219 96M129 108Q175 98 221 108" stroke="#C38F3A" strokeWidth="1.4" fill="none" opacity=".45" />
          <path d="M128 110Q175 102 222 110L222 124Q175 132 128 124Z" fill="#237F3C" />
          <ellipse cx="208" cy="112" rx="9" ry="5" transform="rotate(-30 208 112)" fill="#7FCB8B" />
          <circle cx="199" cy="116" r="5" fill="#F2B53A" />
        </g>

        {/* bras droit + arrosoir */}
        <path d="M246 270Q272 298 280 330" stroke="url(#j-chemise)" strokeWidth="28" fill="none" strokeLinecap="round" />
        <g className="j-arrosoir">
          <path d="M300 300Q316 262 346 290" stroke="#4F8599" strokeWidth="7" fill="none" strokeLinecap="round" />
          <rect x="296" y="292" width="62" height="46" rx="10" fill="url(#j-arrosoir)" />
          <ellipse cx="327" cy="293" rx="31" ry="5" fill="#C4E4EE" />
          <path d="M306 304H326" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".55" />
          <path d="M356 320L388 296" stroke="#6FA6BB" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="391" cy="293" rx="6" ry="9" transform="rotate(-36 391 293)" fill="#4F8599" />
        </g>
        <path d="M280 330Q300 318 314 288" stroke="#8A5634" strokeWidth="19" fill="none" strokeLinecap="round" />
        <circle cx="316" cy="284" r="12" fill="#8A5634" />
      </g>
    </svg>
  );
}

function AstucesAnimees() {
  const [etape, setEtape] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setEtape((e) => (e + 1) % ASTUCES.length), DUREE_ASTUCE);
    return () => window.clearTimeout(t);
  }, [etape, pause]);
  return (
    <div
      className={`astuces${pause ? " en-pause" : ""}`}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      style={{ "--duree": `${DUREE_ASTUCE}ms` } as React.CSSProperties}
    >
      <div className="astuce-scene" data-reveal>
        <SceneAstuce etape={etape} />
        <span className="astuce-num" aria-hidden="true">0{etape + 1}</span>
      </div>
      <ol className="astuces-liste">
        {ASTUCES.map((a, k) => (
          <li key={a.t}>
            <button
              type="button"
              className={k === etape ? "on" : ""}
              aria-current={k === etape ? "step" : undefined}
              onClick={() => setEtape(k)}
            >
              <span className="astuce-k">0{k + 1}</span>
              <span className="astuce-txt">
                <strong>{a.t}</strong>
                <span>{a.d}</span>
              </span>
              {k === etape && <span key={`b-${etape}`} className="astuce-barre" aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Icône « boutique » fournie par Exoticas (sac vert, pousse citron), redessinée en vecteur */
function BoutiqueIcone({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="130 92 476 548" aria-hidden="true">
      <path d="M268 138Q275 110 300 110Q330 112 328 142L316 240Q314 292 368 292Q422 292 420 240L408 142Q406 112 436 110Q462 110 468 138L580 520Q598 625 500 625H236Q138 625 156 520Z" fill="#0BBF2A" />
      <g fill="#9BFF00">
        <circle cx="368" cy="432" r="50" />
        <circle cx="274" cy="474" r="46" />
        <circle cx="462" cy="474" r="46" />
        <path d="M228 474Q238 572 368 572Q498 572 508 474Z" />
      </g>
    </svg>
  );
}

function PanierIcone({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 8h14l-1.3 11.1a2 2 0 0 1-2 1.9H8.3a2 2 0 0 1-2-1.9L5 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PotIcone({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14l-1.6 8.2a1 1 0 0 1-1 .8H7.6a1 1 0 0 1-1-.8L5 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 12V6M12 8c-1-2.6-3.4-3.4-5.5-3 .3 2.4 2.6 3.6 5.5 3ZM12 7c1-2.2 3-3 5-2.6-.3 2.1-2.4 3.1-5 2.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function HumiditeIcone({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 3s4 4.1 4 7a4 4 0 0 1-8 0c0-2.9 4-7 4-7ZM16.5 10s3.5 3.6 3.5 6.1a3.5 3.5 0 0 1-7 0c0-2.5 3.5-6.1 3.5-6.1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
/* flèche tracée à la main, comme sur les visuels Instagram d'Exoticas */
function Fleche({ className = "" }: { className?: string }) {
  return (
    <svg className={`fleche ${className}`} viewBox="0 0 120 70" fill="none" aria-hidden="true">
      <path d="M6 22C30 4 72 2 98 26c6 6 9 14 10 22" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M96 40l12 10 8-14" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
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

/* Composant commun aux deux pages : l'accueil (vue = "accueil") et la page
   des plantes (vue = "plantes"), qui partagent en-tête, pied de page, styles et fiche plante. */
export default function Site({ vue = "accueil" }: { vue?: "accueil" | "plantes" }) {
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

  /* Panier (page Plantes) : identifiant de plante → quantité, gardé dans ce navigateur.
     La commande part sur WhatsApp, déjà rédigée ; Exoticas confirme prix, disponibilité et délai. */
  const [panier, setPanier] = useState<Record<string, number>>({});
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [commande, setCommande] = useState({ nom: "", tel: "", mode: "retrait", adresse: "", note: "" });
  const panierLu = useRef(false);
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem("exo-panier") || "{}");
      if (v && typeof v === "object") setPanier(v);
    } catch {
      /* stockage indisponible : panier vide, rien de grave */
    }
    panierLu.current = true;
  }, []);
  useEffect(() => {
    if (!panierLu.current) return;
    try {
      localStorage.setItem("exo-panier", JSON.stringify(panier));
    } catch {
      /* navigation privée : le panier vit le temps de la visite */
    }
  }, [panier]);
  const ajouter = (slug: string, d = 1) =>
    setPanier((pa) => {
      const q = Math.max(0, (pa[slug] ?? 0) + d);
      const n = { ...pa };
      if (q === 0) delete n[slug];
      else n[slug] = Math.min(q, 99);
      return n;
    });
  const lignes = Object.entries(panier)
    .map(([slug, q]) => ({ i: PLANTES.findIndex((pl) => pl.s === slug), q }))
    .filter((l) => l.i >= 0 && l.q > 0);
  const nbArticles = lignes.reduce((t, l) => t + l.q, 0);
  const quantite = (slug: string, q: number, nom: string) => (
    <span className="qte">
      <button type="button" aria-label={`Retirer un ${nom}`} onClick={() => ajouter(slug, -1)}>−</button>
      <span aria-live="polite">{q}</span>
      <button type="button" aria-label={`Ajouter un ${nom}`} onClick={() => ajouter(slug, 1)}>+</button>
    </span>
  );
  function envoyerCommande(e: React.FormEvent) {
    e.preventDefault();
    if (lignes.length === 0) return;
    const liste = lignes.map((l) => `- ${l.q} × ${nomUnique(l.i)}`).join("\n");
    const msg =
      `Bonjour Exoticas, je souhaite commander :\n${liste}\n\n` +
      `Nom : ${commande.nom || "—"}\n` +
      `Téléphone : ${commande.tel || "—"}\n` +
      (commande.mode === "livraison" ? `Livraison à : ${commande.adresse || "—"}\n` : "Retrait en boutique\n") +
      (commande.note.trim() ? `Note : ${commande.note.trim()}\n` : "") +
      `\nPouvez-vous me confirmer les prix, la disponibilité et le délai ? Merci.`;
    window.open(waLink(msg), "_blank", "noopener");
  }

  /* panneau de commande : Échap pour fermer, page figée derrière */
  useEffect(() => {
    if (!panierOuvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setPanierOuvert(false);
    window.addEventListener("keydown", touche);
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", touche);
      document.body.style.overflow = avant;
    };
  }, [panierOuvert]);
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
    const t = window.setInterval(() => setVedette((v) => v + 1), 2000);
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
    if (vue !== "accueil" || lancee.current) return;
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
  }, [vue]);

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

  /* Relief 3D à la souris (souris seulement, et pas si l'on a demandé moins d'animations) :
     - [data-tilt] : la carte pivote vers le pointeur, un reflet suit le pointeur ;
     - hero : chaque calque (texte, plante, étiquettes, feuilles) bouge selon sa profondeur. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const off: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      const bouge = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", `${((x - 0.5) * 10).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${((0.5 - y) * 8).toFixed(2)}deg`);
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      };
      const entre = () => el.classList.add("tilt-on");
      const sort = () => {
        el.classList.remove("tilt-on");
        el.style.removeProperty("--rx");
        el.style.removeProperty("--ry");
      };
      el.addEventListener("pointerenter", entre);
      el.addEventListener("pointermove", bouge);
      el.addEventListener("pointerleave", sort);
      off.push(() => {
        el.removeEventListener("pointerenter", entre);
        el.removeEventListener("pointermove", bouge);
        el.removeEventListener("pointerleave", sort);
      });
    });
    const hero = document.querySelector<HTMLElement>(".hero");
    if (hero) {
      const bouge = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        hero.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      };
      const sort = () => {
        hero.style.setProperty("--px", "0");
        hero.style.setProperty("--py", "0");
      };
      hero.addEventListener("pointermove", bouge);
      hero.addEventListener("pointerleave", sort);
      off.push(() => {
        hero.removeEventListener("pointermove", bouge);
        hero.removeEventListener("pointerleave", sort);
      });
    }
    return () => off.forEach((f) => f());
  }, [vue, affiche, filtre]);

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
          <a href="/" className="head-logo" aria-label="Exoticas, accueil">
            <Logo size={36} verte />
          </a>
          <nav className="head-nav" aria-label="Navigation principale">
            {LIENS.map(([h, n]) => (
              <a key={h} href={h} className={vue === "plantes" && h === "/plantes" ? "actif" : undefined} aria-current={vue === "plantes" && h === "/plantes" ? "page" : undefined}>
                {n}
              </a>
            ))}
          </nav>
          <div className="head-actions">
            <a className="head-tel" href={BRAND.telHref} aria-label={`Appeler Exoticas : ${BRAND.tel}`}>
              <span className="head-tel-ico"><PhoneIcon size={15} /></span>
              <span className="head-tel-num">{BRAND.tel}</span>
            </a>
            {vue === "plantes" ? (
              <button type="button" className="head-cta" onClick={() => setPanierOuvert(true)} aria-label={`Ouvrir le panier : ${nbArticles} plante${nbArticles > 1 ? "s" : ""}`}>
                <PanierIcone size={18} /> <span className="head-cta-txt">Panier</span>
                {nbArticles > 0 && <span className="head-cta-nb">{nbArticles}</span>}
              </button>
            ) : (
              <a className="head-cta" href="/plantes">
                <PanierIcone size={18} /> <span className="head-cta-txt">Commander</span>
              </a>
            )}
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
          </div>
        </div>
      </header>

      <div id="menu-mobile" className={`menu-mobile${menu ? " ouvert" : ""}`} aria-hidden={!menu}>
        <nav aria-label="Menu mobile">
          {LIENS.map(([h, n], i) => (
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
        {vue === "accueil" && (
          <>
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
              <p className="hero-k rise" style={{ "--d": "100ms" } as React.CSSProperties}>Paysagisme · Plantes rares · Café</p>
              <h1 className="rise" style={{ "--d": "160ms" } as React.CSSProperties}>
                <span className="hero-titre-ligne">La vie en <em>vert</em>,</span>
                <span className="hero-titre-label">à Cotonou.</span>
              </h1>
              <p className="hero-texte rise" style={{ "--d": "260ms" } as React.CSSProperties}>
                Aménagement paysager sur mesure et plantes rares de la boutique.{" "}
                <br />Une terrasse café et un coworking au milieu des plantes, à Tokpa-hoho.
              </p>
              <div className="hero-cta rise" style={{ "--d": "360ms" } as React.CSSProperties}>
                <a className="btn btn-primary" href="/plantes">Voir la boutique</a>
                <a className="btn btn-contour" href="/#contact">Demander un devis</a>
              </div>
              <dl className="hero-reperes rise" style={{ "--d": "460ms" } as React.CSSProperties}>
                <div><dt>Boutique</dt><dd>{PLANTES.length} plantes</dd></div>
                <div><dt>Paysagisme</dt><dd>Sur mesure</dd></div>
                <div><dt>Café</dt><dd>&amp; coworking</dd></div>
              </dl>
            </div>
            <Fleche className="hero-fleche" />
            <div className="hero-photo rise" style={{ "--d": "320ms" } as React.CSSProperties}>
              <span className="hero-halo" aria-hidden="true" />
              {/* feuillage seul (coupé au bord de son pot d'origine), dans un pot blanc plus compact */}
              <span className="hero-pep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="hero-feuillage" src="/plantes/epipremnum-2-feuillage.webp" width={1031} height={498} alt="Pothos panaché en pot, plante de la boutique Exoticas à Cotonou" fetchPriority="high" decoding="async" />
                <Pot />
              </span>
              <span className="hero-ombre" aria-hidden="true" />
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
              <div key={x.t} className="service rv-pop" data-reveal data-tilt style={{ "--d": `${k * 100}ms` } as React.CSSProperties}>
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
                  <p className="vit-k">Notre sélection</p>
                  <h2>Le monde des <strong className="souligne">plantes rares</strong></h2>
                </div>
                <p className="vit-intro">
                  Découvrez les plantes de la boutique, leurs besoins et leurs
                  petites habitudes : chacune se choisit et s'entretient avec
                  nos conseils.
                </p>
              </div>
              <div className="vit-top">
                <p>Nos coups de cœur</p>
                <div className="vit-nav">
                  <button type="button" aria-label="Plante précédente" onClick={() => setVedette((v) => v - 1)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button type="button" aria-label="Plante suivante" onClick={() => setVedette((v) => v + 1)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
              <div className="vit-rang" role="group" aria-roledescription="carrousel" aria-label="Sélection de plantes">
                {VITRINE.map(({ i: idx, vars }, i) => {
                  const N = VITRINE.length;
                  const r = (((i - vedette) % N) + N) % N;
                  /* r = place dans le défilé : 0 = à la une, 1-4 = cartes, 5-6 = hors champ à droite, N-1 = vient de sortir à gauche */
                  const slot = r === N - 1 ? "sm" : `s${Math.min(r, 6)}`;
                  const actif = r === 0;
                  const visible = r <= 4;
                  const pl = PLANTES[idx];
                  return (
                    <button
                      type="button"
                      key={idx}
                      className={`vit-item ${slot}${actif ? " on" : ""}`}
                      aria-hidden={visible ? undefined : true}
                      tabIndex={visible ? 0 : -1}
                      aria-label={actif ? `Voir la fiche : ${nomUnique(idx)}` : `Mettre en avant : ${nomUnique(idx)}`}
                      onClick={() => (actif ? ouvrirPlante(idx) : setVedette((v) => v + r))}
                      style={vars as React.CSSProperties}
                    >
                      <span className="vit-carte" aria-hidden="true" />
                      <span className="vit-plante">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="vit-feuillage" src={`/plantes/${pl.s}.webp`} alt={`${nomUnique(idx)}, plante de la boutique Exoticas à Cotonou`} loading="lazy" decoding="async" />
                        <Pot />
                      </span>
                      <span className="vit-legende">
                        <strong>{pl.n}</strong>
                        <span className="vit-cat">{CAT[(INFOS[pl.s] ?? ["interieur"])[0]].t}</span>
                        <span className="vit-detail">
                          <span>{INFOS[pl.s]?.[1]}</span>
                          <em>Voir la fiche →</em>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="vit-plus">
                <a className="btn btn-primary" href="/plantes">Voir toutes les plantes</a>
              </div>
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

        {/* PAYSAGISME : jardinière illustrée */}
        <section id="paysagisme" className="section paysa">
          <div className="wrap paysa-in">
            <div className="paysa-texte">
              <p data-reveal className="eyebrow reveal">Aménagement paysager</p>
              <h2 data-reveal className="reveal">Des jardins qui vous <strong className="souligne">ressemblent</strong></h2>
              <p data-reveal className="reveal lede" style={{ "--d": "90ms" } as React.CSSProperties}>
                De la terrasse au grand jardin, nous imaginons, plantons et entretenons
                vos espaces verts, avec des plantes adaptées au climat de Cotonou.
              </p>
              <ul className="paysa-liste">
                {[
                  ["Conception sur mesure", "Visite, idées et plan de plantation adaptés à votre espace."],
                  ["Plantation et installation", "Plantes, pots, terreau et arrosage : nous posons tout."],
                  ["Entretien régulier", "Taille, soins et conseils de saison pour un jardin toujours beau."],
                ].map(([t, d], k) => (
                  <li key={t} data-reveal className="reveal" style={{ "--d": `${140 + k * 90}ms` } as React.CSSProperties}>
                    <span className="paysa-coche" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span><strong>{t}</strong>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="paysa-cta" data-reveal style={{ "--d": "380ms" } as React.CSSProperties}>
                <a className="btn btn-primary" href="/#contact">Demander un devis</a>
                <a className="btn btn-moutarde" href={waLink("Bonjour Exoticas, je voudrais un devis pour aménager mon espace. Je vous envoie une photo.")} target="_blank" rel="noopener">
                  <WhatsAppIcon size={18} /> Envoyer une photo
                </a>
              </div>
            </div>
            <div className="paysa-illu" data-reveal>
              <Jardiniere />
            </div>
          </div>
        </section>

        {/* CONSEILS */}
        <section id="conseils" className="section conseils">
          <div className="wrap">
            <p data-reveal className="eyebrow reveal">4 astuces pour</p>
            <h2 data-reveal className="reveal">Prendre soin de <strong className="souligne">vos plantes</strong></h2>
            <AstucesAnimees />
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
              <p className="eyebrow">Café · Coworking</p>
              <h2>Terrasse café et coworking, <strong className="souligne">au milieu des plantes</strong></h2>
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
            <h2 data-reveal className="reveal">Ce que disent <strong className="souligne">nos clients</strong></h2>
            <p data-reveal className="reveal lede" style={{ "--d": "90ms" } as React.CSSProperties}>
              Leurs avis, publiés sur Google.
            </p>
            <div className="avis-liste">
              {AVIS.map((a, i) => (
                <blockquote
                  data-reveal
                  className="reveal avis"
                  data-tilt
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

        {/* INSTAGRAM */}
        <section id="instagram" className="section insta">
          <div className="wrap">
            <div className="insta-tete">
              <div>
                <p data-reveal className="eyebrow reveal">Instagram</p>
                <h2 data-reveal className="reveal">Faites vivre votre <strong className="souligne">oasis</strong> au quotidien</h2>
              </div>
              <a className="insta-profil" href={BRAND.instagram} target="_blank" rel="noopener me" data-reveal>
                <span className="insta-avatar">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo/marque-verte.png" alt="" width={56} height={58} loading="lazy" decoding="async" />
                </span>
                <span className="insta-nom"><strong>@exoticasbj</strong><span>Plantes, café et coworking à Cotonou</span></span>
                <span className="btn btn-primary btn-sm"><InstagramIcon size={16} /> Suivre</span>
              </a>
            </div>
            <div className="insta-grille">
              {INSTAGRAM_POSTS.map((x, k) => (
                <a key={x.src} className="insta-tuile" href={x.post} target="_blank" rel="noopener me" data-reveal data-tilt style={{ "--d": `${k * 70}ms` } as React.CSSProperties}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={x.src} alt={x.alt} loading="lazy" decoding="async" />
                  <span className="insta-voile" aria-hidden="true"><InstagramIcon size={26} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

          </>
        )}

        {vue === "plantes" && (
          <>
        {/* GALERIE */}
        <section id="galerie" className="section galerie galerie-page">
          <div className="wrap">
            <a className="retour" href="/">← Retour à l'accueil</a>
            <div className="bp-tete">
              <p data-reveal className="bp-k reveal">Toutes nos plantes</p>
              <h1 data-reveal className="bp-titre reveal">La boutique</h1>
              <p data-reveal className="bp-intro reveal" style={{ "--d": "90ms" } as React.CSSProperties}>
                {visibles.length} plantes photographiées à la boutique. Ajoutez-les au panier,
                puis envoyez votre commande sur WhatsApp.
              </p>
            </div>
            <ol className="bp-etapes" aria-label="Comment commander">
              {[
                ["Ajoutez vos plantes", "Au panier, avec les quantités souhaitées."],
                ["Envoyez la commande", "Sur WhatsApp, le message est déjà rédigé."],
                ["Retrait ou livraison", "Nous confirmons prix, disponibilité et délai."],
              ].map(([t, d], k) => (
                <li key={t} data-reveal className="reveal" style={{ "--d": `${120 + k * 80}ms` } as React.CSSProperties}>
                  <span className="bp-etape-n">{k + 1}</span>
                  <span><strong>{t}</strong>{d}</span>
                </li>
              ))}
            </ol>
            <div className="filtres bp-onglets" role="group" aria-label="Filtrer les plantes">
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
            <div className="bp-grille">
              {affichees.map((i) => {
                const p = PLANTES[i];
                const [cat] = INFOS[p.s] ?? ["interieur"];
                return (
                  <div
                    className="bp-carte reveal"
                    data-panier={panier[p.s] ? "" : undefined}
                    data-reveal
                    data-tilt
                    style={{ "--d": `${(i % 3) * 80}ms` } as React.CSSProperties}
                    key={p.s}
                  >
                    <button type="button" className="bp-ouvrir" aria-label={`Voir la fiche : ${nomUnique(i)}`} aria-haspopup="dialog" onClick={() => setFiche(i)}>
                      <span className="bp-visuel">
                        <span className="bp-forme" aria-hidden="true" />
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
                        <span className="bp-coeur" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 20.5s-8-4.9-8-11A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8 2.9c0 6.1-8 11-8 11Z" fill="currentColor" /></svg>
                        </span>
                      </span>
                      <span className="bp-legende">
                        <span className="bp-nom">{p.n}</span>
                        <span className="bp-cat">{CAT[cat].t}</span>
                        <span className="bp-soins">
                          <span><SoleilIcone size={14} /> {CAT[cat].lc}</span>
                          <span><GoutteIcone size={14} /> {CAT[cat].ac}</span>
                        </span>
                      </span>
                    </button>
                    <div className="bp-action">
                      {panier[p.s] ? (
                        quantite(p.s, panier[p.s], nomUnique(i))
                      ) : (
                        <button type="button" className="btn-ajout" onClick={() => ajouter(p.s)} aria-label={`Ajouter au panier : ${nomUnique(i)}`}>
                          <PanierIcone size={17} /> Ajouter
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {visibles.length > affiche && (
              <div className="centre voir-plus">
                <button type="button" className="btn btn-primary bp-plus" onClick={() => setPaliers((n) => n + 1)}>
                  Voir plus de plantes
                </button>
              </div>
            )}
          </div>
        </section>

          </>
        )}

        {/* APPEL À VENIR : repris du dernier visuel des carrousels Instagram (accueil seulement) */}
        {vue === "accueil" && (
        <section className="jungle">
          <div className="wrap jungle-in">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-reveal className="reveal jungle-logo" src="/logo/logo-complet-blanc.png" width={946} height={289} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <h2 data-reveal className="reveal" style={{ "--d": "80ms" } as React.CSSProperties}>
              Prêt à créer <strong className="souligne">votre oasis</strong> tropicale ?
            </h2>
            <p data-reveal className="reveal" style={{ "--d": "160ms" } as React.CSSProperties}>
              Passez nous voir en boutique pour des <strong>conseils personnalisés</strong>.
            </p>
            <a data-reveal className="reveal jungle-tel" style={{ "--d": "240ms" } as React.CSSProperties} href={BRAND.telHref}>
              <PhoneIcon size={22} /> {BRAND.tel}
            </a>
            <p data-reveal className="reveal jungle-adr" style={{ "--d": "300ms" } as React.CSSProperties}>
              <PinIcon size={26} />
              <span>Boutique Exoticas, 2ème rue après Acropole<br />face au Z Club</span>
            </p>
            <Fleche className="jungle-fleche" />
          </div>
        </section>
        )}

        {vue === "accueil" && (
          <>
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
              <h2 className="ct-grand">Écrivez-<strong className="souligne">nous</strong></h2>
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
                <label className="ct-msg">
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
          </>
        )}
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
            <a href="/plantes">Plantes</a>
            <a href="/#cafe">Café et coworking</a>
            <a href="/#paysagisme">Paysagisme</a>
            <a href="/#avis">Avis</a>
            <a href="/#contact">Contact</a>
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
                <p className="fiche-note">Photographiée à la boutique. Prix et disponibilité : confirmés sur WhatsApp.</p>
                {vue === "plantes" && (
                  <div className="fiche-panier">
                    {panier[p.s] ? (
                      <>
                        {quantite(p.s, panier[p.s], nomUnique(fiche))}
                        <button type="button" className="fiche-voir-panier" onClick={() => { setFiche(null); setPanierOuvert(true); }}>
                          Voir le panier →
                        </button>
                      </>
                    ) : (
                      <button type="button" className="btn btn-primary" onClick={() => ajouter(p.s)}>
                        <PanierIcone size={18} /> Ajouter au panier
                      </button>
                    )}
                  </div>
                )}
                <a
                  className={`btn ${vue === "plantes" ? "btn-wa" : "btn-moutarde"}`}
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

      {vue === "plantes" && nbArticles > 0 && !panierOuvert && fiche === null && (
        <button type="button" className="panier-barre" onClick={() => setPanierOuvert(true)}>
          <span className="panier-ico"><PanierIcone size={20} /><span className="panier-nb">{nbArticles}</span></span>
          <span className="panier-resume">{nbArticles} plante{nbArticles > 1 ? "s" : ""} dans le panier</span>
          <strong>Commander →</strong>
        </button>
      )}

      {vue === "plantes" && panierOuvert && (
        <div className="panier-fond" role="dialog" aria-modal="true" aria-label="Votre commande" onClick={(e) => { if (e.target === e.currentTarget) setPanierOuvert(false); }}>
          <aside className="panier">
            <div className="panier-tete">
              <h2>Votre commande</h2>
              <button type="button" className="panier-x" onClick={() => setPanierOuvert(false)} aria-label="Fermer le panier">×</button>
            </div>
            {lignes.length === 0 ? (
              <p className="panier-vide">Votre panier est vide : ajoutez des plantes depuis la boutique.</p>
            ) : (
              <ul className="panier-liste">
                {lignes.map((l) => {
                  const pl = PLANTES[l.i];
                  const [cat] = INFOS[pl.s] ?? ["interieur"];
                  return (
                    <li key={pl.s}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/galerie/mini/${pl.s}.jpg`} alt="" width={56} height={56} loading="lazy" decoding="async" />
                      <span className="panier-nom"><strong>{nomUnique(l.i)}</strong><span>{CAT[cat].t}</span></span>
                      {quantite(pl.s, l.q, nomUnique(l.i))}
                      <button type="button" className="panier-retirer" aria-label={`Retirer ${nomUnique(l.i)} du panier`} onClick={() => ajouter(pl.s, -l.q)}>×</button>
                    </li>
                  );
                })}
              </ul>
            )}
            <form className="panier-form" onSubmit={envoyerCommande}>
              <label>
                Nom
                <input required value={commande.nom} onChange={(e) => setCommande((c) => ({ ...c, nom: e.target.value }))} placeholder="Votre nom" autoComplete="name" />
              </label>
              <label>
                Téléphone
                <input required type="tel" value={commande.tel} onChange={(e) => setCommande((c) => ({ ...c, tel: e.target.value }))} placeholder="01 …" autoComplete="tel" />
              </label>
              <fieldset className="panier-mode">
                <legend>Réception</legend>
                {[["retrait", "Retrait en boutique"], ["livraison", "Livraison"]].map(([v, t]) => (
                  <label key={v} className={commande.mode === v ? "on" : ""}>
                    <input type="radio" name="mode" value={v} checked={commande.mode === v} onChange={() => setCommande((c) => ({ ...c, mode: v }))} />
                    {t}
                  </label>
                ))}
              </fieldset>
              {commande.mode === "livraison" && (
                <label>
                  Adresse de livraison
                  <input required value={commande.adresse} onChange={(e) => setCommande((c) => ({ ...c, adresse: e.target.value }))} placeholder="Quartier, rue, repère…" autoComplete="street-address" />
                </label>
              )}
              <label>
                <span>Note <span className="facultatif">(facultatif)</span></span>
                <textarea rows={3} value={commande.note} onChange={(e) => setCommande((c) => ({ ...c, note: e.target.value }))} placeholder="Taille de pot, cadeau, horaire de passage…" />
              </label>
              <p className="form-hint">
                Les prix ne sont pas affichés en ligne : nous vous confirmons prix, disponibilité,
                livraison et délai sur WhatsApp avant toute validation.
              </p>
              <button className="btn btn-moutarde" type="submit" disabled={lignes.length === 0}>
                <WhatsAppIcon size={18} /> Envoyer la commande sur WhatsApp
              </button>
              {lignes.length > 0 && (
                <button type="button" className="panier-vider" onClick={() => setPanier({})}>Vider le panier</button>
              )}
            </form>
          </aside>
        </div>
      )}

      {/* bouton flottant « boutique » : vers la boutique depuis l'accueil, ouvre le panier sur la page Plantes
          (il s'efface devant la barre du panier dès qu'il y a des plantes) */}
      {vue === "plantes" ? (
        nbArticles === 0 && (
          <button type="button" className="boutique-fixed" onClick={() => setPanierOuvert(true)} aria-label="Ouvrir le panier">
            <BoutiqueIcone />
            <span className="boutique-etiquette">Panier</span>
          </button>
        )
      ) : (
        <a className="boutique-fixed" href="/plantes" aria-label="Voir la boutique et commander">
          <BoutiqueIcone />
          <span className="boutique-etiquette">Boutique</span>
        </a>
      )}
    </>
  );
}

/* ------------------------------------------------------------------
   Styles + animations
------------------------------------------------------------------ */

const css = `
/* =====================================================================
   EXOTICAS — charte des visuels Instagram
   - vert #237F3C en aplat, avec les grandes feuilles en filigrane
   - texte blanc en Futura : Book pour la phrase, Medium pour le mot clé
   - le mot clé est souligné d'un coup de pinceau
   - flèches tracées à la main, arche crème, formes festonnées pâles
   - orange #E56717 réservé aux boutons d'action
   ===================================================================== */
:root{
  --vert:#237F3C;
  --vert-fonce:#237F3C;
  --vert-nuit:#237F3C;
  --vert-ombre:rgba(0,0,0,.2);
  --vert-pale:#DCE9D6;
  --vert-tres-pale:#EEF4EA;
  --moutarde:#E1A32D;
  --terre:#E56717;
  --creme:#F3F8F1; /* fond clair unique : vert très pâle (plus de beige) */
  --texte:#16231B;
  --muted:#5D675F;
  --line:#E3DED2;
  --serif:var(--font-serif),Georgia,serif;
  --sans:var(--font-sans),ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --r:12px;
  --r-carte:22px;
  --r-xl:32px;
  --ease:cubic-bezier(.22,.61,.36,1);
  --ease-out:cubic-bezier(.16,1,.3,1);
  --ombre-douce:0 1px 2px rgba(16,38,26,.05),0 14px 34px rgba(16,38,26,.09);
  --head-h:72px;
  /* relief 3D : reflet en haut, ombre courte de contact + ombre longue et douce */
  --relief-carte:inset 0 1px 0 rgba(255,255,255,.9),0 1px 2px rgba(20,60,30,.06),0 4px 10px -2px rgba(20,60,30,.06),0 22px 44px -16px rgba(20,60,30,.24);
  --relief-carte-h:inset 0 1px 0 rgba(255,255,255,.9),0 2px 4px rgba(20,60,30,.07),0 8px 16px -4px rgba(20,60,30,.08),0 34px 60px -18px rgba(20,60,30,.3);
  --head-top:0px; /* barre collée en haut de la page */
  --sec:clamp(72px,9vw,124px);
  --feuilles:url(/texture-feuilles.png);
  --pinceau-blanc:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 16' preserveAspectRatio='none'%3E%3Cg fill='none' stroke='white' stroke-linecap='round'%3E%3Cpath d='M3 9C45 4 120 2 197 6' stroke-width='5'/%3E%3Cpath d='M14 13C60 9 130 8 184 10' stroke-width='2.4'/%3E%3C/g%3E%3C/svg%3E");
  --pinceau-orange:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 16' preserveAspectRatio='none'%3E%3Cg fill='none' stroke='%23E56717' stroke-linecap='round'%3E%3Cpath d='M3 9C45 4 120 2 197 6' stroke-width='5'/%3E%3Cpath d='M14 13C60 9 130 8 184 10' stroke-width='2.4'/%3E%3C/g%3E%3C/svg%3E");
  --feston:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 108 108'%3E%3Cg fill='black'%3E%3Ccircle cx='50' cy='50' r='42'/%3E%3Ccircle cx='90' cy='50' r='12'/%3E%3Ccircle cx='84.6' cy='70' r='12'/%3E%3Ccircle cx='70' cy='84.6' r='12'/%3E%3Ccircle cx='50' cy='90' r='12'/%3E%3Ccircle cx='30' cy='84.6' r='12'/%3E%3Ccircle cx='15.4' cy='70' r='12'/%3E%3Ccircle cx='10' cy='50' r='12'/%3E%3Ccircle cx='15.4' cy='30' r='12'/%3E%3Ccircle cx='30' cy='15.4' r='12'/%3E%3Ccircle cx='50' cy='10' r='12'/%3E%3Ccircle cx='70' cy='15.4' r='12'/%3E%3Ccircle cx='84.6' cy='30' r='12'/%3E%3C/g%3E%3C/svg%3E");
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:calc(var(--head-h) + var(--head-top) + 12px)}
body{margin:0;color:var(--texte);background:var(--creme);font:17px/1.65 var(--sans);
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden}
::selection{background:var(--vert);color:#fff}
h1,h2,h3{margin:0 0 .5rem;font-family:var(--sans);font-weight:400;text-wrap:balance}
h1 strong,h2 strong,h3 strong{font-weight:500}
h1{font-size:clamp(2.5rem,5.4vw,4.6rem);line-height:1.04;letter-spacing:-.02em}
h2{font-size:clamp(2rem,4vw,3.3rem);line-height:1.08;letter-spacing:-.015em}
h3{font-size:1.1rem;line-height:1.25;font-weight:500}
p{margin:0 0 1rem;text-wrap:pretty}
a{color:inherit}
img{display:block;max-width:100%}
.wrap{max-width:1280px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
.muted{color:var(--muted)}
a[href^="tel"]{font-variant-numeric:tabular-nums}
main{overflow-x:clip}
main>section>.wrap{width:100%}
.section{padding:var(--sec) 0}
.centre{text-align:center;margin-top:8px}
.welcome-texte{font-family:var(--sans)}

/* surfaces vertes : aplat + feuilles en filigrane, texte blanc */
.conseils,.jungle,.ct-droite,.site-foot,.menu-mobile{
  background-color:var(--vert);background-image:var(--feuilles);background-size:900px auto;background-position:center;color:#fff}

/* mot clé souligné au pinceau (orange sur fond clair, blanc sur fond vert) */
.souligne{font-weight:500;padding-bottom:.14em;background:var(--pinceau-orange) no-repeat 0 100%/100% .3em;
  -webkit-box-decoration-break:clone;box-decoration-break:clone}
.conseils .souligne,.jungle .souligne,.ct-droite .souligne{background-image:var(--pinceau-blanc)}
strong.souligne{color:inherit}
.galerie .souligne,.avisband .souligne,.duo .souligne{color:var(--vert)}

/* flèche dessinée */
.fleche{display:block;color:#fff;pointer-events:none}

/* surtitre : capitales espacées, comme « 4 ASTUCES POUR » */
.eyebrow,.vit-k{margin:0 0 14px;font:400 .95rem/1.2 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--vert)}
.conseils .eyebrow,.jungle .eyebrow{color:rgba(255,255,255,.88)}
.lede{color:var(--muted);font-size:1.1rem;line-height:1.6;max-width:56ch;margin:16px 0 0}

/* en-têtes de section centrés */
.galerie .eyebrow,.conseils .eyebrow,.avisband .eyebrow,
.galerie h2,.galerie .lede,.conseils h2,.avisband h2,.avisband .lede{text-align:center;margin-left:auto;margin-right:auto}

/* ---------- en-tête vert, collant ---------- */
/* en-tête : barre pleine largeur, vert de marque uni
   logo blanc | liens blancs (point orange sous la page en cours) | téléphone + bouton orange.
   Collée en haut ; elle s'affine et prend une ombre au défilement. */
.site-head{position:fixed;top:0;left:0;right:0;z-index:50;color:#fff;
  background:var(--vert);
  box-shadow:inset 0 -1px 0 rgba(255,255,255,.08);transition:box-shadow .35s var(--ease)}
.site-head.is-scrolled{box-shadow:inset 0 -1px 0 rgba(255,255,255,.08),0 12px 30px -12px rgba(10,40,20,.45)}
.head-in{display:grid;grid-template-columns:auto 1fr auto;gap:24px;align-items:center;height:var(--head-h);
  transition:height .35s var(--ease)}
.site-head.is-scrolled .head-in{height:calc(var(--head-h) - 10px)}
.head-logo{display:flex;align-items:center;text-decoration:none}
.logo-complet{display:block;height:36px;width:auto;transition:height .35s var(--ease)}
.site-head.is-scrolled .logo-complet{height:31px}
.head-nav{justify-self:center;display:flex;align-items:center;gap:clamp(16px,2.2vw,30px);font:500 .92rem/1 var(--sans)}
.head-nav a{position:relative;padding:8px 0;text-decoration:none;color:rgba(255,255,255,.86);transition:color .25s var(--ease)}
.head-nav a::after{content:"";position:absolute;left:50%;bottom:-4px;width:6px;height:6px;margin-left:-3px;border-radius:50%;
  background:var(--lime);transform:scale(0);transition:transform .3s var(--ease-out)}
.head-nav a:hover,.head-nav a.actif{color:#fff}
.head-nav a:hover::after,.head-nav a.actif::after{transform:scale(1)}
.head-actions{display:flex;align-items:center;gap:10px}
.head-tel{display:inline-flex;align-items:center;gap:9px;padding:6px 12px 6px 6px;border-radius:999px;text-decoration:none;
  font:500 .9rem/1 var(--sans);color:#fff;transition:background .25s var(--ease)}
.head-tel:hover{background:rgba(255,255,255,.1)}
.head-tel-ico{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;color:#fff;
  background:rgba(255,255,255,.14);box-shadow:inset 0 1px 0 rgba(255,255,255,.25)}
.head-cta{position:relative;display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 20px;border:0;border-radius:999px;cursor:pointer;
  font:500 .92rem/1 var(--sans);color:#fff;text-decoration:none;background:linear-gradient(180deg,var(--lime-clair),var(--lime));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 -3px 0 rgba(0,0,0,.12),0 10px 20px -8px rgba(0,0,0,.45);
  transition:transform .3s var(--ease-out)}
.head-cta:hover{transform:translateY(-2px)}
.head-cta:focus-visible{outline:3px solid #fff;outline-offset:3px}
.head-cta-nb{display:grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:999px;
  background:#fff;color:var(--lime);font-size:.78rem;font-weight:500}
.site-head .burger{background:rgba(255,255,255,.14)}
.site-head .burger span{background:#fff}
.site-head .burger:focus-visible{outline-color:#fff}

/* ---------- boutons ---------- */
.btn{font-family:inherit;display:inline-flex;align-items:center;justify-content:center;gap:10px;
  border:1.5px solid transparent;border-radius:99px;padding:15px 28px;min-height:52px;text-decoration:none;
  font-size:1rem;font-weight:500;line-height:1.1;cursor:pointer;white-space:nowrap;
  transition:transform .3s var(--ease-out),background .25s var(--ease),color .25s var(--ease),border-color .25s var(--ease),filter .25s}
.btn:hover{transform:translateY(-2px)}
.btn:active{transform:scale(.98)}
.btn:focus-visible{outline:3px solid var(--terre);outline-offset:3px}
/* boutons bombés : dégradé plus clair en haut, reflet, bord inférieur plus sombre, ombre colorée */
.btn-moutarde{background:linear-gradient(180deg,#F27D33 0%,var(--terre) 100%);color:#fff;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 -3px 0 rgba(0,0,0,.12),0 10px 22px -6px rgba(229,103,23,.55)}
.btn-moutarde:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 -3px 0 rgba(0,0,0,.12),0 16px 30px -8px rgba(229,103,23,.6)}
.btn-primary{background:linear-gradient(180deg,#2F9A4C 0%,var(--vert) 100%);color:#fff;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -3px 0 rgba(0,0,0,.14),0 10px 22px -6px rgba(35,127,60,.55)}
.btn-primary:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -3px 0 rgba(0,0,0,.14),0 16px 30px -8px rgba(35,127,60,.6)}
.btn:active{transform:translateY(1px) scale(.99)}
.btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.7)}
.btn-ghost:hover{background:#fff;color:var(--vert);border-color:#fff}
.btn-light{background:linear-gradient(180deg,#fff,#F3F7F1);color:var(--vert);box-shadow:var(--relief-carte)}
.btn-light:hover{box-shadow:var(--relief-carte-h)}
.btn-wa{background:linear-gradient(180deg,#fff,#F3F7F1);color:var(--vert);border-color:rgba(35,127,60,.25);box-shadow:var(--relief-carte)}
.btn-wa:hover{background:var(--vert);color:#fff;border-color:var(--vert)}
.btn-sm{padding:10px 18px;min-height:42px;font-size:.95rem}
.site-head .btn-primary{background:#fff;color:var(--vert)}

/* ---------- hero : fond clair, plante en pot blanc 3D, étiquettes d'entretien ---------- */
.hero{position:relative;overflow:hidden;
  padding:calc(var(--head-h) + var(--head-top) + clamp(28px,5vw,64px)) 0 clamp(72px,8vw,120px);
  background:radial-gradient(46% 60% at 74% 48%,#DCEFD5 0%,rgba(220,239,213,.55) 42%,rgba(255,255,255,0) 74%),
    linear-gradient(180deg,#FFFFFF 0%,#FFFFFF 55%,#EEF6EA 100%)}
.hero{min-height:100svh;display:grid;grid-template-columns:minmax(0,1fr);align-content:center}
.hero-bg{display:none}
.hero-in{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1.05fr;gap:clamp(24px,4vw,64px);align-items:center}
.hero-copy h1{margin:0 0 22px;max-width:15ch;font-weight:500;font-size:clamp(2.3rem,4.4vw,3.9rem);line-height:1.04;
  letter-spacing:-.015em;text-transform:uppercase;color:var(--texte)}
.hero-copy h1 em{font-style:normal;color:var(--vert)}
.hero-copy p{max-width:40ch;font-size:1rem;line-height:1.65;color:var(--muted)}
.hero-cta{display:flex;flex-wrap:wrap;align-items:center;gap:22px;margin-top:32px}
.hero-play{display:inline-flex;align-items:center;gap:14px;text-decoration:none;font-size:.86rem;line-height:1.35;color:var(--muted)}
.play-rond{display:grid;place-items:center;width:54px;height:54px;border-radius:50%;padding-left:3px;color:#fff;
  background:radial-gradient(circle at 35% 30%,#3A3A3A,#111 70%);
  box-shadow:inset 0 2px 2px rgba(255,255,255,.18),0 10px 22px rgba(0,0,0,.28);transition:transform .35s var(--ease-out)}
.hero-play:hover .play-rond{transform:scale(1.08)}
.hero-play:hover{color:var(--texte)}
.hero-photo{position:relative;display:grid;place-items:end center;min-height:clamp(420px,44vw,620px)}
.hero-halo{position:absolute;left:8%;right:8%;top:6%;bottom:4%;border-radius:50%;
  background:radial-gradient(closest-side,#CFE9C6 0%,rgba(207,233,198,.6) 50%,rgba(207,233,198,0) 100%)}
.hero-pep{position:relative;z-index:1;width:clamp(150px,13vw,190px);aspect-ratio:1/.95;margin-bottom:9%;
  animation:flotte 6s ease-in-out infinite alternate}
/* feuillage : 2,6 × la largeur du pot, centré sur l'axe de son pot d'origine (44,5 % de la photo) ;
   la largeur est plafonnée à 88vw pour que la découpe ne soit jamais rognée par le bord de l'écran */
.hero-feuillage{--fw:min(260%,41vw);position:absolute;bottom:88%;left:calc(50% - .445 * var(--fw));width:var(--fw);max-width:none;height:auto;
  filter:drop-shadow(0 18px 18px rgba(20,60,30,.16))}
@keyframes flotte{from{transform:translateY(0)}to{transform:translateY(-14px)}}
.hero-ombre{position:absolute;z-index:0;bottom:calc(9% - 14px);left:50%;width:clamp(150px,13vw,190px);height:26px;
  transform:translateX(-50%);border-radius:50%;background:radial-gradient(closest-side,rgba(20,60,30,.28),rgba(20,60,30,0));
  animation:ombre 6s ease-in-out infinite alternate}
@keyframes ombre{to{transform:translateX(-50%) scale(.82);opacity:.7}}
.hero-info{position:absolute;z-index:2;display:flex;align-items:center;gap:10px;font-size:.78rem;line-height:1.3;color:var(--muted);
  animation:etiquette 5s ease-in-out infinite alternate}
.hero-info>span{display:grid}
.hero-info strong{font-size:.9rem;font-weight:500;color:var(--texte)}
.hero-info svg:first-child{flex:none;color:var(--texte)}
.info-fleche{position:absolute;width:70px;height:auto;color:var(--texte)}
.info-lumiere{top:14%;left:4%}
.info-lumiere .info-fleche{left:calc(100% + 6px);top:-22px;transform:rotate(8deg)}
.info-arrosage{top:5%;right:0;padding:11px 15px;border-radius:14px;background:linear-gradient(180deg,#fff,#F7FAF5);
  box-shadow:var(--relief-carte);animation-delay:-1.6s}
.info-arrosage svg:first-child{color:#3E95BF}
.info-arrosage .info-fleche{right:calc(100% - 34px);top:calc(100% + 6px);transform:scaleX(-1) rotate(-38deg)}
.info-humidite{bottom:30%;left:0;animation-delay:-3s}
.info-humidite svg:first-child{color:var(--vert)}
.info-humidite .info-fleche{left:34px;top:calc(100% + 4px);transform:scaleY(-1) rotate(-10deg)}
@keyframes etiquette{to{transform:translateY(-6px)}}

.hero.is-welcome .rise{animation-play-state:paused}
.welcome{position:absolute;inset:0;z-index:5;display:grid;place-items:center;padding:0 24px;
  background:var(--vert) var(--feuilles) center/900px auto;color:#fff;text-align:center;transition:transform .8s var(--ease)}
.welcome-up{transform:translateY(-100%)}
.welcome-texte{margin:0;min-height:1.2em;font-size:clamp(1.6rem,5vw,2.8rem);line-height:1.15}
.welcome-caret{display:inline-block;width:2px;height:1.05em;margin-left:3px;vertical-align:-.12em;
  background:currentColor;animation:caret 1.05s steps(1,end) infinite}
@keyframes caret{50%{opacity:0}}

/* ---------- animations d'entrée ---------- */
.rise{animation:rise 1s var(--ease-out) both;animation-delay:var(--d,0ms)}
@keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
/* apparition : l'élément se redresse en arrivant, comme une carte posée sur la table */
.js [data-reveal]{opacity:0;transform:perspective(900px) rotateX(12deg) translateY(40px);transform-origin:50% 100%;
  transition:opacity .9s var(--ease-out) var(--d,0ms),transform 1s var(--ease-out) var(--d,0ms)}
.js [data-reveal].in{opacity:1;transform:none}
.js .rv-pop{transform:translateY(20px) scale(.94)}
.js .rv-left{transform:translateX(-48px)}
.js .rv-right{transform:translateX(48px)}
.js .rv-photo{opacity:0;clip-path:inset(0 0 50% 0);transform:scale(1.05);
  transition:clip-path 1.2s var(--ease-out) var(--d,0ms),transform 1.4s var(--ease-out) var(--d,0ms),opacity .9s var(--ease-out) var(--d,0ms)}
.js .rv-photo.in{clip-path:inset(0);transform:none}
.js .card:not(.in) .card-img img{transform:scale(1.12)}
.js [data-reveal].done{transition-delay:0ms;transition-duration:.4s}
@keyframes fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}

/* ---------- services : cartes qui chevauchent le bas du hero ---------- */
.services{position:relative;z-index:2;margin-top:-48px;padding-bottom:clamp(24px,4vw,48px)}
.services-in{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.service{display:flex;align-items:center;gap:16px;padding:22px 24px;border-radius:var(--r-carte);background:#fff;box-shadow:var(--ombre-douce);
  transition:transform .4s var(--ease-out)}
.service:hover{transform:translateY(-3px)}
.service-ico{display:grid;place-items:center;width:58px;height:58px;flex:none;background:var(--vert-pale);color:var(--vert);
  -webkit-mask:var(--feston) center/contain no-repeat;mask:var(--feston) center/contain no-repeat}
.service-txt{display:grid;gap:2px;min-width:0}
.service-txt strong{font-weight:500;font-size:1.04rem}
.service-txt span{font-size:.9rem;color:var(--muted)}

/* ---------- vitrine : panneau vert ---------- */
/* ---------- vitrine animée : plantes en pot blanc sur panneau vert pâle ----------
   Une plante à la une (grande, à gauche, son nom posé sur le pot), quatre plantes à
   droite, toutes posées sur la même ligne de sol (--sol). À chaque pas : la une sort à
   gauche, la 1re plante grandit et prend sa place, les autres glissent, une nouvelle
   entre par la droite. */
.vitrine{padding:clamp(110px,12vw,170px) 0 calc(var(--sec) + 70px);background:#fff}
.vit-panneau{--sol:80%;position:relative;aspect-ratio:1.85/1;min-height:560px;overflow:visible}
/* sol : un léger dégradé plus soutenu sous la ligne où reposent les pots */
/* pas de fond : la ligne de sol n'est marquée que par l'ombre des pots */
.vit-tete{position:absolute;left:36%;right:5%;top:6%;display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(16px,3vw,48px);align-items:end;z-index:2}
.vit-k{margin:0 0 12px}
.vit-tete h2{margin:0;font-size:clamp(2rem,3.2vw,2.8rem);line-height:1.06;color:var(--texte);max-width:12ch}
.vit-intro{margin:0;padding-bottom:6px;color:var(--muted);font-size:.92rem;line-height:1.6;max-width:34ch}
.vit-top{position:absolute;left:36%;right:5%;top:29%;z-index:4;display:flex;align-items:center;justify-content:space-between;
  padding-top:14px;border-top:1px solid rgba(20,60,35,.12)}
.vit-top p{margin:0;font:500 .8rem/1.2 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--texte)}
.vit-nav{display:flex;align-items:center;gap:14px}
.vit-nav button{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;border:1px solid rgba(20,60,35,.2);
  background:transparent;color:var(--texte);cursor:pointer;transition:background .25s var(--ease),color .25s,border-color .25s}
.vit-nav button:hover{background:var(--vert);border-color:var(--vert);color:#fff}
.vit-nav button:focus-visible{outline:3px solid var(--terre);outline-offset:2px}
.vit-rang{position:absolute;inset:0;z-index:3;pointer-events:none}
.vit-item{position:absolute;display:block;padding:0;border:0;background:none;font:inherit;color:inherit;text-align:left;cursor:pointer;pointer-events:auto;
  --dur:.7s;--courbe:cubic-bezier(.65,0,.3,1);
  transition:left var(--dur) var(--courbe),top var(--dur) var(--courbe),width var(--dur) var(--courbe),height var(--dur) var(--courbe),opacity .5s var(--ease)}
.vit-item:focus-visible{outline:3px solid var(--terre);outline-offset:4px;border-radius:8px}
/* places : 0 = à la une, 1-4 = rangée, 5-6 = en attente à droite, sm = vient de sortir à gauche.
   Toutes les boîtes s'arrêtent sur la ligne de sol : top + height = --sol. */
.vit-item.s0,.vit-item.sm{left:3%;top:calc(var(--sol) - 96%);width:29%;height:96%}
.vit-item.s1,.vit-item.s2,.vit-item.s3,.vit-item.s4,.vit-item.s5,.vit-item.s6{top:calc(var(--sol) - 30%);width:14.5%;height:30%}
.vit-item.s1{left:36%}.vit-item.s2{left:51.8%}.vit-item.s3{left:67.6%}.vit-item.s4{left:83.4%}
.vit-item.s5,.vit-item.s6{left:104%;opacity:0;pointer-events:none}
.vit-item.sm{left:-32%;opacity:0;pointer-events:none}
/* la plante qui quitte la une glisse d'abord, puis s'efface hors du panneau */
.vit-item.sm{transition:left var(--dur) var(--courbe),top var(--dur) var(--courbe),width var(--dur) var(--courbe),height var(--dur) var(--courbe),opacity .3s var(--ease) .38s}
.vit-carte{display:none}
/* plante : la boîte = le pot blanc (proportions du pot d'origine) ; la photo est
   placée pour que son pot d'origine tombe pile derrière, fonds alignés */
.vit-plante{position:absolute;left:24%;bottom:0;width:52%;aspect-ratio:1/var(--ratio);
  transition:left var(--dur) var(--courbe),width var(--dur) var(--courbe)}
.vit-item.on .vit-plante,.vit-item.sm .vit-plante{left:8%;width:62%}
.vit-feuillage{position:absolute;bottom:1.5%;left:calc(50% - var(--cx) * var(--iw) * 100%);width:calc(var(--iw) * 100%);
  max-width:none;height:auto;transform:translateY(calc((1 - var(--yb)) * 100%))}
.pot{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 12px 10px rgba(30,60,40,.16))}
/* nom : centré sous le pot dans la rangée ; posé sur le pot à la une */
.vit-legende{position:absolute;left:-6%;right:-6%;top:calc(100% + 14px);display:grid;justify-items:center;gap:3px;text-align:center;z-index:2;
  transition:opacity .3s var(--ease)}
.vit-legende strong{display:block;font:500 .84rem/1.25 var(--sans);color:var(--texte)}
.vit-legende strong::first-letter{text-transform:uppercase}
.vit-cat{font-size:.72rem;letter-spacing:.06em;color:var(--muted)}
.vit-detail{display:none}
/* à la une : texte centré sur le corps du pot (même gauche et même largeur que la plante) */
.vit-item.on .vit-legende,.vit-item.sm .vit-legende{top:auto;left:8%;right:auto;bottom:0;width:62%;aspect-ratio:1/var(--ratio);
  container-type:size;padding:12% 12% 6%;align-content:center;justify-items:center;text-align:center;gap:6px}
.vit-item.on .vit-cat,.vit-item.sm .vit-cat{order:-1;font-size:.66rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--vert)}
.vit-item.on .vit-legende strong{font-size:clamp(.98rem,1.25vw,1.12rem);line-height:1.2;color:var(--texte)}
.vit-item.on .vit-detail{display:grid;justify-items:center;gap:6px;animation:vitTexte .5s var(--ease-out) .35s both}
.vit-detail span{font-size:.76rem;line-height:1.45;color:#4A554C;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.vit-detail em{font-style:normal;font-weight:500;font-size:.8rem;color:var(--vert);white-space:nowrap}
/* pot trop bas pour tout contenir : on garde catégorie, nom et lien */
@container (max-height:150px){.vit-detail span{display:none}}
@container (max-height:110px){.vit-cat{display:none}}
.vit-item.sm .vit-legende{opacity:0}
@keyframes vitTexte{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.vit-plus{position:absolute;left:0;right:0;top:calc(100% + 34px);display:flex;justify-content:center}

/* ---------- vidéos ---------- */
.videos{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:16px;margin-top:32px}
.video{position:relative;border-radius:var(--r-carte);overflow:hidden;background:var(--vert);aspect-ratio:16/9}
.video video,.video iframe,.video-facade{position:absolute;inset:0;width:100%;height:100%;border:0;object-fit:cover}
.video-facade{padding:0;cursor:pointer;background:none}
.video-facade img{width:100%;height:100%;object-fit:cover}
.video-play{position:absolute;left:50%;top:50%;display:grid;place-items:center;width:68px;height:68px;margin:-34px 0 0 -34px;
  border-radius:50%;background:var(--terre);color:#fff;font-size:1.3rem;padding-left:4px;pointer-events:none}
.video-titre{position:absolute;left:12px;bottom:12px;padding:5px 12px;border-radius:99px;background:rgba(0,0,0,.55);color:#fff;font-size:.8rem;pointer-events:none}

/* ---------- galerie ---------- */
.galerie{background:var(--creme)}
.filtres{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:32px 0 0}
.filtre{font:500 .94rem/1 var(--sans);padding:11px 18px;border-radius:99px;border:1.5px solid var(--line);
  background:#fff;color:var(--texte);cursor:pointer;transition:background .25s var(--ease),color .25s var(--ease),border-color .25s var(--ease)}
.filtre:hover{border-color:var(--vert);color:var(--vert)}
.filtre.on{background:var(--vert);border-color:var(--vert);color:#fff}
.filtre:focus-visible{outline:2px solid var(--terre);outline-offset:2px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,24px);margin-top:40px}
.card{display:flex;flex-direction:column;gap:14px;text-decoration:none;color:inherit}
.card:focus-visible{outline:2px solid var(--terre);outline-offset:4px;border-radius:var(--r-carte)}
.card-img{position:relative;display:block;overflow:hidden;aspect-ratio:4/5;border-radius:999px 999px var(--r-carte) var(--r-carte);background:var(--vert-tres-pale)}
.card-img img{width:100%;height:100%;object-fit:cover;transition:transform .9s var(--ease-out)}
.card:hover .card-img img{transform:scale(1.06)}
.card-voir{position:absolute;left:50%;bottom:14px;z-index:1;opacity:0;transform:translate(-50%,8px);
  padding:9px 16px;border-radius:99px;background:var(--vert);color:#fff;font-size:.88rem;font-weight:500;white-space:nowrap;
  transition:opacity .3s var(--ease),transform .4s var(--ease-out)}
.card:hover .card-voir,.card:focus-visible .card-voir{opacity:1;transform:translate(-50%,0)}
.card-cap{display:grid;gap:4px;padding:0 4px;text-align:center}
.card-tag{font:400 .74rem/1.2 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--terre)}
.card-nom{font:500 1.15rem/1.25 var(--sans);color:var(--texte)}
.card-soins{display:none}
.voir-plus{margin-top:44px}

/* ---------- conseils : « 4 astuces », formes festonnées ---------- */
/* « 4 astuces » : scène illustrée animée + liste des astuces */
.astuces{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,72px);align-items:center;margin-top:52px}
.astuce-scene{position:relative;width:min(100%,520px);justify-self:center;aspect-ratio:420/400}
.astuce-scene::before{content:"";position:absolute;inset:-4% -2% 2%;background:var(--vert-pale);
  -webkit-mask:var(--feston) center/contain no-repeat;mask:var(--feston) center/contain no-repeat}
.astuce-num{position:absolute;left:4%;top:2%;font:500 clamp(3rem,6vw,4.6rem)/1 var(--sans);color:#fff;
  text-shadow:0 6px 18px rgba(0,0,0,.18);animation:fadein .5s var(--ease-out) both}
.scene{position:relative;display:block;width:100%;height:auto;overflow:visible}
.scene *{transform-box:view-box}
.astuces-liste{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.astuces-liste button{position:relative;display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:start;width:100%;
  padding:18px 22px 20px;border:1px solid rgba(255,255,255,.18);border-radius:18px;background:transparent;color:#fff;
  font:inherit;text-align:left;cursor:pointer;overflow:hidden;transition:background .35s var(--ease),border-color .35s var(--ease)}
.astuces-liste button:hover{background:rgba(255,255,255,.06)}
.astuces-liste button.on{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.4)}
.astuces-liste button:focus-visible{outline:3px solid #fff;outline-offset:3px}
.astuce-k{font:500 .9rem/1.6 var(--sans);letter-spacing:.08em;color:rgba(255,255,255,.55)}
.astuces-liste button.on .astuce-k{color:#fff}
.astuce-txt{display:grid;gap:4px}
.astuce-txt strong{font-weight:500;font-size:1.08rem}
.astuce-txt span{font-size:.92rem;line-height:1.5;color:rgba(255,255,255,.78);max-height:0;opacity:0;overflow:hidden;
  transition:max-height .5s var(--ease-out),opacity .4s var(--ease)}
.astuces-liste button.on .astuce-txt span{max-height:80px;opacity:1}
.astuce-barre{position:absolute;left:0;bottom:0;height:3px;width:100%;background:#fff;transform-origin:0 50%;
  animation:barre var(--duree) linear both}
.en-pause .astuce-barre{animation-play-state:paused}
@keyframes barre{from{transform:scaleX(0)}to{transform:scaleX(1)}}

/* --- scène : éléments communs --- */
.scene .acc,.scene .eau,.scene .terre,.scene .brume,.scene .gouttelettes,.scene .rayon-lumiere{opacity:0}
.scene .perso{animation:respire 2.6s ease-in-out infinite}
@keyframes respire{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.scene .oeil{transform-origin:133px 117px;animation:cligne 3.8s infinite}
@keyframes cligne{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
.scene .rayons{transform-origin:326px 62px;animation:tourne 12s linear infinite}
@keyframes tourne{to{transform:rotate(360deg)}}
.scene .bras{transform-origin:140px 156px;transform:rotate(68deg)}
.scene .feuilles{transform-origin:305px 250px}
.scene .plante-scene{transform-origin:305px 300px}

/* 1. emplacement : il pose la plante sous la fenêtre, le soleil l'éclaire */
.scene.e0 .bras{animation:e0bras 5.2s var(--ease) both}
@keyframes e0bras{0%,42%{transform:rotate(8deg)}64%,100%{transform:rotate(68deg)}}
.scene.e0 .plante-scene{animation:e0plante 5.2s var(--ease) both}
@keyframes e0plante{0%{transform:translate(-108px,-78px)}12%{transform:translate(-108px,-84px)}24%{transform:translate(-108px,-78px)}
  42%{transform:translate(-60px,-70px)}56%{transform:translate(0,-8px)}62%,100%{transform:translate(0,0)}}
.scene.e0 .rayon-lumiere{animation:lumiere 5.2s ease-in-out both}
@keyframes lumiere{0%,58%{opacity:0}72%{opacity:.5}84%{opacity:.32}100%{opacity:.5}}
.scene.e0 .soleil{transform-origin:326px 62px;animation:soleil 1.6s ease-in-out infinite alternate}
@keyframes soleil{to{transform:scale(1.15)}}

/* 2. arrosage : il incline l'arrosoir, l'eau tombe au pied de la plante */
.scene.e1 .acc-1{opacity:1}
.scene.e1 .bras{animation:e1bras 5.2s var(--ease) both}
@keyframes e1bras{0%{transform:rotate(40deg)}18%,88%{transform:rotate(-14deg)}100%{transform:rotate(-8deg)}}
.scene.e1 .arrosoir{transform-origin:198px 157px;animation:e1arrosoir 5.2s var(--ease) both}
@keyframes e1arrosoir{0%,14%{transform:rotate(0)}26%,86%{transform:rotate(22deg)}100%{transform:rotate(6deg)}}
.scene.e1 .eau{opacity:1}
.scene.e1 .eau ellipse{opacity:0;animation:goutte .8s ease-in infinite}
.scene.e1 .eau ellipse:nth-child(2){animation-delay:.27s}
.scene.e1 .eau ellipse:nth-child(3){animation-delay:.54s}
@keyframes goutte{0%{opacity:0;transform:translate(0,0)}15%{opacity:1}85%{opacity:1}100%{opacity:0;transform:translate(16px,108px)}}
.scene.e1 .eau{animation:fenetreEau 5.2s linear both}
@keyframes fenetreEau{0%,26%{opacity:0}30%,84%{opacity:1}90%,100%{opacity:0}}
.scene.e1 .feuilles{animation:joie 1.4s ease-in-out 1.6s 3 alternate}
@keyframes joie{from{transform:rotate(-2deg)}to{transform:rotate(2deg)}}

/* 3. terreau : il verse le sac, la terre tombe dans le pot, le pot est rempoté */
.scene.e2 .acc-2{opacity:1}
.scene.e2 .bras{animation:e2bras 5.2s var(--ease) both}
@keyframes e2bras{0%{transform:rotate(40deg)}18%,86%{transform:rotate(-10deg)}100%{transform:rotate(30deg)}}
.scene.e2 .sac{transform-origin:198px 157px;animation:e2sac 5.2s var(--ease) both}
@keyframes e2sac{0%,14%{transform:rotate(0)}28%,82%{transform:rotate(40deg)}100%{transform:rotate(0)}}
.scene.e2 .terre{animation:fenetreEau 5.2s linear both}
.scene.e2 .terre circle{animation:terre .7s ease-in infinite}
.scene.e2 .terre circle:nth-child(2){animation-delay:.18s}
.scene.e2 .terre circle:nth-child(3){animation-delay:.36s}
.scene.e2 .terre circle:nth-child(4){animation-delay:.52s}
@keyframes terre{0%{opacity:0;transform:translate(0,0)}15%{opacity:1}100%{opacity:.9;transform:translate(44px,100px)}}
.scene.e2 .plante-scene{animation:rempote 5.2s var(--ease-out) both}
@keyframes rempote{0%,84%{transform:scale(1)}90%{transform:scale(1.08,1.12)}96%,100%{transform:scale(1.06)}}

/* 4. humidité : il brumise les feuilles, des gouttelettes apparaissent */
.scene.e3 .acc-3{opacity:1}
.scene.e3 .bras{animation:e3bras 5.2s var(--ease) both}
@keyframes e3bras{0%{transform:rotate(40deg)}18%,90%{transform:rotate(-28deg)}100%{transform:rotate(-22deg)}}
.scene.e3 .gachette{transform-origin:206px 136px;animation:gachette .6s ease-in-out 1s infinite}
@keyframes gachette{0%,100%{transform:rotate(0)}50%{transform:rotate(-25deg)}}
.scene.e3 .brume{opacity:1}
.scene.e3 .brume circle{opacity:0;transform-origin:212px 92px;animation:brume 1.2s ease-out 1s infinite}
.scene.e3 .brume circle:nth-child(2){animation-delay:1.4s}
.scene.e3 .brume circle:nth-child(3){animation-delay:1.8s}
@keyframes brume{0%{opacity:.9;transform:translate(0,0) scale(.4)}100%{opacity:0;transform:translate(70px,62px) scale(2.6)}}
.scene.e3 .gouttelettes{animation:gouttelettes 5.2s ease-out both}
@keyframes gouttelettes{0%,40%{opacity:0}60%,100%{opacity:1}}

/* ---------- café et coworking ---------- */
.duo{background:#fff}
.duo-in{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,72px);align-items:center}
.duo-photo{position:relative;aspect-ratio:4/5;max-height:620px;width:100%;padding:12px;background:#fff;border-radius:999px 999px 18px 18px;overflow:hidden}
.duo-photo img{width:100%;height:100%;object-fit:cover;border-radius:999px 999px 10px 10px}
.duo-carte{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:16px}
.duo-carte .eyebrow{margin:0}
.duo-carte h2{margin:0;color:var(--texte)}
.duo-carte p{margin:0;color:var(--muted);font-size:1.06rem}
.duo-note{font-size:.94rem!important}
.duo-carte .btn{margin-top:8px}

/* ---------- avis ---------- */
.avisband{background:var(--creme)}
.avis-liste{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:48px 0 32px}
.avis{margin:0;display:flex;flex-direction:column;background:var(--vert-tres-pale);border-radius:var(--r-carte);padding:30px;
  transition:transform .4s var(--ease-out)}
.avis:hover{transform:translateY(-4px)}
.avis-etoiles{margin:0 0 16px!important;font-size:1.1rem!important;letter-spacing:3px;color:var(--terre);line-height:1!important}
.avis-etoiles span{color:#C8D3C2}
.avis p{margin:0 0 20px;font-size:1.04rem;line-height:1.6}
.avis footer{margin-top:auto;padding-top:16px;border-top:1px solid #D2DDCB;font-size:.9rem;color:var(--muted)}
.avis footer strong{color:var(--vert);font-weight:500}
.avis-notes{display:block;margin-top:4px}
.avis-hint{display:none}

/* ---------- « Prêt à créer votre oasis tropicale ? » ---------- */
.jungle{position:relative;overflow:hidden;padding:var(--sec) 0;text-align:center}
.jungle-in{position:relative;display:grid;justify-items:center;gap:6px}
.jungle-logo{height:64px;width:auto;margin-bottom:24px}
.jungle h2{margin:0 0 10px;color:#fff;max-width:20ch}
.jungle p{margin:0;font-size:clamp(1.1rem,1.8vw,1.4rem);color:rgba(255,255,255,.9);max-width:36ch}
.jungle p strong{font-weight:500;color:#fff}
.jungle-tel{display:inline-flex;align-items:center;gap:12px;margin-top:34px;font-size:clamp(1.3rem,2.2vw,1.7rem);text-decoration:none;
  font-weight:500;letter-spacing:.02em}
.jungle-tel:hover{text-decoration:underline;text-underline-offset:5px}
.jungle .jungle-adr{display:grid;justify-items:center;gap:10px;margin-top:26px;font-size:.92rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.85)}
.jungle-fleche{position:absolute;right:4%;top:30%;width:130px;transform:rotate(100deg);opacity:.7}

/* ---------- contact ---------- */
.contact{background:var(--creme)}
.contact-in{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,3vw,32px);align-items:stretch}
.contact-in>div:first-child{background:#fff;border-radius:var(--r-xl);padding:clamp(28px,4vw,48px)}
.ct-titre{margin:0 0 10px;font:500 1.6rem/1.2 var(--sans);color:var(--vert)}
.ct-texte{margin:0 0 22px;color:var(--muted)}
.ct-liste{list-style:none;margin:0 0 32px;padding:0;display:grid;gap:14px}
.ct-liste li{display:flex;align-items:center;gap:14px}
.ct-liste a{text-decoration:none}
.ct-liste a:hover{color:var(--vert);text-decoration:underline;text-underline-offset:3px}
.ct-ico{display:grid;place-items:center;width:40px;height:40px;background:var(--vert-pale);color:var(--vert);flex:none;
  -webkit-mask:var(--feston) center/contain no-repeat;mask:var(--feston) center/contain no-repeat}
.ct-loc{margin-top:8px}
.ct-adr{display:grid;gap:2px;margin-bottom:18px}
.ct-adr span{color:var(--muted);font-size:.92rem}
.loc-map{width:100%;border-radius:var(--r-carte);overflow:hidden}
.loc-map .map{margin:0;border:0;aspect-ratio:16/10}
.ct-droite{display:flex;flex-direction:column;border-radius:var(--r-xl);padding:clamp(28px,4vw,48px)}
.ct-grand{margin:0 0 28px;color:#fff;font-size:clamp(2.2rem,4vw,3.2rem)}
.form{display:grid;gap:18px;width:100%}
.ct-form{flex:1;display:flex;flex-direction:column}
.form label{display:grid;gap:8px;font:500 .92rem/1.2 var(--sans);color:#fff}
.form input,.form textarea,.form select{font-family:inherit;font-size:1rem;line-height:1.5;color:var(--texte);width:100%;
  background:#fff;border:2px solid transparent;border-radius:14px;padding:13px 16px;transition:border-color .25s var(--ease),box-shadow .25s var(--ease)}
.form input::placeholder,.form textarea::placeholder{color:#97A096}
.form input:focus,.form textarea:focus,.form select:focus{outline:none;border-color:var(--terre);box-shadow:0 0 0 4px rgba(229,103,23,.25)}
.form textarea{resize:vertical}
.ct-msg{flex:1;grid-template-rows:auto 1fr}
.ct-msg textarea{height:100%;min-height:140px}
.form-hint{margin:0;font-size:.88rem;color:rgba(255,255,255,.78);line-height:1.5}
.form .btn{align-self:flex-start;margin-top:4px}
.note{font-size:.9rem;color:#fff;border-left:2px solid #fff;padding-left:12px;margin:0;
  max-height:0;opacity:0;overflow:hidden;transition:max-height .6s var(--ease-out),opacity .6s var(--ease)}
.note.show{max-height:140px;opacity:1}
.note a{color:#fff}

/* ---------- plan ---------- */
.map{position:relative;display:block;overflow:hidden;aspect-ratio:1/1;background:var(--vert-tres-pale);text-decoration:none}
.map-layer{position:absolute;width:150%;aspect-ratio:1/1;display:grid;grid-template-columns:repeat(3,1fr);transition:transform .9s var(--ease-out)}
.map:hover .map-layer{transform:scale(1.06)}
.map-layer img{width:100%;height:auto;display:block}
.map-pin{position:absolute;left:50%;top:50%;color:var(--vert);transform:translate(-50%,-92%);filter:drop-shadow(0 4px 8px rgba(16,38,26,.35))}
.map-pin svg{animation:pin 2.8s var(--ease) infinite}
@keyframes pin{0%,55%,100%{transform:translateY(0)}70%{transform:translateY(-7px)}85%{transform:translateY(0)}}
.map-cta{position:absolute;right:12px;bottom:12px;color:#fff;font-size:.82rem;font-weight:500;padding:8px 14px;border-radius:99px;
  background:var(--vert);opacity:0;transform:translateY(8px);transition:opacity .35s var(--ease),transform .4s var(--ease-out)}
.map:hover .map-cta,.map:focus-visible .map-cta{opacity:1;transform:none}
.map-cred{position:absolute;left:10px;bottom:10px;font-size:.66rem;color:#3d4c36;background:rgba(255,255,255,.78);padding:2px 8px;border-radius:99px}

/* ---------- avant / après ---------- */
.aa{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:var(--r-carte);user-select:none}
.aa img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.aa-avant{clip-path:inset(0 calc(100% - var(--p)) 0 0)}
.aa-poignee{position:absolute;top:0;bottom:0;left:var(--p);width:3px;margin-left:-1.5px;background:#fff;pointer-events:none}
.aa input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0}
.aa input:focus-visible~.aa-poignee{box-shadow:0 0 0 3px var(--terre)}
.aa-tag{position:absolute;top:12px;padding:5px 12px;border-radius:99px;background:rgba(0,0,0,.55);color:#fff;font-size:.78rem}
.aa-tag-a{left:12px}.aa-tag-b{right:12px}

/* ---------- fiche plante ---------- */
.fiche-fond{position:fixed;inset:0;z-index:80;display:grid;place-items:center;padding:20px;
  background:rgba(12,40,22,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);animation:fadein .3s var(--ease-out) both}
.fiche{position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);width:min(1000px,100%);
  max-height:min(660px,92vh);background:#fff;border-radius:var(--r-xl);overflow:hidden;animation:ficheIn .5s var(--ease-out) both}
@keyframes ficheIn{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}
.fiche-photo{position:relative;background:var(--vert);min-height:0}
.fiche-photo img{width:100%;height:100%;object-fit:cover;animation:fadein .5s var(--ease-out) both}
.fiche-txt{display:flex;flex-direction:column;align-items:flex-start;gap:14px;padding:clamp(24px,4vw,48px);overflow-y:auto;animation:fadein .5s var(--ease-out) both}
.fiche-txt h3{margin:0;font:500 clamp(1.8rem,3.2vw,2.4rem)/1.1 var(--sans);color:var(--vert)}
.fiche-txt p{margin:0;color:var(--muted)}
.fiche-soin{list-style:none;margin:6px 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%}
.fiche-soin li{padding:14px 16px;border-radius:16px;background:var(--vert-tres-pale);font-size:.94rem}
.fiche-soin strong{display:block;font:500 .72rem/1.2 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--vert);margin-bottom:4px}
.fiche-txt .fiche-note{font-size:.88rem}
.fiche-compte{margin-top:auto;font-size:.82rem;color:var(--muted)}
.fiche-x{position:absolute;top:14px;right:14px;z-index:3;width:42px;height:42px;border-radius:50%;border:0;
  background:var(--creme);color:var(--texte);font-size:1.6rem;line-height:1;cursor:pointer;transition:transform .3s var(--ease-out)}
.fiche-x:hover{transform:rotate(90deg)}
.fiche-nav{position:absolute;top:50%;z-index:2;width:44px;height:44px;margin-top:-22px;border-radius:50%;border:0;
  background:rgba(255,255,255,.92);color:var(--vert);font-size:1.7rem;line-height:1;cursor:pointer;transition:transform .3s var(--ease-out)}
.fiche-nav:hover{transform:scale(1.08)}
.fiche-prec{left:14px}.fiche-suiv{right:14px}

/* ---------- pied de page ---------- */
.site-foot{padding:clamp(64px,8vw,104px) 0 32px;border-top:1px solid rgba(255,255,255,.18)}
.foot-in{display:grid;grid-template-columns:1.6fr 1.1fr .8fr;gap:clamp(32px,6vw,80px);align-items:start}
.foot-marque{display:grid;gap:20px;justify-items:start}
/* le logo « Exoticas » du pied de page se voit davantage */
.logo-pied{height:clamp(48px,6vw,68px)}
.foot-marque p{margin:0;max-width:36ch;color:rgba(255,255,255,.82)}
.foot-titre{margin:0 0 12px;font:400 .82rem/1.2 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.65)}
.foot-col p{margin:0 0 28px;color:#fff}
.foot-col .muted{display:block;color:rgba(255,255,255,.7);font-size:.92rem;margin-top:6px}
.foot-col a,.foot-pages a{text-decoration:none}
.foot-col a:hover,.foot-pages a:hover{text-decoration:underline;text-underline-offset:3px}
.foot-pages{display:grid;gap:10px;justify-items:start}
.foot-pills{display:flex;flex-wrap:wrap;gap:8px}
.site-foot a.foot-pill{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:99px;
  border:1.5px solid rgba(255,255,255,.5);font-size:.92rem;text-decoration:none;transition:background .25s,color .25s}
.site-foot a.foot-pill:hover{background:#fff;color:var(--vert)}
.site-foot a.foot-pill-insta{background:var(--terre);border-color:var(--terre)}
.site-foot a.foot-pill-insta:hover{background:var(--terre);color:#fff;filter:brightness(.92)}
.foot-bottom{margin-top:64px;padding-top:24px;border-top:1px solid rgba(255,255,255,.18);font-size:.86rem;color:rgba(255,255,255,.65)}

/* ---------- WhatsApp flottant ---------- */
.wa-fixed{position:fixed;right:20px;bottom:20px;z-index:55;width:58px;height:58px;border-radius:50%;
  background:var(--terre);color:#fff;display:grid;place-items:center;text-decoration:none;box-shadow:0 10px 28px rgba(16,38,26,.28);
  transition:transform .35s var(--ease-out)}
.wa-fixed:hover{transform:scale(1.08)}

/* ---------- burger + menu mobile ---------- */
.burger{display:none;width:40px;height:40px;margin-left:4px;border:0;border-radius:50%;background:transparent;cursor:pointer;position:relative;flex:none}
.burger span{position:absolute;left:11px;right:11px;height:2px;border-radius:2px;background:var(--texte);
  transition:transform .35s var(--ease-out),opacity .2s var(--ease),top .35s var(--ease-out)}
.burger span:nth-child(1){top:14px}.burger span:nth-child(2){top:19px}.burger span:nth-child(3){top:24px}
.burger.ouvert span:nth-child(1){top:19px;transform:rotate(45deg)}
.burger.ouvert span:nth-child(2){opacity:0}
.burger.ouvert span:nth-child(3){top:19px;transform:rotate(-45deg)}
.burger:focus-visible{outline:3px solid var(--terre);outline-offset:2px}
.menu-mobile{position:fixed;inset:0;z-index:49;display:flex;flex-direction:column;justify-content:center;gap:32px;
  padding:110px 28px 32px;visibility:hidden;opacity:0;transform:translateY(-12px);
  transition:opacity .35s var(--ease),transform .45s var(--ease-out),visibility 0s linear .45s}
.menu-mobile.ouvert{visibility:visible;opacity:1;transform:none;transition-delay:0s}
.menu-mobile nav{display:grid;gap:2px}
.menu-mobile nav a{font:400 2.3rem/1.25 var(--sans);text-decoration:none;color:#fff;padding:6px 0;
  opacity:0;transform:translateY(14px);transition:opacity .45s var(--ease-out),transform .5s var(--ease-out)}
.menu-mobile.ouvert nav a{opacity:1;transform:none;transition-delay:calc(var(--i) * 45ms + 120ms)}
.menu-cta{display:grid;gap:10px}
@media (min-width:981px){.menu-mobile{display:none}}
/* en-tête : le numéro se replie en icône, puis les liens passent dans le menu */
@media (max-width:1180px){
  .head-tel-num{display:none}
  .head-tel{padding:6px}
}
@media (max-width:980px){
  .head-in{grid-template-columns:1fr auto}
  .head-nav{display:none}
  .burger{display:block}
}
@media (max-width:420px){
  .head-cta-txt{display:none}
  .head-cta{padding:0 14px}
}

/* ---------- responsive ---------- */
@media (max-width:1000px){
}
@media (max-width:900px){
  .astuces{grid-template-columns:1fr;gap:28px;margin-top:36px}
  .services-in{grid-template-columns:1fr}
  .vit-tete,.duo-in,.contact-in{grid-template-columns:1fr}
  .duo-photo{max-width:420px;margin:0 auto}
  .vit-panneau{--sol:auto;aspect-ratio:auto;min-height:0;padding:28px 20px 0}
  .vit-panneau::before{display:none}
  .vit-tete{position:static;grid-template-columns:1fr;gap:8px;align-items:start}
  .vit-top{position:static;margin:22px 0 0}
  .vit-rang{position:relative;inset:auto;height:560px;margin-top:24px}
  /* à la une : la plante sélectionnée est centrée ; sm = la plante qui sort, file à gauche */
  .vit-item.s0{left:18%;top:0;width:64%;height:58%}
  .vit-item.sm{top:0;width:64%;height:58%}
  .vit-item.s1,.vit-item.s2,.vit-item.s3,.vit-item.s4,.vit-item.s5,.vit-item.s6{top:66%;width:30%;height:20%}
  .vit-item.s1{left:0}.vit-item.s2{left:35%}.vit-item.s3{left:70%}
  .vit-item.s4,.vit-item.s5,.vit-item.s6{left:108%;opacity:0;pointer-events:none}
  .vit-item.sm{left:-70%}
  .vit-legende{top:calc(100% + 8px)}
  .vit-legende strong{font-size:.72rem}
  .vit-cat{display:none}
  /* les feuillages ne quittent jamais leur cadre : pas de débord sur le texte
     au-dessus, ni sur la plante à la une (--fh = hauteur du feuillage en largeurs de pot) */
  .vit-item .vit-plante{width:min(52%,calc(140px / var(--fh)))}
  .vit-item.on .vit-plante,.vit-item.sm .vit-plante{left:calc(50% - min(27%,150px / var(--fh)));width:min(54%,calc(300px / var(--fh)))}
  .vit-item.on .vit-legende{left:calc(50% - min(27%,150px / var(--fh)));width:min(54%,calc(300px / var(--fh)))}
  .foot-in{grid-template-columns:1fr;gap:40px;justify-items:center;text-align:center}
  .foot-marque{justify-items:center}
  .foot-pills{justify-content:center}
  .foot-pages{justify-items:center}
  .foot-bottom{padding-bottom:64px;text-align:center}
  .fiche-soin{grid-template-columns:1fr}
  .jungle-fleche{display:none}
}
@media (max-width:820px){
  :root{--head-h:62px;--head-top:0px}
  .logo-complet{height:28px}
  .js .rv-left,.js .rv-right{transform:translateY(28px)}
  .js .rv-left.in,.js .rv-right.in{transform:none}
  .hero{padding:calc(var(--head-h) + var(--head-top) + 24px) 0 96px}
  .hero-in{grid-template-columns:1fr;gap:28px}
  .hero-photo{min-height:400px}
  .hero-pep{width:120px}
  .hero-ombre{width:120px}
  .info-lumiere{top:6%;left:0}
  .info-arrosage{top:0;right:0;padding:9px 11px}
  .info-humidite{bottom:28%}
  .info-fleche{width:46px}
  .hero-info{font-size:.7rem}
  .hero-info strong{font-size:.8rem}
  .hero-copy h1{max-width:none;font-size:clamp(2rem,8.6vw,3rem)}
  .hero-cta{display:grid;grid-template-columns:1fr;margin-top:28px}
  .avis-liste{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;margin:36px -16px 0;
    padding:4px 16px 18px;scrollbar-width:none}
  .avis-liste::-webkit-scrollbar{display:none}
  .avis{flex:0 0 86%;scroll-snap-align:center}
  .avis-hint{display:block;margin:0 0 20px;text-align:center;font-size:.84rem;color:var(--muted)}
  .grid{gap:12px}
}
@media (max-width:760px){
  .fiche{grid-template-columns:1fr;grid-template-rows:minmax(0,42vh) auto;max-height:94vh;overflow-y:auto}
  .fiche-txt{overflow:visible}
}
@media (max-width:620px){
  .grid{grid-template-columns:repeat(2,1fr)}
  .card-nom{font-size:1rem}
}
@media (max-width:420px){
}
@media (min-width:600px) and (max-width:820px){
  .hero-cta{grid-template-columns:1fr 1fr}
}
@media (max-width:400px){
}

/* ---------- paysagisme : texte + jardinière illustrée ---------- */
.paysa{background:#fff}
.paysa-in{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,80px);align-items:center}
.paysa-texte h2{color:var(--texte)}
.paysa-liste{list-style:none;margin:30px 0 0;padding:0;display:grid;gap:16px}
.paysa-liste li{display:flex;gap:14px;align-items:flex-start}
.paysa-liste strong{display:block;font-weight:500;color:var(--texte)}
.paysa-liste span{color:var(--muted);font-size:.95rem;line-height:1.55}
.paysa-coche{display:grid;place-items:center;flex:none;width:30px;height:30px;margin-top:2px;border-radius:50%;color:#fff;
  background:linear-gradient(180deg,#2F9A4C,var(--vert));box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 6px 12px -4px rgba(35,127,60,.5)}
.paysa-liste .paysa-coche{color:#fff}
.paysa-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}
.paysa-illu{position:relative;justify-self:center;width:min(100%,500px)}
.paysa-illu::before{content:"";position:absolute;inset:4% 0 0;background:linear-gradient(180deg,#E4F0E0,#D3E7CF);
  -webkit-mask:var(--feston) center/contain no-repeat;mask:var(--feston) center/contain no-repeat}
.jardiniere{position:relative;display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 24px 30px rgba(20,60,30,.16))}
.jardiniere *{transform-box:view-box}
.jardiniere .j-corps{animation:jRespire 3.2s ease-in-out infinite}
@keyframes jRespire{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.jardiniere .j-chapeau{transform-origin:175px 126px;animation:jChapeau 3.2s ease-in-out infinite}
@keyframes jChapeau{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(-3deg)}}
.jardiniere .j-arrosoir{transform-origin:316px 284px;animation:jVerse 2.6s ease-in-out infinite}
@keyframes jVerse{0%,100%{transform:rotate(22deg)}50%{transform:rotate(30deg)}}
.jardiniere .j-eau ellipse{opacity:0;animation:jGoutte .9s ease-in infinite}
.jardiniere .j-eau ellipse:nth-child(2){animation-delay:.22s}
.jardiniere .j-eau ellipse:nth-child(3){animation-delay:.45s}
.jardiniere .j-eau ellipse:nth-child(4){animation-delay:.67s}
@keyframes jGoutte{0%{opacity:0;transform:translate(0,0)}15%,80%{opacity:1}100%{opacity:0;transform:translate(-14px,64px)}}
.jardiniere .j-pousse{transform-origin:365px 400px;animation:jPousse 3.4s ease-in-out infinite}
@keyframes jPousse{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.08) rotate(2deg)}}
.jardiniere .j-eclats path{transform-origin:center;transform-box:fill-box;animation:jEclat 1.8s ease-in-out infinite}
.jardiniere .j-eclats path:nth-child(2){animation-delay:.9s}
@keyframes jEclat{0%,100%{opacity:0;transform:scale(.4)}50%{opacity:1;transform:scale(1)}}

/* ---------- instagram : profil + 6 vignettes ---------- */
.insta{background:#fff}
.insta-tete{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px}
.insta-tete h2{margin:0;color:var(--texte)}
.insta-profil{display:flex;align-items:center;gap:14px;padding:10px 10px 10px 12px;border-radius:999px;text-decoration:none;color:inherit;
  background:linear-gradient(180deg,#fff,#F6FAF4);border:1px solid rgba(20,60,30,.06);box-shadow:var(--relief-carte);
  transition:box-shadow .35s var(--ease),transform .35s var(--ease-out)}
.insta-profil:hover{box-shadow:var(--relief-carte-h);transform:translateY(-2px)}
.insta-avatar{display:grid;place-items:center;width:52px;height:52px;border-radius:50%;padding:3px;flex:none;
  background:conic-gradient(from 200deg,#F2B53A,#E56717,#D6336C,#7A3BD1,#F2B53A)}
.insta-avatar img{width:100%;height:100%;object-fit:contain;padding:8px;border-radius:50%;background:#fff}
.insta-nom{display:grid;gap:2px;margin-right:6px}
.insta-nom strong{font-weight:500;color:var(--texte)}
.insta-nom span{font-size:.82rem;color:var(--muted)}
.insta-grille{display:grid;grid-template-columns:repeat(6,1fr);gap:clamp(10px,1.4vw,18px);margin-top:40px}
.insta-tuile{position:relative;display:block;aspect-ratio:1;border-radius:20px;overflow:hidden;
  box-shadow:0 2px 4px rgba(20,60,30,.06),0 22px 40px -20px rgba(20,60,30,.4);transition:transform .5s var(--ease-out),box-shadow .5s var(--ease-out)}
.insta-tuile img{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease-out)}
.insta-tuile:hover{box-shadow:0 4px 8px rgba(20,60,30,.08),0 34px 56px -22px rgba(20,60,30,.45)}
.insta-tuile:hover img{transform:scale(1.07)}
.insta-voile{position:absolute;inset:0;display:grid;place-items:center;color:#fff;background:rgba(35,127,60,.55);opacity:0;transition:opacity .35s var(--ease)}
.insta-tuile:hover .insta-voile,.insta-tuile:focus-visible .insta-voile{opacity:1}
.insta-tuile:focus-visible{outline:3px solid var(--terre);outline-offset:3px}
@media (max-width:900px){
  .paysa-in{grid-template-columns:1fr}
  .paysa-illu{order:-1;width:min(100%,380px)}
  .insta-grille{grid-template-columns:repeat(3,1fr)}
}
@media (max-width:520px){
  .insta-profil{width:100%}
  .insta-profil .btn{margin-left:auto}
  .insta-nom span{display:none}
}

/* ---------- page « Nos plantes » : grille façon « Our best product » ----------
   Cartes à liseré gris, photo posée sur une forme verte en biais, trait sous le
   visuel, nom en capitales espacées ; au survol, fond dégradé vert et cœur. */
.galerie-page{background:#fff;padding-top:calc(var(--head-h) + var(--head-top) + clamp(32px,5vw,64px))}
.retour{display:inline-flex;align-items:center;gap:6px;margin-bottom:clamp(20px,3vw,36px);font-size:.9rem;color:var(--vert);text-decoration:none}
.retour:hover{text-decoration:underline;text-underline-offset:3px}
.bp-tete{text-align:center}
.bp-k{margin:0 0 10px;font:400 .8rem/1.2 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--muted)}
.bp-titre{margin:0;font:500 clamp(2rem,3.6vw,3rem)/1.05 var(--sans);letter-spacing:.02em;text-transform:uppercase;color:var(--texte)}
.bp-titre::after{content:"";display:block;width:min(280px,60%);height:2px;margin:18px auto 0;
  background:linear-gradient(90deg,rgba(35,127,60,0),var(--vert) 50%,rgba(35,127,60,0))}
.bp-intro{margin:18px auto 0;max-width:52ch;color:var(--muted);font-size:.95rem}
/* filtres en onglets soulignés */
.galerie-page .bp-onglets{justify-content:center;gap:6px clamp(18px,2.6vw,34px);margin:30px 0 0}
.galerie-page .bp-onglets .filtre{padding:8px 0 10px;border:0;border-bottom:2px solid transparent;border-radius:0;background:none;box-shadow:none;
  font:400 .93rem/1 var(--sans);color:var(--muted)}
.galerie-page .bp-onglets .filtre:hover{color:var(--texte)}
.galerie-page .bp-onglets .filtre.on{background:none;box-shadow:none;color:var(--texte);font-weight:500;border-bottom-color:var(--vert)}
/* grille */
.bp-grille{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,24px);margin-top:34px}
.bp-carte{position:relative;display:flex;flex-direction:column;text-decoration:none;color:inherit;background:#fff;
  border:1px solid #E7EAE5;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(20,60,30,.04);
  transition:background .45s var(--ease),border-color .45s var(--ease),box-shadow .45s var(--ease-out),transform .45s var(--ease-out)}
.bp-carte:hover,.bp-carte:focus-visible{border-color:transparent;transform:translateY(-4px);
  background:linear-gradient(180deg,#B8DEB0 0%,#DDF0D8 52%,#FFFFFF 82%);box-shadow:var(--relief-carte-h)}
.bp-carte:focus-visible{outline:2px solid var(--terre);outline-offset:3px}
.bp-visuel{position:relative;display:block;aspect-ratio:6/5;overflow:hidden}
/* forme verte en biais, derrière la photo (décalée vers la gauche, comme la maquette) */
.bp-forme{position:absolute;left:24%;bottom:0;width:46%;height:76%;
  background:linear-gradient(180deg,#7CC28A 0%,#3E9D57 100%);clip-path:polygon(0 24%,100% 0,100% 100%,0 100%);
  transition:opacity .45s var(--ease)}
.bp-visuel img{position:absolute;left:50%;bottom:0;width:46%;height:84%;transform:translateX(-36%);object-fit:cover;
  clip-path:polygon(0 12%,100% 0,100% 100%,0 100%);border-radius:0;
  filter:drop-shadow(0 10px 12px rgba(20,60,30,.18));transition:transform .6s var(--ease-out),clip-path .6s var(--ease-out)}
.bp-carte:hover .bp-visuel img,.bp-carte:focus-visible .bp-visuel img{transform:translateX(-50%) scale(1.04);clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}
.bp-carte:hover .bp-forme,.bp-carte:focus-visible .bp-forme{opacity:0}
.bp-coeur{position:absolute;top:14px;right:14px;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;
  background:#fff;color:var(--vert);box-shadow:0 6px 14px -4px rgba(20,60,30,.3);opacity:0;transform:scale(.6);
  transition:opacity .3s var(--ease),transform .4s var(--ease-out)}
.bp-carte:hover .bp-coeur,.bp-carte:focus-visible .bp-coeur{opacity:1;transform:none}
.bp-legende{display:grid;justify-items:center;gap:6px;padding:16px 14px 20px;text-align:center;border-top:1px solid #EDF0EB}
.bp-carte:hover .bp-legende{border-top-color:rgba(35,127,60,.12)}
.bp-nom{font:500 .95rem/1.3 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--texte)}
.bp-cat{font-size:.8rem;color:#A9B0A8}
.bp-soins{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 12px;font-size:.76rem;color:var(--vert)}
.bp-soins span{display:inline-flex;align-items:center;gap:4px}
.bp-prix{font-size:.84rem;font-weight:500;color:var(--texte)}
.galerie-page .voir-plus{margin-top:38px}
.bp-plus{padding:12px 26px;min-height:44px;font-size:.9rem;border-radius:8px}
@media (max-width:620px){
  .bp-grille{grid-template-columns:repeat(2,1fr);gap:10px}
  .bp-nom{font-size:.76rem;letter-spacing:.05em}
  .bp-soins{display:none}
  .bp-legende{padding:12px 8px 14px}
  .galerie-page .bp-onglets{flex-wrap:nowrap;justify-content:flex-start;overflow-x:auto;margin:26px -16px 0;padding:0 16px;scrollbar-width:none}
  .galerie-page .bp-onglets::-webkit-scrollbar{display:none}
  .galerie-page .bp-onglets .filtre{flex:none}
}

/* ---------- page Plantes : commande (panier → WhatsApp) ---------- */
.bp-etapes{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:900px;margin:30px auto 0;padding:0}
.bp-etapes li{display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:18px;background:linear-gradient(180deg,#fff,#F6FAF4);
  border:1px solid rgba(20,60,30,.06);box-shadow:var(--relief-carte);text-align:left}
.bp-etapes strong{display:block;font-weight:500;color:var(--texte);font-size:.95rem}
.bp-etapes li span:last-child{font-size:.82rem;color:var(--muted);line-height:1.4}
.bp-etape-n{display:grid;place-items:center;flex:none;width:38px;height:38px;border-radius:50%;
  font:900 1.15rem/1 var(--display);color:#fff;background:linear-gradient(180deg,var(--lime-clair),var(--lime));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 6px 12px -4px rgba(229,103,23,.55)}
/* carte : le haut ouvre la fiche, le bas ajoute au panier */
.bp-ouvrir{display:block;width:100%;padding:0;border:0;background:none;font:inherit;color:inherit;text-align:inherit;cursor:pointer}
.bp-ouvrir:focus-visible{outline:2px solid var(--terre);outline-offset:-4px;border-radius:14px}
.bp-action{display:flex;justify-content:center;padding:0 14px 18px}
.btn-ajout{display:inline-flex;align-items:center;gap:7px;height:40px;padding:0 18px;border:0;border-radius:999px;cursor:pointer;
  font:500 .88rem/1 var(--sans);color:#fff;background:linear-gradient(180deg,#2F9A4C,var(--vert));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -3px 0 rgba(0,0,0,.14),0 8px 16px -8px rgba(35,127,60,.6);
  transition:transform .25s var(--ease-out)}
.btn-ajout:hover{transform:translateY(-2px)}
.btn-ajout:active{transform:translateY(1px)}
.btn-ajout:focus-visible{outline:3px solid var(--terre);outline-offset:3px}
/* marquée par un attribut, pas par la classe : React réécrirait la classe et effacerait « in » (apparition) */
.bp-carte[data-panier]{border-color:rgba(35,127,60,.35)}
.qte{display:inline-flex;align-items:center;gap:2px;height:40px;padding:3px;border-radius:999px;background:#fff;
  border:1px solid rgba(35,127,60,.2);box-shadow:inset 0 1px 2px rgba(20,60,30,.06)}
.qte button{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:50%;cursor:pointer;
  font:500 1.1rem/1 var(--sans);color:var(--vert);background:linear-gradient(145deg,#F5FBF2,#D7ECD0)}
.qte button:hover{background:var(--vert);color:#fff}
.qte button:focus-visible{outline:2px solid var(--terre);outline-offset:1px}
.qte>span{min-width:28px;text-align:center;font:900 1rem/1 var(--display);color:var(--vert-titre)}
/* fiche : ajout au panier */
.fiche-panier{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.fiche-voir-panier{border:0;background:none;cursor:pointer;font:500 .9rem/1 var(--sans);color:var(--vert);text-decoration:underline;text-underline-offset:3px}
/* barre du panier, en bas de l'écran */
.panier-barre{position:fixed;left:50%;bottom:18px;z-index:60;transform:translateX(-50%);display:flex;align-items:center;gap:14px;
  width:min(560px,calc(100% - 32px));padding:8px 10px 8px 8px;border:0;border-radius:999px;cursor:pointer;color:#fff;font:inherit;
  background:linear-gradient(180deg,#2F9A4C,var(--vert));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -3px 0 rgba(0,0,0,.14),0 18px 40px -12px rgba(20,60,30,.6);
  animation:barreIn .45s var(--ease-out) both}
@keyframes barreIn{from{opacity:0;transform:translate(-50%,24px)}to{opacity:1;transform:translate(-50%,0)}}
.panier-ico{position:relative;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.16)}
.panier-nb{position:absolute;top:-4px;right:-4px;display:grid;place-items:center;min-width:22px;height:22px;padding:0 5px;border-radius:999px;
  background:var(--lime);font-size:.76rem;font-weight:500;box-shadow:0 0 0 2px var(--vert)}
.panier-resume{flex:1;text-align:left;font-size:.95rem}
.panier-barre strong{padding:12px 18px;border-radius:999px;font-weight:500;background:linear-gradient(180deg,var(--lime-clair),var(--lime));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 6px 12px -6px rgba(0,0,0,.35)}
.panier-barre:focus-visible{outline:3px solid var(--lime);outline-offset:3px}
/* panneau de commande */
.panier-fond{position:fixed;inset:0;z-index:80;display:flex;justify-content:flex-end;background:rgba(12,40,22,.5);
  backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);animation:fadein .3s var(--ease-out) both}
.panier{display:flex;flex-direction:column;gap:18px;width:min(460px,100%);height:100%;overflow-y:auto;padding:24px clamp(18px,3vw,30px) 30px;
  background:#fff;box-shadow:-24px 0 60px -20px rgba(0,0,0,.35);animation:panierIn .45s var(--ease-out) both}
@keyframes panierIn{from{transform:translateX(40px);opacity:0}to{transform:none;opacity:1}}
.panier-tete{display:flex;align-items:center;justify-content:space-between;gap:12px}
.panier-tete h2{margin:0;font-size:1.7rem}
.panier-x{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:#fff;
  font-size:1.5rem;line-height:1;cursor:pointer;color:var(--texte)}
.panier-vide{margin:0;padding:18px;border-radius:14px;background:var(--creme);color:var(--muted)}
.panier-liste{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.panier-liste li{display:grid;grid-template-columns:56px 1fr auto auto;align-items:center;gap:12px;padding:10px;border-radius:16px;
  background:linear-gradient(180deg,#fff,#F6FAF4);border:1px solid rgba(20,60,30,.07);box-shadow:var(--relief-carte)}
.panier-liste img{width:56px;height:56px;border-radius:12px;object-fit:cover}
.panier-nom{display:grid;gap:2px;min-width:0}
.panier-nom strong{font-weight:500;font-size:.92rem;line-height:1.3;overflow-wrap:anywhere}
.panier-nom span{font-size:.76rem;color:var(--muted)}
.panier-retirer{width:30px;height:30px;border:0;border-radius:50%;background:none;color:var(--muted);font-size:1.3rem;cursor:pointer}
.panier-retirer:hover{background:#FDEBDD;color:var(--terre)}
.panier-form{display:grid;gap:14px;padding-top:6px;border-top:1px solid var(--line)}
.panier-form label{display:grid;gap:7px;font:500 .84rem/1.2 var(--sans);color:var(--texte)}
.panier-form input,.panier-form textarea{font:inherit;font-weight:400;font-size:.95rem;color:var(--texte);width:100%;padding:12px 14px;
  border:1px solid var(--line);border-radius:12px;background:var(--creme)}
.panier-form input:focus,.panier-form textarea:focus{outline:none;border-color:var(--vert);background:#fff;box-shadow:0 0 0 4px rgba(35,127,60,.14)}
.panier-form textarea{resize:vertical}
.facultatif{font-weight:400;color:var(--muted)}
.panier-mode{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0;padding:0;border:0}
.panier-mode legend{margin-bottom:7px;font:500 .84rem/1.2 var(--sans);color:var(--texte)}
.panier-mode label{display:flex;align-items:center;justify-content:center;height:44px;border-radius:12px;border:1px solid var(--line);
  background:#fff;cursor:pointer;font-weight:400;transition:background .25s,border-color .25s,color .25s}
.panier-mode label.on{border-color:var(--vert);background:var(--vert-pale);color:var(--vert-titre);font-weight:500}
.panier-mode input{position:absolute;opacity:0;pointer-events:none}
.panier-mode label:focus-within{outline:2px solid var(--terre);outline-offset:2px}
.panier-form .form-hint{color:var(--muted);background:var(--creme);padding:10px 12px;border-radius:12px;font-size:.82rem}
.panier-form .btn{width:100%}
.panier-form .btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.panier-vider{justify-self:center;border:0;background:none;color:var(--muted);font-size:.85rem;text-decoration:underline;cursor:pointer}
@media (max-width:760px){
  .bp-etapes{grid-template-columns:1fr;max-width:420px}
  .panier-resume{font-size:.85rem}
  .panier-barre strong{padding:11px 14px}
}
@media (max-width:620px){
  .bp-action{padding:0 8px 12px}
  .btn-ajout{height:36px;padding:0 14px;font-size:.82rem}
  .qte{height:36px}
  .qte button{width:28px;height:28px}
}

/* ---------- relief 3D commun (même lumière que les pots : reflet en haut, ombre douce dessous) ---------- */
.service,.avis,.contact-in>div:first-child,.filtre{background:linear-gradient(180deg,#FFFFFF 0%,#F8FBF6 100%);box-shadow:var(--relief-carte);border-color:rgba(20,60,30,.06)}
.service:hover,.avis:hover{box-shadow:var(--relief-carte-h)}
.filtre.on{background:linear-gradient(180deg,#2F9A4C,var(--vert));box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 8px 18px -6px rgba(35,127,60,.5)}
.service-ico{box-shadow:none;filter:drop-shadow(0 4px 6px rgba(20,60,30,.12))}
.card-img{box-shadow:0 2px 4px rgba(20,60,30,.06),0 24px 44px -20px rgba(20,60,30,.35);
  transition:transform .6s var(--ease-out),box-shadow .6s var(--ease-out)}
.card:hover .card-img{transform:perspective(900px) rotateX(3deg) translateY(-6px);box-shadow:0 4px 8px rgba(20,60,30,.08),0 36px 60px -22px rgba(20,60,30,.4)}
/* (la photo du café, découpée en nuage, n'a plus d'ombre rectangulaire) */
.ct-droite{box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 30px 70px -30px rgba(20,60,30,.45)}
.astuces-liste button.on{box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 18px 36px -18px rgba(0,0,0,.35)}
.wa-fixed{background:linear-gradient(180deg,#F27D33,var(--terre));box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 12px 26px -6px rgba(229,103,23,.6)}

/* ---------- aspect 3D moderne ----------
   1. inclinaison au pointeur + reflet ; 2. apparition en perspective ;
   3. parallaxe du hero en calques ; 4. icônes modelées (pâte, reflet, ombre portée). */
[data-tilt]{position:relative;will-change:transform}
[data-tilt]::after{content:"";position:absolute;inset:0;z-index:3;border-radius:inherit;pointer-events:none;
  background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.42),rgba(255,255,255,0) 52%);
  opacity:0;transition:opacity .35s var(--ease)}
.js [data-tilt].tilt-on,[data-tilt].tilt-on{transform:perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(-6px)!important;
  transition:transform .12s ease-out,box-shadow .35s var(--ease)!important;box-shadow:var(--relief-carte-h)}
[data-tilt].tilt-on::after{opacity:1}
.insta-tuile[data-tilt]::after{background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.3),rgba(255,255,255,0) 55%)}


/* parallaxe du hero : plus un calque est « proche », plus il bouge */
.hero{--px:0;--py:0}
.hero-copy{translate:calc(var(--px) * -6px) calc(var(--py) * -4px);transition:translate .7s var(--ease-out)}
.hero-halo{translate:calc(var(--px) * -10px) calc(var(--py) * -8px);transition:translate .7s var(--ease-out)}
.hero-pep{translate:calc(var(--px) * 14px) calc(var(--py) * 10px);transition:translate .5s var(--ease-out)}
.hero-ombre{translate:calc(var(--px) * 14px) 0;transition:translate .5s var(--ease-out)}
.hero-info{translate:calc(var(--px) * 26px) calc(var(--py) * 18px);transition:translate .5s var(--ease-out)}

/* icônes modelées : dégradé clair en haut à gauche, creux en bas à droite, ombre portée colorée */
.service-ico{-webkit-mask:none;mask:none;border-radius:18px;color:var(--vert);filter:none;
  background:linear-gradient(145deg,#F5FBF2 0%,#CFE7C7 100%);
  box-shadow:inset 2px 2px 3px rgba(255,255,255,.95),inset -4px -5px 10px rgba(35,127,60,.18),0 12px 20px -10px rgba(35,127,60,.55)}
.ct-ico{-webkit-mask:none;mask:none;border-radius:50%;color:var(--vert);
  background:linear-gradient(145deg,#F5FBF2 0%,#CFE7C7 100%);
  box-shadow:inset 1.5px 1.5px 2px rgba(255,255,255,.95),inset -3px -4px 7px rgba(35,127,60,.18),0 8px 14px -8px rgba(35,127,60,.55)}
.vit-nav button{background:linear-gradient(180deg,#fff,#EEF6EB);border-color:rgba(20,60,30,.1);
  box-shadow:inset 0 1px 0 #fff,0 6px 12px -6px rgba(20,60,30,.35)}
.vit-nav button:hover{background:linear-gradient(180deg,#2F9A4C,var(--vert))}

/* =====================================================================
   DIRECTION ARTISTIQUE (visuels Instagram « Quelle plante êtes-vous ? »,
   « Journée verte ») — une seule règle pour tous les titres de la page :
   - police ronde très grasse (Grandstander), en capitales, extrudée en 3D ;
   - fond clair : lettres vertes, épaisseur orange ;
   - fond vert  : lettres blanches, épaisseur vert profond ;
   - mot clé    : lettres orange, épaisseur verte (partout) ;
   - plantes détourées cerclées de blanc (effet autocollant) ;
   - formes orange en bord des sections vertes.
   ===================================================================== */
:root{
  --display:var(--font-display),"Grandstander","Baloo 2",system-ui,sans-serif;
  --lime:#E56717; /* accent : orange de la marque */
  --lime-fonce:#B84E0E;
  --lime-clair:#F27D33;
  --vert-titre:#1C6B33;
  --vert-profond:#14502A;
  --extrude-clair:.035em .035em 0 var(--lime),.07em .07em 0 var(--lime),.1em .1em 0 var(--lime-fonce),.12em .16em .3em rgba(20,60,30,.14);
  --extrude-vert:.035em .035em 0 #1A6331,.07em .07em 0 #1A6331,.1em .1em 0 var(--vert-profond),.12em .16em .3em rgba(0,0,0,.18);
}
/* titres de section : même famille, même graisse, même extrusion partout */
h1,h2,.hero .hero-copy h1,.vitrine .vit-tete h2,.bp-titre,.ct-grand,.duo-carte h2,.welcome-texte{
  font-family:var(--display);font-weight:900;text-transform:uppercase;letter-spacing:.01em;line-height:1.04;
  color:var(--vert-titre);text-shadow:var(--extrude-clair)}
h2{font-size:clamp(1.9rem,3.5vw,2.9rem)}
.hero .hero-copy h1{font-size:clamp(2.1rem,3.9vw,3.4rem);max-width:16ch}
.vitrine .vit-tete h2{font-size:clamp(1.6rem,2.5vw,2.2rem);max-width:none}
.bp-titre{font-size:clamp(2rem,3.6vw,3rem)}
.ct-titre{font-family:var(--display);font-weight:900;text-transform:uppercase;font-size:1.35rem;letter-spacing:.01em;color:var(--vert-titre)}
/* sur fond vert : blanc extrudé vert profond */
.conseils h2,.jungle h2,.ct-droite h2,.ct-grand,.welcome-texte{color:#fff;text-shadow:var(--extrude-vert)}
.welcome-texte{font-size:clamp(2rem,6vw,3.6rem)}
/* mot clé : lettres orange extrudées en vert, sur fond clair comme sur fond vert */
h1 em,h2 em,h1 .souligne,h2 .souligne{font-style:normal;font-weight:900;color:var(--lime);background:none;padding:0;
  text-shadow:.035em .035em 0 var(--vert-titre),.07em .07em 0 var(--vert-titre),.1em .1em 0 var(--vert-profond),.12em .16em .3em rgba(20,60,30,.16)}
/* surtitres : vert sur clair, orange clair sur vert */
.conseils .eyebrow,.jungle .eyebrow{color:#FFB37A}
/* sur fond vert, le mot clé garde l'orange mais sans l'ancien trait de pinceau, épaisseur vert profond */
.conseils h2 .souligne,.jungle h2 .souligne,.ct-droite h2 .souligne,.conseils h2 em,.jungle h2 em{background:none;text-shadow:var(--extrude-vert)}
/* menu mobile : mêmes titres */
.menu-mobile nav a{font-family:var(--display);font-weight:900;text-transform:uppercase;font-size:2rem;text-shadow:var(--extrude-vert)}

/* plantes détourées : contour blanc façon autocollant + ombre portée */
.vit-feuillage{filter:drop-shadow(2.5px 0 0 #fff) drop-shadow(-2.5px 0 0 #fff) drop-shadow(0 2.5px 0 #fff) drop-shadow(0 -2.5px 0 #fff) drop-shadow(0 16px 14px rgba(20,60,30,.18))}
/* la plante du hero se détache sur le nuage clair : pas de liseré blanc, qui soulignerait les jours entre les feuilles */
.hero-feuillage{filter:drop-shadow(0 16px 14px rgba(20,60,30,.18))}

/* pas de formes décoratives orange : les sections vertes restent sobres */
/* hero : pastilles orange derrière la plante, qui suivent la parallaxe */
.hero-photo::before{content:"";position:absolute;z-index:0;left:14%;top:44%;width:clamp(70px,8vw,120px);aspect-ratio:1;border-radius:50%;
  background:var(--lime);translate:calc(var(--px,0) * -16px) calc(var(--py,0) * -12px);transition:translate .6s var(--ease-out)}
.hero-photo::after{content:"";position:absolute;z-index:0;right:6%;bottom:16%;width:clamp(120px,13vw,190px);aspect-ratio:1;border-radius:50%;
  border:14px solid var(--lime);opacity:.85;translate:calc(var(--px,0) * 22px) calc(var(--py,0) * 16px);transition:translate .6s var(--ease-out)}

/* boutons sur fond vert : orange, texte blanc */
.jungle-tel{background:linear-gradient(180deg,var(--lime-clair),var(--lime));color:#fff;border-radius:999px;padding:14px 26px;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -3px 0 rgba(0,0,0,.1),0 12px 24px -8px rgba(0,0,0,.35)}
.jungle-tel:hover{text-decoration:none;transform:translateY(-2px)}
.astuce-barre{background:var(--lime)}
.astuces-liste button.on .astuce-k{color:#FFB37A}
.vit-k,.eyebrow{font-weight:500}
/* mêmes couleurs de titre partout, malgré les anciens réglages par section */
.paysa-texte h2,.insta-tete h2,.duo-carte h2,.avisband h2,.galerie h2{color:var(--vert-titre)}
.eyebrow,.vit-k,.duo-carte .eyebrow,.bp-k{color:var(--vert)}
/* accents : orange de la marque (étoiles en vert pour rester lisibles sur les cartes) */
.avis-etoiles{color:var(--vert)}
.avis-etoiles span{color:#D3E2CE}
.site-foot a.foot-pill-insta{background:var(--lime);border-color:var(--lime);color:#fff}
.site-foot a.foot-pill-insta:hover{background:var(--lime-clair);color:#fff;filter:none}
@media (max-width:620px){
  .hero .hero-copy h1{font-size:clamp(1.9rem,8.2vw,2.6rem)}
  h2{font-size:clamp(1.7rem,7vw,2.2rem)}
}

/* bouton flottant « boutique » : pastille vert nuit, icône du sac, étiquette au survol */
.boutique-fixed{position:fixed;right:20px;bottom:20px;z-index:55;display:grid;place-items:center;width:62px;height:62px;padding:0;border:0;border-radius:50%;
  cursor:pointer;text-decoration:none;background:radial-gradient(circle at 35% 30%,#0C4A33,#032B20 72%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 14px 28px -8px rgba(3,43,32,.6);transition:transform .35s var(--ease-out)}
.boutique-fixed:hover{transform:translateY(-3px) scale(1.04)}
.boutique-fixed:focus-visible{outline:3px solid var(--lime);outline-offset:3px}
.boutique-etiquette{position:absolute;right:calc(100% + 10px);top:50%;padding:8px 14px;border-radius:999px;white-space:nowrap;
  font:500 .86rem/1 var(--sans);color:#fff;background:#032B20;box-shadow:0 10px 20px -10px rgba(0,0,0,.5);
  opacity:0;transform:translate(8px,-50%);pointer-events:none;transition:opacity .25s var(--ease),transform .3s var(--ease-out)}
.boutique-fixed:hover .boutique-etiquette,.boutique-fixed:focus-visible .boutique-etiquette{opacity:1;transform:translate(0,-50%)}

/* ---------- hero façon « Méridienne » ----------
   fond doux uni, grand titre sur deux lignes, deux boutons (plein / contour),
   trois repères en bas ; à droite, la plante en grand qui déborde vers le bord. */
.hero{background:radial-gradient(42% 60% at 78% 55%,#F7F9F3 0%,rgba(247,249,243,0) 70%),#ECEFE7}
.hero-in{grid-template-columns:1.05fr 1fr;align-items:center}
.hero-copy .hero-k{max-width:none;margin:0 0 18px;font:500 .82rem/1.2 var(--sans);letter-spacing:.32em;text-transform:uppercase;color:var(--texte)}
.hero .hero-copy h1{margin:0 0 22px;max-width:none;font-size:clamp(2.6rem,4.3vw,4.3rem);line-height:1}
.hero-copy .hero-texte{max-width:62ch;margin:0;font-size:1.06rem;line-height:1.65;color:#4E584F}
.hero-cta{gap:14px;margin-top:30px}
.btn-contour{background:transparent;color:var(--texte);border:1.5px solid rgba(20,40,20,.25);box-shadow:none}
.btn-contour:hover{background:#fff;border-color:var(--vert);color:var(--vert)}
.hero-reperes{display:flex;gap:clamp(28px,4vw,56px);margin:clamp(48px,7vh,84px) 0 0;padding:0}
.hero-reperes div{display:grid;gap:4px}
.hero-reperes dt{font-size:.78rem;color:var(--muted)}
.hero-reperes dd{margin:0;font-size:1.05rem;color:var(--texte)}
/* la plante, en grand, posée à droite et qui déborde vers le bord de l'écran */
.hero-photo{min-height:clamp(460px,46vw,680px);place-items:end center}
.hero-photo::before,.hero-photo::after{display:none}
.hero-halo{left:0;right:-20%;top:4%;bottom:0;background:radial-gradient(closest-side,rgba(255,255,255,.85),rgba(255,255,255,0))}
.hero-pep{width:clamp(190px,19vw,290px);margin:0 -10% 5% 0}
.hero-ombre{width:clamp(190px,19vw,290px);bottom:calc(5% - 14px);left:calc(50% + 5%)}
@media (max-width:900px){
  .hero-in{grid-template-columns:1fr}
  .hero-photo{min-height:380px}
  .hero-pep{width:150px;margin:0 0 6%}
  .hero-ombre{width:150px;left:50%}
  .hero-reperes{margin-top:34px;gap:24px}
}
@media (max-width:620px){
  .hero .hero-copy h1{font-size:clamp(2.3rem,11vw,3rem)}
  .hero-copy .hero-k{letter-spacing:.2em;font-size:.72rem}
  .hero-texte br{display:none}
  .hero-cta{display:grid;grid-template-columns:1fr 1fr}
  .hero-cta .btn{padding:14px 10px}
  .hero-reperes dd{font-size:.95rem}
}

/* =====================================================================
   PATCH « COLLAGE » — inspiré du visuel « 6 PLANTES / CHEZ EXOTICAS ».
   Principe : gros titres en capitales, étiquettes-autocollants blanches ou
   vert profond légèrement de travers, ombre pleine, flèche tracée à la main
   et photo découpée en nuage. Le contenu et l'ordre des sections ne changent pas.
   ===================================================================== */
:root{
  --nuage:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 400' preserveAspectRatio='none'%3E%3Cpath fill='black' d='M244 18C292 12 330 34 340 72C372 52 418 64 430 102C466 112 488 152 466 190C494 224 484 276 444 292C438 340 392 366 350 348C322 384 266 392 230 362C194 394 138 384 120 344C74 346 44 306 58 266C20 240 18 190 50 166C40 122 76 88 120 94C132 48 186 18 224 40C230 28 236 20 244 18Z'/%3E%3C/svg%3E");
  --ombre-autocollant:0 6px 0 rgba(10,40,20,.22);
}

/* ---- titres : à plat, très gras, en capitales (fini l'extrusion orange) ---- */
h1,h2,.hero .hero-copy h1,.vitrine .vit-tete h2,.bp-titre,.ct-grand,.duo-carte h2,.welcome-texte,
.paysa-texte h2,.insta-tete h2,.avisband h2,.galerie h2{color:var(--vert-profond);text-shadow:none;letter-spacing:-.015em}
h2{font-size:clamp(2.1rem,4.1vw,3.4rem)}
.conseils h2,.jungle h2,.ct-droite h2,.ct-grand,.welcome-texte{color:#fff;text-shadow:none}
h1 em,h2 em{font-style:normal;font-weight:900;color:var(--lime);background:none;padding:0;text-shadow:none}

/* ---- surtitres : petites étiquettes collées de travers ---- */
.eyebrow,.vit-k,.bp-k,.duo-carte .eyebrow{display:inline-block;margin:0 0 16px;padding:8px 13px 7px;
  background:var(--vert-profond);color:#fff;border:0;
  font:900 .76rem/1 var(--display);letter-spacing:.09em;text-transform:uppercase;
  transform:rotate(-1.6deg);box-shadow:0 4px 0 rgba(10,40,20,.18)}
.conseils .eyebrow,.jungle .eyebrow,.ct-droite .eyebrow{background:#fff;color:var(--vert-profond);box-shadow:0 4px 0 rgba(0,0,0,.24)}
/* surtitres des sections centrées : l'étiquette reste centrée au-dessus du titre */
.galerie .eyebrow,.conseils .eyebrow,.avisband .eyebrow,.bp-k{display:table;margin-left:auto;margin-right:auto}

/* ---- mot clé : étiquette vert profond (ou blanche sur fond vert) ---- */
h1 .souligne,h2 .souligne,h3 .souligne{background:var(--vert-profond)!important;color:#fff!important;padding:.03em .18em .08em;
  font-weight:900;text-shadow:none!important;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.conseils h2 .souligne,.jungle h2 .souligne,.ct-droite h2 .souligne{background:#fff!important;color:var(--vert-profond)!important}

/* ---- boutons : étiquettes autocollantes, coins presque droits ---- */
.btn{position:relative;border:0;border-radius:5px;padding:14px 24px;min-height:50px;
  font:900 .9rem/1 var(--display);letter-spacing:.055em;text-transform:uppercase;
  box-shadow:var(--ombre-autocollant);transform:rotate(-1.1deg);
  transition:transform .25s var(--ease-out),box-shadow .25s var(--ease),background .25s var(--ease),color .25s var(--ease)}
.btn:hover{transform:rotate(0) translateY(-2px);box-shadow:0 8px 0 rgba(10,40,20,.2)}
.btn:active{transform:rotate(0) translateY(2px);box-shadow:0 3px 0 rgba(10,40,20,.25)}
.btn:focus-visible{outline:3px solid var(--lime);outline-offset:3px}
.btn-primary,.site-head .btn-primary{background:var(--vert-profond);color:#fff;box-shadow:0 6px 0 #0D3B1F}
.btn-primary:hover,.site-head .btn-primary:hover{background:#1C6B33;box-shadow:0 8px 0 #0D3B1F}
.btn-moutarde{background:var(--terre);color:#fff;box-shadow:0 6px 0 #9A3F0B}
.btn-moutarde:hover{background:var(--lime-clair);box-shadow:0 8px 0 #9A3F0B}
.btn-light,.btn-wa{background:#fff;color:var(--vert-profond);box-shadow:0 6px 0 rgba(10,40,20,.22)}
.btn-light:hover,.btn-wa:hover{background:var(--vert-profond);color:#fff;box-shadow:0 8px 0 #0D3B1F}
.btn-ghost{background:transparent;color:#fff;border:2px solid #fff;box-shadow:none}
.btn-ghost:hover{background:#fff;color:var(--vert-profond);border-color:#fff}
.btn-contour{background:#fff;color:var(--vert-profond);border:2px solid var(--vert-profond);box-shadow:0 6px 0 rgba(20,80,42,.18)}
.btn-contour:hover{background:var(--vert-profond);color:#fff;border-color:var(--vert-profond)}
/* le deuxième bouton d'une paire penche de l'autre côté, comme deux étiquettes posées */
.hero-cta .btn:nth-child(2),.paysa-cta .btn:nth-child(2),.menu-cta .btn:nth-child(2){transform:rotate(1.2deg)}
.hero-cta .btn:nth-child(2):hover,.paysa-cta .btn:nth-child(2):hover,.menu-cta .btn:nth-child(2):hover{transform:rotate(0) translateY(-2px)}

/* ---- en-tête : le bouton devient une étiquette blanche ---- */
.head-cta{border-radius:5px;background:#fff;color:var(--vert-profond);box-shadow:0 5px 0 rgba(0,0,0,.22);
  font:900 .84rem/1 var(--display);letter-spacing:.06em;text-transform:uppercase;transform:rotate(-1.4deg)}
.head-cta:hover{transform:rotate(0) translateY(-2px);box-shadow:0 7px 0 rgba(0,0,0,.2)}
.head-cta-nb{background:var(--vert-profond);color:#fff}

/* ---- HERO : l'affiche verte, titre blanc, étiquettes et nuage photo ---- */
.hero{background-color:var(--vert);background-image:none;color:#fff}
.hero .hero-copy .hero-k{display:inline-block;max-width:none;margin:0 0 24px;padding:9px 14px 8px;
  background:#fff;color:var(--vert-profond);font:900 .76rem/1 var(--display);letter-spacing:.1em;
  transform:rotate(-2.2deg);box-shadow:0 5px 0 rgba(0,0,0,.2)}
.hero .hero-copy h1{color:#fff;max-width:none;margin:0 0 26px;font-size:clamp(3rem,6vw,5.6rem);line-height:.92;
  letter-spacing:-.015em;text-shadow:0 3px 0 rgba(0,0,0,.12)}
.hero-titre-ligne{display:block}
.hero .hero-copy h1 em{color:#FFB37A;background:none;padding:0;text-shadow:none}
.hero-titre-label{display:inline-block;margin-top:.16em;padding:.02em .2em .09em;background:var(--vert-profond);color:#fff;
  font-size:.6em;letter-spacing:.005em;transform:rotate(-1.8deg);box-shadow:0 7px 0 rgba(0,0,0,.22)}
.hero-copy .hero-texte{max-width:48ch;color:rgba(255,255,255,.9)}
.hero-reperes dt{color:rgba(255,255,255,.68)}
.hero-reperes dd{color:#fff}
.hero .btn-primary{background:#fff;color:var(--vert-profond);box-shadow:0 6px 0 rgba(0,0,0,.26)}
.hero .btn-primary:hover{background:#F2F8EC;box-shadow:0 8px 0 rgba(0,0,0,.24)}
.hero .btn-contour{background:transparent;color:#fff;border-color:rgba(255,255,255,.85);box-shadow:none}
.hero .btn-contour:hover{background:#fff;color:var(--vert-profond);border-color:#fff}
/* nuage : grand contour blanc, intérieur crème, la plante se pose devant */
.hero-photo::before,.hero-photo::after{display:none}
.hero-halo{left:2%;right:2%;top:2%;bottom:5%;border-radius:0;background:transparent}
.hero-halo::before{content:"";position:absolute;inset:-2.5% -2%;background:#fff;
  -webkit-mask:var(--nuage) center/100% 100% no-repeat;mask:var(--nuage) center/100% 100% no-repeat}
.hero-halo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,#F5FAF0 0%,#D9E9CE 100%);
  -webkit-mask:var(--nuage) center/100% 100% no-repeat;mask:var(--nuage) center/100% 100% no-repeat}
.hero-pep{width:clamp(180px,17vw,250px);margin-bottom:8%}
.hero-ombre{width:clamp(180px,17vw,250px);background:radial-gradient(closest-side,rgba(0,20,8,.34),rgba(0,20,8,0))}
.hero-fleche{position:absolute;left:43%;bottom:13%;z-index:2;width:clamp(64px,7vw,108px);color:#fff;
  transform:rotate(32deg);opacity:.92}

/* ---- bandeau des services : fond blanc uni, sans chevauchement vert/crème ---- */
.services{margin-top:0;padding:clamp(28px,4vw,48px) 0 clamp(20px,3vw,36px);background:#fff}

/* ---- photos en forme de nuage (coin café) ---- */
.duo-photo{padding:0;background:none;border-radius:0;overflow:visible;aspect-ratio:5/4}
.duo-photo::before{content:"";position:absolute;inset:0;z-index:0;background:#fff;transform:scale(1.045);
  -webkit-mask:var(--nuage) center/100% 100% no-repeat;mask:var(--nuage) center/100% 100% no-repeat}
.duo-photo img{position:relative;z-index:1;border-radius:0;
  -webkit-mask:var(--nuage) center/100% 100% no-repeat;mask:var(--nuage) center/100% 100% no-repeat}
.duo-photo:hover img{transform:none}

/* ---- page Plantes : le titre devient une grande étiquette ---- */
.bp-titre{display:inline-block;padding:.06em .3em .14em;background:var(--vert-profond);color:#fff;
  transform:rotate(-1.4deg);box-shadow:0 7px 0 rgba(20,80,42,.18);text-shadow:none}
.bp-titre::after{display:none}

/* ---- filtres et petits boutons : même famille d'étiquettes ---- */
.filtre{border-radius:5px;border:0;font:900 .8rem/1 var(--display);letter-spacing:.06em;text-transform:uppercase;
  box-shadow:0 3px 0 rgba(10,40,20,.16);transform:rotate(-.8deg)}
.filtre.on{background:var(--vert-profond);color:#fff;box-shadow:0 3px 0 #0D3B1F}
.filtre:nth-child(even){transform:rotate(.8deg)}
.galerie-page .bp-onglets .filtre{transform:none;box-shadow:0 3px 0 rgba(10,40,20,.16)}
.galerie-page .bp-onglets .filtre.on{box-shadow:0 3px 0 #0D3B1F}
/* photos de la boutique : même découpe en nuage que la photo du café */
.galerie-page .bp-visuel{aspect-ratio:1/1;overflow:hidden;padding:0}
.galerie-page .bp-forme{inset:1.5%;width:auto;height:auto;clip-path:none;
  background:linear-gradient(180deg,#DDEBD4 0%,#BCD6B0 100%);transform:none;opacity:1;
  -webkit-mask:var(--nuage) center/100% 100% no-repeat;mask:var(--nuage) center/100% 100% no-repeat}
.galerie-page .bp-visuel img{inset:4.5%;width:auto;height:auto;transform:none;clip-path:none;
  border-radius:0;filter:none;object-fit:cover;
  -webkit-mask:var(--nuage) center/100% 100% no-repeat;mask:var(--nuage) center/100% 100% no-repeat}
.galerie-page .bp-carte:hover .bp-visuel img,.galerie-page .bp-carte:focus-visible .bp-visuel img{transform:scale(1.035);clip-path:none}
.galerie-page .bp-carte:hover .bp-forme,.galerie-page .bp-carte:focus-visible .bp-forme{opacity:1}
.btn-ajout{border-radius:5px;font:900 .8rem/1 var(--display);letter-spacing:.05em;text-transform:uppercase;box-shadow:0 4px 0 #0D3B1F}
.btn-ajout:active{box-shadow:0 1px 0 #0D3B1F}
.jungle-tel{border-radius:5px;font-family:var(--display);font-weight:900;letter-spacing:.04em;text-transform:uppercase;
  transform:rotate(-1.2deg);box-shadow:0 6px 0 #9A3F0B}
.jungle-tel:hover{transform:rotate(0) translateY(-2px)}

/* ---- responsive : le nuage reste dans le cadre, la flèche s'efface ---- */
@media (max-width:900px){
  .hero .hero-copy h1{font-size:clamp(2.7rem,9vw,4.2rem)}
  .hero-halo{left:8%;right:8%;top:4%;bottom:5%}
  .hero-pep{width:150px}
  .hero-ombre{width:150px}
  .hero-feuillage{--fw:min(260%,88vw)}
  .hero-fleche{display:none}
  .duo-photo{max-width:460px;margin:0 auto}
}
@media (max-width:620px){
  .hero .hero-copy h1{font-size:clamp(2.5rem,11.5vw,3.4rem)}
  .hero-titre-label{font-size:.56em}
  .hero .hero-copy .hero-k{font-size:.68rem;letter-spacing:.07em}
  /* sur téléphone, la plante en pot du hero est retirée */
  .hero-photo{display:none}
  .hero{padding-bottom:56px}
  .hero-cta{grid-template-columns:1fr}
  .hero-cta .btn{padding:14px 16px}
  .btn{font-size:.84rem;padding:13px 18px}
  .paysa-cta{display:grid;grid-template-columns:1fr}
  .paysa-cta .btn:nth-child(2){transform:rotate(-1.1deg)}
}


/* ---- vitrine : un peu plus d'air entre le filet, les plantes, les noms et le bouton ---- */
.vit-top{top:27.5%}
.vit-legende{top:calc(100% + 20px)}
.vit-plus{top:calc(100% + 50px)}

/* =====================================================================
   EN-TÊTE — barre flottante en forme de capsule (fond crème translucide,
   fin liseré, ombre douce). Le contenu reste identique : logo, liens,
   téléphone, panier et menu.
   ===================================================================== */
:root{--head-top:12px;--capsule:rgba(249,246,238,.965)}
.site-head{top:var(--head-top);left:50%;right:auto;transform:translateX(-50%);
  width:min(1280px,calc(100% - 32px));border-radius:999px;color:var(--vert-profond);
  background:var(--capsule);border:1px solid rgba(20,60,30,.13);
  -webkit-backdrop-filter:blur(14px) saturate(108%);backdrop-filter:blur(14px) saturate(108%);
  box-shadow:0 16px 38px -24px rgba(10,40,20,.55),inset 0 1px 0 rgba(255,255,255,.7);
  transition:box-shadow .35s var(--ease),background .35s var(--ease)}
.site-head.is-scrolled{background:rgba(249,246,238,.97);
  box-shadow:0 18px 42px -24px rgba(10,40,20,.6),inset 0 1px 0 rgba(255,255,255,.8)}
.site-head .head-in{max-width:none;padding:0 clamp(12px,1.8vw,26px)}
.site-head .head-nav a{color:rgba(20,60,30,.72)}
.site-head .head-nav a:hover,.site-head .head-nav a.actif{color:var(--vert-profond)}
.site-head .head-tel{color:var(--vert-profond)}
.site-head .head-tel:hover{background:rgba(20,60,30,.07)}
.site-head .head-tel-ico{color:var(--vert-profond);background:rgba(20,60,30,.07);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9)}
.site-head .head-cta{background:var(--vert-profond);color:#fff;
  box-shadow:0 3px 0 rgba(10,40,20,.22),inset 0 1px 0 rgba(255,255,255,.14)}
.site-head .head-cta:hover{background:#1C6B33;box-shadow:0 5px 0 rgba(10,40,20,.2)}
.site-head .head-cta:focus-visible{outline-color:var(--vert-profond)}
.site-head .head-cta-nb{background:#fff;color:var(--vert-profond)}
.site-head .burger{background:rgba(20,60,30,.08)}
.site-head .burger span{background:var(--vert-profond)}
.site-head .burger:focus-visible{outline-color:var(--vert-profond)}
@media (max-width:900px){
  :root{--head-top:8px}
  .site-head{width:calc(100% - 20px)}
}

/* ---------- accessibilité : mouvement réduit ---------- */
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important;transition:none!important}
  .js [data-reveal]{opacity:1;transform:none;clip-path:none}
  .rise{opacity:1}
}
`;
