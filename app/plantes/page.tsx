import type { Metadata } from "next";
import Site from "../site";

export const metadata: Metadata = {
  title: "Nos plantes | Exoticas, boutique de plantes rares à Cotonou",
  description:
    "Les plantes de la boutique Exoticas à Cotonou : plantes rares, d'intérieur, orchidées, bonsaïs et arbres tropicaux, avec leurs conseils d'entretien. Prix et disponibilité sur WhatsApp.",
  alternates: { canonical: "/plantes" },
};

/* Page dédiée à la galerie des plantes (filtres, fiches). */
export default function Plantes() {
  return <Site vue="plantes" />;
}
