/* Registro / inicio de sesión de usuarios vía Firebase Authentication,
   y modal de perfil (datos de cuenta, configuración, mis colecciones,
   aviso legal) para usuarios que han iniciado sesión.

   Antes de que esto funcione hay que:
   1. Crear un proyecto gratuito en https://console.firebase.google.com
   2. Dentro del proyecto: Authentication → Sign-in method → activar "Correo
      electrónico/contraseña".
   3. Añadir una app web al proyecto (icono </>) y copiar el objeto de
      configuración en js/firebase-config.js. */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "./firebase-config.js";
import { renderMyCollection, clearCollectionUI } from "./collection.js";

const AUTH_ERRORS = {
  "auth/email-already-in-use": "Ese email ya tiene una cuenta creada.",
  "auth/invalid-email": "El email no es válido.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/user-not-found": "No existe ninguna cuenta con ese email.",
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/invalid-credential": "Email o contraseña incorrectos.",
  "auth/too-many-requests": "Demasiados intentos. Inténtalo más tarde.",
};

function authErrorMessage(code) {
  return AUTH_ERRORS[code] || "Ha ocurrido un error. Inténtalo de nuevo.";
}

function showAuthError(el, message) {
  el.textContent = message;
  el.hidden = false;
}

function clearAuthErrors() {
  document.getElementById("loginError").hidden = true;
  document.getElementById("registerError").hidden = true;
}

/* Panel de login / registro (usuario no autenticado) */

function openAuthDrawer() {
  const drawer = document.getElementById("authDrawer");
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  showOverlay();
}

function closeAuthDrawer() {
  const drawer = document.getElementById("authDrawer");
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  hideOverlay();
}

function switchAuthTab(tab) {
  document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("is-active"));
  document.querySelector(`.auth-tab[data-auth="${tab}"]`).classList.add("is-active");
  document.getElementById("loginForm").hidden = tab !== "login";
  document.getElementById("registerForm").hidden = tab !== "register";
  clearAuthErrors();
}

/* Modal de perfil (usuario autenticado) */

function openProfileModal() {
  const modal = document.getElementById("profileModal");
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  showOverlay();
}

function closeProfileModal() {
  const modal = document.getElementById("profileModal");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  hideOverlay();
}

function switchProfileTab(tab) {
  document.querySelectorAll(".profile-nav-btn[data-tab]").forEach(b => b.classList.remove("is-active"));
  document.querySelector(`.profile-nav-btn[data-tab="${tab}"]`).classList.add("is-active");
  document.querySelectorAll(".profile-tab").forEach(panel => {
    panel.hidden = panel.dataset.tabPanel !== tab;
  });
  if (tab === "colecciones") renderMyCollection();
}

function openLegalModal() {
  const modal = document.getElementById("legalModal");
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  showOverlay();
}

function closeLegalModal() {
  const modal = document.getElementById("legalModal");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  hideOverlay();
}

function fillAccountData(user) {
  document.getElementById("accountNameInput").value = user.displayName || "";
  document.getElementById("accountEmailInput").value = user.email || "";
  document.getElementById("accountSaveNote").hidden = true;
}

function updateAccountUI(user) {
  const label = document.getElementById("accountLabel");

  if (user) {
    label.textContent = user.displayName || user.email.split("@")[0];
    fillAccountData(user);
  } else {
    label.textContent = "Cuenta";
    closeProfileModal();
    clearCollectionUI();
    switchAuthTab("login");
  }
}

function initAuth() {
  document.getElementById("accountBtn").addEventListener("click", () => {
    if (auth.currentUser) {
      openProfileModal();
    } else {
      openAuthDrawer();
    }
  });

  document.getElementById("authCloseBtn").addEventListener("click", closeAuthDrawer);
  document.getElementById("profileCloseBtn").addEventListener("click", closeProfileModal);
  document.getElementById("legalCloseBtn").addEventListener("click", closeLegalModal);

  document.getElementById("overlay").addEventListener("click", () => {
    if (document.getElementById("authDrawer").classList.contains("is-open")) closeAuthDrawer();
    if (!document.getElementById("profileModal").hidden) closeProfileModal();
    if (!document.getElementById("legalModal").hidden) closeLegalModal();
  });

  document.querySelectorAll(".auth-tab").forEach(tab => {
    tab.addEventListener("click", () => switchAuthTab(tab.dataset.auth));
  });

  document.querySelectorAll(".profile-nav-btn[data-tab]").forEach(btn => {
    btn.addEventListener("click", () => switchProfileTab(btn.dataset.tab));
  });

  document.querySelectorAll("[data-open-legal]").forEach(btn => {
    btn.addEventListener("click", openLegalModal);
  });

  document.getElementById("loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    clearAuthErrors();
    const form = e.target;
    try {
      await signInWithEmailAndPassword(auth, form.email.value.trim(), form.password.value);
      form.reset();
      closeAuthDrawer();
    } catch (err) {
      showAuthError(document.getElementById("loginError"), authErrorMessage(err.code));
    }
  });

  document.getElementById("registerForm").addEventListener("submit", async e => {
    e.preventDefault();
    clearAuthErrors();
    const form = e.target;
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email.value.trim(), form.password.value);
      await updateProfile(cred.user, { displayName: form.nombre.value.trim() });
      updateAccountUI(cred.user);
      form.reset();
      closeAuthDrawer();
    } catch (err) {
      showAuthError(document.getElementById("registerError"), authErrorMessage(err.code));
    }
  });

  document.getElementById("accountDataForm").addEventListener("submit", async e => {
    e.preventDefault();
    const nombre = document.getElementById("accountNameInput").value.trim();
    await updateProfile(auth.currentUser, { displayName: nombre });
    document.getElementById("accountLabel").textContent = nombre || auth.currentUser.email.split("@")[0];
    document.getElementById("accountSaveNote").hidden = false;
  });

  document.getElementById("profileLogoutBtn").addEventListener("click", () => signOut(auth));

  onAuthStateChanged(auth, updateAccountUI);
}

document.addEventListener("DOMContentLoaded", initAuth);
