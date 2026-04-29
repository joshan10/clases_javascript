// =============================================================================
//  ⬡  LATTICE OS — PLANIFICADOR DE MISIONES AUTÓNOMAS
//  Estilo Visual : Interfaz Táctica (estilo Palantir / Anduril Lattice)
//  Conceptos JS  : Variables · Tipos de Datos · Estructuras de Datos
//
//  🐛 ESTE ARCHIVO CONTIENE 5 ERRORES INTENCIONALES.
//     Usa F12 → Console y F12 → Sources para detectarlos.
//     Cada error tiene un comentario 🐛 con la lección de referencia.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  📡  DATOS: CATÁLOGO DE MISIONES
// ─────────────────────────────────────────────────────────────────────────────

const misiones = [
    {
        id: "AND-2024-001",
        nombre: "Operación Halcón Nocturno",
        plataforma: "ALTIUS-600M",
        tipo: "Reconocimiento ISR",
        estado: "activa",
        prioridad: "alta",
        combustible: 78,
        altitud: 1200,
        velocidad: 185,
        // 🐛 ERROR 1
        //    Uno de los waypoints tiene una coordenada declarada de forma
        //    diferente al resto, lo que provoca un resultado incorrecto
        //    al calcular la distancia total de la ruta.
        //    Revisa: Unidad 2 — 2_numbers.js
        waypoints: [
            { nombre: "BASE ALFA",        latitud: "34.0522", longitud: -118.2437 },
            { nombre: "PUNTO BRAVO",      latitud: 34.1522,   longitud: -117.9437 },
            { nombre: "OBJETIVO CHARLIE", latitud: 34.2522,   longitud: -117.6437 }
        ]
    },
    {
        id: "AND-2024-002",
        nombre: "Misión Sombra Roja",
        plataforma: "Ghost-X",
        tipo: "Vigilancia de perímetro",
        estado: "en-vuelo",
        prioridad: "media",
        combustible: 52,
        altitud: 800,
        velocidad: 130,
        waypoints: [
            { nombre: "LANZAMIENTO", latitud: 33.9522, longitud: -118.4437 },
            { nombre: "PATRULLA-A",  latitud: 33.8522, longitud: -118.3437 },
            { nombre: "PATRULLA-B",  latitud: 33.7522, longitud: -118.2437 },
            { nombre: "RETORNO",     latitud: 33.9522, longitud: -118.4437 }
        ]
    },
    {
        id: "AND-2024-003",
        nombre: "Escudo Digital Omega",
        plataforma: "Barracuda-S",
        tipo: "Intercepción EW",
        estado: "alerta",
        prioridad: "critica",
        combustible: 31,
        altitud: 400,
        velocidad: 220,
        waypoints: [
            { nombre: "ORIGEN",       latitud: 34.5522, longitud: -117.8437 },
            { nombre: "INTERCEPCIÓN", latitud: 34.6522, longitud: -117.5437 }
        ]
    },
    // 🐛 ERROR 3
    //    Este elemento del array hace que la función validarMision() no funcione
    //    como se espera, porque usa un operador que no detecta este tipo de valor.
    //    Revisa: Unidad 2 — 7_null.js
    null,
    {
        id: "AND-2024-004",
        nombre: "Tormenta de Arena",
        plataforma: "Roadrunner",
        tipo: "Ataque de precisión",
        estado: "completada",
        prioridad: "alta",
        combustible: 5,
        altitud: 0,
        velocidad: 0,
        waypoints: [
            { nombre: "INICIO",   latitud: 35.0522, longitud: -118.8437 },
            { nombre: "OBJETIVO", latitud: 35.2522, longitud: -118.4437 }
        ]
    },
    {
        id: "AND-2024-005",
        nombre: "Guardián Espectral",
        plataforma: "ALTIUS-600M",
        tipo: "Reconocimiento ISR",
        estado: "activa",
        prioridad: "baja",
        combustible: 90,
        altitud: 2000,
        velocidad: 160,
        waypoints: [
            { nombre: "BASE DELTA", latitud: 33.5522, longitud: -119.0437 },
            { nombre: "ÓRBITA-A",   latitud: 33.4522, longitud: -118.8437 },
            { nombre: "ÓRBITA-B",   latitud: 33.3522, longitud: -118.6437 }
        ]
    }
];


// ─────────────────────────────────────────────────────────────────────────────
//  🗃️  ESTADO DE LA APLICACIÓN
// ─────────────────────────────────────────────────────────────────────────────

