/* Selector de idioma (Configuración del perfil). Cubre el texto principal
   de navegación/portada/secciones vía atributos data-i18n; el catálogo de
   cartas y el resto de textos siguen solo en español. Para traducir un
   texto nuevo: añade data-i18n="clave" en el HTML y "clave" en ambos
   diccionarios de abajo. */

const TRANSLATIONS = {
  es: {
    navInicio: "Inicio",
    navCartas: "Cartas",
    navEventos: "Eventos",
    navComunidad: "Comunidad",
    heroEyebrow: "Temporada 2026",
    heroTitle: 'La colección definitiva<br>de <span>Megacracks 2026</span>',
    heroSubtitle: "Encuentra tus cartas favoritas, añádelas al carrito y paga de forma segura. Descubre también nuestros eventos online y únete a una comunidad de coleccionistas con cartas del Mundial 2026 y más.",
    heroBtnCartas: "Ver cartas",
    heroBtnComunidad: "Únete a la comunidad",
    cartasEyebrow: "Catálogo",
    cartasTitle: "Nuestras cartas",
    eventosEyebrow: "Eventos",
    eventosTitle: "Eventos online",
    comunidadEyebrow: "Comunidad",
    comunidadTitle: "Habla con otros coleccionistas",
    footerTagline: "Cartas Megacracks 2026 y colecciones futuras",
    footerLegal: "Aviso legal",
  },
  en: {
    navInicio: "Home",
    navCartas: "Cards",
    navEventos: "Events",
    navComunidad: "Community",
    heroEyebrow: "2026 Season",
    heroTitle: 'The definitive<br><span>Megacracks 2026</span> collection',
    heroSubtitle: "Find your favorite cards, add them to your cart and pay securely. Discover our online events too and join a community of collectors with World Cup 2026 cards and more.",
    heroBtnCartas: "View cards",
    heroBtnComunidad: "Join the community",
    cartasEyebrow: "Catalog",
    cartasTitle: "Our cards",
    eventosEyebrow: "Events",
    eventosTitle: "Online events",
    comunidadEyebrow: "Community",
    comunidadTitle: "Talk with other collectors",
    footerTagline: "Megacracks 2026 cards and future collections",
    footerLegal: "Legal notice",
  },
};

const LANG_KEY = "vwc_lang";

function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  const select = document.getElementById("langSelect");
  if (select) select.value = lang;
}

function initI18n() {
  const saved = localStorage.getItem(LANG_KEY) || "es";
  applyLanguage(saved);

  const select = document.getElementById("langSelect");
  if (select) {
    select.addEventListener("change", () => {
      localStorage.setItem(LANG_KEY, select.value);
      applyLanguage(select.value);
    });
  }
}

document.addEventListener("DOMContentLoaded", initI18n);
