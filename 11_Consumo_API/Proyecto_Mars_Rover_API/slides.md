---
marp: true
title: Consumir la API de Mars Rovers con JavaScript Vanilla
author: SENA 3406211 — JavaScript
theme: default
paginate: true
backgroundColor: #0b0d1a
color: #eef1f7
style: |
  section {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background:
      radial-gradient(900px 500px at 85% -10%, rgba(193,68,14,0.25), transparent),
      radial-gradient(700px 400px at 10% 0%, rgba(61,90,220,0.18), transparent),
      #0b0d1a;
  }
  h1, h2 { color: #e8703a; }
  code { background: #1f2540; color: #e8703a; padding: 2px 6px; border-radius: 6px; }
  pre { background: #161a2e; border: 1px solid #2a3055; border-radius: 12px; }
  a { color: #e8703a; }
  strong { color: #3ddc97; }
  table { font-size: 0.85em; }
---

<!-- _class: lead -->

# 🛰️ Explorador Mars Rover

## Cómo consumir una API REST con **JavaScript Vanilla**

`fetch` · Promesas · `async/await` · Eventos del DOM

SENA 3406211 — Curso de JavaScript

---

## ¿Qué vamos a construir?

Una página web que pide a la NASA una **foto de Marte por su ID** y la muestra en pantalla.

**Sin frameworks, sin librerías.** Solo:

- 🧱 **HTML** — la estructura
- 🎨 **CSS** — la apariencia
- ⚙️ **JavaScript** — la lógica (pedir datos y mostrarlos)

> El objetivo no es solo "que funcione", sino **entender cada paso**.

---

## El flujo completo de un vistazo

```
 Usuario              app.js (UI)           api.js (datos)        Internet
   │                     │                      │                    │
   │  escribe 878        │                      │                    │
   │  + clic Buscar ───► │                      │                    │
   │                     │  obtenerFotoPorId(878)──► fetch(url) ─────►│
   │                     │   (muestra "cargando")│                    │
   │                     │                      │ ◄──── JSON { photo }│
   │                     │ ◄── return foto ──────│                    │
   │  ◄── tarjeta con la imagen                  │                    │
```

Dos capas separadas: **UI** (lo que se ve) y **datos** (hablar con la API).

---

# Parte 1 — Leer la documentación de la API

---

## ¿Dónde empieza todo? En la documentación

Página oficial: <https://rovers.nebulum.one/?ref=freepublicapis.com>

Toda API documenta **3 cosas** que necesitamos:

1. **La URL base** → `https://rovers.nebulum.one/api/v1`
2. **Los endpoints** (las "rutas" disponibles)
3. **El formato de la respuesta** (normalmente JSON)

> Antes de escribir código, **siempre** se lee la documentación.

---

## Anatomía de un endpoint

La docs describe nuestro primer endpoint así:

| Campo | Valor |
|-------|-------|
| **Nombre** | Search by Photo ID |
| **Método** | `GET` |
| **Ruta** | `/photos/{id}` |
| **Ejemplo** | `/api/v1/photos/878` |

- `GET` = "dame información" (no modifica nada).
- `{id}` es un **parámetro**: lo reemplazamos por un número real (878).

**URL final:** `https://rovers.nebulum.one/api/v1/photos/878`

---

## Probar la API ANTES de programar: `cURL`

`cURL` es una herramienta de terminal para hacer peticiones HTTP.
Sirve para ver qué responde la API sin escribir nada de la app:

```bash
curl -s "https://rovers.nebulum.one/api/v1/photos/878"
```

Así confirmamos que el endpoint existe y cómo vienen los datos.
También probamos un error a propósito:

```bash
# Un ID que no existe responde con HTTP 404
curl -s -o /dev/null -w "%{http_code}\n" "https://rovers.nebulum.one/api/v1/photos/999999999"
# -> 404
```

---

## La respuesta: entender el JSON

```json
{
  "photo": {
    "id": 878,
    "sol": 4,
    "camera": { "full_name": "Rover Down-Look Camera" },
    "img_src": "https://mars.nasa.gov/.../1200.jpg",
    "earth_date": "2021-02-22",
    "rover": { "name": "Perseverance", "status": null }
  }
}
```

- Los datos vienen **envueltos** en una clave `photo`.
- Para llegar a la imagen: `datos.photo.img_src`.
- Para el nombre del rover: `datos.photo.rover.name`.

> Mapear el JSON en papel/mente **antes** de codificar evita muchos errores.

---

# Parte 2 — Configurar el frontend

---

## La estructura de archivos (arquitectura)

```
Proyecto_Mars_Rover_API/
├── index.html        ← estructura y estados de la pantalla
├── css/
│   └── styles.css    ← apariencia (tema marciano)
└── js/
    ├── api.js        ← CAPA DE DATOS: habla con la API
    └── app.js        ← CAPA DE UI: eventos y mostrar datos
```

**Separar responsabilidades** = cada archivo hace una sola cosa.
Si la API cambia, solo tocamos `api.js`. La UI ni se entera.

---

## El HTML: estructura + "estados"

En `index.html` preparamos un hueco para **cada estado posible**:

```html
<form id="search-form">
  <input id="photo-id" type="number" placeholder="Ej: 878" />
  <button id="search-btn" type="submit">🔍 Buscar</button>
</form>

<div id="loader" class="hidden">Contactando con Marte...</div>  <!-- cargando -->
<div id="error"  class="hidden"></div>                          <!-- error -->
<div id="empty">Ingresa un ID...</div>                          <!-- vacío -->
<article id="card" class="hidden"></article>                    <!-- resultado -->
```

Cada bloque tiene un `id` para encontrarlo desde JS. Solo **uno** se ve a la vez.

---

## Cargar los scripts: el ORDEN importa

Al final del `<body>`:

```html
<script src="js/api.js"></script>   <!-- 1º: define el servicio -->
<script src="js/app.js"></script>   <!-- 2º: lo usa -->
```

- `api.js` va **primero** porque crea `window.MarsRoverAPI`.
- `app.js` va después porque **necesita** ese objeto.

> Trabajamos sin módulos ES para poder **abrir el HTML directo** en el navegador,
> sin servidor.

---

# Parte 3 — La capa de datos (`api.js`)

---

## Configuración base y un error a medida

```js
const API_BASE_URL = 'https://rovers.nebulum.one/api/v1';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status; // 404, 500... o null si fue fallo de red
  }
}
```

- `API_BASE_URL`: si la URL cambia, **se edita en un solo lugar**.
- `ApiError`: un error propio para distinguir "no encontrado" de "sin internet".

---

## `obtenerFotoPorId(id)` — paso 1: validar

```js
async function obtenerFotoPorId(id) {
  const idLimpio = Number(id);
  if (!Number.isInteger(idLimpio) || idLimpio <= 0) {
    throw new ApiError('El ID debe ser un número entero positivo.', null);
  }
  const url = `${API_BASE_URL}/photos/${idLimpio}`;
  // ...continúa
```

- `async` → la función devuelve una **Promesa** y por dentro podemos usar `await`.
- **Validamos primero**: no gastamos una petición si el ID es inválido.
- Armamos la URL con *template strings* (`` `...${idLimpio}` ``).

---

## `obtenerFotoPorId(id)` — paso 2: pedir y revisar

```js
  try {
    const respuesta = await fetch(url);              // 1. petición HTTP

    if (respuesta.status === 404) {                  // 2. ¿no existe?
      throw new ApiError(`No existe la foto ${idLimpio}.`, 404);
    }
    if (!respuesta.ok) {                             // 3. ¿otro error?
      throw new ApiError(`Error del servidor (HTTP ${respuesta.status}).`, respuesta.status);
    }

    const datos = await respuesta.json();            // 4. cuerpo -> objeto JS
    return datos.photo;                              // 5. devolvemos limpio
```

⚠️ **Clave:** `fetch` **NO lanza error** con 404 o 500. Hay que revisar
`respuesta.ok` / `respuesta.status` a mano.

---

## `fetch` y `await`, explicados

```js
const respuesta = await fetch(url);
const datos = await respuesta.json();
```

- `fetch(url)` devuelve **una Promesa** → una "promesa de respuesta futura".
- `await` **pausa** la función hasta que la Promesa se resuelve, sin congelar
  la página.
- Hacen falta **dos** `await`:
  1. uno para recibir la respuesta (`fetch`),
  2. otro para leer y convertir su cuerpo a JSON (`.json()`).

---

## `obtenerFotoPorId(id)` — paso 3: capturar fallos

```js
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;                 // ya es claro: lo relanzamos
    }
    // sin internet, CORS, JSON inválido... cae aquí:
    throw new ApiError('No se pudo conectar con la API.', null);
  }
}
```

`try/catch` atrapa **dos tipos** de problemas:

- Los que **nosotros** lanzamos (404, validación) → se relanzan tal cual.
- Los **inesperados** (red, parseo) → se convierten en un mensaje amigable.

---

## Exponer el servicio

```js
window.MarsRoverAPI = {
  obtenerFotoPorId,
  ApiError,
};
```

- Publicamos la función en un **objeto global** llamado `MarsRoverAPI`.
- Desde `app.js` la usaremos como `MarsRoverAPI.obtenerFotoPorId(...)`.
- La UI **nunca** llama a `fetch` directamente → todo pasa por aquí.

---

# Parte 4 — La capa de interfaz (`app.js`)

---

## Esperar a que el HTML exista

```js
document.addEventListener('DOMContentLoaded', () => {
  const form    = document.getElementById('search-form');
  const input   = document.getElementById('photo-id');
  const boton   = document.getElementById('search-btn');
  const loader  = document.getElementById('loader');
  const errorBox= document.getElementById('error');
  const emptyBox= document.getElementById('empty');
  const card    = document.getElementById('card');
  // ...
});
```

- `DOMContentLoaded` = "el HTML ya está listo, ya puedo buscar elementos".
- Guardamos cada elemento en una **variable** para reutilizarlo.

---

## Funciones de estado: mostrar uno, ocultar el resto

```js
function ocultarTodo() {
  loader.classList.add('hidden');
  errorBox.classList.add('hidden');
  emptyBox.classList.add('hidden');
  card.classList.add('hidden');
}

function mostrarCargando() {
  ocultarTodo();
  loader.classList.remove('hidden');
  boton.disabled = true;   // evita clics repetidos mientras carga
}
```

- `classList.add/remove('hidden')` enciende y apaga bloques (con CSS).
- Patrón: **apagar todo** y luego **encender** solo el estado actual.

---

## `mostrarError(mensaje)`

```js
function mostrarError(mensaje) {
  ocultarTodo();
  errorBox.textContent = `⚠️ ${mensaje}`;
  errorBox.classList.remove('hidden');
  boton.disabled = false;
}
```

- Recibe el texto del error y lo pinta en el bloque rojo.
- `textContent` inserta **texto plano** (más seguro que `innerHTML`).
- Reactiva el botón para que el usuario pueda reintentar.

---

## `mostrarFoto(foto)` — pintar el resultado

```js
function mostrarFoto(foto) {
  ocultarTodo();
  boton.disabled = false;
  card.innerHTML = `
    <img class="card__img" src="${foto.img_src}" alt="Foto ${foto.id}" />
    <span class="card__badge">${foto.rover.name}</span>
    <h3>Foto #${foto.id}</h3>
    <dd>${foto.camera.full_name}</dd>
    <dd>Sol ${foto.sol} · ${foto.earth_date}</dd>
    <dd>${foto.rover.status ?? 'No informado'}</dd>`;
  card.classList.remove('hidden');
}
```

- **Procesar y mostrar los datos**: leemos `foto.img_src`, `foto.rover.name`, etc.
- `?? 'No informado'` → si el dato viene `null`, mostramos un texto por defecto.

---

## `buscarFoto(id)` — el corazón que une todo

```js
async function buscarFoto(id) {
  mostrarCargando();                                  // 1. estado: cargando
  try {
    const foto = await MarsRoverAPI.obtenerFotoPorId(id); // 2. pedir datos
    mostrarFoto(foto);                                // 3a. éxito
  } catch (error) {
    mostrarError(error.message);                      // 3b. fallo
  }
}
```

El ciclo de vida de **toda** petición:

1. Mostrar "cargando". 2. `await` al servicio. 3. Éxito → tarjeta / Error → mensaje.

---

## Eventos del DOM (1): enviar el formulario

```js
form.addEventListener('submit', (evento) => {
  evento.preventDefault();              // no recargar la página
  const id = input.value.trim();
  if (id === '') {
    mostrarError('Escribe un ID antes de buscar.');
    return;
  }
  buscarFoto(id);
});
```

- `submit` cubre **el clic en el botón Y la tecla Enter**.
- `preventDefault()` evita el comportamiento por defecto (recargar).
- Validamos que no esté vacío antes de llamar a `buscarFoto`.

---

## Eventos del DOM (2): los botones de ejemplo

```js
document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    input.value = chip.dataset.id;   // lee data-id="878"
    buscarFoto(chip.dataset.id);
  });
});
```

- `querySelectorAll('.chip')` selecciona **todos** los chips.
- `forEach` les pone a **cada uno** un escuchador de `click`.
- `dataset.id` lee el atributo `data-id` del HTML.

---

# Parte 5 — De los datos a la pantalla

---

## El recorrido del dato `img_src`

```
JSON de la API          api.js              app.js                 Pantalla
─────────────────────────────────────────────────────────────────────────
{ photo: {              return              foto.img_src           <img src=
  img_src: "...jpg" ──► datos.photo  ─────► dentro del template ─► "...jpg">
} }                                          string
```

1. La API lo manda dentro de `photo`.
2. `api.js` lo desempaqueta y devuelve `foto`.
3. `app.js` lo inserta en el `<img>` con un *template string*.
4. El navegador descarga y dibuja la imagen.

---

## Recapitulación de conceptos

| Concepto | ¿Dónde? | ¿Para qué? |
|----------|---------|-----------|
| **`fetch`** | `api.js` | Hacer la petición HTTP |
| **Promesa** | `obtenerFotoPorId` devuelve una | Representar un valor futuro |
| **`async/await`** | servicio y `buscarFoto` | Esperar sin congelar la página |
| **`try/catch`** | ambas capas | Manejar errores con elegancia |
| **Eventos DOM** | `submit`, `click` | Reaccionar al usuario |
| **`innerHTML`/`textContent`** | `mostrarFoto`/`mostrarError` | Mostrar datos |

---

## Buenas prácticas que aplicamos

- ✅ **Separar capas**: datos (`api.js`) vs. interfaz (`app.js`).
- ✅ **Leer la doc y probar con cURL** antes de programar.
- ✅ **Validar** la entrada antes de pedir a la red.
- ✅ **Revisar `respuesta.ok`**: `fetch` no falla solo con 404/500.
- ✅ **Estados claros**: cargando / error / vacío / resultado.
- ✅ **Mensajes de error amigables** para el usuario.

---

<!-- _class: lead -->

# 🚀 ¡A explorar Marte!

Abre `index.html`, escribe **878** y pulsa **Buscar**.

**Reto:** añade un nuevo endpoint
(`/rovers/curiosity/photos?earth_date=YYYY-MM-DD`)
creando otra función en `api.js`. **La UI casi no cambia.**

SENA 3406211 — JavaScript
