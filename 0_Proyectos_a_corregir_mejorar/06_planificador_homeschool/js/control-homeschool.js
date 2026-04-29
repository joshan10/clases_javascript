// =============================================================================
//  🏠  CASAESTUDIO — PLANEADOR DE EDUCACIÓN EN CASA
//  Estilo Visual : Claymorfismo
//  Conceptos JS  : Variables · Tipos de Datos · Estructuras de Datos
//
//  🐛 ESTE ARCHIVO CONTIENE 5 ERRORES INTENCIONALES.
//     Usa F12 → Console y F12 → Sources para detectarlos.
//     Cada error tiene un comentario 🐛 con la lección de referencia.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  📚  DATOS: MATERIAS Y ACTIVIDADES
// ─────────────────────────────────────────────────────────────────────────────

const materias = [
    {
        id: 1,
        nombre: "Matemáticas",
        icono: "🔢",
        color: "#3b82f6",
        actividades: [
            { id: 101, titulo: "Fracciones y decimales",    minutos: 45, descripcion: "Ejercicios del libro pág. 34–37",  completada: false },
            { id: 102, titulo: "Geometría: perímetros",     minutos: 30, descripcion: "Medir objetos del hogar",           completada: true  },
            { id: 103, titulo: "Tabla de multiplicar × 7",  minutos: 20, descripcion: "Repetición oral y escrita",         completada: false }
        ]
    },
    {
        id: 2,
        nombre: "Ciencias",
        icono: "🔬",
        color: "#22c55e",
        actividades: [
            { id: 201, titulo: "El ciclo del agua",         minutos: 40, descripcion: "Video + dibujo explicativo",        completada: false },
            { id: 202, titulo: "Experimento: volcán",       minutos: 60, descripcion: "Bicarbonato y vinagre",             completada: false }
        ]
    },
    {
        id: 3,
        nombre: "Lenguaje",
        icono: "📖",
        color: "#8b5cf6",
        actividades: [
            { id: 301, titulo: "Lectura: El Principito",    minutos: 30, descripcion: "Capítulos 8 al 12",                 completada: true  },
            { id: 302, titulo: "Redacción: mi día",         minutos: 25, descripcion: "Mínimo 10 oraciones",               completada: false },
            { id: 303, titulo: "Ortografía: tilde diacr.",  minutos: 20, descripcion: "Ejercicios del cuaderno",           completada: false }
        ]
    },
    {
        id: 4,
        nombre: "Arte",
        icono: "🎨",
        color: "#ec4899",
        actividades: [
            { id: 401, titulo: "Acuarela libre",            minutos: 50, descripcion: "Paisaje libre con acuarelas",       completada: false }
        ]
    }
];

let materiaActual = null;


// ─────────────────────────────────────────────────────────────────────────────
//  🖼️  FUNCIÓN: renderizarMaterias()
//  Dibuja las tarjetas de materia en el panel izquierdo.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarMaterias() {
    var grid = document.getElementById("materiasGrid");
    grid.innerHTML = "";
    document.getElementById("totalMaterias").textContent = materias.length;

    // 🐛 ERROR 5
    //    Los botones de materia no responden correctamente al hacer clic:
    //    todos ejecutan la misma acción sin importar cuál se presiona.
    //    Revisa: Unidad 1 — 8_closure.js
    for (var i = 0; i < materias.length; i++) {
        var card = document.createElement("div");
        card.className = "materia-card";
        card.style.borderColor = materias[i].color;
        card.innerHTML =
            '<span class="materia-icon">' + materias[i].icono + '</span>' +
            '<div class="materia-info">' +
                '<div class="materia-nombre">' + materias[i].nombre + '</div>' +
                '<div class="materia-count">' + materias[i].actividades.length + ' actividades</div>' +
            '</div>';
        card.onclick = function () { seleccionarMateria(materias[i]); };
        grid.appendChild(card);
    }
}


// ─────────────────────────────────────────────────────────────────────────────
//  📋  FUNCIÓN: seleccionarMateria(materia)
// ─────────────────────────────────────────────────────────────────────────────

function seleccionarMateria(materia) {
    materiaActual = materia;
    document.querySelectorAll(".materia-card").forEach(function (c) { c.classList.remove("active"); });
    document.getElementById("actividadesLabel").textContent = materia.icono + " " + materia.nombre;
    renderizarActividades(materia.actividades);
    actualizarResumen();
}