// 🐛 ERROR 2
//    La declaración de esta variable impide que se pueda actualizar
//    cuando el usuario usa los filtros del panel izquierdo.
//    Revisa: Unidad 1 — 5_const.js
const misionesVisibles = [...misiones];

let misionSeleccionada = null;


// ─────────────────────────────────────────────────────────────────────────────
//  ✅  FUNCIÓN: validarMision(mision)
//  Verifica que el elemento sea un objeto de misión válido.
// ─────────────────────────────────────────────────────────────────────────────

function validarMision(mision) {
    // 🐛 ERROR 3
    //    La condición no detecta correctamente el tipo de valor problemático del array.
    //    Revisa: Unidad 2 — 7_null.js
    if (typeof mision === "null") {
        return false;
    }
    return mision !== undefined;
}


// ─────────────────────────────────────────────────────────────────────────────
//  📊  FUNCIÓN: calcularRiesgo(mision)
//  Retorna un índice de riesgo entre 0 y 100.
// ─────────────────────────────────────────────────────────────────────────────

function calcularRiesgo(mision) {
    // 🐛 ERROR 4
    //    La variable que multiplica al factor de combustible no tiene el valor
    //    esperado en el momento en que se realiza el cálculo.
    //    Revisa: Unidad 1 — 6_hoisting.js
    var combustibleFactor = (100 - mision.combustible) * escala;
    var escala = 0.5;

    var prioridadPeso = 0;
    if (mision.prioridad === "critica")   prioridadPeso = 40;
    else if (mision.prioridad === "alta") prioridadPeso = 25;
    else if (mision.prioridad === "media")prioridadPeso = 15;
    else                                  prioridadPeso = 5;

    return Math.min(100, Math.round(combustibleFactor + prioridadPeso));
}


// ─────────────────────────────────────────────────────────────────────────────
//  📏  FUNCIÓN: calcularDistancia(wp1, wp2)
//  Calcula la distancia en km entre dos waypoints — fórmula Haversine.
// ─────────────────────────────────────────────────────────────────────────────

