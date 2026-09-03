const CARDS = [
  // Mundial 2026 (stickers "Extra Sticker" FIFA World Cup 26, selecciones nacionales)
  { id: "mgk-001", category: "mundial", name: "Moisés Caicedo — Ecuador", description: "Sticker Extra FIFA World Cup 26 · Selección de Ecuador.", price: 6, img: "images/cards/mgk-001.png", priceUngraded: "$1–5 estimado", pricePSA: "Próximamente" },
  { id: "mgk-002", category: "mundial", name: "Raúl Jiménez — México", description: "Sticker Extra FIFA World Cup 26 · Selección de México.", price: 6, img: "images/cards/mgk-002.png", priceUngraded: "$1–5 estimado", pricePSA: "Próximamente" },
  { id: "mgk-027", category: "mundial", name: "Cristiano Ronaldo — Portugal", description: "Sticker Extra FIFA World Cup 26 · Selección de Portugal.", price: 15, img: "images/cards/mgk-027.png", priceUngraded: "≈$100 (dato con reservas, muy poco volumen de venta)", pricePSA: "PSA 9: ≈$100 (dato poco fiable, solo 1 venta al año)" },
  { id: "mgk-050", category: "mundial", name: "Luka Modrić — Croacia", description: "Sticker Extra FIFA World Cup 26 · Selección de Croacia.", price: 10, img: "images/cards/mgk-050.png", priceUngraded: "$8,34 (dato real, paralelo Gold)", pricePSA: "Próximamente" },
  { id: "mgk-076", category: "mundial", name: "Alphonso Davies — Canadá", description: "Sticker Extra FIFA World Cup 26 · Selección de Canadá.", price: 7, img: "images/cards/mgk-076.png", priceUngraded: "$1,25 (dato real)", pricePSA: "PSA 9: $16,73 (paralelo Bronze) · PSA 10: $21,62 (paralelo Gold)" },
  { id: "mgk-094", category: "mundial", name: "Cody Gakpo — Países Bajos", description: "Sticker Extra FIFA World Cup 26 · Selección de Países Bajos.", price: 7, img: "images/cards/mgk-094.png", priceUngraded: "$1–5 estimado", pricePSA: "Próximamente" },

  // Megacracks 2026 (MGK 2025/26, LaLiga)
  { id: "mgk-003", category: "megacracks", name: "Etta Eyong — Nuevo Fichaje", description: "Carta Nuevo Fichaje · FC Barcelona.", price: 8, img: "images/cards/mgk-003.png", priceUngraded: "€1–2 estimado", pricePSA: "Próximamente" },
  { id: "mgk-006", category: "megacracks", name: "Nico Williams — Special One Gold", description: "Inserto dorado Special One · Athletic Club.", price: 22, img: "images/cards/mgk-006.png", priceUngraded: "€10–20 (ancla real: 14,99€)", pricePSA: "Próximamente" },
  { id: "mgk-007", category: "megacracks", name: "Cazorla — Élite Power", description: "Inserto Élite Power (P507) · Real Oviedo.", price: 20, img: "images/cards/mgk-007.png", priceUngraded: "€10–20 (ancla real: 19,99€)", pricePSA: "Próximamente" },
  { id: "mgk-010", category: "megacracks", name: "Rashford — Nuevo Fichaje", description: "Carta Nuevo Fichaje · FC Barcelona.", price: 9, img: "images/cards/mgk-010.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-015", category: "megacracks", name: "Mastantuono — Top Fichaje Edición Limitada", description: "Inserto Top Fichaje Edición Limitada · Real Madrid.", price: 30, img: "images/cards/mgk-015.png", priceUngraded: "€9,99 (dato real)", pricePSA: "Próximamente" },
  { id: "mgk-016", category: "megacracks", name: "Mastantuono — Nuevo Fichaje", description: "Carta Nuevo Fichaje · Real Madrid.", price: 9, img: "images/cards/mgk-016.png", priceUngraded: "€2–5 estimado", pricePSA: "Próximamente" },
  { id: "mgk-019", category: "megacracks", name: "Pedri — Special One Gold", description: "Inserto dorado Special One · FC Barcelona.", price: 22, img: "images/cards/mgk-019.png", priceUngraded: "€5–20 estimado (venta reciente confirmada)", pricePSA: "Próximamente" },
  { id: "mgk-020", category: "megacracks", name: "Bardghji — Nuevo Fichaje", description: "Carta Nuevo Fichaje · FC Barcelona.", price: 8, img: "images/cards/mgk-020.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-021", category: "megacracks", name: "Cubarsí — Top Revelación Edición Limitada", description: "Inserto Top Revelación Edición Limitada · FC Barcelona.", price: 8, img: "images/cards/mgk-021.png", priceUngraded: "€1,49 (dato real)", pricePSA: "Próximamente" },
  { id: "mgk-022", category: "megacracks", name: "Joan García — Zona VIP Power", description: "Inserto Zona VIP Power #13 · FC Barcelona.", price: 18, img: "images/cards/mgk-022.png", priceUngraded: "€1–4 (comparables reales: 0,95–3,88€)", pricePSA: "Próximamente" },
  { id: "mgk-024", category: "megacracks", name: "Rashford — Vértigo", description: "Inserto Vértigo · FC Barcelona.", price: 16, img: "images/cards/mgk-024.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-025", category: "megacracks", name: "FlashBack — Atlético de Madrid", description: "Inserto FlashBack \"Parecidos más que razonables\" · Atlético de Madrid.", price: 14, img: "images/cards/mgk-025.png", priceUngraded: "€2–6 estimado", pricePSA: "Próximamente" },
  { id: "mgk-029", category: "megacracks", name: "Raphinha — Special One Black", description: "Inserto Special One Black · FC Barcelona.", price: 20, img: "images/cards/mgk-029.png", priceUngraded: "€5 (dato real)", pricePSA: "Próximamente" },
  { id: "mgk-031", category: "megacracks", name: "Joan García — Nuevo Fichaje", description: "Carta Nuevo Fichaje · FC Barcelona.", price: 8, img: "images/cards/mgk-031.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-043", category: "megacracks", name: "Dro", description: "Carta MGK 2025/26 · FC Barcelona.", price: 8, img: "images/cards/mgk-043.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-044", category: "megacracks", name: "Gerard Martín", description: "Carta MGK 2025/26 · FC Barcelona.", price: 8, img: "images/cards/mgk-044.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-047", category: "megacracks", name: "Rashford — Vértigo Power", description: "Inserto Vértigo Power · FC Barcelona.", price: 18, img: "images/cards/mgk-047.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-048", category: "megacracks", name: "Gavi — Special One Black", description: "Inserto Special One Black · FC Barcelona.", price: 20, img: "images/cards/mgk-048.png", priceUngraded: "€4–9,99 (dato real, varios anuncios)", pricePSA: "Próximamente" },
  { id: "mgk-054", category: "megacracks", name: "Víctor Muñoz — Vértigo Power", description: "Inserto Vértigo Power · FC Barcelona.", price: 18, img: "images/cards/mgk-054.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-056", category: "megacracks", name: "FlashBack Anthology — delanteros leyenda", description: "Inserto FlashBack Anthology · Real Madrid.", price: 14, img: "images/cards/mgk-056.png", priceUngraded: "€5 (dato real)", pricePSA: "Próximamente" },
  { id: "mgk-060", category: "megacracks", name: "Carreras — Vértigo", description: "Inserto Vértigo · Real Madrid.", price: 16, img: "images/cards/mgk-060.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-064", category: "megacracks", name: "Carreras — Vértigo Power", description: "Inserto Vértigo Power · Real Madrid.", price: 18, img: "images/cards/mgk-064.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-065", category: "megacracks", name: "Víctor Muñoz — Vértigo", description: "Inserto Vértigo · FC Barcelona.", price: 16, img: "images/cards/mgk-065.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-066", category: "megacracks", name: "FlashBack — Ronaldinho · Raphinha", description: "Inserto FlashBack \"Parecidos más que razonables\" · FC Barcelona.", price: 16, img: "images/cards/mgk-066.png", priceUngraded: "€4 (dato real)", pricePSA: "Próximamente" },
  { id: "mgk-072", category: "megacracks", name: "Mbappé — Special One Gold", description: "Inserto dorado Special One · Real Madrid.", price: 24, img: "images/cards/mgk-072.png", priceUngraded: "€15–25 estimado (venta comparable 5–20€ + demanda alta)", pricePSA: "PSA 9: $72 (venta 09/03/2026) · PSA 10: $85 (venta 30/04/2026, población 1/8)" },
  { id: "mgk-077", category: "megacracks", name: "Mastantuono — Special One Black", description: "Inserto Special One Black · Real Madrid.", price: 20, img: "images/cards/mgk-077.png", priceUngraded: "€5–15 estimado", pricePSA: "Próximamente" },
  { id: "mgk-079", category: "megacracks", name: "Fermín", description: "Carta MGK 2025/26 · FC Barcelona.", price: 8, img: "images/cards/mgk-079.png", priceUngraded: "€1–3 estimado", pricePSA: "Próximamente" },
  { id: "mgk-080", category: "megacracks", name: "Rashford — Special One Black", description: "Inserto Special One Black · FC Barcelona.", price: 20, img: "images/cards/mgk-080.png", priceUngraded: "€4–10 estimado", pricePSA: "Próximamente" },
  { id: "mgk-083", category: "megacracks", name: "Mbappé — Élite", description: "Inserto Élite · Real Madrid.", price: 20, img: "images/cards/mgk-083.png", priceUngraded: "€5 (dato real)", pricePSA: "Próximamente" },
  { id: "mgk-088", category: "megacracks", name: "FlashBack — Benzema · Mbappé", description: "Inserto FlashBack · Real Madrid.", price: 16, img: "images/cards/mgk-088.png", priceUngraded: "€4–6 estimado", pricePSA: "Próximamente" },
  { id: "mgk-090", category: "megacracks", name: "Trent Alexander-Arnold — Nuevo Fichaje", description: "Carta Nuevo Fichaje · Real Madrid.", price: 9, img: "images/cards/mgk-090.png", priceUngraded: "€2–5 estimado", pricePSA: "Próximamente" },
  { id: "mgk-093", category: "megacracks", name: "FlashBack — Xavi · Pedri", description: "Inserto FlashBack \"Parecidos más que razonables\" · FC Barcelona.", price: 14, img: "images/cards/mgk-093.png", priceUngraded: "€4–6 estimado", pricePSA: "Próximamente" },
  { id: "mgk-097", category: "megacracks", name: "FlashBack — Jordi Alba · Balde", description: "Inserto FlashBack · FC Barcelona.", price: 14, img: "images/cards/mgk-097.png", priceUngraded: "€3–5 estimado", pricePSA: "Próximamente" },

  // Otras colecciones (Panini Calciatori 2025/26, Serie A — no son de Megacracks ni del Mundial)
  { id: "mgk-082", category: "otras", name: "Luka Modrić — AC Milan", description: "Sticker Panini Calciatori 2025/26 · Serie A · AC Milan #322.", price: 10, img: "images/cards/mgk-082.png", priceUngraded: "$1,87 (dato real)", pricePSA: "Próximamente" },
  { id: "mgk-092", category: "otras", name: "Kevin De Bruyne — Nápoles", description: "Sticker Panini Calciatori 2025/26 · Serie A · Nápoles #26.", price: 8, img: "images/cards/mgk-092.png", priceUngraded: "$1–3 estimado", pricePSA: "Próximamente" },
];

