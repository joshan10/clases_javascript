# Proyectos a Corregir y Mejorar

Esta carpeta contiene **8 aplicaciones web** con errores JavaScript intencionales.  
Cada proyecto es un ejercicio práctico de depuración alineado con los conceptos de las Unidades 1, 2 y 3 del curso.

---

## Cómo usarlos

1. Abrir el archivo `.html` del proyecto en el navegador.
2. Abrir las herramientas de desarrollador con **F12**.
3. Ir a la pestaña **Console** para ver los errores en tiempo de ejecución.
4. Ir a la pestaña **Sources** para inspeccionar el código.
5. Localizar los comentarios `🐛 ERROR N` en el archivo `.js` del proyecto.
6. Consultar la lección indicada en el comentario y aplicar la corrección.

> **Importante:** los comentarios `🐛` señalan la zona del error y la lección de referencia.  
> No explican la solución — esa parte la resuelves tú.

---

## Proyectos

### 01 · Tienda de Ropa — Moda Urbana
**Estilo:** Neumorfismo  
**Archivo:** `01_tienda_ropa/01_tienda_ropa.html`

| # | Concepto afectado | Lección |
|---|---|---|
| 1 | Tipo de dato incorrecto en `precio` (string vs number) | Unidad 2 — `2_numbers.js` |
| 2 | `const` para variable que debe reasignarse | Unidad 1 — `5_const.js` |
| 3 | Hoisting con `var` en función de descuento | Unidad 1 — `6_hoisting.js` |
| 4 | Propiedad con typo → `undefined` | Unidad 2 — `6_undefined.js` |
| 5 | `typeof` no detecta Arrays correctamente | Unidad 3 — `8_colecciones_indexadas.js` |

---

### 02 · Centro de Monitoreo Espacial
**Estilo:** Glassmorfismo  
**Archivo:** `02_monitoreo_espacial/02_monitoreo_espacial.html`

| # | Concepto afectado | Lección |
|---|---|---|
| 1 | Valor `null` en array causa TypeError | Unidad 2 — `7_null.js` |
| 2 | *(Ver comentarios en el archivo JS)* | *(Ver archivo)* |
| 3 | *(Ver comentarios en el archivo JS)* | *(Ver archivo)* |

---

### 03 · Inventario Industrial
**Estilo:** Dark Dashboard  
**Archivo:** `03_inventario_industrial/03_inventario_industrial.html`

> Ver comentarios `🐛` en el archivo JS para el detalle de los errores.

---

### 04 · Dashboard de RRHH
**Estilo:** Corporate Dashboard  
**Archivo:** `04_dashboard_rrhh/04_dashboard_rrhh.html`

> Ver comentarios `🐛` en el archivo JS para el detalle de los errores.

---

### 05 · Planificador de Misiones Autónomas
**Estilo:** Interfaz táctica (inspirado en Palantir Lattice / Anduril)  
**Archivo:** `05_planificador_misiones/05_planificador_misiones.html`

| # | Concepto afectado | Lección |
|---|---|---|
| 1 | Coordenada declarada con tipo incorrecto → resultado NaN en cálculo de ruta | Unidad 2 — `2_numbers.js` |
| 2 | Declaración que impide actualizar la lista al filtrar | Unidad 1 — `5_const.js` |
| 3 | Comparación que no detecta un valor especial del array | Unidad 2 — `7_null.js` |
| 4 | Variable usada antes de que su valor esté disponible | Unidad 1 — `6_hoisting.js` |
| 5 | Nombre de propiedad con error tipográfico → `undefined` | Unidad 2 — `6_undefined.js` |

---

### 06 · Planeador de Educación en Casa
**Estilo:** Claymorfismo  
**Archivo:** `06_planificador_homeschool/06_planificador_homeschool.html`

| # | Concepto afectado | Lección |
|---|---|---|
| 1 | Variable declarada dentro de un bloque, inaccesible fuera de él | Unidad 1 — `9_scope_bloque.js` |
| 2 | Comparación que nunca detecta un valor inválido | Unidad 2 — `5_NaN.js` |
| 3 | Acumulador que concatena en lugar de sumar | Unidad 3 — `1_conversion_implicita.js` |
| 4 | Verificación de tipo que nunca se cumple para arrays | Unidad 3 — `8_colecciones_indexadas.js` |
| 5 | Botones de selección que apuntan todos al mismo elemento | Unidad 1 — `8_closure.js` |

---

### 07 · Menú Digital de Restaurante
**Estilo:** Flat Design · Tipografía Google Sans  
**Archivo:** `07_menu_restaurante/07_menu_restaurante.html`

| # | Concepto afectado | Lección |
|---|---|---|
| 1 | Botones de filtro que ejecutan la misma acción | Unidad 1 — `8_closure.js` |
| 2 | Ingredientes que no se renderizan aunque el array tiene datos | Unidad 3 — `8_colecciones_indexadas.js` |
| 3 | Total del pedido que concatena en lugar de sumar | Unidad 3 — `2_conversion_explicita.js` |
| 4 | Descripción de plato que aparece como `undefined` | Unidad 2 — `6_undefined.js` |
| 5 | Condición de descuento que nunca funciona correctamente | Unidad 2 — `9_typeOf.js` |

---

### 08 · Mezclador de Colores ChromaMix Pro
**Estilo:** Esqueuomorfismo (hardware analógico — sampler digital)  
**Archivo:** `08_mezclador_colores/08_mezclador_colores.html`

| # | Concepto afectado | Lección |
|---|---|---|
| 1 | Constante de tipo incompatible con operaciones numéricas | Unidad 2 — `4_bigInt.js` |
| 2 | Método inexistente en la colección usada para el historial | Unidad 3 — `5_sets_arrays.js` |
| 3 | Variables de cálculo sin valor en el momento de usarse | Unidad 1 — `6_hoisting.js` |
| 4 | Variable local que oculta la variable global del mismo nombre | Unidad 1 — `7_scope.js` |
| 5 | Valores de los sliders que producen concatenación en lugar de suma | Unidad 3 — `1_conversion_implicita.js` |

---

## Estructura de cada proyecto

```
NN_nombre_proyecto/
├── NN_nombre_proyecto.html   ← Abrir en el navegador
├── css/
│   └── styles-nombre.css     ← Estilos visuales
└── js/
    └── control-nombre.js     ← Lógica JavaScript (aquí están los errores)
```

---

## Conceptos cubiertos por unidad

| Unidad | Conceptos |
|---|---|
| **Unidad 1** — Variables | `var`, `let`, `const`, hoisting, scope de bloque, scope de función, closures |
| **Unidad 2** — Tipos de Datos | strings, numbers, boolean, BigInt, NaN, undefined, null, typeof |
| **Unidad 3** — Estructuras de Datos | coerción implícita/explícita, Arrays, Sets, Maps, colecciones indexadas |
