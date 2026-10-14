# Ferretera Montes

Web de Ferretera Montes (Blvd. Rondeau 762, Rosario).

- Un solo `index.html`: HTML, CSS y JS vanilla, sin build.
- Hero con escena de scroll: un martillo engancha el clavo del cartel y tira la portada hacia abajo.
- Tipografías: Saira Stencil One (cartel), Saira (títulos) y Barlow (texto), desde Google Fonts.

## Dominio

**https://ferreteriamontes.com.ar** (registrado en NIC.ar, delegado a Vercel con
`ns1.vercel-dns.com` y `ns2.vercel-dns.com`). Los registros DNS se manejan desde Vercel.

## Deploy

Vercel → Add New → Project → importar este repo → Framework Preset: **Other** → Deploy.
Cada push a `main` redeploya.

## Cómo actualizar las ofertas

Las ofertas están en [`ofertas.json`](ofertas.json). Se editan desde GitHub (también desde el celular):

1. Abrí `ofertas.json` en el repo y tocá el lápiz ✏️ (*Edit this file*).
2. Cambiá, agregá o borrá ofertas.
3. Tocá **Commit changes**. Vercel publica el cambio en menos de un minuto.

Cada oferta va entre llaves `{ }`, separadas por comas:

```json
[
  {
    "etiqueta": "-20%",
    "producto": "Taladro percutor 650W",
    "antes": 95000,
    "precio": 76000
  },
  {
    "etiqueta": "3x2",
    "producto": "Cinta aisladora 20 m",
    "antes": "$ 3.600 c/u",
    "precio": 7200
  }
]
```

| Campo | Obligatorio | Qué es |
|---|---|---|
| `producto` | sí | Nombre del producto. |
| `precio` | sí | Precio de oferta. Número (`76000` → se muestra `$ 76.000`) o texto libre entre comillas (`"$ 5.000 el kilo"`). |
| `antes` | no | Precio anterior, se muestra tachado. Mismo formato que `precio`. |
| `etiqueta` | no | Cartelito amarillo: `"-20%"`, `"3x2"`, `"Nuevo"`… |
| `mostrar` | no | `false` para ocultar una oferta sin borrarla. |

Reglas para que no se rompa:

- Los textos van entre comillas dobles `" "`; los números, sin comillas ni puntos (`95000`, no `95.000`).
- Entre una oferta y la siguiente va una coma; **después de la última, no**.
- Si la lista queda vacía (`[]`), la sección de ofertas y su link del menú se ocultan solos.
- Si el archivo tiene un error, la web no se rompe: muestra las ofertas de respaldo que están en `index.html`.
  Para chequear antes de guardar, podés pegar el contenido en [jsonlint.com](https://jsonlint.com).

## Vista previa al compartir (WhatsApp, redes)

`og-image.jpg` (1200×630) es la imagen que aparece al pegar el link en WhatsApp, Facebook, etc.
Se genera a partir de `assets-fuente/og-image.html`: abrilo en Chrome con la ventana en 1200×630 y sacá una captura.

WhatsApp guarda la vista previa en caché: si cambiás la imagen, puede tardar en actualizarse
(para forzarlo, compartí el link con algo al final, por ejemplo `ferreteriamontes.com.ar/?v=2`).

## Cartel QR para reseñas (imprimible)

En `imprimibles/`:

- `qr-resena.pdf`: hoja A4 apaisada con **dos carteles A5** para imprimir y cortar por la línea punteada.
  Imprimir **al 100 %** (sin "ajustar a página") y en color.
- `qr-resena.png`: un solo cartel, para mandar por WhatsApp o imprimir suelto.
- `qr-resena.svg`: el QR solo, en vector (sirve para stickers, bolsas o tarjetas).
- `qr-resena.html`: el diseño editable; también se puede abrir en el navegador y
  imprimir desde ahí: `ferreteriamontes.com.ar/imprimibles/qr-resena.html`.

El QR lleva a `https://search.google.com/local/writereview?placeid=ChIJjxgpDG9TtpUR6t3GSvXgrQA`
(la ventana de "Escribir una reseña" de Google para Ferretera Montes).

## Cómo actualizar los horarios

Los horarios están en [`horarios.json`](horarios.json). Se editan igual que las ofertas: abrir el archivo
en GitHub, tocar el lápiz ✏️, cambiar y *Commit changes*. En un minuto se actualizan la tabla de Contacto,
el "Abierto / Cerrado", la respuesta del chat y la pantalla del hero.

```json
{
  "lunes":     ["8:30-13", "16:30-18:30"],
  "sábado":    ["9-13"],
  "domingo":   [],

  "cerrado": [
    { "fecha": "2026-11-23", "motivo": "Feriado" }
  ],

  "google": { "rating": 4.8, "reseñas": 58 }
}
```

- Cada día lleva una lista de turnos `"desde-hasta"` (`"8:30-13"`). Día sin turnos (`[]`) = cerrado. Tienen que estar los 7 días.
- `cerrado`: fechas puntuales (formato `AAAA-MM-DD`) en las que no abren. Se muestran en la tabla desde 14 días antes.
- `google`: calificación y cantidad de reseñas que muestra la web; copiarlas de Google Maps cada tanto.
- Si el archivo tiene un error, la web usa los horarios de respaldo de `index.html`.
