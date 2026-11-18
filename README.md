# Belii — Sitio web

Abre `index.html` en el navegador (doble clic). No necesita instalación.

## Páginas
- `index.html` Inicio · `estudio.html` · `servicios.html` · `proyectos.html` · `contacto.html`
- Servicios (cada tarjeta lleva a su página): `servicio-branding.html`, `servicio-diseno-grafico.html`, `servicio-estrategia-de-marca.html`, `servicio-contenido-digital.html`
- Proyectos: `proyecto-01.html` … `proyecto-05.html`

## Colores (css/styles.css, bloque `:root`)
- `--crema #F2EEE3` · `--vino #52191F`
- `--coral #DC6E6B` ← tu código venía como "DC6E6S" (la S no es hexadecimal); asumí DC6E6B.
- `--rosa #F4A9A3` ← tu cuarto código venía incompleto ("A4E29"); puse un rosa suave de tu referencia.
Cambia esos valores y todo el sitio se actualiza.

## Dónde reemplazar las imágenes de PROYECTOS
Cada proyecto tiene su carpeta en `assets/img/proyectos/proyecto-0X/` con:
`portada.png`, `galeria-1.png`, `galeria-2.png`, `galeria-3.png`, `galeria-4.png`.
- Opción A: reemplaza el archivo por el tuyo con el MISMO nombre.
- Opción B: usa otro nombre/formato y cambia el `src` en `proyecto-0X.html`, donde verás el comentario `✏️ REEMPLAZAR IMAGEN`.
Los textos por cambiar están entre [corchetes]. La miniatura en `proyectos.html` usa `portada.png` de cada proyecto.

## Otras imágenes (recortadas de tus 5 referencias)
`assets/img/*-hero.png`, `serv-*.png`, `estudio-brand.png`, `servicios-mockup.png`, `proyectos-statue.png`, etc. Puedes sustituirlas por las tuyas con el mismo nombre.

## Chatbot "Hablemos"
Funciona con respuestas predefinidas. Edita las preguntas/respuestas en `js/main.js` (objeto `BOT`). Para conectarlo a una IA real se necesita un servidor propio (no pongas claves de API en el navegador).

## Contacto
El formulario lee `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` y `VITE_EMAILJS_PUBLIC_KEY` desde `.env` con Vite. Completa esos valores y ejecuta `npm install` y `npm run dev`; para publicar, ejecuta `npm run build` y despliega la carpeta `dist`. En el proveedor de hosting configura también las tres variables de entorno de producción.


## Despliegue
El despliegue del proyecto se realizó mediante la plataforma Vercel, donde se configuró su publicación y disponibilidad en línea. Adicionalmente, se adquirió el dominio personalizado belii.space a través de GoDaddy, el cual se vinculó correctamente con el proyecto alojado en Vercel, permitiendo acceder al sitio web mediante una dirección propia.
