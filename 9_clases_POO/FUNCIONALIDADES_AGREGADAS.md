# Funcionalidades agregadas

Este documento describe de forma detallada las funcionalidades nuevas incorporadas al proyecto para el registro de estudiantes desde el frontend y el guardado en el backend.

## 1) Formulario en el frontend

**Archivo:** frontend/formulario.html

Se creo una vista exclusiva para registrar estudiantes. El formulario captura:
- Datos personales: primer nombre, segundo nombre, primer apellido, segundo apellido, tipo y numero de documento, fecha de nacimiento.
- Datos de matricula: costo, promocion, fecha y carrera.
- Materias: un listado de materias con el formato `Nombre,Creditos`, una por linea.

**Objetivo:** permitir que el usuario ingrese informacion completa del estudiante desde el navegador, sin modificar manualmente el JSON.

## 2) Logica del formulario en JavaScript

**Archivo:** frontend/js/logica.js

Se incorporo una nueva logica para manejar el envio del formulario:
- Se agrega un `submit` al formulario con `preventDefault()` para evitar recargar la pagina.
- Se construye un objeto `datos` que agrupa toda la informacion del estudiante.
- Se parsea el textarea de materias con una funcion dedicada (`parsearMaterias`), convirtiendo cada linea en un objeto `{ nombre, creditos }`.
- Se envia la informacion al backend por `fetch` usando el metodo `POST` y el header `Content-Type: application/json`.
- Se muestran mensajes de exito o error en pantalla.
- Se limpia el formulario luego de un guardado exitoso.

**Resultado:** el frontend ahora puede crear estudiantes nuevos en el sistema sin depender de ediciones manuales.

## 3) Soporte de POST en el backend

**Archivo:** backend/app.js

Se amplio el servidor para aceptar nuevas peticiones:
- Se habilito `POST` en las cabeceras CORS (`Access-Control-Allow-Methods`).
- Se agrego el endpoint `POST /estudiantes`.
- Se recibe el cuerpo de la peticion, se parsea como JSON y se valida que tenga campos obligatorios.
- Se construyen instancias reales de `Matricula`, `Materia` y `Estudiante` usando los datos recibidos.
- Se asigna un nuevo `id` secuencial al estudiante.

**Resultado:** el backend puede crear estudiantes a partir de datos enviados desde el frontend.

## 4) Guardado en el archivo JSON

**Archivo:** backend/app.js (funciones de apoyo)

Se agregaron dos funciones utilitarias:
- `serializarEstudiantes(estudiantes)`: convierte objetos de clase (con campos privados) en objetos planos para JSON.
- `guardarEstudiantes(estudiantes)`: escribe el arreglo serializado en `backend/datos/estudiantes.json`.

Cuando llega un `POST /estudiantes`, el estudiante nuevo se agrega a la lista en memoria y luego se guarda todo el arreglo actualizado en el JSON.

**Resultado:** los nuevos estudiantes quedan persistidos de forma permanente.

## 5) Estilos del formulario

**Archivo:** frontend/css/styles.css

Se agregaron estilos para el formulario:
- Contenedor con fondo y separacion.
- Tarjeta con sombra para el formulario.
- Tipografia clara y organizada.
- Boton principal con color destacado.
- Mensajes de exito y error con colores diferenciados.

**Resultado:** el formulario es mas claro y agradable para el usuario.

## 6) Compatibilidad con el listado existente

**Archivo:** frontend/js/logica.js

La funcion `cargarEstudiantes()` se mantiene para listar estudiantes. Se agrego una validacion para no romper cuando la pagina no tenga el listado (como en el formulario).

**Resultado:** la misma logica JS funciona en ambas vistas (listado y formulario) sin errores.

## Flujo completo (resumen)

1. El usuario abre `frontend/formulario.html`.
2. Llena el formulario y presiona "Guardar estudiante".
3. El navegador envia un `POST /estudiantes` con JSON al backend.
4. El backend crea las instancias, guarda en `estudiantes.json` y responde con exito.
5. El formulario muestra el mensaje de confirmacion.
6. El listado de estudiantes en `index.html` refleja el nuevo registro cuando se recarga.