// ─────────────────────────────────────────────────────────────────────────────
//  📝  FUNCIÓN: renderizarActividades(actividades)
//  Muestra las tarjetas de actividad del panel central.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarActividades(actividades) {
    var lista = document.getElementById("actividadesList");
    lista.innerHTML = "";

    // 🐛 ERROR 4
    //    La condición que verifica si hay actividades nunca se cumple
    //    aunque el array esté vacío.
    //    Revisa: Unidad 3 — 8_colecciones_indexadas.js
    if (typeof actividades === "array" && actividades.length === 0) {
        lista.innerHTML = '<p class="empty-msg">No hay actividades en esta materia.</p>';
        return;
    }

    actividades.forEach(function (act) {
        var card = document.createElement("div");
        card.className = "actividad-card" + (act.completada ? " done" : "");
        card.innerHTML =
            '<div class="act-check ' + (act.completada ? "checked" : "") +
                '" onclick="toggleActividad(' + act.id + ')">' +
                (act.completada ? "✓" : "") +
            '</div>' +
            '<div class="act-body">' +
                '<div class="act-titulo">' + act.titulo + '</div>' +
                '<div class="act-desc">'   + act.descripcion + '</div>' +
            '</div>' +
            '<span class="act-min">' + act.minutos + ' min</span>';
        lista.appendChild(card);
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  ✅  FUNCIÓN: toggleActividad(id)
// ─────────────────────────────────────────────────────────────────────────────

function toggleActividad(id) {
    if (!materiaActual) return;
    var act = materiaActual.actividades.find(function (a) { return a.id === id; });
    if (act) {
        act.completada = !act.completada;
        renderizarActividades(materiaActual.actividades);
        actualizarResumen();
    }
}


// ─────────────────────────────────────────────────────────────────────────────
//  📊  FUNCIÓN: actualizarResumen()
//  Calcula y muestra el resumen global de progreso del día.
// ─────────────────────────────────────────────────────────────────────────────

function actualizarResumen() {
    var todasLasActividades = [];
    materias.forEach(function (m) {
        todasLasActividades = todasLasActividades.concat(m.actividades);
    });

    // 🐛 ERROR 3
    //    El acumulador de minutos produce un resultado inesperado
    //    al sumar los valores de cada actividad.
    //    Revisa: Unidad 3 — 1_conversion_implicita.js
    var totalMinutos = "0";
    todasLasActividades.forEach(function (act) {
        totalMinutos = totalMinutos + act.minutos;
    });

    var total       = todasLasActividades.length;
    var completadas = todasLasActividades.filter(function (a) { return a.completada; }).length;

    // 🐛 ERROR 2
    //    La comprobación sobre el promedio nunca detecta el valor inválido
    //    aunque la operación anterior produzca un resultado incorrecto.
    //    Revisa: Unidad 2 — 5_NaN.js
    var promedio = totalMinutos / total;
    if (promedio == NaN) {
        promedio = 0;
    }

    // 🐛 ERROR 1
    //    La variable que intenta guardar el conteo no es accesible
    //    fuera del bloque donde fue declarada.
    //    Revisa: Unidad 1 — 9_scope_bloque.js
    if (completadas > 0) {
        let completadasHoy = completadas;
    }

    document.getElementById("totalMinDisplay").textContent = totalMinutos;
    document.getElementById("r-minutos").textContent       = totalMinutos;
    document.getElementById("r-promedio").textContent      = isNaN(promedio) ? "—" : Math.round(promedio) + " min";
    document.getElementById("r-completadas").textContent   = completadas + " / " + total;
    document.getElementById("actividadesHoy").textContent  = completadasHoy;

    var pct = total > 0 ? (completadas / total) * 100 : 0;
    document.getElementById("progressFill").style.width = pct + "%";
}


// ─────────────────────────────────────────────────────────────────────────────
//  ➕  FORMULARIO: NUEVA ACTIVIDAD
// ─────────────────────────────────────────────────────────────────────────────

function mostrarFormActividad() {
    if (!materiaActual) { alert("Selecciona una materia primero."); return; }
    document.getElementById("formActividad").style.display = "flex";
}

function cancelarForm() {
    document.getElementById("formActividad").style.display = "none";
    document.getElementById("inputTitulo").value  = "";
    document.getElementById("inputMinutos").value = "";
    document.getElementById("inputDesc").value    = "";
}

function guardarActividad() {
    var titulo  = document.getElementById("inputTitulo").value.trim();
    var minutos = parseInt(document.getElementById("inputMinutos").value);
    var desc    = document.getElementById("inputDesc").value.trim();

    if (!titulo || isNaN(minutos)) { alert("Completa los campos correctamente."); return; }

    materiaActual.actividades.push({
        id: Date.now(),
        titulo: titulo,
        minutos: minutos,
        descripcion: desc || "Sin descripción",
        completada: false
    });

    cancelarForm();
    renderizarActividades(materiaActual.actividades);
    renderizarMaterias();
    actualizarResumen();
}


// ─────────────────────────────────────────────────────────────────────────────
//  🚀  INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

renderizarMaterias();
actualizarResumen();