const CART_STORAGE_KEY = "vwc_cart";
let cart = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function formatPrice(n) {
  return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

function renderCards(filter) {
  const grid = document.getElementById("cardsGrid");
  const emptyState = document.getElementById("emptyState");
  const items = CARDS.filter(c => c.category === filter);

  grid.innerHTML = items.map(cardTemplate).join("");
  emptyState.hidden = items.length > 0;

  attachCardTiltHandlers();
  grid.querySelectorAll(".card-buy").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.id));
  });
  grid.querySelectorAll(".card-info-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      openPriceModal(btn.dataset.id);
    });
  });
}

function cardTemplate(card) {
  const media = card.img
    ? `<img src="${card.img}" alt="${card.name}" loading="lazy">`
    : `<div class="card-placeholder"><span>Imagen próximamente</span></div>`;

  return `
    <article class="card">
      <div class="card-media">
        ${media}
        <div class="card-shine"></div>
      </div>
      <div class="card-body">
        <h3 class="card-name">${card.name}</h3>
        <p class="card-desc">${card.description}</p>
        <div class="card-footer">
          <button class="card-info-btn" type="button" data-id="${card.id}" aria-haspopup="dialog" aria-controls="priceModal">Valoración</button>
          <button class="card-buy" type="button" data-id="${card.id}">Añadir</button>
        </div>
      </div>
    </article>
  `;
}

