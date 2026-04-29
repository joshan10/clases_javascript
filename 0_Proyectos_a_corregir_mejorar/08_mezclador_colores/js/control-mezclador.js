// =============================================================================
//  🎨  CHROMAMIX PRO — MEZCLADOR DE COLORES
//  Estilo Visual : Esqueuomorfismo (hardware analógico — estilo sampler digital)
//  Conceptos JS  : Variables · Tipos de Datos · Estructuras de Datos
//
//  🐛 ESTE ARCHIVO CONTIENE 5 ERRORES INTENCIONALES.
//     Usa F12 → Console y F12 → Sources para detectarlos.
//     Cada error tiene un comentario 🐛 con la lección de referencia.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  🎛️  DATOS: PALETAS PRESET
// ─────────────────────────────────────────────────────────────────────────────

const paletas = [
    { nombre: "Sunset",   r: 255, g: 94,  b: 58  },
    { nombre: "Ocean",    r: 0,   g: 119, b: 190 },
    { nombre: "Forest",   r: 34,  g: 139, b: 34  },
    { nombre: "Lavender", r: 150, g: 111, b: 214 },
    { nombre: "Gold",     r: 255, g: 193, b: 7   },
    { nombre: "Cherry",   r: 220, g: 38,  b: 38  }
];

// Límite de colores guardados en el historial
// 🐛 ERROR 1
//    El tipo de dato de esta constante es incompatible con las operaciones
//    numéricas que se realizan más adelante en guardarColor().
//    Revisa: Unidad 2 — 4_bigInt.js
const MAX_HISTORIAL = 12n;

// 🐛 ERROR 2
//    La colección usada para el historial no admite el método
//    que se llama al intentar agregar colores guardados.
//    Revisa: Unidad 3 — 5_sets_arrays.js
var historialColores = new Set();

// Variable global que representa el color actual en formato HEX
// 🐛 ERROR 4
//    Una función crea internamente una variable con este mismo nombre,
//    lo que hace que la variable global nunca se actualice.
//    Esto afecta al botón COPY HEX.
//    Revisa: Unidad 1 — 7_scope.js
var colorActual = "#808080";


// ─────────────────────────────────────────────────────────────────────────────
//  💡  FUNCIÓN: calcularBrillo(r, g, b)
//  Calcula la luminancia percibida de un color (escala 0–255).
// ─────────────────────────────────────────────────────────────────────────────

