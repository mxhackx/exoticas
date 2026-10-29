(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,e=>{"use strict";var r=e.i(43476),a=e.i(71645);let o="01 53 30 00 00",t="tel:+2290153300000",s="exoticasbj@gmail.com",i="Tokpa-hoho, 5ème arrondissement, Cotonou",n="2ème rue après Acropole, à 1 min de l'échangeur Ganhi, face à la boîte de nuit Z Club",l=[{src:"/galerie/p1-visuel-maitre.jpg",alt:"Visuel de marque Exoticas",pos:"50% 38%"},{src:"/galerie/p2-depliant.jpg",alt:"Dépliant trois volets Exoticas",pos:"42% 50%"},{src:"/galerie/p3-carnets.jpg",alt:"Carnets Exoticas",pos:"50% 50%"}],d=["Plants café","Boutique de plantes rares","Coworking","Aménagement paysager"];function c(e){return`https://wa.me/2290153300000?text=${encodeURIComponent(e)}`}function p({size:e=34}){return(0,r.jsx)("svg",{className:"mark",width:e,height:e,viewBox:"0 0 48 48",fill:"none","aria-hidden":"true",children:(0,r.jsxs)("g",{fill:"currentColor",children:[(0,r.jsx)("rect",{x:"2",y:"4",width:"18",height:"3.2",rx:"1.6"}),(0,r.jsx)("rect",{x:"2",y:"10.4",width:"18",height:"3.2",rx:"1.6"}),(0,r.jsx)("rect",{x:"2",y:"16.8",width:"18",height:"3.2",rx:"1.6"}),(0,r.jsx)("g",{transform:"translate(36,12)",children:(0,r.jsxs)("g",{className:"mark-flower",children:[(0,r.jsx)("ellipse",{rx:"2.7",ry:"7.2",transform:"rotate(45)"}),(0,r.jsx)("ellipse",{rx:"2.7",ry:"7.2",transform:"rotate(135)"})]})}),(0,r.jsx)("circle",{cx:"11",cy:"36",r:"8"}),(0,r.jsx)("path",{d:"M28 44V28h16v4.4H32.4V44H28Z"})]})})}function m({light:e=!0}){return(0,r.jsxs)("span",{className:"wordmark",style:{color:e?"#fff":"#22331B"},children:[(0,r.jsx)(p,{size:30}),(0,r.jsxs)("span",{className:"wordmark-text",children:[(0,r.jsx)("span",{className:"wordmark-nom",children:"exoticas"}),(0,r.jsx)("span",{className:"wordmark-sig",children:"La vie en vert"})]})]})}function h({size:e=22}){return(0,r.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:(0,r.jsx)("path",{d:"M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 13.9c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1a11 11 0 0 1-5.9-5.1c-.5-.9-.6-1.7-.4-2.2.2-.6.6-1 .9-1.2.3-.2.6-.2.8-.2h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.6l-.4.5c-.2.2-.2.3-.1.5.3.6 1.5 1.9 2.7 2.4.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.8.9c.3.2.3.3.3.5v.6Z"})})}let x=`
:root{
  --vert:#466931;
  --vert-fonce:#3A5528;
  --vert-nuit:#2C4220;
  --vert-accent:#6EA03F;
  --creme:#F7F6F1;
  --texte:#22331B;
  --muted:#6E7A66;
  --line:#DDE2D6;
  --r:6px;
  --ease:cubic-bezier(.22,.61,.36,1);
  --ease-out:cubic-bezier(.16,1,.3,1);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;color:var(--texte);background:var(--creme);
  font:16px/1.6 ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}
h1,h2,h3{line-height:1.15;margin:0 0 .5rem;font-weight:600;letter-spacing:-.02em}
h1{font-size:clamp(2rem,5vw,3.1rem)}
h2{font-size:clamp(1.5rem,2.8vw,2rem)}
h3{font-size:1.05rem}
p{margin:0 0 1rem}
a{color:inherit}
img{display:block;max-width:100%}
.wrap{max-width:1080px;margin:0 auto;padding:0 20px}
.muted{color:var(--muted)}

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
.mark-flower{transform-box:fill-box;transform-origin:center;animation:breathe 6s var(--ease) infinite alternate}
@keyframes breathe{from{opacity:.82}to{opacity:1;transform:scale(1.12)}}
.head-nav{display:flex;align-items:center;gap:22px;font-size:.95rem}
.head-nav a{text-decoration:none;color:#fff;position:relative}
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
.hero-bg{position:absolute;inset:0;background-image:var(--hero-img);background-size:cover;background-position:78% 28%;
  opacity:0;transition:opacity .8s var(--ease)}
.hero-in{position:relative;display:grid;grid-template-columns:1.15fr .85fr;gap:44px;align-items:center}
.hero-fade{position:absolute;left:0;right:0;bottom:0;height:120px;
  background:linear-gradient(to bottom,rgba(247,246,241,0),var(--creme));pointer-events:none}
.wordmark{display:inline-flex;align-items:center;gap:10px}
.wordmark-text{display:flex;flex-direction:column;line-height:1.1}
.wordmark-nom{font-size:1.5rem}
.wordmark-sig{font-size:.72rem;letter-spacing:.32em;text-transform:uppercase;opacity:.85}
.hero-copy h1{margin-top:26px;max-width:18ch}
.hero-copy p{max-width:46ch;color:rgba(255,255,255,.9)}
.chips{list-style:none;display:flex;flex-wrap:wrap;gap:8px;padding:0;margin:0 0 28px}
.chips li{border:1px solid rgba(255,255,255,.4);border-radius:var(--r);padding:6px 12px;font-size:.85rem;
  transition:background .3s var(--ease),transform .3s var(--ease-out)}
.chips li:hover{background:rgba(255,255,255,.14);transform:translateY(-2px)}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px}
.hero-tel{margin:24px 0 0;font-size:.92rem}
.hero-tel a{text-decoration:none;border-bottom:1px solid rgba(255,255,255,.4)}
.hero-photo{display:flex;justify-content:flex-end}
.frame{position:relative;width:100%;max-width:340px;aspect-ratio:1/1;border-radius:14px;overflow:hidden;
  border:1px solid rgba(255,255,255,.28);box-shadow:0 24px 60px rgba(15,30,8,.35);
  background:var(--vert-fonce)}
.frame img{width:100%;height:100%;object-fit:cover;object-position:50% 38%}
.kenburns{animation:kb 22s ease-in-out infinite alternate}
@keyframes kb{from{transform:scale(1.02)}to{transform:scale(1.14) translate(-2%,-3%)}}

/* entr\xe9es \xe9chelonn\xe9es au chargement */
.rise{animation:rise .9s var(--ease-out) both;animation-delay:var(--d,0ms)}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}

/* ---------- r\xe9v\xe9lation au scroll ---------- */
.js [data-reveal]{opacity:0;transform:translateY(26px);
  transition:opacity .8s var(--ease-out) var(--d,0ms),transform .8s var(--ease-out) var(--d,0ms)}
.js [data-reveal].in{opacity:1;transform:none}

/* ---------- sections ---------- */
.section{padding:72px 0}
.section-alt{background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.lede{color:var(--muted);max-width:56ch}

/* ---------- galerie ---------- */
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:26px}
.card{border:1px solid var(--line);border-radius:var(--r);overflow:hidden;background:#fff;text-decoration:none;
  display:flex;flex-direction:column;
  transition:transform .5s var(--ease-out),box-shadow .5s var(--ease-out),border-color .5s var(--ease)}
.card:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(20,35,12,.14);border-color:var(--vert-accent)}
.card-img{display:block;overflow:hidden;aspect-ratio:4/3;background:var(--vert)}
.card-img img{width:100%;height:100%;object-fit:cover;
  transition:transform .9s var(--ease-out),filter .6s var(--ease)}
.card:hover .card-img img{transform:scale(1.07)}
.card figcaption{padding:12px 14px;font-size:.88rem;color:var(--muted);
  display:flex;align-items:center;justify-content:space-between;gap:10px}
.card-more{font-size:.76rem;letter-spacing:.1em;text-transform:uppercase;color:var(--vert);
  opacity:0;transform:translateX(6px);transition:opacity .4s var(--ease),transform .4s var(--ease-out)}
.card:hover .card-more{opacity:1;transform:none}

/* ---------- contact ---------- */
.contact-in{display:grid;grid-template-columns:1.1fr .9fr;gap:44px;align-items:start}
.form{display:grid;gap:16px;max-width:520px}
.form label{display:grid;gap:6px;font-size:.88rem;color:var(--muted)}
.form input,.form textarea{font:inherit;color:var(--texte);background:#fff;border:1px solid var(--line);
  border-radius:var(--r);padding:11px 13px;width:100%;
  transition:border-color .3s var(--ease),box-shadow .3s var(--ease),transform .3s var(--ease-out)}
.form input:hover,.form textarea:hover{border-color:#C3CDB8}
.form input:focus,.form textarea:focus{outline:none;border-color:var(--vert);
  box-shadow:0 0 0 3px rgba(110,160,63,.22)}
.form .btn{justify-self:start;margin-top:4px}
.note{font-size:.88rem;color:var(--muted);border-left:2px solid var(--vert-accent);padding-left:12px;margin:0;
  max-height:0;opacity:0;overflow:hidden;transition:max-height .6s var(--ease-out),opacity .6s var(--ease)}
.note.show{max-height:120px;opacity:1}
.coords{background:var(--creme);border:1px solid var(--line);border-radius:var(--r);padding:24px;
  transition:transform .5s var(--ease-out),box-shadow .5s var(--ease-out)}
.coords:hover{transform:translateY(-4px);box-shadow:0 14px 34px rgba(20,35,12,.1)}
.coords dl{display:grid;grid-template-columns:auto 1fr;gap:8px 16px;margin:0 0 20px;font-size:.95rem}
.coords dt{color:var(--muted);font-size:.88rem}
.coords dd{margin:0}
.coords a{text-decoration:none;border-bottom:1px solid var(--line);transition:border-color .3s var(--ease),color .3s var(--ease)}
.coords a:hover{color:var(--vert);border-color:var(--vert)}

/* ---------- footer ---------- */
.site-foot{background:var(--vert-nuit);color:#fff;padding:52px 0 24px}
.foot-in{display:grid;grid-template-columns:1.2fr 1fr 1.2fr;gap:32px}
.foot-col p{margin:0 0 10px;font-size:.93rem;color:rgba(255,255,255,.88)}
.foot-col strong{display:block;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;
  color:rgba(255,255,255,.55);margin-bottom:3px;font-weight:500}
.foot-col a{text-decoration:none;border-bottom:1px solid rgba(255,255,255,.25);transition:border-color .3s var(--ease)}
.foot-col a:hover{border-color:#fff}
.foot-col .muted{display:block;color:rgba(255,255,255,.6);font-size:.86rem;margin-top:4px}
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
  .grid{grid-template-columns:repeat(2,1fr)}
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
  .nav-tel{display:none}
  .section{padding:48px 0}
}
@media (max-width:460px){
  .grid{grid-template-columns:1fr}
  .hero-cta{grid-template-columns:1fr}
}

/* ---------- accessibilit\xe9 : mouvement r\xe9duit ---------- */
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important;transition:none!important}
  .js [data-reveal]{opacity:1;transform:none}
  .rise{opacity:1}
}
`;e.s(["default",0,function(){let[e,f]=(0,a.useState)({nom:"",contact:"",message:""}),[g,v]=(0,a.useState)(!1),[u,b]=(0,a.useState)(!1),[j,y]=(0,a.useState)(0);function w(e){return r=>f(a=>({...a,[e]:r.target.value}))}return(0,a.useEffect)(()=>{document.documentElement.classList.add("js");let e=document.querySelectorAll("[data-reveal]"),r=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add("in"),r.unobserve(e.target))})},{rootMargin:"0px 0px -12% 0px",threshold:.12});return e.forEach(e=>r.observe(e)),()=>r.disconnect()},[]),(0,a.useEffect)(()=>{function e(){let e=window.scrollY;b(e>24);let r=document.documentElement.scrollHeight-window.innerHeight;y(r>0?Math.min(1,e/r):0)}return e(),window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("style",{children:x}),(0,r.jsx)("div",{className:"progress",style:{transform:`scaleX(${j})`},"aria-hidden":"true"}),(0,r.jsx)("header",{className:`site-head${u?" is-scrolled":""}`,children:(0,r.jsxs)("div",{className:"wrap head-in",children:[(0,r.jsxs)("a",{href:"#top",className:"head-logo","aria-label":"Exoticas, accueil",children:[(0,r.jsx)(p,{size:28}),(0,r.jsx)("span",{className:"head-nom",children:"exoticas"})]}),(0,r.jsxs)("nav",{className:"head-nav",children:[(0,r.jsx)("a",{href:"#galerie",children:"Galerie"}),(0,r.jsx)("a",{href:"#contact",children:"Contact"}),(0,r.jsxs)("a",{className:"btn btn-light btn-sm",href:t,children:["Appeler ",(0,r.jsxs)("span",{className:"nav-tel",children:["· ",o]})]})]})]})}),(0,r.jsxs)("main",{id:"top",children:[(0,r.jsxs)("section",{className:"hero",style:{"--hero-img":"url('/galerie/p1-visuel-maitre.jpg')"},children:[(0,r.jsx)("div",{className:"hero-bg","aria-hidden":"true"}),(0,r.jsxs)("div",{className:"wrap hero-in",children:[(0,r.jsxs)("div",{className:"hero-copy",children:[(0,r.jsx)("span",{className:"rise",style:{"--d":"60ms"},children:(0,r.jsx)(m,{})}),(0,r.jsx)("h1",{className:"rise",style:{"--d":"160ms"},children:"Donnons vie à vos espaces."}),(0,r.jsx)("p",{className:"rise",style:{"--d":"260ms"},children:"Plants café, boutique, coworking et paysagisme : tout ce qu'il faut pour vous reconnecter à l'essentiel, à Tokpa-hoho, Cotonou."}),(0,r.jsx)("ul",{className:"chips rise",style:{"--d":"360ms"},children:d.map(e=>(0,r.jsx)("li",{children:e},e))}),(0,r.jsxs)("div",{className:"hero-cta rise",style:{"--d":"460ms"},children:[(0,r.jsx)("a",{className:"btn btn-light",href:"#contact",children:"Demander un devis"}),(0,r.jsx)("a",{className:"btn btn-ghost",href:"#galerie",children:"Voir la galerie"})]}),(0,r.jsxs)("p",{className:"hero-tel rise",style:{"--d":"560ms"},children:[(0,r.jsx)("a",{href:t,children:o}),(0,r.jsxs)("span",{children:[" — ",i]})]})]}),(0,r.jsx)("div",{className:"hero-photo rise",style:{"--d":"320ms"},children:(0,r.jsx)("div",{className:"frame",children:(0,r.jsx)("img",{className:"kenburns",src:"/galerie/p1-visuel-maitre.jpg",alt:"Visuel de marque Exoticas"})})})]}),(0,r.jsx)("div",{className:"hero-fade","aria-hidden":"true"})]}),(0,r.jsx)("section",{id:"galerie",className:"section",children:(0,r.jsxs)("div",{className:"wrap",children:[(0,r.jsx)("h2",{"data-reveal":!0,className:"reveal",children:"Galerie"}),(0,r.jsx)("p",{"data-reveal":!0,className:"reveal lede",style:{"--d":"90ms"},children:"Nos plantes, notre boutique et nos espaces verts."}),(0,r.jsx)("div",{className:"grid",children:l.map((e,a)=>(0,r.jsxs)("a",{className:"card reveal","data-reveal":!0,style:{"--d":`${140+110*a}ms`},href:e.src,target:"_blank",rel:"noopener",children:[(0,r.jsx)("span",{className:"card-img",children:(0,r.jsx)("img",{src:e.src,alt:e.alt,loading:"lazy",style:{objectPosition:e.pos}})}),(0,r.jsxs)("figcaption",{children:[e.alt,(0,r.jsx)("span",{className:"card-more","aria-hidden":"true",children:"Agrandir"})]})]},e.src))})]})}),(0,r.jsx)("section",{id:"contact",className:"section section-alt",children:(0,r.jsxs)("div",{className:"wrap contact-in",children:[(0,r.jsxs)("div",{"data-reveal":!0,className:"reveal",children:[(0,r.jsx)("h2",{children:"Contact"}),(0,r.jsx)("p",{className:"lede",children:"Écrivez-nous : votre message s'ouvre dans WhatsApp, on vous répond rapidement."}),(0,r.jsxs)("form",{onSubmit:function(r){r.preventDefault();let a=`Bonjour Exoticas,

Je m'appelle ${e.nom||"—"}. ${e.message}

Me joindre : ${e.contact||"—"}`;window.open(c(a),"_blank","noopener"),v(!0)},className:"form",children:[(0,r.jsxs)("label",{children:["Nom",(0,r.jsx)("input",{required:!0,value:e.nom,onChange:w("nom"),placeholder:"Votre nom",autoComplete:"name"})]}),(0,r.jsxs)("label",{children:["Téléphone ou e-mail",(0,r.jsx)("input",{required:!0,value:e.contact,onChange:w("contact"),placeholder:"01 …  ou  vous@exemple.com",autoComplete:"tel"})]}),(0,r.jsxs)("label",{children:["Message",(0,r.jsx)("textarea",{required:!0,rows:4,value:e.message,onChange:w("message"),placeholder:"Je souhaite aménager une terrasse de 40 m²…"})]}),(0,r.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Envoyer le message"}),(0,r.jsxs)("p",{className:`note${g?" show":""}`,role:"status",children:["Message prêt dans WhatsApp. Vous pouvez aussi nous appeler au"," ",(0,r.jsx)("a",{href:t,children:o})," ou écrire à"," ",(0,r.jsx)("a",{href:`mailto:${s}`,children:s}),"."]})]})]}),(0,r.jsxs)("aside",{"data-reveal":!0,className:"reveal coords",style:{"--d":"160ms"},children:[(0,r.jsx)("h3",{children:"Nous trouver"}),(0,r.jsxs)("dl",{children:[(0,r.jsx)("dt",{children:"Téléphone"}),(0,r.jsx)("dd",{children:(0,r.jsx)("a",{href:t,children:o})}),(0,r.jsx)("dt",{children:"Courriel"}),(0,r.jsx)("dd",{children:(0,r.jsx)("a",{href:`mailto:${s}`,children:s})}),(0,r.jsx)("dt",{children:"Adresse"}),(0,r.jsx)("dd",{children:i}),(0,r.jsx)("dd",{className:"muted",children:n})]}),(0,r.jsxs)("a",{className:"btn btn-wa",href:c("Bonjour Exoticas, j'aimerais avoir des informations."),target:"_blank",rel:"noopener",children:[(0,r.jsx)(h,{size:18})," Écrire sur WhatsApp"]})]})]})})]}),(0,r.jsxs)("footer",{className:"site-foot",children:[(0,r.jsxs)("div",{className:"wrap foot-in",children:[(0,r.jsx)("div",{"data-reveal":!0,className:"reveal",children:(0,r.jsx)(m,{})}),(0,r.jsxs)("div",{"data-reveal":!0,className:"reveal foot-col",style:{"--d":"90ms"},children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Téléphone"}),(0,r.jsx)("a",{href:t,children:o})]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Courriel"}),(0,r.jsx)("a",{href:`mailto:${s}`,children:s})]})]}),(0,r.jsx)("div",{"data-reveal":!0,className:"reveal foot-col",style:{"--d":"180ms"},children:(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Adresse"}),i,(0,r.jsx)("span",{className:"muted",children:n})]})})]}),(0,r.jsx)("div",{className:"wrap foot-bottom",children:(0,r.jsxs)("span",{children:["© ",new Date().getFullYear()," Exoticas — La vie en vert"]})})]}),(0,r.jsx)("a",{className:"wa-fixed",href:c("Bonjour Exoticas,"),target:"_blank",rel:"noopener","aria-label":"Écrire sur WhatsApp",children:(0,r.jsx)(h,{size:24})})]})}])}]);