function calcularDistancia(wp1, wp2) {
    var R    = 6371;
    var dLat = (wp2.latitud  - wp1.latitud)  * Math.PI / 180;
    var dLon = (wp2.longitud - wp1.longitud) * Math.PI / 180;
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(wp1.latitud * Math.PI / 180) *
        Math.cos(wp2.latitud * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function calcularDistanciaTotal(waypoints) {
    var total = 0;
    for (var i = 0; i < waypoints.length - 1; i++) {
        total += calcularDistancia(waypoints[i], waypoints[i + 1]);
    }
    return total;
}


// ─────────────────────────────────────────────────────────────────────────────
//  🖼️  FUNCIÓN: renderizarLista(lista)
//  Dibuja las tarjetas de misión en el panel lateral izquierdo.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarLista(lista) {
    var contenedor = document.getElementById("listaMisiones");
    contenedor.innerHTML = "";

    var misionesValidas = lista.filter(validarMision);
    var activasCount    = 0;

    misionesValidas.forEach(function (mision) {
        if (mision.estado === "activa" || mision.estado === "en-vuelo") activasCount++;

        var card = document.createElement("div");
        card.className = "mission-card estado-" + mision.estado;
        card.onclick   = function () { seleccionarMision(mision); };

        // 🐛 ERROR 5
        //    Uno de los datos mostrados en esta tarjeta siempre aparece
        //    como "undefined" aunque el dato sí existe en el objeto.
        //    Revisa: Unidad 2 — 6_undefined.js
        card.innerHTML =
            '<div class="mc-header">' +
                '<span class="mc-id mono">' + mision.id + '</span>' +
                '<span class="mc-status status-' + mision.estado + '">' + mision.estado.toUpperCase() + '</span>' +
            '</div>' +
            '<div class="mc-nombre">' + mision.nombre + '</div>' +
            '<div class="mc-meta">' +
                '<span>' + mision.plataorma + '</span>' +
                '<span>⚡ ' + mision.prioridad.toUpperCase() + '</span>' +
            '</div>';

        contenedor.appendChild(card);
    });

    document.getElementById("contMisiones").textContent = activasCount;
}


// ─────────────────────────────────────────────────────────────────────────────
//  🎯  FUNCIÓN: seleccionarMision(mision)
//  Actualiza el panel de telemetría con los datos de la misión seleccionada.
// ─────────────────────────────────────────────────────────────────────────────

function seleccionarMision(mision) {
    misionSeleccionada = mision;

    document.getElementById("selectedLabel").textContent    = mision.nombre;
    document.getElementById("t-plataforma").textContent     = mision.plataforma;
    document.getElementById("t-estado").textContent         = mision.estado.toUpperCase();
    document.getElementById("t-combustible").textContent    = mision.combustible + " %";
    document.getElementById("t-altitud").textContent        = mision.altitud.toLocaleString() + " m";
    document.getElementById("t-velocidad").textContent      = mision.velocidad + " km/h";

    var riesgo   = calcularRiesgo(mision);
    var riesgoEl = document.getElementById("t-riesgo");
    riesgoEl.textContent = isNaN(riesgo) ? "NaN — ver consola" : riesgo + " / 100";
    riesgoEl.className   = "tv " + (riesgo > 70 ? "val-red" : riesgo > 40 ? "val-orange" : "val-green");

    var wpList = document.getElementById("waypointList");
    wpList.innerHTML = "";
    mision.waypoints.forEach(function (wp, i) {
        var div = document.createElement("div");
        div.className = "wp-item";
        div.innerHTML =
            '<span class="wp-num">' + (i + 1) + '</span>' +
            '<span class="wp-name">' + wp.nombre + '</span>' +
            '<span class="wp-coords">' +
                parseFloat(wp.latitud).toFixed(4) + '° / ' +
                wp.longitud.toFixed(4) + '°' +
            '</span>';
        wpList.appendChild(div);
    });

    var dist = calcularDistanciaTotal(mision.waypoints);
    document.getElementById("distanciaRuta").textContent =
        isNaN(dist) ? "NaN — ver consola" : dist.toFixed(1) + " km";

    actualizarNodosGrid(mision);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔍  FUNCIÓN: filtrarMisiones(estado)
//  Filtra la lista por estado y vuelve a renderizar el panel.
// ─────────────────────────────────────────────────────────────────────────────

function filtrarMisiones(estado) {
    document.querySelectorAll(".fbtn").forEach(function (btn) {
        btn.classList.toggle("active", btn.dataset.f === estado);
    });

    // El error 2 se manifiesta aquí cuando el usuario usa los filtros.
    if (estado === "todas") {
        misionesVisibles = [...misiones];
    } else {
        misionesVisibles = misiones.filter(function (m) {
            return m && m.estado === estado;
        });
    }
    renderizarLista(misionesVisibles);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🗺️  FUNCIÓN: actualizarNodosGrid(mision)
//  Dibuja los waypoints en la cuadrícula táctica central.
// ─────────────────────────────────────────────────────────────────────────────

function actualizarNodosGrid(mision) {
    var container = document.getElementById("misionNodes");
    container.innerHTML = "";

    mision.waypoints.forEach(function (wp, i) {
        var tipo = i === 0 ? "node-start"
                 : i === mision.waypoints.length - 1 ? "node-end"
                 : "node-mid";

        var node = document.createElement("div");
        node.className = "grid-node " + tipo;

        var normLeft = ((wp.longitud + 120) / 5) * 100;
        var normTop  = ((parseFloat(wp.latitud) - 33) / 3) * 100;
        node.style.left = Math.min(95, Math.max(5, normLeft)) + "%";
        node.style.top  = Math.min(95, Math.max(5, normTop))  + "%";

        node.innerHTML =
            '<div class="node-dot"></div>' +
            '<span class="node-label">' + wp.nombre + '</span>';
        container.appendChild(node);
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  🚀  FUNCIÓN: activarMision()
//  Cambia el estado de la misión seleccionada a "en-vuelo".
// ─────────────────────────────────────────────────────────────────────────────

function activarMision() {
    if (!misionSeleccionada) {
        alert("Selecciona una misión del panel izquierdo.");
        return;
    }
    misionSeleccionada.estado = "en-vuelo";
    renderizarLista(misiones);
    seleccionarMision(misionSeleccionada);
}


// ─────────────────────────────────────────────────────────────────────────────
//  ⏱️  RELOJ UTC
// ─────────────────────────────────────────────────────────────────────────────

function actualizarReloj() {
    var now = new Date();
    var hh  = String(now.getUTCHours()).padStart(2, "0");
    var mm  = String(now.getUTCMinutes()).padStart(2, "0");
    var ss  = String(now.getUTCSeconds()).padStart(2, "0");
    document.getElementById("reloj").textContent = hh + ":" + mm + ":" + ss + "Z";
}
setInterval(actualizarReloj, 1000);
actualizarReloj();


// ─────────────────────────────────────────────────────────────────────────────
//  🚀  INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

renderizarLista(misiones);
