import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exoticas — La vie en vert",
  description:
    "Plants café, boutique de plantes rares et paysagisme à Tokpa-hoho, Cotonou (Bénin).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
