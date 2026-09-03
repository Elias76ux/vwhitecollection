# VWHITECOLLECTION — Web de venta

Proyecto: sitio web de venta (e-commerce) de la colección VWHITECOLLECTION.

Stack técnico: HTML/CSS/JS estático, sin build tools ni frameworks
(`index.html`, `css/styles.css`, `js/script.js`). Elegido para poder ver la
web funcionando de inmediato abriendo `index.html`, sin dependencias.
Si el catálogo crece mucho o se necesita backend real de inventario/pedidos,
revisar esta decisión con `frontend-architect`.

Excepción: `js/auth.js` (login/registro, ver más abajo) se carga como
`<script type="module">` porque usa el SDK de Firebase vía imports ES. Los
navegadores basados en Chromium bloquean por CORS los `type="module"`
servidos desde `file://`, así que **para probar login/registro (no para el
resto de la web) hay que servir la carpeta con un servidor local**, p. ej.
`npx serve` o `python -m http.server` en la raíz del proyecto, y abrir
`http://localhost:PUERTO/` en vez de hacer doble clic en `index.html`.

Pasarela de pago: no decidida a nivel de backend real (evaluar Stripe,
PayPal/Redsys, Mercado Pago u otras según el mercado objetivo). El agente
`ecommerce-payments` debe recomendar la opción más adecuada y documentar la
decisión aquí una vez integrada de verdad. Por ahora el checkout
(PayPal / Tarjeta / Apple Pay) es una maqueta funcional en el frontend
**en modo demostración**: no hay backend ni claves reales conectadas, así
que ningún pago se procesa de verdad. Antes de lanzar a producción hay que:
conectar cuentas reales de PayPal/Stripe/Redsys y Apple Pay Merchant ID,
mover el cálculo/verificación del importe a un backend, y nunca enviar
datos de tarjeta a un servidor propio sin tokenización del proveedor.

## Estado actual de la web

- Sección hero con fondo borgoña profundo (`--primary: #5a1a2c`,
  `--primary-dark: #3a0f1c`, `--primary-darker: #180910`, definidos en
  `:root` de `css/styles.css`) y `--gold: #c9a24d` como acento dorado
  antiguo — paleta tipo casa de subastas/joyería (probado antes un azul
  que el usuario rechazó por no verse lujoso). El texto blanco sobre
  `--primary` mantiene contraste AA (ratio ampliamente >4.5:1: el
  borgoña es lo bastante oscuro). Barrido de brillo animado vía `::before`
  (ver `.hero::before`/`.comunidad::before` en `css/styles.css`) y
  animación de cartas flotantes.
- Logo/wordmark con tipografía Cinzel (antes Anton; cargada vía Google
  Fonts en el `<head>` de `index.html`, variable `--font-display`) y el
  propio icono `images/logo-v.png` (proporcionado por el usuario, no
  generado) haciendo de letra "V" inicial dentro del wordmark —ya no va
  como icono aparte a la izquierda—, seguido de "White" en blanco y
  "Collections" en dorado (ver `.brand-mark`/`.brand-mark-v` en
  `css/styles.css`, aplicado en el header de `index.html`). El PNG es un
  trazo negro sobre fondo transparente; se convierte a blanco puro con
  `filter: brightness(0) invert(1)` más un halo dorado sutil
  (`drop-shadow`) para integrarlo en el fondo oscuro del header.
- Sección "Cartas" con 41 cartas reales en `js/script.js` (array `CARDS`),
  fotografiadas por el usuario con fondo blanco de estudio (carpeta
  `Pictures/`, JPG): 6 en "Mundial 2026" (stickers Extra Sticker FIFA World
  Cup 26 de selecciones), 33 en "Megacracks 2026" (cartas MGK 2025/26,
  varios jugadores/equipos de LaLiga — Barcelona, Real Madrid, Atlético,
  Athletic) y 2 en "Otras colecciones" (stickers Panini Calciatori 2025/26,
  Serie A italiana — ver más abajo). Solo se muestran caras frontales: el
  usuario proporcionó el listado exacto de fotos frontales (carpeta de
  Drive con 51 archivos, sin las fotos de reverso) y con eso se depuraron
  38 cartas que en realidad eran fotos del reverso — varias de ellas sin
  el marcador "(dorso)" en el nombre original, detectado comparando cada
  foto contra ese listado y confirmado visualmente. Sus imágenes se
  borraron de `images/cards/`. El usuario revisó el resto una a una (hoja
  de contacto numerada) y pidió eliminar una carta adicional que sí era
  reverso (mgk-062, "Cazorla — Élite Mago al cuadrado"); las 41 restantes
  quedan confirmadas como frontales. Los precios de venta (`price`, los
  que cobra VWHITECOLLECTION) son estimaciones de ejemplo (marcadas con
  "*" en la web) y deben confirmarse.
