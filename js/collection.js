/* "Mis colecciones": cada usuario autenticado puede añadir sus propias
   cartas (imagen + nombre + descripción) a su perfil. Se guardan en
   Firestore bajo users/{uid}/cards, con reglas de seguridad que solo
   permiten a cada usuario leer/escribir sus propios documentos:

   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/cards/{cardId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }

   Las imágenes se redimensionan y comprimen en el navegador y se guardan
   como texto base64 dentro del propio documento (no se usa Firebase
   Storage, que en proyectos nuevos requiere activar el plan de pago
   Blaze aunque el uso se mantenga en el nivel gratuito). Esto limita el
   tamaño/calidad de imagen razonablemente por el límite de 1&nbsp;MB por
   documento de Firestore. */

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { db, auth } from "./firebase-config.js";

const MAX_IMAGE_DIMENSION = 800;
const MAX_IMAGE_CHARS = 900000; // ~900 KB en base64, deja margen bajo el límite de 1 MB/documento

function userCardsRef() {
  return collection(db, "users", auth.currentUser.uid, "cards");
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("El archivo no es una imagen válida."));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > MAX_IMAGE_DIMENSION) {
          height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
          width = MAX_IMAGE_DIMENSION;
        } else if (height > MAX_IMAGE_DIMENSION) {
          width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
          height = MAX_IMAGE_DIMENSION;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function showCollectionError(message) {
  const el = document.getElementById("collectionError");
  el.textContent = message;
  el.hidden = false;
}

function clearCollectionError() {
  document.getElementById("collectionError").hidden = true;
}

function showCollectionForm() {
  document.getElementById("collectionForm").hidden = false;
  document.getElementById("addCollectionItemBtn").hidden = true;
}

function hideCollectionForm() {
  const form = document.getElementById("collectionForm");
  form.hidden = true;
  form.reset();
  document.getElementById("collectionPreview").hidden = true;
  document.getElementById("addCollectionItemBtn").hidden = false;
  clearCollectionError();
}

function cardTemplate(id, data) {
  const card = document.createElement("article");
  card.className = "collection-card";

  const img = document.createElement("img");
  img.src = data.imagen;
  img.alt = data.nombre;

  const body = document.createElement("div");
  body.className = "collection-card-body";

  const title = document.createElement("h5");
  title.textContent = data.nombre;

  const desc = document.createElement("p");
  desc.textContent = data.descripcion || "";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "collection-delete-btn";
  deleteBtn.dataset.id = id;
  deleteBtn.textContent = "Eliminar";

  body.append(title, desc, deleteBtn);
  card.append(img, body);
  return card;
}

export async function renderMyCollection() {
  const grid = document.getElementById("collectionGrid");
  const empty = document.getElementById("collectionEmpty");
  if (!auth.currentUser) return;

  grid.innerHTML = "";
  const snap = await getDocs(query(userCardsRef(), orderBy("creadoEn", "desc")));

  if (snap.empty) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  snap.forEach(docSnap => {
    grid.appendChild(cardTemplate(docSnap.id, docSnap.data()));
  });

  grid.querySelectorAll(".collection-delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "cards", btn.dataset.id));
      renderMyCollection();
    });
  });
}

export function clearCollectionUI() {
  document.getElementById("collectionGrid").innerHTML = "";
  document.getElementById("collectionEmpty").hidden = true;
  hideCollectionForm();
}

function initCollectionForm() {
  document.getElementById("addCollectionItemBtn").addEventListener("click", showCollectionForm);
  document.getElementById("cancelCollectionItemBtn").addEventListener("click", hideCollectionForm);

  document.getElementById("collectionImageInput").addEventListener("change", e => {
    const file = e.target.files[0];
    const preview = document.getElementById("collectionPreview");
    if (!file) {
      preview.hidden = true;
      return;
    }
    preview.src = URL.createObjectURL(file);
    preview.hidden = false;
  });

  document.getElementById("collectionForm").addEventListener("submit", async e => {
    e.preventDefault();
    clearCollectionError();
    const file = document.getElementById("collectionImageInput").files[0];
    const nombre = document.getElementById("collectionNameInput").value.trim();
    const descripcion = document.getElementById("collectionDescInput").value.trim();
    const submitBtn = e.target.querySelector("button[type=submit]");

    if (!file) {
      showCollectionError("Selecciona una imagen.");
      return;
    }

    submitBtn.disabled = true;
    try {
      const imagen = await compressImage(file);
      if (imagen.length > MAX_IMAGE_CHARS) {
        showCollectionError("La imagen es demasiado grande incluso tras comprimirla. Prueba con otra foto.");
        return;
      }
      await addDoc(userCardsRef(), { nombre, descripcion, imagen, creadoEn: serverTimestamp() });
      hideCollectionForm();
      renderMyCollection();
    } catch (err) {
      showCollectionError(err.message || "No se pudo guardar la carta. Inténtalo de nuevo.");
    } finally {
      submitBtn.disabled = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", initCollectionForm);