function calcularBrillo(r, g, b) {
    // 🐛 ERROR 3
    //    Las variables de ponderación no tienen sus valores asignados
    //    en el momento en que se usan para el cálculo.
    //    Revisa: Unidad 1 — 6_hoisting.js
    var luminancia = Math.round(r * pr + g * pg + b * pb);

    var pr = 0.299;
    var pg = 0.587;
    var pb = 0.114;

    return luminancia;
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔢  FUNCIÓN: calcularHex(r, g, b)
//  Convierte valores numéricos RGB a formato hexadecimal #RRGGBB.
// ─────────────────────────────────────────────────────────────────────────────

function calcularHex(r, g, b) {
    var rh = r.toString(16).padStart(2, "0");
    var gh = g.toString(16).padStart(2, "0");
    var bh = b.toString(16).padStart(2, "0");
    return "#" + rh + gh + bh;
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔄  FUNCIÓN: actualizarColor()
//  Lee los sliders y actualiza la pantalla LCD con los valores actuales.
// ─────────────────────────────────────────────────────────────────────────────

function actualizarColor() {
    // 🐛 ERROR 5
    //    Los valores leídos de los sliders producen un resultado inesperado
    //    al usarlos directamente en la función calcularBrillo().
    //    Revisa: Unidad 3 — 1_conversion_implicita.js
    var r = document.getElementById("sliderR").value;
    var g = document.getElementById("sliderG").value;
    var b = document.getElementById("sliderB").value;

    document.getElementById("valR").textContent = r;
    document.getElementById("valG").textContent = g;
    document.getElementById("valB").textContent = b;

    // Error 4: esta var local oculta la variable global colorActual.
    var colorActual = "rgb(" + r + ", " + g + ", " + b + ")";
    document.getElementById("colorPreview").style.backgroundColor = colorActual;

    var hex = calcularHex(Number(r), Number(g), Number(b));
    document.getElementById("lcdHex").textContent    = hex;
    document.getElementById("lcdValues").textContent = "R:" + r + " G:" + g + " B:" + b;

    // Error 5 se manifiesta aquí: r, g, b son strings → operación inesperada.
    var brillo = calcularBrillo(r, g, b);
    document.getElementById("brilloDisplay").textContent = isNaN(brillo) ? "---" : brillo;
}


// ─────────────────────────────────────────────────────────────────────────────
//  💾  FUNCIÓN: guardarColor()
//  Añade el color actual al historial de guardados.
// ─────────────────────────────────────────────────────────────────────────────

function guardarColor() {
    var hex = document.getElementById("lcdHex").textContent;
    if (!hex || hex.length !== 7) return;

    // Error 1 se manifiesta aquí: comparar Number con BigInt lanza TypeError.
    if (historialColores.size >= MAX_HISTORIAL) {
        alert("Historial lleno. Reinicia para guardar más colores.");
        return;
    }

    // Error 2 se manifiesta aquí: Set no tiene el método .push().
    historialColores.push(hex);
    renderizarHistorial();
}


// ─────────────────────────────────────────────────────────────────────────────
//  📋  FUNCIÓN: copiarHex()
//  Copia el color actual al portapapeles.
// ─────────────────────────────────────────────────────────────────────────────

function copiarHex() {
    // Error 4: colorActual (global) nunca se actualizó porque actualizarColor()
    // creó su propia variable local con el mismo nombre.
    navigator.clipboard.writeText(colorActual)
        .then(function ()  { mostrarMensaje("Copiado: " + colorActual); })
        .catch(function () { mostrarMensaje("Copiado: " + colorActual); });
}


// ─────────────────────────────────────────────────────────────────────────────
//  ↺  FUNCIÓN: resetColor()
//  Devuelve todos los sliders al valor central (128).
// ─────────────────────────────────────────────────────────────────────────────

function resetColor() {
    document.getElementById("sliderR").value = 128;
    document.getElementById("sliderG").value = 128;
    document.getElementById("sliderB").value = 128;
    actualizarColor();
}


// ─────────────────────────────────────────────────────────────────────────────
//  🎨  FUNCIÓN: renderizarHistorial()
//  Muestra los swatches guardados en el panel de historial.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarHistorial() {
    var contenedor = document.getElementById("historialSwatches");
    contenedor.innerHTML = "";

    if (historialColores.size === 0) {
        contenedor.innerHTML = '<span class="empty-hist">sin colores guardados</span>';
        return;
    }

    historialColores.forEach(function (hex) {
        var sw = document.createElement("div");
        sw.className              = "swatch";
        sw.style.backgroundColor  = hex;
        sw.title                  = hex;
        sw.onclick                = function () { cargarDesdeHex(hex); };
        contenedor.appendChild(sw);
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  📥  FUNCIÓN: cargarDesdeHex(hex)
//  Carga un color hexadecimal guardado o de preset a los sliders.
// ─────────────────────────────────────────────────────────────────────────────

function cargarDesdeHex(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    document.getElementById("sliderR").value = r;
    document.getElementById("sliderG").value = g;
    document.getElementById("sliderB").value = b;
    actualizarColor();
}


// ─────────────────────────────────────────────────────────────────────────────
//  🎛️  FUNCIÓN: renderizarPresets()
//  Renderiza los swatches de color de la sección de paletas preset.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarPresets() {
    var contenedor = document.getElementById("presetsRow");
    paletas.forEach(function (paleta) {
        var hex = calcularHex(paleta.r, paleta.g, paleta.b);
        var sw  = document.createElement("div");
        sw.className             = "swatch";
        sw.style.backgroundColor = hex;
        sw.title                 = paleta.nombre + " " + hex;
        sw.onclick               = function () {
            document.getElementById("sliderR").value = paleta.r;
            document.getElementById("sliderG").value = paleta.g;
            document.getElementById("sliderB").value = paleta.b;
            actualizarColor();
        };
        contenedor.appendChild(sw);
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  📢  FUNCIÓN: mostrarMensaje(msg)
// ─────────────────────────────────────────────────────────────────────────────

function mostrarMensaje(msg) {
    var el = document.getElementById("lcdHex");
    var original = el.textContent;
    el.textContent = msg;
    setTimeout(function () { el.textContent = original; }, 1500);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🚀  INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

renderizarPresets();
renderizarHistorial();
actualizarColor();
