module.exports=[60350,a=>{"use strict";var b=a.i(87924),c=a.i(72131);let d="akai",e="Cuisine japonaise",f="00 00 00 00 00",g="tel:+0000000000",h="contact@exemple.com",i="https://www.instagram.com/",j="Adresse du restaurant, Ville",k={sushi:{t:"Sushis et sashimis",k:"寿司",style:"t-rouge"},maki:{t:"Makis et rolls",k:"巻",style:"t-blanc"},chaud:{t:"Plats chauds",k:"麺",style:"t-sombre"},dessert:{t:"Desserts",k:"甘",style:"t-rose"}},l=[{k:"toutes",n:"Tous"},{k:"sushi",n:"Sushis"},{k:"maki",n:"Makis"},{k:"chaud",n:"Plats chauds"},{k:"dessert",n:"Desserts"}],m=[{n:"Nigiri saumon",c:"sushi",d:"Une fine tranche de saumon posée sur une boule de riz vinaigré."},{n:"Nigiri thon",c:"sushi",d:"Du thon rouge sur du riz vinaigré, le classique des amateurs de poisson cru."},{n:"Sashimi assortiment",c:"sushi",d:"Des tranches de poisson cru servies sans riz, avec wasabi et gingembre mariné."},{n:"Chirashi",c:"sushi",d:"Un bol de riz vinaigré garni de poissons crus variés."},{n:"Maki concombre",c:"maki",d:"Du riz et du concombre roulés dans une feuille de nori, frais et léger."},{n:"Maki saumon",c:"maki",d:"Du saumon cru roulé dans le riz et le nori, coupé en petites bouchées."},{n:"California roll",c:"maki",d:"Un rouleau inversé, riz à l'extérieur, avec avocat, surimi et concombre."},{n:"Spicy tuna roll",c:"maki",d:"Du thon relevé d'une sauce pimentée, roulé dans le riz."},{n:"Temaki",c:"maki",d:"Un cornet de nori garni de riz et de poisson, à manger avec les doigts."},{n:"Ramen shoyu",c:"chaud",d:"Des nouilles dans un bouillon corsé à la sauce soja, avec œuf mollet et ciboule."},{n:"Ramen miso",c:"chaud",d:"Un bouillon réconfortant parfumé à la pâte de miso, nouilles et garnitures."},{n:"Udon",c:"chaud",d:"De grosses nouilles de blé moelleuses dans un bouillon doux."},{n:"Katsu curry",c:"chaud",d:"Une escalope panée croustillante, du riz et un curry japonais doux."},{n:"Tempura de crevettes",c:"chaud",d:"Des crevettes enrobées d'une pâte légère, frites jusqu'à être croustillantes."},{n:"Yakitori",c:"chaud",d:"Des brochettes de poulet grillées, laquées d'une sauce sucrée-salée."},{n:"Gyoza",c:"chaud",d:"Des raviolis farcis, dorés d'un côté et tendres de l'autre."},{n:"Mochi",c:"dessert",d:"Une pâte de riz moelleuse et fourrée, tendre et sucrée."},{n:"Dorayaki",c:"dessert",d:"Deux petits pancakes moelleux fourrés de pâte de haricots rouges."},{n:"Glace matcha",c:"dessert",d:"Une glace au thé vert matcha, légèrement amère et très parfumée."}],n={"Nigiri saumon":"握鮭","Nigiri thon":"握鮪","Sashimi assortiment":"刺身",Chirashi:"散","Maki concombre":"胡瓜","Maki saumon":"鮭巻","California roll":"巻","Spicy tuna roll":"辛",Temaki:"手巻","Ramen shoyu":"醤油","Ramen miso":"味噌",Udon:"うどん","Katsu curry":"カレー","Tempura de crevettes":"天",Yakitori:"焼鳥",Gyoza:"餃子",Mochi:"餅",Dorayaki:"餡","Glace matcha":"抹茶"},o=a=>n[a.n]??k[a.c].k,p=Object.keys(k).map(a=>({t:k[a].t,items:m.filter(b=>b.c===a).map(a=>a.n)})),q=[{k:"鮮",t:"Fraîcheur",d:"Des produits choisis pour leur fraîcheur, préparés à la minute."},{k:"技",t:"Savoir-faire",d:"Des gestes précis, hérités d'une longue tradition culinaire."},{k:"和",t:"Harmonie",d:"Une table pensée pour partager, dans une ambiance chaleureuse."}];function r(a){return`https://wa.me/0000000000?text=${encodeURIComponent(a)}`}function s({size:a=34}){return(0,b.jsxs)("svg",{className:"mark",width:a,height:a,viewBox:"0 0 40 40","aria-hidden":"true",focusable:"false",children:[(0,b.jsx)("circle",{cx:"20",cy:"20",r:"18",fill:"none",stroke:"currentColor",strokeWidth:"2"}),(0,b.jsx)("circle",{cx:"20",cy:"20",r:"9",fill:"currentColor"})]})}function t(){return(0,b.jsxs)("span",{className:"wordmark",style:{color:"#fff"},children:[(0,b.jsx)(s,{size:30}),(0,b.jsxs)("span",{className:"wordmark-text",children:[(0,b.jsx)("span",{className:"wordmark-nom",children:d}),(0,b.jsx)("span",{className:"wordmark-sig",children:e})]})]})}function u({size:a=22}){return(0,b.jsx)("svg",{width:a,height:a,viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:(0,b.jsx)("path",{d:"M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 13.9c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1a11 11 0 0 1-5.9-5.1c-.5-.9-.6-1.7-.4-2.2.2-.6.6-1 .9-1.2.3-.2.6-.2.8-.2h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.6l-.4.5c-.2.2-.2.3-.1.5.3.6 1.5 1.9 2.7 2.4.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.8.9c.3.2.3.3.3.5v.6Z"})})}function v({size:a=17}){return(0,b.jsx)("svg",{width:a,height:a,viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:(0,b.jsx)("path",{d:"M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17.2 17.2 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.1 2.3Z"})})}function w({size:a=18}){return(0,b.jsxs)("svg",{width:a,height:a,viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[(0,b.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"5",stroke:"currentColor",strokeWidth:"1.7"}),(0,b.jsx)("circle",{cx:"12",cy:"12",r:"4.2",stroke:"currentColor",strokeWidth:"1.7"}),(0,b.jsx)("circle",{cx:"17.2",cy:"6.8",r:"1.1",fill:"currentColor"})]})}function x({className:a=""}){return(0,b.jsx)("svg",{className:`feuille ${a}`,viewBox:"0 0 100 100","aria-hidden":"true",focusable:"false",children:(0,b.jsx)("circle",{cx:"50",cy:"50",r:"48",fill:"currentColor"})})}function y({k:a,style:c,className:d="",label:e,d:f}){return(0,b.jsx)("div",{className:`tuile ${c} ${d}${void 0!==f?" rv-photo":""}`,role:e?"img":void 0,"aria-label":e,"aria-hidden":!e||void 0,...void 0!==f?{"data-reveal":"",style:{"--d":`${f}ms`}}:{},children:(0,b.jsx)("b",{lang:"ja",style:{"--n":[...a].length},children:a})})}let z=`
:root{
  /* palette : rouge japonais (akai) et blanc washi */
  --vert:#B5122B;
  --vert-fonce:#8F0E22;
  --vert-nuit:#5E0816;
  --vert-accent:#D9A441;
  --moutarde:#D9A441;
  --terre:#B5122B;
  --bois:#8B5A34;
  --creme:#FBF7F2;
  --texte:#1E1416;
  --muted:#6F6266;
  --line:#EBDFD6;
  --kanji:"Hiragino Mincho ProN","Yu Mincho","Noto Serif CJK JP","Noto Serif JP",var(--font-serif),serif;
  --serif:var(--font-serif),"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
  --sans:var(--font-sans),ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --r:8px;
  --ease:cubic-bezier(.22,.61,.36,1);
  --ease-out:cubic-bezier(.16,1,.3,1);
  /* \xe9tiquettes : meme \xe9criture partout (champ, footer, carte) */
  --lbl:600 .74rem/1.2 ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --lbl-space:.16em;
  /* glace / cristal : seule la carte est translucide, jamais les photos.
     --flou ne sert que devant un fond r\xe9ellement occup\xe9 (tuiles de la carte). */
  --glace:rgba(255,255,255,.62);
  --glace-forte:rgba(255,255,255,.78);
  /* liser\xe9 sombre : une glace ne se lit que si son bord est plus fonc\xe9 que sa face */
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
h1,h2,.head-nom,.wordmark-nom,.welcome-texte{font-family:var(--serif);font-weight:500}
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
/* Chaque section occupe au moins toute la hauteur de l'\xe9cran (svh : tient compte
   des barres d'adresse mobiles), en-t\xeate fixe compris : le contenu est centr\xe9
   dans la zone visible sous l'en-t\xeate. Une section plus longue que l'\xe9cran
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
.btn:focus-visible{outline:3px solid #1E1416;outline-offset:3px;box-shadow:0 0 0 3px #fff}
/* fl\xe8che qui glisse au survol */
.btn-fl::before{content:"→";order:2;display:inline-block;transition:transform .3s var(--ease-out)}
.btn-fl:hover::before{transform:translateX(5px)}
.btn-light{background:#fff;color:var(--vert);border-color:#fff;box-shadow:0 4px 14px rgba(20,35,12,.18)}
.btn-light:hover{background:var(--creme);box-shadow:0 10px 24px rgba(20,35,12,.22)}
.btn-primary{background:var(--vert);color:#fff;box-shadow:0 6px 16px rgba(70,105,49,.3)}
.btn-primary:hover{background:var(--vert-fonce);box-shadow:0 12px 26px rgba(70,105,49,.35)}
.btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.7)}
.btn-ghost:hover{background:#fff;color:var(--vert);border-color:#fff}
.btn-sm{padding:9px 18px;min-height:40px;font-size:.9rem}
.btn-wa{background:#fff;color:var(--vert);border-color:var(--line);box-shadow:0 4px 12px rgba(20,35,12,.08)}
.btn-wa:hover{background:var(--creme);border-color:var(--vert)}

/* ---------- hero ---------- */
.hero{position:relative;background:var(--vert);color:#fff;padding:150px 0 96px;overflow:hidden}
/* PC : le hero occupe la hauteur de la fen\xeatre, contenu centr\xe9 dans la zone
   utile (le padding haut d\xe9gage toujours l'en-t\xeate fixe). Mobile : m\xeame
   hauteur de fen\xeatre, mais contenu cal\xe9 en bas sur sa bande, l'image restant
   visible au-dessus. La colonne unique en minmax(0,1fr) garde au .wrap ses
   1080 px : sans elle, ses marges auto le r\xe9duiraient \xe0 la largeur de son
   contenu (892 px au lieu de 1040). */
@media (min-width:821px){
  .hero{min-height:100vh;min-height:100svh;display:grid;
    grid-template-columns:minmax(0,1fr);align-content:center}
  /* dans une grille, les marges auto du .wrap le font r\xe9tr\xe9cir \xe0 son contenu
     (892 px au lieu de 1040) : width:100% lui rend sa largeur mesur\xe9e. */
  .hero .hero-in{width:100%}
  /* le cadre suit la hauteur de la fen\xeatre (340 px → la largeur de sa colonne,
     ~423 px) : sinon il flotte, minuscule, dans un hero de 900 px de haut.
     S\xe9lecteur doubl\xe9 pour passer devant la r\xe8gle .frame plac\xe9e plus bas. */
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

/* ---------- bienvenue dactylographi\xe9e (premi\xe8re visite) ----------
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

/* entr\xe9es \xe9chelonn\xe9es au chargement */
.rise{animation:rise .9s var(--ease-out) both;animation-delay:var(--d,0ms)}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}

/* ---------- r\xe9v\xe9lation au scroll ---------- */
.js [data-reveal]{opacity:0;transform:translateY(28px);
  transition:opacity .8s var(--ease-out) var(--d,0ms),transform .9s var(--ease-out) var(--d,0ms),
    filter .8s var(--ease-out) var(--d,0ms)}
.js [data-reveal].in{opacity:1;transform:none;filter:none}
/* R\xe8gles du syst\xe8me (jamais au hasard) :
   1. Un mouvement de base : monter en fondu. Les titres s'y ajoutent un l\xe9ger flou qui se pr\xe9cise.
   2. Un bloc de texte arrive du c\xf4t\xe9 o\xf9 il se trouve (colonne gauche : de la gauche, droite : de la droite).
   3. Les photos se d\xe9voilent par le bas (rideau) et se posent en se d\xe9zoomant.
   4. Les pastilles et petites cartes \xab poppent \xbb l'une apr\xe8s l'autre.
   5. Tout ce qui est en grille ou en liste est \xe9chelonn\xe9 dans l'ordre de lecture. */
.js h2[data-reveal]{filter:blur(7px)}
.js .rv-left{transform:translateX(-64px)}
.js .rv-right{transform:translateX(64px)}
.js .rv-pop{transform:translateY(16px) scale(.9)}
/* le rideau laisse la moiti\xe9 haute visible : un \xe9l\xe9ment enti\xe8rement masqu\xe9
   ne serait jamais d\xe9tect\xe9 comme \xab entr\xe9 \xe0 l'\xe9cran \xbb */
.js .rv-photo{opacity:0;transform:scale(1.07);clip-path:inset(0 0 50% 0);
  transition:clip-path 1.2s var(--ease-out) var(--d,0ms),transform 1.4s var(--ease-out) var(--d,0ms),opacity .9s var(--ease-out) var(--d,0ms)}
.js .rv-photo.in{transform:none;clip-path:inset(-40px)}
/* cartes de la galerie : la photo se pose quand la carte arrive */
.js .card:not(.in) .card-img img{transform:scale(1.14)}
/* rep\xe8res du hero : le titre et le texte montent \xe0 l'arriv\xe9e */
.js [data-reveal].done{transition-delay:0ms;transition-duration:.4s}
.js .card.done{transition:transform .45s var(--ease-out),box-shadow .45s var(--ease-out),border-color .3s var(--ease)}
/* l\xe9ger parallaxe sur le collage du hero */
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

/* ---------- le caf\xe9 ---------- */
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
.collage>.tuile{position:absolute;border-radius:var(--r);
  border:3px solid rgba(255,255,255,.9);box-shadow:0 24px 60px rgba(8,20,18,.45)}
.collage-a{left:0;top:0;width:66%;height:84%;border-radius:140px 140px var(--r) var(--r)!important}
.collage-b{right:0;bottom:0;width:50%;height:58%}

/* ---------- galerie : planche-contact sur plaque de glace ----------
   La photo garde son ratio 3:4 (aucun recadrage) et ne recoit ni filtre ni nappe :
   c'est la plaque autour qui est translucide, \xe9clair\xe9e par un liser\xe9 int\xe9rieur. */
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

/* carte + g\xe9olocalisation — la carte prend tout le parent, \xe9quarrie pour coller \xe0 la
   g\xe9om\xe9trie des tuiles (carr\xe9 = \xe9pingle pile au centre) */
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


/* ---------- vid\xe9os ---------- */
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
.eyebrow-clair{color:#FFD9DE}
.hero-copy .eyebrow{margin:18px 0 -6px;font-size:.74rem;line-height:1.2;color:#FFD9DE}

/* ---------- bande des activit\xe9s ---------- */
.bande{background:var(--vert-fonce);color:#fff}
.bande-in{display:flex;justify-content:space-between;gap:12px 28px;flex-wrap:wrap;padding-top:18px;padding-bottom:18px}
.bande a{text-decoration:none;font-size:.95rem;font-weight:600;position:relative;padding:4px 0}
.bande a::after{content:"";position:absolute;left:0;bottom:0;height:2px;width:100%;background:#fff;
  transform:scaleX(0);transform-origin:0 50%;transition:transform .35s var(--ease-out)}
.bande a:hover::after{transform:scaleX(1)}

/* ---------- coworking : points forts ---------- */
.cow-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:22px 0 0}
.cow-card{display:grid;gap:2px;padding:14px 16px;border-radius:var(--r);background:#fff;border:1px solid var(--line)}
.cow-card strong{font-weight:700;font-size:.95rem}
.cow-card span{font-size:.85rem;color:var(--muted)}

/* ---------- caf\xe9 : la carte ---------- */
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

/* ---------- am\xe9nagement paysager ---------- */
.pays{position:relative;overflow:hidden;background:var(--vert-fonce);color:#fff}
.pays h2{color:#fff}
.pays .lede{color:rgba(255,255,255,.82)}
.pays .puces li{background:transparent;border-color:rgba(255,255,255,.3);color:rgba(255,255,255,.92)}
.pays-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}
.pays-tuile{width:100%;aspect-ratio:4/3;border-radius:var(--r);box-shadow:0 14px 34px rgba(0,0,0,.35)}
.aa{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:var(--r);user-select:none}
.aa img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.aa-avant{clip-path:inset(0 calc(100% - var(--p)) 0 0)}
.aa-poignee{position:absolute;top:0;bottom:0;left:var(--p);width:3px;margin-left:-1.5px;background:#fff;pointer-events:none}
.aa input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0}
.aa input:focus-visible~.aa-poignee{box-shadow:0 0 0 3px var(--moutarde)}
.aa-tag{position:absolute;top:12px;padding:4px 10px;border-radius:99px;background:rgba(18,36,33,.7);color:#fff;font-size:.78rem}
.aa-tag-a{left:12px}.aa-tag-b{right:12px}

/* ---------- feuilles d\xe9coratives (micro-animation) ---------- */
.feuille{position:absolute;z-index:0;pointer-events:none;color:#fff;opacity:.09;
  animation:balance 9s ease-in-out infinite alternate;
  translate:0 calc(var(--sy,0) * -.04px)}
.feuille-h1{width:150px;right:6%;top:14%;transform-origin:50% 100%}
.feuille-h2{width:90px;right:34%;bottom:9%;animation-duration:12s;animation-delay:-4s;transform-origin:50% 100%}
.feuille-p1{width:200px;left:-40px;bottom:-30px;transform-origin:50% 100%;opacity:.07}
@keyframes balance{from{transform:rotate(-7deg)}to{transform:rotate(8deg)}}
.hero-in{z-index:1}

/* ---------- formulaire : indication WhatsApp ---------- */
.form-hint{margin:0;font-size:.88rem;color:var(--muted);padding:10px 12px;background:rgba(181,18,43,.07);border-radius:var(--r)}

.foot-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:2px}
.foot-col a.foot-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:99px;
  border:1px solid rgba(255,255,255,.35);font-size:.92rem}
.foot-col a.foot-pill:hover{background:rgba(255,255,255,.12);border-color:#fff}
.foot-col a.foot-pill-insta{background:var(--terre);color:#fff;border-color:transparent;font-weight:600}

/* ---------- texture : feuilles au trait, seulement sur le hero et l'am\xe9nagement paysager ---------- */
.hero,.pays{background-image:url(/texture-claire.svg);background-size:120px 120px}


/* ---------- tuiles illustr\xe9es (kanji) \xe0 la place des photos ---------- */
.tuile{position:relative;display:grid;place-items:center;overflow:hidden;container-type:size;
  font-family:var(--kanji);background:var(--vert);color:#fff}
.tuile::before{content:"";position:absolute;inset:0;background-image:url(/texture-claire.svg);background-size:120px 120px}
.tuile b{position:relative;font-weight:700;line-height:1;letter-spacing:.04em;font-size:3rem;font-size:min(calc(68cqw / var(--n,2)),30cqh,7rem)}
.t-rouge{background:var(--vert);color:#fff}
.t-blanc{background:#fff;color:var(--vert);box-shadow:inset 0 0 0 3px var(--vert)}
.t-rose{background:#F8E1E4;color:var(--vert)}
.t-sombre{background:var(--vert-nuit);color:#fff}
.t-blanc::before,.t-rose::before{background-image:url(/texture-rouge.svg)}
.card-img .tuile,.fiche-tuile{position:absolute;inset:0}
.coords-simple{padding:24px 26px}
.coords-simple dl{margin-top:0}

/* ---------- omotenashi : les trois valeurs ---------- */
.valeur{display:grid;gap:6px;align-content:start}
.valeur-k{font:700 4rem/1 var(--kanji);color:var(--vert);margin-bottom:6px}
.valeur h3{margin:0;font:500 1.4rem/1.2 var(--serif)}
.valeur p{margin:0!important;color:var(--muted)}


/* sur fond rouge, le bouton d'action devient blanc */
.hero .btn-moutarde,.cafe .btn-moutarde,.pays .btn-moutarde,.menu-mobile .btn-moutarde{background:#fff;color:var(--vert);box-shadow:0 6px 18px rgba(0,0,0,.25)}
.hero .btn-moutarde:hover,.cafe .btn-moutarde:hover,.pays .btn-moutarde:hover,.menu-mobile .btn-moutarde:hover{background:#FBE9EC;box-shadow:0 12px 28px rgba(0,0,0,.3)}

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
  /* mobile : les entr\xe9es lat\xe9rales deviennent verticales (sinon la page d\xe9borde \xe0 droite) */
  .js .rv-left,.js .rv-right{transform:translateY(28px)}
  .js .rv-left.in,.js .rv-right.in{transform:none}
  /* avis : on les fait d\xe9filer d'un geste, au lieu de les empiler */
  .avis-liste{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;margin:22px -20px 0;
    padding:4px 20px 18px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .avis-liste::-webkit-scrollbar{display:none}
  .avis{flex:0 0 86%;scroll-snap-align:center}
  .avis-hint{display:block;margin:0 0 14px;text-align:center;font-size:.82rem;color:var(--muted)}
  /* bande des activit\xe9s : grille 2 \xd7 2 */
  .bande-in{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:14px;padding-bottom:14px}
  .bande a{text-align:center;padding:10px 8px;border:1px solid rgba(255,255,255,.25);border-radius:999px;font-size:.85rem}
  .bande a::after{display:none}
  /* Mobile : la photo (collage) et le texte tiennent ensemble sur le premier \xe9cran.
     Le logo du hero et l'adresse, d\xe9j\xe0 pr\xe9sents dans l'en-t\xeate et le pied de page,
     sont masqu\xe9s pour gagner de la place. */
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
/* tr\xe8s petits \xe9crans : l'en-t\xeate garde le logo lisible, \xab Appeler \xbb ne garde que son ic\xf4ne */
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
.burger:focus-visible{outline:3px solid #fff;outline-offset:2px}
.menu-mobile{position:fixed;inset:0;z-index:49;display:flex;flex-direction:column;justify-content:center;gap:28px;
  padding:96px 28px 32px;background:var(--vert-fonce);background-image:url(/texture-claire.svg);background-size:120px 120px;
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

/* ---------- accessibilit\xe9 : mouvement r\xe9duit ---------- */
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important;transition:none!important}
  .js [data-reveal]{opacity:1;transform:none;filter:none;clip-path:none}
  .rise{opacity:1}
}
`;a.s(["default",0,function(){let a,n,A,B,[C,D]=(0,c.useState)({nom:"",contact:"",objet:"Réservation",message:""}),[E,F]=(0,c.useState)(!1),[G,H]=(0,c.useState)(!1),[I,J]=(0,c.useState)(!1),[K,L]=(0,c.useState)(null),[M,N]=(0,c.useState)("toutes"),[O,P]=(0,c.useState)(4),[Q,R]=(0,c.useState)(1),S=m.map((a,b)=>b).filter(a=>"toutes"===M||m[a].c===M),T=2*O*Q,U=S.slice(0,T);(0,c.useEffect)(()=>{if(!I)return;let a=a=>"Escape"===a.key&&J(!1);window.addEventListener("keydown",a);let b=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",a),document.body.style.overflow=b}},[I]),(0,c.useEffect)(()=>{let a=()=>P(window.innerWidth>900?4:window.innerWidth>620?3:2);return a(),window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]),(0,c.useEffect)(()=>{if(null===K)return;let a=m.map((a,b)=>b).filter(a=>"toutes"===M||m[a].c===M),b=a.length,c=(c,d)=>{if(null===c||0===b)return c;let e=Math.max(0,a.indexOf(c));return a[(e+d+b)%b]};function d(a){"Escape"===a.key?L(null):"ArrowRight"===a.key?L(a=>c(a,1)):"ArrowLeft"===a.key&&L(a=>c(a,-1))}window.addEventListener("keydown",d);let e=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",d),document.body.style.overflow=e}},[K,M]);let[V,W]=(0,c.useState)("off"),[X,Y]=(0,c.useState)(""),Z=(0,c.useRef)(!1);function $(a){return b=>D(c=>({...c,[a]:b.target.value}))}(0,c.useEffect)(()=>{if(Z.current)return;let a=!1;try{a="1"===localStorage.getItem("resto-bienvenue")}catch{a=!1}if(a||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;Z.current=!0;try{localStorage.setItem("resto-bienvenue","1")}catch{}let b=[..."ようこそ — Bienvenue"],c=70*b.length+900;W("frappe");let d=0,e=window.setInterval(()=>{d+=1,Y(b.slice(0,d).join("")),d>=b.length&&window.clearInterval(e)},70);window.setTimeout(()=>W("leve"),c),window.setTimeout(()=>W("off"),c+800)},[]),(0,c.useEffect)(()=>{document.documentElement.classList.add("js");let a=Array.from(document.querySelectorAll("[data-reveal]")),b=a=>{if(a.classList.contains("in"))return;a.classList.add("in");let b=parseInt(a.style.getPropertyValue("--d"))||0;window.setTimeout(()=>a.classList.add("done"),b+1500)};a.forEach(a=>{a.getBoundingClientRect().top<.92*window.innerHeight&&b(a)});let c=null;return"IntersectionObserver"in window?(c=new IntersectionObserver(a=>{a.forEach(a=>{a.isIntersecting&&(b(a.target),c?.unobserve(a.target))})},{rootMargin:"0px 0px -12% 0px",threshold:.1}),a.forEach(a=>c?.observe(a))):a.forEach(b),()=>c?.disconnect()},[T,M]),(0,c.useEffect)(()=>{function a(){let a=window.scrollY;H(a>24),a<1400&&document.documentElement.style.setProperty("--sy",String(a))}return a(),window.addEventListener("scroll",a,{passive:!0}),()=>window.removeEventListener("scroll",a)},[]);let _=[["#lieu","Le lieu"],["#carte","La carte"],["#reservation","Réserver"],["#traiteur","Traiteur"],["#plats","Les plats"],["#contact","Contact"]];return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:z}),(0,b.jsx)("header",{className:`site-head${G?" is-scrolled":""}`,children:(0,b.jsxs)("div",{className:"wrap head-in",children:[(0,b.jsxs)("a",{href:"#top",className:"head-logo","aria-label":`${d}, accueil`,children:[(0,b.jsx)(s,{size:28}),(0,b.jsx)("span",{className:"head-nom",children:d})]}),(0,b.jsxs)("nav",{className:"head-nav","aria-label":"Navigation principale",children:[_.map(([a,c])=>(0,b.jsx)("a",{href:a,children:c},a)),(0,b.jsxs)("a",{className:"btn btn-light btn-sm",href:g,"aria-label":`Appeler ${d}`,children:[(0,b.jsx)(v,{size:16})," ",(0,b.jsx)("span",{className:"btn-txt",children:"Appeler"})]}),(0,b.jsxs)("button",{type:"button",className:`burger${I?" ouvert":""}`,"aria-label":I?"Fermer le menu":"Ouvrir le menu","aria-expanded":I,"aria-controls":"menu-mobile",onClick:()=>J(a=>!a),children:[(0,b.jsx)("span",{}),(0,b.jsx)("span",{}),(0,b.jsx)("span",{})]})]})]})}),(0,b.jsxs)("div",{id:"menu-mobile",className:`menu-mobile${I?" ouvert":""}`,"aria-hidden":!I,children:[(0,b.jsx)("nav",{"aria-label":"Menu mobile",children:_.map(([a,c],d)=>(0,b.jsx)("a",{href:a,tabIndex:I?0:-1,onClick:()=>J(!1),style:{"--i":d},children:c},a))}),(0,b.jsxs)("div",{className:"menu-cta",children:[(0,b.jsxs)("a",{className:"btn btn-moutarde",tabIndex:I?0:-1,href:r(`Bonjour ${d},`),target:"_blank",rel:"noopener",children:[(0,b.jsx)(u,{size:18})," Écrire sur WhatsApp"]}),(0,b.jsxs)("a",{className:"btn btn-ghost",tabIndex:I?0:-1,href:g,children:[(0,b.jsx)(v,{size:16})," ",f]})]})]}),(0,b.jsxs)("main",{id:"top",children:[(0,b.jsxs)("section",{className:`hero${"off"!==V?" is-welcome":""}`,children:["off"!==V&&(0,b.jsx)("div",{className:`welcome${"leve"===V?" welcome-up":""}`,"aria-hidden":"true",children:(0,b.jsxs)("p",{className:"welcome-texte",children:[X,(0,b.jsx)("span",{className:"welcome-caret"})]})}),(0,b.jsx)(x,{className:"feuille-h1"}),(0,b.jsx)(x,{className:"feuille-h2"}),(0,b.jsxs)("div",{className:"wrap hero-in",children:[(0,b.jsxs)("div",{className:"hero-copy",children:[(0,b.jsx)("span",{className:"rise",style:{"--d":"60ms"},children:(0,b.jsx)(t,{})}),(0,b.jsx)("p",{className:"eyebrow eyebrow-clair rise",style:{"--d":"110ms"},children:"Restaurant japonais"}),(0,b.jsx)("h1",{className:"rise",style:{"--d":"160ms"},children:"Cuisine japonaise, des sushis aux ramen."}),(0,b.jsx)("p",{className:"rise",style:{"--d":"260ms"},children:"Sushis, makis, ramen et grillades préparés à la minute. Sur place, à emporter ou en traiteur, pour partager un moment simple et soigné."}),(0,b.jsxs)("div",{className:"hero-cta rise",style:{"--d":"360ms"},children:[(0,b.jsx)("a",{className:"btn btn-moutarde btn-fl",href:r("Bonjour, je souhaite réserver une table."),target:"_blank",rel:"noopener",children:"Réserver une table"}),(0,b.jsx)("a",{className:"btn btn-ghost btn-fl",href:"#carte",children:"Voir la carte"})]}),(0,b.jsx)("p",{className:"hero-adr rise",style:{"--d":"460ms"},children:j})]}),(0,b.jsx)("div",{className:"hero-photo rise",style:{"--d":"320ms"},children:(0,b.jsxs)("div",{className:"collage",children:[(0,b.jsx)(y,{k:"寿司",style:"t-blanc",className:"collage-a",label:"Sushis"}),(0,b.jsx)(y,{k:"麺",style:"t-sombre",className:"collage-b",label:"Ramen"})]})})]})]}),(0,b.jsx)("nav",{className:"bande","aria-label":"Nos activités",children:(0,b.jsx)("div",{className:"wrap bande-in",children:[{h:"#plats",n:"Sushis et makis"},{h:"#carte",n:"Ramen et plats chauds"},{h:"#reservation",n:"Sur place et à emporter"},{h:"#traiteur",n:"Traiteur et événements"}].map((a,c)=>(0,b.jsx)("a",{href:a.h,"data-reveal":!0,className:"rv-pop",style:{"--d":`${80*c}ms`},children:a.n},a.h))})}),(0,b.jsx)("section",{id:"lieu",className:"section",children:(0,b.jsxs)("div",{className:"wrap lieu-in",children:[(0,b.jsxs)("div",{"data-reveal":!0,className:"reveal rv-left",children:[(0,b.jsx)("p",{className:"eyebrow",children:"Le lieu"}),(0,b.jsx)("h2",{children:"Une table japonaise, simple et chaleureuse"}),(0,b.jsx)("p",{className:"lede",children:"Un décor épuré aux tons rouge et blanc, du bois clair et des lanternes : l'esprit des izakaya japonais, pour un déjeuner rapide comme pour un dîner entre amis."}),(0,b.jsx)("ul",{className:"puces",children:["Sushis et sashimis","Ramen et plats chauds","Desserts japonais","Sur place et à emporter"].map((a,c)=>(0,b.jsx)("li",{"data-reveal":!0,className:"rv-pop",style:{"--d":`${200+90*c}ms`},children:a},a))})]}),(0,b.jsxs)("div",{className:"lieu-photos",children:[(0,b.jsx)(y,{k:"和",style:"t-rouge",className:"lieu-p lieu-p0",d:0,label:"Motif japonais : harmonie"}),(0,b.jsx)(y,{k:"灯",style:"t-rose",className:"lieu-p lieu-p1",d:140,label:"Motif japonais : lanterne"}),(0,b.jsx)(y,{k:"茶",style:"t-sombre",className:"lieu-p lieu-p2",d:280,label:"Motif japonais : thé"})]})]})}),(0,b.jsx)("section",{id:"carte",className:"section cafe",children:(0,b.jsxs)("div",{className:"wrap cafe-in",children:[(0,b.jsxs)("div",{className:"cafe-photos",children:[(0,b.jsx)(y,{k:"寿司",style:"t-blanc",className:"cafe-p cafe-p0",d:0,label:"Sushis"}),(0,b.jsx)(y,{k:"巻",style:"t-rose",className:"cafe-p cafe-p1",d:140,label:"Makis"}),(0,b.jsx)(y,{k:"麺",style:"t-sombre",className:"cafe-p cafe-p2",d:280,label:"Ramen"})]}),(0,b.jsxs)("div",{"data-reveal":!0,className:"rv-right",style:{"--d":"120ms"},children:[(0,b.jsx)("p",{className:"eyebrow eyebrow-clair",children:"La carte"}),(0,b.jsx)("h2",{children:"Sushis, makis, ramen et gourmandises"}),(0,b.jsx)("p",{className:"lede",children:"Une carte courte, centrée sur la fraîcheur : poisson cru, plats chauds réconfortants et desserts japonais."}),(0,b.jsxs)("div",{className:"carte","data-reveal":!0,style:{"--d":"240ms"},children:[(0,b.jsx)("h3",{children:"La carte"}),p.map(a=>(0,b.jsxs)("div",{className:"carte-groupe",children:[(0,b.jsx)("h4",{children:a.t}),(0,b.jsx)("ul",{children:a.items.map(a=>(0,b.jsx)("li",{children:a},a))})]},a.t)),(0,b.jsx)("p",{className:"carte-note",children:"Prix et menus du jour sur place."})]})]})]})}),(0,b.jsx)("section",{id:"reservation",className:"section cow",children:(0,b.jsxs)("div",{className:"wrap lieu-in",children:[(0,b.jsxs)("div",{"data-reveal":!0,className:"reveal rv-left",children:[(0,b.jsx)("p",{className:"eyebrow",children:"Réservation"}),(0,b.jsx)("h2",{children:"Réservez votre table"}),(0,b.jsx)("p",{className:"lede",children:"Pour un dîner à deux, un repas entre amis ou un groupe : écrivez-nous sur WhatsApp, nous confirmons votre table."}),(0,b.jsx)("div",{className:"cow-cards",children:[{t:"Sur place",d:"Comptoir et tables"},{t:"À emporter",d:"Commandez, puis récupérez"},{t:"Groupes",d:"Menus à partager"},{t:"Réponse rapide",d:"Par WhatsApp ou téléphone"}].map((a,c)=>(0,b.jsxs)("div",{className:"cow-card rv-pop","data-reveal":!0,style:{"--d":`${200+90*c}ms`},children:[(0,b.jsx)("strong",{children:a.t}),(0,b.jsx)("span",{children:a.d})]},a.t))}),(0,b.jsx)("p",{className:"cow-note",children:"Horaires, tarifs et disponibilités : demandez-nous."}),(0,b.jsxs)("a",{className:"btn btn-moutarde",href:r("Bonjour, je souhaite réserver une table."),target:"_blank",rel:"noopener",children:[(0,b.jsx)(u,{size:18})," Réserver sur WhatsApp"]})]}),(0,b.jsxs)("div",{className:"cow-photos",children:[(0,b.jsx)(y,{k:"食",style:"t-rouge",className:"cow-p cow-p0",d:0,label:"Motif japonais : manger"}),(0,b.jsx)(y,{k:"席",style:"t-blanc",className:"cow-p cow-p1",d:160,label:"Motif japonais : table"})]})]})}),(0,b.jsxs)("section",{id:"traiteur",className:"section pays",children:[(0,b.jsx)(x,{className:"feuille-p1"}),(0,b.jsxs)("div",{className:"wrap lieu-in",children:[(0,b.jsxs)("div",{"data-reveal":!0,className:"reveal rv-left",children:[(0,b.jsx)("p",{className:"eyebrow eyebrow-clair",children:"Traiteur et événements"}),(0,b.jsx)("h2",{children:"Vos événements, à la japonaise"}),(0,b.jsx)("p",{className:"lede",children:"Anniversaire, repas d'entreprise, cocktail : plateaux de sushis et menus sur mesure, préparés pour vous. Décrivez-nous votre événement, nous revenons vers vous avec un devis."}),(0,b.jsx)("ul",{className:"puces",children:["Plateaux de sushis","Menus sur mesure","Entreprises et particuliers"].map((a,c)=>(0,b.jsx)("li",{"data-reveal":!0,className:"rv-pop",style:{"--d":`${200+90*c}ms`},children:a},a))}),(0,b.jsxs)("div",{className:"pays-cta",children:[(0,b.jsxs)("a",{className:"btn btn-moutarde",href:r("Bonjour, je souhaite un devis pour un événement."),target:"_blank",rel:"noopener",children:[(0,b.jsx)(u,{size:18})," Demander un devis"]}),(0,b.jsxs)("a",{className:"btn btn-ghost",href:g,children:[(0,b.jsx)(v,{size:16})," ",f]})]})]}),(0,b.jsx)("div",{className:"pays-visuel","data-reveal":!0,style:{"--d":"120ms"},children:(0,b.jsx)(y,{k:"祝",style:"t-blanc",className:"pays-tuile",label:"Motif japonais : célébration"})})]})]}),(0,b.jsx)("section",{id:"plats",className:"section",children:(0,b.jsxs)("div",{className:"wrap",children:[(0,b.jsx)("p",{"data-reveal":!0,className:"eyebrow reveal",children:"Les plats"}),(0,b.jsx)("h2",{"data-reveal":!0,className:"reveal",children:"Notre carte en images"}),(0,b.jsxs)("p",{"data-reveal":!0,className:"reveal lede",style:{"--d":"90ms"},children:[S.length," plats à découvrir. Touchez une carte pour voir le détail."]}),(0,b.jsx)("div",{className:"filtres",role:"group","aria-label":"Filtrer les plats",children:l.map(a=>(0,b.jsx)("button",{type:"button",className:`filtre${M===a.k?" on":""}`,"aria-pressed":M===a.k,onClick:()=>{N(a.k),R(1)},children:a.n},a.k))}),(0,b.jsx)("div",{className:"grid",children:U.map(a=>{let c=m[a],d=k[c.c];return(0,b.jsxs)("a",{className:"card reveal","data-reveal":!0,style:{"--d":`${U.indexOf(a)%4*70}ms`},href:"#plats","aria-label":`Voir le d\xe9tail : ${c.n}`,onClick:b=>{b.preventDefault(),L(a)},"aria-haspopup":"dialog",children:[(0,b.jsxs)("span",{className:"card-img",children:[c.photo?(0,b.jsx)("img",{src:c.photo,alt:c.n,width:480,height:640,loading:"lazy",decoding:"async"}):(0,b.jsx)("span",{className:`tuile ${d.style}`,"aria-hidden":"true",children:(0,b.jsx)("b",{lang:"ja",style:{"--n":[...o(c)].length},children:o(c)})}),(0,b.jsx)("span",{className:"card-voir","aria-hidden":"true",children:"Voir le détail"})]}),(0,b.jsxs)("span",{className:"card-cap",children:[(0,b.jsx)("span",{className:"card-tag",children:d.t}),(0,b.jsx)("span",{className:"card-nom",children:c.n})]})]},c.n)})}),S.length>T&&(0,b.jsx)("div",{className:"centre voir-plus",children:(0,b.jsxs)("button",{type:"button",className:"btn btn-primary",onClick:()=>R(a=>a+1),children:["Voir plus de plats",(0,b.jsxs)("span",{className:"voir-plus-reste",children:[S.length-T," restants"]})]})})]})}),(0,b.jsx)("section",{id:"accueil",className:"section",children:(0,b.jsxs)("div",{className:"wrap",children:[(0,b.jsx)("p",{"data-reveal":!0,className:"eyebrow reveal",children:"Omotenashi"}),(0,b.jsx)("h2",{"data-reveal":!0,className:"reveal",children:"L'accueil à la japonaise"}),(0,b.jsx)("p",{"data-reveal":!0,className:"reveal lede",style:{"--d":"90ms"},children:"L'omotenashi, c'est l'art d'accueillir avec attention. Trois idées guident notre cuisine."}),(0,b.jsx)("div",{className:"avis-liste",children:q.map((a,c)=>(0,b.jsxs)("div",{"data-reveal":!0,className:"reveal avis valeur",style:{"--d":`${140+80*c}ms`},children:[(0,b.jsx)("b",{className:"valeur-k",lang:"ja","aria-hidden":"true",children:a.k}),(0,b.jsx)("h3",{children:a.t}),(0,b.jsx)("p",{children:a.d})]},a.t))}),(0,b.jsx)("p",{className:"avis-hint",children:"Faites glisser pour voir la suite"})]})}),(0,b.jsx)("section",{id:"contact",className:"section section-alt",children:(0,b.jsxs)("div",{className:"wrap contact-in",children:[(0,b.jsxs)("div",{"data-reveal":!0,className:"reveal rv-left",children:[(0,b.jsx)("p",{className:"eyebrow",children:"Contact"}),(0,b.jsx)("h2",{children:"Venez nous voir"}),(0,b.jsx)("p",{className:"lede",children:"Écrivez-nous sur WhatsApp : remplissez le formulaire, votre message s'ouvre prêt à envoyer, et nous vous répondons rapidement."}),(0,b.jsxs)("form",{onSubmit:function(a){a.preventDefault();let b=`Bonjour ${d},

Objet : ${C.objet}
Je m'appelle ${C.nom||"—"}. ${C.message}

Me joindre : ${C.contact||"—"}`;window.open(r(b),"_blank","noopener"),F(!0)},className:"form",children:[(0,b.jsxs)("label",{children:["Nom",(0,b.jsx)("input",{required:!0,value:C.nom,onChange:$("nom"),placeholder:"Votre nom",autoComplete:"name"})]}),(0,b.jsxs)("label",{children:["Téléphone ou e-mail",(0,b.jsx)("input",{required:!0,value:C.contact,onChange:$("contact"),placeholder:"00 00 00 00 00  ou  vous@exemple.com",autoComplete:"tel"})]}),(0,b.jsxs)("label",{children:["Objet",(0,b.jsx)("select",{value:C.objet,onChange:a=>D(b=>({...b,objet:a.target.value})),children:["Réservation","À emporter","Traiteur (devis)","Autre"].map(a=>(0,b.jsx)("option",{children:a},a))})]}),(0,b.jsxs)("label",{children:["Message",(0,b.jsx)("textarea",{required:!0,rows:4,value:C.message,onChange:$("message"),placeholder:"Une table pour 4 personnes, samedi soir à 20 h…"})]}),(0,b.jsx)("p",{className:"form-hint",children:"Ce formulaire ne s'envoie pas par e-mail : il ouvre WhatsApp avec votre message déjà écrit. Il n'est envoyé qu'une fois validé dans WhatsApp."}),(0,b.jsxs)("button",{className:"btn btn-moutarde",type:"submit",children:[(0,b.jsx)(u,{size:18})," Continuer sur WhatsApp"]}),(0,b.jsxs)("p",{className:`note${E?" show":""}`,role:"status",children:["WhatsApp s'est ouvert avec votre message : il ne reste qu'à l'envoyer. Vous pouvez aussi nous appeler au ",(0,b.jsx)("a",{href:g,children:f})," ou écrire à ",(0,b.jsx)("a",{href:`mailto:${h}`,children:h}),"."]})]})]}),(0,b.jsxs)("aside",{"data-reveal":!0,className:"reveal rv-right coords coords-simple",style:{"--d":"160ms"},children:[(0,b.jsxs)("dl",{children:[(0,b.jsx)("dt",{children:"Téléphone"}),(0,b.jsx)("dd",{children:(0,b.jsx)("a",{href:g,children:f})}),(0,b.jsx)("dt",{children:"Courriel"}),(0,b.jsx)("dd",{children:(0,b.jsx)("a",{href:`mailto:${h}`,children:h})}),(0,b.jsx)("dt",{children:"Adresse"}),(0,b.jsx)("dd",{children:j}),(0,b.jsx)("dt",{children:"Instagram"}),(0,b.jsx)("dd",{children:(0,b.jsxs)("a",{href:i,target:"_blank",rel:"noopener me",children:["@",d]})})]}),(0,b.jsxs)("a",{className:"btn btn-wa",href:r(`Bonjour ${d}, j'aimerais avoir des informations.`),target:"_blank",rel:"noopener",children:[(0,b.jsx)(u,{size:18})," Écrire sur WhatsApp"]})]})]})})]}),(0,b.jsxs)("footer",{className:"site-foot",children:[(0,b.jsxs)("div",{className:"wrap foot-in",children:[(0,b.jsx)("div",{"data-reveal":!0,className:"reveal",children:(0,b.jsx)(t,{})}),(0,b.jsxs)("div",{"data-reveal":!0,className:"reveal foot-col",style:{"--d":"90ms"},children:[(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Téléphone"}),(0,b.jsx)("a",{href:g,children:f})]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Courriel"}),(0,b.jsx)("a",{href:`mailto:${h}`,children:h})]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Réseaux"}),(0,b.jsxs)("span",{className:"foot-pills",children:[(0,b.jsxs)("a",{href:i,target:"_blank",rel:"noopener me",className:"foot-pill foot-pill-insta",children:[(0,b.jsx)(w,{size:18})," Instagram"]}),(0,b.jsxs)("a",{href:r(`Bonjour ${d},`),target:"_blank",rel:"noopener me",className:"foot-pill",children:[(0,b.jsx)(u,{size:18})," WhatsApp"]})]})]})]}),(0,b.jsx)("div",{"data-reveal":!0,className:"reveal foot-col",style:{"--d":"180ms"},children:(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Adresse"}),j]})})]}),(0,b.jsx)("div",{className:"wrap foot-bottom",children:(0,b.jsxs)("span",{children:["© ",new Date().getFullYear()," ",d," — ",e]})})]}),null!==K&&(n=k[(a=m[K]).c],A=Math.max(0,S.indexOf(K)),B=a=>L(S[(A+a+S.length)%S.length]),(0,b.jsx)("div",{className:"fiche-fond",role:"dialog","aria-modal":"true","aria-label":`D\xe9tail : ${a.n}`,onClick:a=>{a.target===a.currentTarget&&L(null)},children:(0,b.jsxs)("div",{className:"fiche",children:[(0,b.jsx)("button",{className:"fiche-x",onClick:()=>L(null),"aria-label":"Fermer",children:"×"}),(0,b.jsxs)("div",{className:"fiche-photo",children:[a.photo?(0,b.jsx)("img",{src:a.photo,alt:a.n},a.n):(0,b.jsx)("div",{className:`tuile ${n.style} fiche-tuile`,"aria-hidden":"true",children:(0,b.jsx)("b",{lang:"ja",style:{"--n":[...o(a)].length},children:o(a)})},a.n),(0,b.jsx)("button",{className:"fiche-nav fiche-prec",onClick:()=>B(-1),"aria-label":"Plat précédent",children:"‹"}),(0,b.jsx)("button",{className:"fiche-nav fiche-suiv",onClick:()=>B(1),"aria-label":"Plat suivant",children:"›"})]}),(0,b.jsxs)("div",{className:"fiche-txt",children:[(0,b.jsx)("span",{className:"card-tag",children:n.t}),(0,b.jsx)("h3",{children:a.n}),(0,b.jsx)("p",{children:a.d}),(0,b.jsx)("p",{className:"fiche-note",children:"Prix, allergènes et disponibilité : demandez-nous sur WhatsApp ou sur place."}),(0,b.jsxs)("a",{className:"btn btn-moutarde",href:r(`Bonjour ${d}, je souhaite commander : ${a.n}.`),target:"_blank",rel:"noopener",children:[(0,b.jsx)(u,{size:18})," Commander ce plat"]}),(0,b.jsxs)("span",{className:"fiche-compte",children:[A+1," / ",S.length]})]},`t-${a.n}`)]})})),(0,b.jsx)("a",{className:"wa-fixed",href:r(`Bonjour ${d},`),target:"_blank",rel:"noopener","aria-label":"Écrire sur WhatsApp",children:(0,b.jsx)(u,{size:24})})]})}])}];

//# sourceMappingURL=app_page_tsx_0pxmutwxt3q37._.js.map