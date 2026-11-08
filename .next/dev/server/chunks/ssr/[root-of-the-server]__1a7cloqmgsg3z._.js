module.exports = [
(()=>{"use strict";return[
"[next]/internal/font/google/shippori_mincho_689dec02.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$shippori_mincho_689dec02$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/shippori_mincho_689dec02.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$shippori_mincho_689dec02$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Shippori Mincho', 'Shippori Mincho Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$shippori_mincho_689dec02$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$shippori_mincho_689dec02$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/zen_kaku_gothic_new_a84c3ce8.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$zen_kaku_gothic_new_a84c3ce8$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/zen_kaku_gothic_new_a84c3ce8.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$zen_kaku_gothic_new_a84c3ce8$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Zen Kaku Gothic New', 'Zen Kaku Gothic New Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$zen_kaku_gothic_new_a84c3ce8$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$zen_kaku_gothic_new_a84c3ce8$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
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
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$shippori_mincho_689dec02$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/shippori_mincho_689dec02.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$zen_kaku_gothic_new_a84c3ce8$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/zen_kaku_gothic_new_a84c3ce8.js [app-rsc] (ecmascript)");
;
;
;
/* ------------------------------------------------------------------
   À REMPLACER : domaine public et informations du restaurant.
   SITE sert de base aux URLs absolues (canonique, Open Graph, sitemap, robots).
------------------------------------------------------------------ */ const SITE = "https://exemple.com";
const NOM = "Akai";
const TITRE = "Akai | Restaurant japonais : sushis, ramen et traiteur";
const DESCRIPTION = "Restaurant japonais : sushis, makis, ramen et plats chauds préparés à la minute. " + "Sur place, à emporter ou en traiteur. Réservation par WhatsApp ou par téléphone.";
const metadata = {
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
        "réservation restaurant"
    ],
    authors: [
        {
            name: NOM,
            url: SITE
        }
    ],
    creator: NOM,
    publisher: NOM,
    category: "restaurant",
    alternates: {
        canonical: "/"
    },
    formatDetection: {
        telephone: true,
        email: true,
        address: true
    },
    manifest: "/manifest.webmanifest",
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
        locale: "fr_FR",
        url: "/",
        siteName: NOM,
        title: TITRE,
        description: DESCRIPTION,
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: `${NOM}, cuisine japonaise`
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
    }
};
const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#B5122B",
    colorScheme: "light"
};
/* Fiche entreprise lue par Google. Adresse, téléphone et horaires sont à ajouter
   quand ils sont connus (une adresse factice nuirait au référencement). */ const FICHE = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE}/#restaurant`,
    name: NOM,
    description: DESCRIPTION,
    url: SITE,
    image: [
        `${SITE}/og.png`
    ],
    servesCuisine: [
        "Japonaise",
        "Sushi",
        "Ramen"
    ],
    hasMenu: `${SITE}/#carte`,
    acceptsReservations: true
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "fr",
        className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$shippori_mincho_689dec02$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$zen_kaku_gothic_new_a84c3ce8$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                    type: "application/ld+json",
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML: {
                        __html: JSON.stringify(FICHE)
                    }
                }, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: children
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime;
}),
]})(),
"[next]/internal/font/google/shippori_mincho_689dec02.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "shippori_mincho_689dec02-module__m4ENmG__className",
  "variable": "shippori_mincho_689dec02-module__m4ENmG__variable",
});
}),
"[next]/internal/font/google/zen_kaku_gothic_new_a84c3ce8.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "zen_kaku_gothic_new_a84c3ce8-module__WqZgIG__className",
  "variable": "zen_kaku_gothic_new_a84c3ce8-module__WqZgIG__variable",
});
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1a7cloqmgsg3z._.js.map