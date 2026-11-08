# Modèle « restaurant japonais » (rouge et blanc)

Même structure que le site Exoticas, habillée pour un restaurant japonais.
Tout ce qui est propre au restaurant est à remplacer :

| Où | Quoi |
| --- | --- |
| `app/page.tsx` → `BRAND` | nom, téléphone, WhatsApp, e-mail, Instagram, adresse (valeurs factices) |
| `app/page.tsx` → `PLATS`, `KANJI`, `CAT` | la carte : plats, descriptions, catégories (aucun prix) |
| `app/page.tsx` → textes | titres et paragraphes (lieu, réservation, traiteur) à adapter à la réalité |
| `app/layout.tsx` | domaine `SITE`, titre, description, fiche Google (`Restaurant`) : ajouter adresse, téléphone et horaires réels |
| `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts` | domaine et nom |
| `public/icon.png`, `apple-icon.png`, `og.png` | icônes et image de partage (soleil rouge provisoire) |

Photos : aucune photo n'est fournie. Les tuiles à kanji tiennent la place des
photos ; pour une photo de plat, déposer le fichier dans `public/plats/` et
ajouter `photo: "/plats/nom.jpg"` à l'entrée du plat dans `PLATS`.

Il n'y a volontairement ni faux avis ni faux horaires : la section « Omotenashi »
remplace les avis clients.
