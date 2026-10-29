module.exports = [
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata,
    "viewport",
    ()=>viewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
/* ------------------------------------------------------------------
   Domaine public du site — UNE SEULE LIGNE À CHANGER le jour de la mise
   en ligne : elle sert de base aux URLs absolues (canonique, Open Graph,
   sitemap, robots, données structurées).
------------------------------------------------------------------ */ const SITE = "https://exoticas.bj";
const NOM = "Exoticas";
const TITRE = "Exoticas — Plantes, paysagisme et plants café à Cotonou";
const DESCRIPTION = "Plantes rares, paysagisme et plants café à Tokpa-hoho, Cotonou (Bénin). " + "49 plantes photographiées à la boutique. Devis sur WhatsApp ou par téléphone.";
const ADRESSE_LONGUE = "2ème rue après Acropole, à 1 min de l'échangeur Ganhi, face à la boîte de nuit Z Club";
const TEL = "+2290153300000";
const MAIL = "exoticasbj@gmail.com";
const GEO = {
    lat: 6.35601,
    lng: 2.4371
};
const metadata = {
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
        "Tokpa-hoho"
    ],
    authors: [
        {
            name: NOM,
            url: SITE
        }
    ],
    creator: NOM,
    publisher: NOM,
    category: "shopping",
    alternates: {
        canonical: "/"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
        }
    },
    icons: {
        icon: [
            {
                url: "/icon.png",
                type: "image/png",
                sizes: "96x96"
            }
        ],
        shortcut: [
            "/icon.png"
        ],
        apple: [
            {
                url: "/apple-icon.png",
                sizes: "180x180",
                type: "image/png"
            }
        ]
    },
    openGraph: {
        type: "website",
        locale: "fr_BJ",
        alternateLocale: [
            "fr_FR"
        ],
        url: "/",
        siteName: NOM,
        title: TITRE,
        description: DESCRIPTION,
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: "Exoticas — La vie en vert, Cotonou"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: TITRE,
        description: DESCRIPTION,
        images: [
            "/og.png"
        ]
    },
    other: {
        "geo.region": "BJ-LI",
        "geo.placename": "Cotonou",
        "geo.position": `${GEO.lat};${GEO.lng}`,
        ICBM: `${GEO.lat}, ${GEO.lng}`
    }
};
const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#466931",
    colorScheme: "light"
};
/* Fiche entreprise lue par Google (résultats locaux, Maps) — mêmes
   informations que le flyer : rien d'inventé, les horaires restent absents
   tant qu'ils ne sont pas connus. */ const FICHE = {
    "@context": "https://schema.org",
    "@type": "Florist",
    "@id": `${SITE}/#boutique`,
    name: NOM,
    alternateName: "Exoticas — La vie en vert",
    description: DESCRIPTION,
    url: SITE,
    logo: `${SITE}/logo/marque-verte.png`,
    image: [
        `${SITE}/og.png`
    ],
    telephone: TEL,
    email: MAIL,
    address: {
        "@type": "PostalAddress",
        streetAddress: `${ADRESSE_LONGUE}, Tokpa-hoho`,
        addressLocality: "Cotonou",
        addressRegion: "Littoral",
        addressCountry: "BJ"
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: GEO.lat,
        longitude: GEO.lng
    },
    hasMap: `https://www.google.com/maps/dir/?api=1&destination=${GEO.lat},${GEO.lng}`,
    areaServed: {
        "@type": "City",
        name: "Cotonou"
    },
    knowsAbout: [
        "plantes rares",
        "paysagisme",
        "plants café",
        "décoration végétale",
        "aménagement de terrasses"
    ]
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "fr",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://tile.openstreetmap.org"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify(FICHE)
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: children
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_109tcivt8knit._.js.map