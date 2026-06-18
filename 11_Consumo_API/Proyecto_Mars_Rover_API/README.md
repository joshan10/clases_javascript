# Explorador Mars Rover API 🛰️

Aplicación frontend en **JavaScript vanilla** (HTML + CSS + JS) que consume la
API pública de fotos de los rovers de la NASA servida por Nebulum One.

Demuestra: `fetch`, **Promesas**, funciones **async/await** y **eventos del DOM**.

## Recurso / Documentación

- Página de docs: https://rovers.nebulum.one/?ref=freepublicapis.com
- Base de la API: `https://rovers.nebulum.one/api/v1`

### cURL de exploración del recurso

```bash
# Página de documentación de la API
curl -s "https://rovers.nebulum.one/?ref=freepublicapis.com"
```

### cURL del primer endpoint — "Search by Photo ID"

```bash
# GET /photos/{id}  -> busca una foto por su identificador único
curl -s "https://rovers.nebulum.one/api/v1/photos/878"
```

Respuesta (resumida):

```json
{
  "photo": {
    "id": 878,
    "sol": 4,
    "camera": { "name": "EDL_RDCAM", "full_name": "Rover Down-Look Camera" },
    "img_src": "https://mars.nasa.gov/.../EDE_0004_..._1200.jpg",
    "earth_date": "2021-02-22",
    "rover": { "name": "Perseverance", "status": null, "total_photos": 29411 }
  }
}
```

> Un ID inexistente devuelve **HTTP 404** con cuerpo vacío.

## Arquitectura

```
Proyecto_Mars_Rover_API/
├── index.html          ← estructura y estados de la UI (cargando / error / vacío / resultado)
├── css/
│   └── styles.css      ← tema espacial, responsive
└── js/
    ├── api.js          ← CAPA DE DATOS: fetch + async/await + manejo de errores (ApiError)
    └── app.js          ← CAPA DE UI: eventos del DOM y renderizado
```

**Separación de responsabilidades:** `app.js` nunca llama a `fetch` directamente;
siempre pasa por `MarsRoverAPI.obtenerFotoPorId(id)` de `api.js`. Así, si la API
cambia, solo se edita la capa de datos.

## Cómo ejecutar

Abre `index.html` directamente en el navegador (no requiere servidor). Escribe un
ID de foto (ej. `878`) y pulsa **Buscar**, o usa los chips de ejemplo.
