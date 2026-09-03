const CARDS = [
  // Mundial 2026 (stickers "Extra Sticker" FIFA World Cup 26, selecciones nacionales)
  { id: "mgk-001", category: "mundial", name: "Moisés Caicedo — Ecuador", description: "Sticker Extra FIFA World Cup 26 · Selección de Ecuador.", price: 6, img: "images/cards/mgk-001.png" },
  { id: "mgk-002", category: "mundial", name: "Raúl Jiménez — México", description: "Sticker Extra FIFA World Cup 26 · Selección de México.", price: 6, img: "images/cards/mgk-002.png" },
  { id: "mgk-027", category: "mundial", name: "Cristiano Ronaldo — Portugal", description: "Sticker Extra FIFA World Cup 26 · Selección de Portugal.", price: 15, img: "images/cards/mgk-027.png" },
  { id: "mgk-050", category: "mundial", name: "Luka Modrić — Croacia", description: "Sticker Extra FIFA World Cup 26 · Selección de Croacia.", price: 10, img: "images/cards/mgk-050.png" },
  { id: "mgk-082", category: "mundial", name: "Luka Modrić — Croacia (variante)", description: "Sticker Extra FIFA World Cup 26 · Selección de Croacia.", price: 10, img: "images/cards/mgk-082.png" },
  { id: "mgk-076", category: "mundial", name: "Alphonso Davies — Canadá", description: "Sticker Extra FIFA World Cup 26 · Selección de Canadá.", price: 7, img: "images/cards/mgk-076.png" },
  { id: "mgk-092", category: "mundial", name: "Kevin De Bruyne — Bélgica", description: "Sticker Extra FIFA World Cup 26 · Selección de Bélgica.", price: 8, img: "images/cards/mgk-092.png" },
  { id: "mgk-094", category: "mundial", name: "Cody Gakpo — Países Bajos", description: "Sticker Extra FIFA World Cup 26 · Selección de Países Bajos.", price: 7, img: "images/cards/mgk-094.png" },

  // Megacracks 2026 (MGK 2025/26, LaLiga)
  { id: "mgk-003", category: "megacracks", name: "Etta Eyong — Nuevo Fichaje", description: "Carta Nuevo Fichaje · FC Barcelona.", price: 8, img: "images/cards/mgk-003.png" },
  { id: "mgk-006", category: "megacracks", name: "Nico Williams — Special One Gold", description: "Inserto dorado Special One · Athletic Club.", price: 22, img: "images/cards/mgk-006.png" },
  { id: "mgk-007", category: "megacracks", name: "Cazorla — Élite", description: "Inserto Élite MGK 2025/26.", price: 20, img: "images/cards/mgk-007.png" },
  { id: "mgk-010", category: "megacracks", name: "Rashford — Nuevo Fichaje", description: "Carta Nuevo Fichaje · FC Barcelona.", price: 9, img: "images/cards/mgk-010.png" },
  { id: "mgk-015", category: "megacracks", name: "Mastantuono — Top Fichaje Edición Limitada", description: "Inserto Top Fichaje Edición Limitada · Real Madrid.", price: 30, img: "images/cards/mgk-015.png" },
  { id: "mgk-016", category: "megacracks", name: "Mastantuono — Nuevo Fichaje", description: "Carta Nuevo Fichaje · Real Madrid.", price: 9, img: "images/cards/mgk-016.png" },
  { id: "mgk-019", category: "megacracks", name: "Pedri — Special One Gold", description: "Inserto dorado Special One · FC Barcelona.", price: 22, img: "images/cards/mgk-019.png" },
  { id: "mgk-020", category: "megacracks", name: "Bardghji — Nuevo Fichaje", description: "Carta Nuevo Fichaje · FC Barcelona.", price: 8, img: "images/cards/mgk-020.png" },
  { id: "mgk-021", category: "megacracks", name: "Cubarsí — Nuevo Fichaje", description: "Carta Nuevo Fichaje · FC Barcelona.", price: 8, img: "images/cards/mgk-021.png" },
  { id: "mgk-022", category: "megacracks", name: "Joan García — Zona VIP Power", description: "Inserto Zona VIP Power #13 · FC Barcelona.", price: 18, img: "images/cards/mgk-022.png" },
  { id: "mgk-024", category: "megacracks", name: "Rashford — Vértigo", description: "Inserto Vértigo · FC Barcelona.", price: 16, img: "images/cards/mgk-024.png" },
  { id: "mgk-025", category: "megacracks", name: "FlashBack — Atlético de Madrid", description: "Inserto FlashBack \"Parecidos más que razonables\" · Atlético de Madrid.", price: 14, img: "images/cards/mgk-025.png" },
  { id: "mgk-029", category: "megacracks", name: "Raphinha — Special One Black", description: "Inserto Special One Black · FC Barcelona.", price: 20, img: "images/cards/mgk-029.png" },
  { id: "mgk-031", category: "megacracks", name: "Joan García — Nuevo Fichaje", description: "Carta Nuevo Fichaje · FC Barcelona.", price: 8, img: "images/cards/mgk-031.png" },
  { id: "mgk-043", category: "megacracks", name: "Dro", description: "Carta MGK 2025/26 · FC Barcelona.", price: 8, img: "images/cards/mgk-043.png" },
  { id: "mgk-044", category: "megacracks", name: "Gerard Martín", description: "Carta MGK 2025/26 · FC Barcelona.", price: 8, img: "images/cards/mgk-044.png" },
  { id: "mgk-047", category: "megacracks", name: "Rashford — Vértigo Power", description: "Inserto Vértigo Power · FC Barcelona.", price: 18, img: "images/cards/mgk-047.png" },
  { id: "mgk-048", category: "megacracks", name: "Gavi — Special One Black", description: "Inserto Special One Black · FC Barcelona.", price: 20, img: "images/cards/mgk-048.png" },
  { id: "mgk-054", category: "megacracks", name: "Víctor Muñoz — Vértigo Power", description: "Inserto Vértigo Power · FC Barcelona.", price: 18, img: "images/cards/mgk-054.png" },
  { id: "mgk-056", category: "megacracks", name: "FlashBack Anthology — delanteros leyenda", description: "Inserto FlashBack Anthology · Real Madrid.", price: 14, img: "images/cards/mgk-056.png" },
  { id: "mgk-060", category: "megacracks", name: "Carreras — Vértigo", description: "Inserto Vértigo · Real Madrid.", price: 16, img: "images/cards/mgk-060.png" },
  { id: "mgk-062", category: "megacracks", name: "Cazorla — Élite \"Mago al cuadrado\"", description: "Inserto Élite #507.", price: 20, img: "images/cards/mgk-062.png" },
  { id: "mgk-064", category: "megacracks", name: "Carreras — Vértigo Power", description: "Inserto Vértigo Power · Real Madrid.", price: 18, img: "images/cards/mgk-064.png" },
  { id: "mgk-065", category: "megacracks", name: "Víctor Muñoz — Vértigo", description: "Inserto Vértigo · FC Barcelona.", price: 16, img: "images/cards/mgk-065.png" },
  { id: "mgk-066", category: "megacracks", name: "FlashBack — Ronaldinho · Raphinha", description: "Inserto FlashBack \"Parecidos más que razonables\" · FC Barcelona.", price: 16, img: "images/cards/mgk-066.png" },
  { id: "mgk-072", category: "megacracks", name: "Mbappé — Special One Gold", description: "Inserto dorado Special One · Real Madrid.", price: 24, img: "images/cards/mgk-072.png" },
  { id: "mgk-077", category: "megacracks", name: "Mastantuono — Special One Black", description: "Inserto Special One Black · Real Madrid.", price: 20, img: "images/cards/mgk-077.png" },
  { id: "mgk-079", category: "megacracks", name: "Fermín", description: "Carta MGK 2025/26 · FC Barcelona.", price: 8, img: "images/cards/mgk-079.png" },
  { id: "mgk-080", category: "megacracks", name: "Rashford — Special One Black", description: "Inserto Special One Black · FC Barcelona.", price: 20, img: "images/cards/mgk-080.png" },
  { id: "mgk-083", category: "megacracks", name: "Mbappé — Élite", description: "Inserto Élite · Real Madrid.", price: 20, img: "images/cards/mgk-083.png" },
  { id: "mgk-088", category: "megacracks", name: "FlashBack — Benzema · Mbappé", description: "Inserto FlashBack · Real Madrid.", price: 16, img: "images/cards/mgk-088.png" },
  { id: "mgk-090", category: "megacracks", name: "Trent Alexander-Arnold — Nuevo Fichaje", description: "Carta Nuevo Fichaje · Real Madrid.", price: 9, img: "images/cards/mgk-090.png" },
  { id: "mgk-093", category: "megacracks", name: "FlashBack — Xavi · Pedri", description: "Inserto FlashBack \"Parecidos más que razonables\" · FC Barcelona.", price: 14, img: "images/cards/mgk-093.png" },
  { id: "mgk-097", category: "megacracks", name: "FlashBack — Jordi Alba · Balde", description: "Inserto FlashBack · FC Barcelona.", price: 14, img: "images/cards/mgk-097.png" },
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
          <span class="card-price">${formatPrice(card.price)}</span>
          <button class="card-buy" type="button" data-id="${card.id}">Añadir</button>
        </div>
      </div>
    </article>
  `;
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
});
