/* Inscripciones a eventos — el formulario del panel "Apuntarme" no tiene
   backend propio: al enviarlo se abre el cliente de correo del visitante
   con un email ya redactado a la dirección de abajo, lista para enviar. */

const EVENT_SIGNUP_EMAIL = "vwhitecollections@gmail.com";

function openEventDrawer(eventName) {
  document.getElementById("eventFormEventName").textContent = `Evento: ${eventName}`;
  document.getElementById("eventForm").dataset.event = eventName;
  const drawer = document.getElementById("eventDrawer");
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  showOverlay();
}

function closeEventDrawer() {
  const drawer = document.getElementById("eventDrawer");
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  hideOverlay();
}

function initEventSignup() {
  document.querySelectorAll(".event-signup-btn").forEach(btn => {
    btn.addEventListener("click", () => openEventDrawer(btn.dataset.event));
  });

  document.getElementById("eventCloseBtn").addEventListener("click", closeEventDrawer);

  document.getElementById("overlay").addEventListener("click", () => {
    if (document.getElementById("eventDrawer").classList.contains("is-open")) {
      closeEventDrawer();
    }
  });

  document.getElementById("eventForm").addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const eventName = form.dataset.event || "";
    const nombre = form.nombre.value.trim();
    const contacto = form.contacto.value.trim();
    const observaciones = form.observaciones.value.trim();

    const subject = `Inscripción evento: ${eventName}`;
    const body =
      `Evento: ${eventName}\n` +
      `Nombre: ${nombre}\n` +
      `Contacto: ${contacto}\n` +
      `Observaciones: ${observaciones || "—"}`;

    window.location.href =
      `mailto:${EVENT_SIGNUP_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    form.reset();
    closeEventDrawer();
  });
}

document.addEventListener("DOMContentLoaded", initEventSignup);