- Valoración de mercado por carta: cada carta tiene un botón "i" en la
  imagen que abre `#priceModal` con el precio de mercado sin gradear y
  gradeado (PSA), tomados de `C:\Users\arbaj\Downloads\cartas_valoracion.xlsx`
  (investigación de mercado del usuario, no está en el repo) y guardados
  como texto en los campos `priceUngraded`/`pricePSA` de cada carta en
  `js/script.js`. Es un dato de mercado orientativo, independiente del
  precio de venta (`price`) de la tienda — así se aclara en la nota del
  propio modal. Cuando no hay ventas graded verificables (la mayoría),
  `pricePSA` es "Próximamente"; hay datos PSA reales solo para Mbappé
  Special One Gold (mgk-072) y Alphonso Davies Extra Sticker Gold
  (mgk-076). Al cruzar esa hoja con el catálogo también se corrigieron
  dos identificaciones erróneas: mgk-082 y mgk-092 no son stickers del
  Mundial (estaban mal categorizados como "mundial") sino stickers de
  Panini Calciatori 2025/26 (Serie A) de Modrić en el AC Milan y De
  Bruyne en el Nápoles — se movieron a la categoría "otras" con nombre y
  descripción corregidos; y mgk-021 (Cubarsí) era en realidad un inserto
  "Top Revelación Edición Limitada", no una carta base "Nuevo Fichaje".
- Fotos de cartas: dos flujos en `tools/procesar-cartas.ps1` según el tipo
  de foto de origen (ver cabecera del script para el uso completo):
  - `-Mode whitebg`: para fotos JPG sobre fondo claro/uniforme (como
    `Pictures/`) — recorte automático por color de fondo, sin marcar
    esquinas a mano, deja fondo blanco sólido. Este es el flujo usado para
    el catálogo actual.
  - `-Mode preview` + `-Mode polygon`: para fotos HEIC con fondo no uniforme
    (mesa, etc.) — hay que marcar a mano las 4 esquinas de cada carta en
    `tools/esquinas.json`; deja fondo transparente.
  - `-Mode grid`: junta varias cartas ya procesadas en una hoja de contacto
    numerada, útil para revisar/leer muchas cartas de un vistazo antes de
    catalogarlas.
  - `-Mode transparentbg`: para las 41 imágenes ya procesadas con
    `-Mode whitebg` (carta dentro de su funda protectora, fondo blanco
    sólido) — quita ese fondo blanco dejándolo transparente y recorta
    ajustado a la funda. Usa flood fill desde los bordes de la imagen (no
    un simple umbral de color global) para que solo se vuelva transparente
    el fondo realmente conectado con el exterior, sin tocar blancos
    interiores de la propia carta (bordes de sticker, camisetas blancas,
    texturas de mármol claras, etc.) aunque coincidan en color con el
    fondo. Es el modo usado actualmente para las imágenes de
    `images/cards/`: ya no tienen fondo blanco, solo la funda con la
    carta dentro sobre fondo transparente. `.card-media img` centra cada
    imagen dentro de su recuadro con `object-fit: contain` +
    `object-position: center` en `css/styles.css`.
  Salida final siempre en `images/cards/`.
- Sección "Eventos" con la gala de premios al mejor coleccionista (fecha
  por confirmar) y un evento "Sorteo de cartas exclusivas" marcado como
  "Próximamente" (sin fecha ni botón de inscripción todavía). El botón
  "Apuntarme" de la gala abre un panel lateral con formulario (nombre,
  contacto, observaciones) gestionado por `js/eventos.js`: no hay backend,
  al enviarlo se abre el cliente de correo del visitante con un `mailto:`
  ya redactado hacia `vwhitecollections@gmail.com`.
- Carrito de compra (icono en el header, persistido en `localStorage`) con
  panel de pago **desplegable dentro del propio carrito** (no un modal
  aparte) con pestañas PayPal / Tarjeta / Apple Pay — ver nota de pasarela
  de pago arriba.
- Sección "Comunidad" con enlace de Telegram real
  (`https://t.me/algoritmofutbolistico` en `index.html`).
