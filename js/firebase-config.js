/* Configuración e inicialización compartida de Firebase, usada por
   js/auth.js y js/collection.js. Ver cabecera de js/auth.js para los
   pasos de configuración en Firebase Console. */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaFRCYmVDtviHyqAhGffXzfzSLpuaQTFA",
  authDomain: "mi-app-firebase-7e385.firebaseapp.com",
  projectId: "mi-app-firebase-7e385",
  storageBucket: "mi-app-firebase-7e385.firebasestorage.app",
  messagingSenderId: "728955656373",
  appId: "1:728955656373:web:a70c6650eefccd6e2986fc",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