/* Modal de valoración de mercado (precio sin gradear / PSA) */

function openPriceModal(cardId) {
  const card = CARDS.find(c => c.id === cardId);
  if (!card) return;

  document.getElementById("priceModalTitle").textContent = card.name;
  document.getElementById("priceModalBody").innerHTML = `
    <p class="price-modal-row"><span>Sin gradear</span><strong>${card.priceUngraded || "Próximamente"}</strong></p>
    <p class="price-modal-row"><span>Gradeado (PSA)</span><strong>${card.pricePSA || "Próximamente"}</strong></p>
    <p class="price-modal-note">Valoración de mercado orientativa (venta entre coleccionistas), no es el precio de venta de VWHITECOLLECTION ni una garantía de cotización futura.</p>
  `;

  const modal = document.getElementById("priceModal");
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  showOverlay();
}

function closePriceModal() {
  const modal = document.getElementById("priceModal");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  hideOverlay();
}

function initPriceModal() {
  document.getElementById("priceCloseBtn").addEventListener("click", closePriceModal);
  document.getElementById("overlay").addEventListener("click", () => {
    if (!document.getElementById("priceModal").hidden) closePriceModal();
  });
}

function attachCardTiltHandlers() {
  const canTilt = window.matchMedia("(pointer: fine)").matches;
  if (!canTilt) return;

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;

      const tiltX = (py - 0.5) * -10;
      const tiltY = (px - 0.5) * 10;

      card.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;

      const media = card.querySelector(".card-media");
      media.style.setProperty("--mx", `${px * 100}%`);
      media.style.setProperty("--my", `${py * 100}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderCards(btn.dataset.filter);
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* Carrito */

function addToCart(cardId) {
  const card = CARDS.find(c => c.id === cardId);
  if (!card) return;

  const existing = cart.find(item => item.id === cardId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: card.id, name: card.name, price: card.price, img: card.img, qty: 1 });
  }
  saveCart();
  renderCart();
  openCart();
}

function changeQty(cardId, delta) {
  const item = cart.find(i => i.id === cardId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== cardId);
  }
  saveCart();
  renderCart();
}

function removeFromCart(cardId) {
  cart = cart.filter(i => i.id !== cardId);
  saveCart();
  renderCart();
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartItemTemplate(item) {
  const media = item.img
    ? `<img src="${item.img}" alt="${item.name}">`
    : "";
  return `
    <div class="cart-item">
      <div class="cart-item-media">${media}</div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Quitar una unidad">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Añadir una unidad">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-action="remove" data-id="${item.id}" aria-label="Eliminar del carrito">&times;</button>
    </div>
  `;
}

function renderCart() {
  const itemsEl = document.getElementById("cartItems");
  const emptyEl = document.getElementById("cartEmpty");
  const totalEl = document.getElementById("cartTotal");
  const countEl = document.getElementById("cartCount");

  itemsEl.innerHTML = cart.map(cartItemTemplate).join("");
  emptyEl.hidden = cart.length > 0;
  totalEl.textContent = formatPrice(cartTotal());

  const count = cartCount();
  countEl.hidden = count === 0;
  countEl.textContent = count;

  itemsEl.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (btn.dataset.action === "inc") changeQty(id, 1);
      if (btn.dataset.action === "dec") changeQty(id, -1);
      if (btn.dataset.action === "remove") removeFromCart(id);
    });
  });
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("is-open");
  showOverlay();
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("is-open");
  hideOverlay();
}

function showOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("is-visible"));
}

function hideOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("is-visible");
  setTimeout(() => { overlay.hidden = true; }, 250);
}

function initCart() {
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
  document.getElementById("overlay").addEventListener("click", () => {
    closeCart();
  });
  renderCart();
}

/* Pasarela de pago — panel desplegable dentro del carrito */

function togglePaymentPanel() {
  if (cart.length === 0) return;
  const panel = document.getElementById("paymentPanel");
  const btn = document.getElementById("checkoutBtn");
  const isOpen = panel.classList.toggle("is-open");
  btn.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    resetPaymentPanel();
  }
}

function resetPaymentPanel() {
  document.getElementById("payConfirmation").hidden = true;
  document.getElementById("payTabs").hidden = false;
  document.querySelectorAll(".pay-panel").forEach(p => p.hidden = true);
  document.getElementById("payPanelPaypal").hidden = false;
  document.querySelectorAll(".pay-tab").forEach(t => t.classList.remove("is-active"));
  document.querySelector('.pay-tab[data-pay="paypal"]').classList.add("is-active");
}

function closePaymentPanel() {
  document.getElementById("paymentPanel").classList.remove("is-open");
  document.getElementById("checkoutBtn").setAttribute("aria-expanded", "false");
}

function initCheckout() {
  document.getElementById("checkoutBtn").addEventListener("click", togglePaymentPanel);

  document.querySelectorAll(".pay-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".pay-tab").forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      document.querySelectorAll(".pay-panel").forEach(p => p.hidden = true);
      document.getElementById(`payPanel${capitalize(tab.dataset.pay)}`).hidden = false;
    });
  });

  document.querySelectorAll(".btn-paypal, .btn-applepay").forEach(btn => {
    btn.addEventListener("click", () => showPayConfirmation());
  });

  document.getElementById("cardForm").addEventListener("submit", e => {
    e.preventDefault();
    showPayConfirmation();
  });

  document.getElementById("payConfirmationCloseBtn").addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
    closePaymentPanel();
    closeCart();
  });
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function showPayConfirmation() {
  document.querySelectorAll(".pay-panel").forEach(p => p.hidden = true);
  document.getElementById("payTabs").hidden = true;
  document.getElementById("payConfirmation").hidden = false;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards("megacracks");
  initFilters();
  initHeaderScroll();
  initNavToggle();
  initReveal();
  initCart();
  initCheckout();
  initPriceModal();
});
