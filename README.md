# Ferretera Montes

Web de Ferretera Montes (Blvd. Rondeau 762, Rosario).

- Un solo `index.html`: HTML, CSS y JS vanilla, sin build.
- Hero con escena de scroll: un martillo engancha el clavo del cartel y tira la portada hacia abajo.
- Tipografías: Saira Stencil One (cartel), Saira (títulos) y Barlow (texto), desde Google Fonts.

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
