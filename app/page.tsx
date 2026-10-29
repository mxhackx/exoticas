"use client";

import { useEffect, useState } from "react";

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
  { n: "Verveine", s: "verveine" },
];
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
    <span className="wordmark" style={{ color: light ? "#fff" : "#22331B" }}>
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
  const [form, setForm] = useState({ nom: "", contact: "", message: "" });
  const [envoye, setEnvoye] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [geo, setGeo] = useState<Geo>({ etat: "repos" });

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

  /* révélation au scroll, avec filet de sécurité : le contenu ne reste jamais caché */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const cibles = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const montrer = (el: Element) => el.classList.add("in");

    // déjà visible au chargement -> on révèle tout de suite
    const dansVue = () => {
      cibles.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) montrer(el);
      });
    };
    dansVue();

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              montrer(e.target);
              io?.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
      );
      cibles.forEach((el) => io?.observe(el));
    }
    // dernier recours (navigateur sans IO, onglet masqué, réveil)
    const garde = window.setTimeout(() => cibles.forEach(montrer), 2500);

    return () => {
      io?.disconnect();
      window.clearTimeout(garde);
    };
  }, []);

  /* en-tête compact + barre de progression de lecture */
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
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
      `Je m'appelle ${form.nom || "—"}. ${form.message}\n\n` +
      `Me joindre : ${form.contact || "—"}`;
    window.open(waLink(msg), "_blank", "noopener");
    setEnvoye(true);
  }

  return (
    <>
      <style>{css}</style>

      <div
        className="progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <header className={`site-head${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap head-in">
          <a href="#top" className="head-logo" aria-label="Exoticas, accueil">
            <Logo size={28} />
            <span className="head-nom">exoticas</span>
          </a>
          <nav className="head-nav">
            <a href="#galerie">Galerie</a>
            <a href="#contact">Contact</a>
            <a className="btn btn-light btn-sm" href={BRAND.telHref}>
              <PhoneIcon size={16} /> Appeler
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section
          className="hero"
          style={{ "--hero-img": "url('/galerie/00-mosaic.jpg')" } as React.CSSProperties}
        >
          <div className="hero-bg" aria-hidden="true" />
          <div className="wrap hero-in">
            <div className="hero-copy">
              <span className="rise" style={{ "--d": "60ms" } as React.CSSProperties}>
                <Wordmark />
              </span>
              <h1 className="rise" style={{ "--d": "160ms" } as React.CSSProperties}>
                Donnons vie à vos espaces.
              </h1>
              <p className="rise" style={{ "--d": "260ms" } as React.CSSProperties}>
                Plants café, boutique, coworking et paysagisme : tout ce qu'il
                faut pour vous reconnecter à l'essentiel, à Tokpa-hoho, Cotonou.
              </p>
              <div className="hero-cta rise" style={{ "--d": "360ms" } as React.CSSProperties}>
                <a className="btn btn-light" href="#contact">
                  Demander un devis
                </a>
                <a className="btn btn-ghost" href="#galerie">
                  Voir la galerie
                </a>
              </div>
              <p className="hero-adr rise" style={{ "--d": "460ms" } as React.CSSProperties}>
                {BRAND.adresseCourte}
              </p>
            </div>
            <div className="hero-photo rise" style={{ "--d": "320ms" } as React.CSSProperties}>
              <div className="frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="kenburns"
                  src="/galerie/p1-visuel-maitre.jpg"
                  alt="Visuel de marque Exoticas"
                />
              </div>
            </div>
          </div>
        </section>

        {/* GALERIE */}
        <section id="galerie" className="section">
          <div className="wrap">
            <h2 data-reveal className="reveal">Galerie</h2>
            <p data-reveal className="reveal lede" style={{ "--d": "90ms" } as React.CSSProperties}>
              {PLANTES.length} plantes de la boutique, photographiées ici. Chaque carte
              s'ouvre en pleine image.
            </p>
            <div className="grid">
              {PLANTES.map((p, i) => (
                <a
                  className="card reveal"
                  data-reveal
                  style={{ "--d": `${(i % 4) * 70}ms` } as React.CSSProperties}
                  href={`/galerie/pleine/${p.s}.jpg`}
                  key={p.s}
                  target="_blank"
                  rel="noopener"
                >
                  <span className="card-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/galerie/mini/${p.s}.jpg`}
                      alt={p.n}
                      title={p.n}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <figcaption>{p.n}</figcaption>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section section-alt">
          <div className="wrap contact-in">
            <div data-reveal className="reveal">
              <h2>Contact</h2>
              <p className="lede">
                Écrivez-nous : votre message s'ouvre dans WhatsApp, on vous
                répond rapidement.
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
                  Message
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Je souhaite aménager une terrasse de 40 m²…"
                  />
                </label>
                <button className="btn btn-primary" type="submit">
                  Envoyer le message
                </button>
                <p className={`note${envoye ? " show" : ""}`} role="status">
                  Message prêt dans WhatsApp. Vous pouvez aussi nous appeler au{" "}
                  <a href={BRAND.telHref}>{BRAND.tel}</a> ou écrire à{" "}
                  <a href={`mailto:${BRAND.mail}`}>{BRAND.mail}</a>.
                </p>
              </form>
            </div>

            <aside data-reveal className="reveal coords" style={{ "--d": "160ms" } as React.CSSProperties}>
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
          <span>© {new Date().getFullYear()} Exoticas — La vie en vert</span>
        </div>
      </footer>

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
  --vert:#466931;
  --vert-fonce:#3A5528;
  --vert-nuit:#2C4220;
  --vert-accent:#6EA03F;
  --creme:#F7F6F1;
  --texte:#22331B;
  --muted:#6E7A66;
  --line:#DDE2D6;
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
  font:16.5px/1.62 ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}
h1,h2,h3{margin:0 0 .55rem;font-weight:550;text-wrap:balance}
h1{font-size:clamp(2.35rem,4.6vw,3.45rem);line-height:1.04;letter-spacing:-.035em}
h2{font-size:clamp(1.65rem,2.6vw,2.15rem);line-height:1.1;letter-spacing:-.03em}
h3{font-size:1.02rem;line-height:1.2;letter-spacing:-.015em}
p{margin:0 0 1rem;text-wrap:pretty}
a{color:inherit}
img{display:block;max-width:100%}
.wrap{max-width:1080px;margin:0 auto;padding:0 20px}
.muted{color:var(--muted)}
a[href^="tel"]{font-variant-numeric:tabular-nums}
/* titres de section : filet au-dessus, ancre dégagée sous l'en-tête fixe */
section[id]{scroll-margin-top:88px}
h2::before{content:"";display:block;width:44px;height:1px;background:var(--vert-accent);
  margin:0 0 20px;transform-origin:0 50%;transition:transform .7s var(--ease-out) .12s}
.js h2::before{transform:scaleX(0)}
.js .in h2::before,.js h2.in::before{transform:scaleX(1)}

/* ---------- barre de progression ---------- */
.progress{position:fixed;inset:0 auto auto 0;height:2px;width:100%;z-index:60;
  background:var(--vert-accent);transform-origin:0 50%;transform:scaleX(0);
  transition:transform .12s linear}

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
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;
  border:1px solid transparent;border-radius:var(--r);padding:12px 20px;text-decoration:none;
  font-size:.95rem;cursor:pointer;position:relative;overflow:hidden;
  transition:transform .3s var(--ease-out),box-shadow .3s var(--ease-out),background .3s var(--ease),color .3s var(--ease)}
.btn::after{content:"";position:absolute;inset:0;background:rgba(255,255,255,.22);
  transform:translateX(-101%);transition:transform .55s var(--ease-out)}
.btn:hover::after{transform:translateX(0)}
.btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(20,35,12,.22)}
.btn:active{transform:translateY(0)}
.btn-light{background:#fff;color:var(--vert);border-color:#fff}
.btn-light:hover{background:var(--creme)}
.btn-primary{background:var(--vert);color:#fff}
.btn-primary:hover{background:var(--vert-fonce)}
.btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.5)}
.btn-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff}
.btn-sm{padding:9px 15px;font-size:.9rem}
.btn-wa{background:#fff;color:var(--vert);border-color:var(--line)}
.btn-wa:hover{background:var(--creme)}

/* ---------- hero ---------- */
.hero{position:relative;background:var(--vert);color:#fff;padding:150px 0 96px;overflow:hidden}
/* PC : le hero occupe la hauteur de la fenêtre, contenu centré dans la zone
   utile (le padding haut dégage toujours l'en-tête fixe). Sur mobile la règle
   ne s'applique pas : le hero y garde sa carte compacte. */
@media (min-width:821px){
  .hero{min-height:100vh;min-height:100svh;display:grid;align-content:center}
  /* le cadre suit la hauteur de la fenêtre (340 px → la largeur de sa colonne,
     ~423 px) : sinon il flotte, minuscule, dans un hero de 900 px de haut.
     Sélecteur doublé pour passer devant la règle .frame placée plus bas. */
  .hero .frame{max-width:clamp(340px,46vh,440px)}
}
.hero-bg{position:absolute;inset:0;background-image:var(--hero-img);background-size:cover;background-position:50% 34%;
  opacity:0;transition:opacity .8s var(--ease)}
.hero-in{position:relative;display:grid;grid-template-columns:1.15fr .85fr;gap:44px;align-items:center}
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

/* entrées échelonnées au chargement */
.rise{animation:rise .9s var(--ease-out) both;animation-delay:var(--d,0ms)}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}

/* ---------- révélation au scroll ---------- */
.js [data-reveal]{opacity:0;transform:translateY(26px);
  transition:opacity .8s var(--ease-out) var(--d,0ms),transform .8s var(--ease-out) var(--d,0ms)}
.js [data-reveal].in{opacity:1;transform:none}

/* ---------- sections ---------- */
.section{padding:clamp(64px,8vw,104px) 0}
.section-alt{background:var(--creme);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.lede{color:var(--muted);font-size:1.04rem;line-height:1.6;max-width:52ch;margin:0 0 8px}

/* ---------- galerie : planche-contact sur plaque de glace ----------
   La photo garde son ratio 3:4 (aucun recadrage) et ne recoit ni filtre ni nappe :
   c'est la plaque autour qui est translucide, éclairée par un liseré intérieur. */
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:30px}
.card{display:flex;flex-direction:column;text-decoration:none;color:inherit;
  background:var(--glace);border:var(--glace-bord);border-radius:var(--r);padding:6px;
  box-shadow:var(--glace-relu),var(--glace-ombre);
  transition:transform .4s var(--ease-out),box-shadow .4s var(--ease-out),background .3s var(--ease)}
.card:hover{transform:translateY(-3px);background:var(--glace-forte);box-shadow:var(--glace-relu),var(--glace-ombre-h)}
.card:focus-visible{outline:2px solid var(--vert);outline-offset:3px}
.card-img{display:block;overflow:hidden;aspect-ratio:3/4;background:var(--creme);border-radius:5px}
.card-img img{width:100%;height:100%;object-fit:cover;display:block}
.card figcaption{padding:9px 4px 2px;font-size:.85rem;line-height:1.3;color:var(--muted)}
.card:hover figcaption{color:var(--texte)}

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
.form input:hover,.form textarea:hover{border-color:#C3CDB8;background:rgba(255,255,255,.85)}
.form input:focus,.form textarea:focus{outline:none;border-color:var(--vert);background:#fff;
  box-shadow:0 0 0 3px rgba(110,160,63,.22),inset 0 1px 2px rgba(20,35,12,.04)}
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
.coords dd{margin:0}
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
.foot-col .muted{display:block;color:rgba(255,255,255,.62);font-size:.9rem;margin-top:5px}
.foot-bottom{margin-top:28px;padding-top:14px;border-top:1px solid rgba(255,255,255,.16);
  font-size:.82rem;color:rgba(255,255,255,.62)}

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
  .grid{grid-template-columns:repeat(3,1fr)}
  .contact-in,.foot-in{grid-template-columns:1fr;gap:30px}
}
@media (max-width:820px){
  .hero{padding:110px 0 72px}
  .hero-bg{opacity:1;animation:zoom 26s var(--ease) infinite alternate}
  @keyframes zoom{from{transform:scale(1)}to{transform:scale(1.12)}}
  .hero-in{grid-template-columns:1fr;gap:0}
  .hero-copy{background:var(--vert);padding:26px 22px;border-radius:12px;
    box-shadow:0 18px 44px rgba(15,30,8,.28)}
  .hero-photo{display:none}
  .hero-cta{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .hero-cta .btn{padding:12px 10px;font-size:.9rem}
  .head-nav{gap:12px;font-size:.88rem}
  .section{padding:48px 0}
  .grid{grid-template-columns:repeat(3,1fr);gap:12px}
}
@media (max-width:620px){
  .grid{grid-template-columns:repeat(2,1fr)}
  .card figcaption{font-size:.82rem;padding:8px 3px 2px}
}
@media (max-width:460px){
  .hero-cta{grid-template-columns:1fr}
}

/* ---------- accessibilité : mouvement réduit ---------- */
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important;transition:none!important}
  .js [data-reveal]{opacity:1;transform:none}
  .rise{opacity:1}
}
`;