- Cuenta de usuario: botón "Cuenta" en el header. Si no hay sesión abre un
  panel lateral de login/registro (`js/auth.js`); si hay sesión abre el
  modal de perfil (`#profileModal`) con pestañas:
  - **Datos de la cuenta**: ver/editar nombre y ver email (email no
    editable — cambiarlo requiere reautenticación, no implementado).
  - **Configuración**: selector de idioma ES/EN (`js/i18n.js`, script
    clásico, no módulo). Cubre solo nav/hero/títulos de sección/footer
    vía atributos `data-i18n`; el catálogo de cartas y el resto de textos
    siguen solo en español — para ampliarlo basta con añadir más
    `data-i18n` en el HTML y sus claves en `TRANSLATIONS` dentro del
    archivo.
  - **Mis colecciones**: cada usuario añade sus propias cartas (imagen +
    nombre + descripción) a `js/collection.js`, guardadas en Firestore
    bajo `users/{uid}/cards` — cada usuario solo puede leer/escribir las
    suyas (ver reglas de seguridad en la cabecera de `js/collection.js`).
    Las imágenes se comprimen en el navegador (máx. ~800px, JPEG) y se
    guardan como base64 dentro del propio documento en vez de usar
    Firebase Storage, porque Storage exige activar el plan de pago Blaze
    en proyectos nuevos aunque el uso se mantenga gratuito.
  - Botón "Aviso legal" (también accesible sin sesión desde el footer)
    abre `#legalModal` con el texto legal — **tiene datos entre
    corchetes sin rellenar** (razón social, NIF, domicilio): pendiente de
    que el usuario los proporcione antes de publicar el sitio.
  `firebaseConfig` está centralizado en `js/firebase-config.js` (usado por
  `js/auth.js` y `js/collection.js`), con las claves reales del proyecto
  Firebase del usuario (`mi-app-firebase-7e385`). Pendiente:
  - Activar **Firestore Database** (modo nativo) en Firebase Console y
    pegar las reglas de seguridad de `js/collection.js` — si no, "Mis
    colecciones" no funcionará.
  - El sitio está publicado en GitHub Pages:
    https://elias76ux.github.io/vwhitecollection/ (repo:
    https://github.com/Elias76ux/vwhitecollection, rama `master`).
    Pendiente: añadir `elias76ux.github.io` en Firebase Console →
    Authentication → Settings → Authorized domains (por defecto solo
    `localhost` y `*.firebaseapp.com` están autorizados).
  - Ver nota de servidor local más arriba para poder probar todo esto en
    desarrollo (afecta a `js/auth.js` y `js/collection.js`, no a
    `js/i18n.js`, que sí funciona abriendo `index.html` directamente).

## Equipo de agentes especializados

Este proyecto usa varios subagentes definidos en `.claude/agents/`, cada uno
enfocado en una disciplina distinta de creación de webs profesionales de
venta. Invócalos según la tarea:

| Agente | Cuándo usarlo |
|---|---|
| `web-designer` | Identidad visual, layout, sistema de diseño, jerarquía visual orientada a conversión |
| `ux-interaction` | Microinteracciones, animaciones, flujos de carrito/checkout, accesibilidad |
| `frontend-architect` | Arquitectura de componentes, elección de stack, estado, integración de APIs |
| `ecommerce-payments` | Integración de pasarelas de pago, checkout, seguridad de pagos (PCI-DSS), gestión de pedidos |
| `seo-performance` | SEO técnico, Core Web Vitals, datos estructurados de producto, velocidad de carga |
| `conversion-copywriter` | Copy de producto, CTAs, textos de venta y funnel |
| `qa-security-tester` | Pruebas cross-browser/dispositivo, validación de formularios, revisión de seguridad del checkout |

Para tareas que abarcan varias disciplinas (p. ej. "construye la página de
producto completa"), coordina varios agentes en secuencia (diseño → frontend
→ pagos → QA) en lugar de intentar que uno solo cubra todo.

## Convenciones del proyecto

- Documentar aquí cualquier decisión de stack, pasarela de pago o proveedor
  de hosting en cuanto se tome, para que todos los agentes trabajen con el
  mismo contexto.
- Priorizar accesibilidad (WCAG 2.1 AA) y rendimiento en cualquier entrega.
- Todo flujo de pago debe evitar manejar datos sensibles de tarjeta
  directamente en el frontend (usar tokenización del proveedor).
