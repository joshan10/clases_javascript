// =============================================================================
//  🍽️  SABORES & CO — MENÚ DIGITAL DE RESTAURANTE
//  Estilo Visual : Flat Design · Tipografía Google Sans (Nunito)
//  Conceptos JS  : Variables · Tipos de Datos · Estructuras de Datos
//
//  🐛 ESTE ARCHIVO CONTIENE 5 ERRORES INTENCIONALES.
//     Usa F12 → Console y F12 → Sources para detectarlos.
//     Cada error tiene un comentario 🐛 con la lección de referencia.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  🍴  DATOS: CARTA DEL RESTAURANTE
// ─────────────────────────────────────────────────────────────────────────────

const carta = [
    {
        id: 1,
        nombre: "Ceviche Clásico",
        categoria: "entradas",
        emoji: "🍤",
        precio: 28000,
        ingredientes: ["Camarón", "Limón", "Cilantro", "Ají"],
        descripcion: "Mariscos frescos marinados en limón con ají y cilantro.",
        vegano: false,
        disponible: true
    },
    {
        id: 2,
        nombre: "Ensalada del Huerto",
        categoria: "entradas",
        emoji: "🥗",
        precio: 22000,
        ingredientes: ["Lechuga", "Tomate", "Aguacate", "Aceite de oliva"],
        descripcion: "Vegetales de temporada con aderezo de mostaza y miel.",
        vegano: true,
        disponible: true
    },
    {
        id: 3,
        nombre: "Lomo al Trapo",
        categoria: "principales",
        emoji: "🥩",
        precio: 65000,
        ingredientes: ["Lomo de res", "Sal gruesa", "Hierbas aromáticas"],
        // 🐛 ERROR 4
        //    La descripción de este plato no aparece en la tarjeta
        //    aunque el dato está declarado en el objeto.
        //    Revisa: Unidad 2 — 6_undefined.js
        descipcion: "Filete de res envuelto en tela y cocinado al carbón.",
        vegano: false,
        disponible: true
    },
    {
        id: 4,
        nombre: "Pasta Primavera",
        categoria: "principales",
        emoji: "🍝",
        precio: 38000,
        ingredientes: ["Pasta artesanal", "Calabacín", "Tomate cherry", "Albahaca"],
        descripcion: "Pasta salteada con vegetales de estación y aceite de oliva.",
        vegano: true,
        disponible: true
    },
    {
        id: 5,
        nombre: "Bandeja Paisa",
        categoria: "principales",
        emoji: "🫘",
        precio: 48000,
        ingredientes: ["Fríjoles rojos", "Arroz", "Chicharrón", "Huevo", "Chorizo"],
        descripcion: "El plato insignia de la gastronomía antioqueña.",
        vegano: false,
        disponible: true
    },
    {
        id: 6,
        nombre: "Tiramisú",
        categoria: "postres",
        emoji: "🍮",
        precio: 18000,
        ingredientes: ["Mascarpone", "Café espresso", "Bizcochos savoiardi"],
        descripcion: "Clásico italiano con café y mascarpone artesanal.",
        vegano: false,
        disponible: true
    },
    {
        id: 7,
        nombre: "Sorbete de Maracuyá",
        categoria: "postres",
        emoji: "🍧",
        precio: 15000,
        ingredientes: ["Maracuyá natural", "Azúcar de coco"],
        descripcion: "Sorbete refrescante hecho con maracuyá 100% natural.",
        vegano: true,
        disponible: true
    },
    {
        id: 8,
        nombre: "Limonada de Coco",
        categoria: "bebidas",
        emoji: "🥤",
        precio: 12000,
        ingredientes: ["Limón", "Leche de coco", "Hielo"],
        descripcion: "Bebida refrescante con leche de coco y limón fresco.",
        vegano: true,
        disponible: true
    }
];

const categorias = ["todas", "entradas", "principales", "postres", "bebidas"];

var carrito = [];

// 🐛 ERROR 3
//    El acumulador del total del pedido no suma correctamente
//    cuando se agregan los precios de cada plato.
//    Revisa: Unidad 3 — 2_conversion_explicita.js
var totalPedido = "0";


// ─────────────────────────────────────────────────────────────────────────────
//  🗂️  FUNCIÓN: renderizarCategorias()
//  Genera los botones de filtro por categoría.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarCategorias() {
    var nav = document.getElementById("categoriaTabs");
    nav.innerHTML = "";

    // 🐛 ERROR 1
    //    Al hacer clic en cualquiera de los botones, todos ejecutan
    //    la misma acción y no filtran de forma independiente.
    //    Revisa: Unidad 1 — 8_closure.js
    for (var i = 0; i < categorias.length; i++) {
        var btn = document.createElement("button");
        btn.className   = "tab-btn" + (i === 0 ? " active" : "");
        btn.textContent = categorias[i].charAt(0).toUpperCase() + categorias[i].slice(1);
        btn.onclick     = function () { filtrarPorCategoria(categorias[i]); };
        nav.appendChild(btn);
    }
}


// ─────────────────────────────────────────────────────────────────────────────
//  🍽️  FUNCIÓN: filtrarPorCategoria(cat)
// ─────────────────────────────────────────────────────────────────────────────

function filtrarPorCategoria(cat) {
    document.querySelectorAll(".tab-btn").forEach(function (b) {
        b.classList.toggle("active", b.textContent.toLowerCase() === cat);
    });

    var lista = cat === "todas"
        ? carta.filter(function (p) { return p.disponible; })
        : carta.filter(function (p) { return p.categoria === cat && p.disponible; });

    renderizarPlatos(lista);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🃏  FUNCIÓN: renderizarPlatos(lista)
//  Dibuja las tarjetas de platos en la cuadrícula principal.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarPlatos(lista) {
    var grid = document.getElementById("platosGrid");
    grid.innerHTML = "";

    if (lista.length === 0) {
        grid.innerHTML = '<p style="color:#5f6368;padding:24px;font-size:15px">No hay platos en esta categoría.</p>';
        return;
    }

    lista.forEach(function (plato) {

        // 🐛 ERROR 2
        //    Los ingredientes del plato nunca se muestran en la tarjeta,
        //    aunque el array tiene contenido en todos los objetos.
        //    Revisa: Unidad 3 — 8_colecciones_indexadas.js
        var ingredientesHTML = "";
        if (typeof plato.ingredientes === "array") {
            ingredientesHTML = plato.ingredientes
                .map(function (ing) { return '<span class="tag">' + ing + '</span>'; })
                .join("");
        }

        // 🐛 ERROR 5
        //    La condición que verifica el descuento nunca funciona como se espera,
        //    por la forma en que se usa el operador typeof.
        //    Revisa: Unidad 2 — 9_typeOf.js
        var precioMostrar = "$" + plato.precio.toLocaleString("es-CO");
        if (typeof plato.descuento === undefined) {
            precioMostrar = "$" + plato.precio.toLocaleString("es-CO");
        } else {
            var precioFinal = plato.precio * (1 - plato.descuento);
            precioMostrar = "$" + precioFinal.toLocaleString("es-CO");
        }

        var card = document.createElement("div");
        card.className = "plato-card";
        card.innerHTML =
            '<div class="plato-emoji">' + plato.emoji + '</div>' +
            '<div class="plato-body">' +
                '<div class="plato-nombre">' + plato.nombre + '</div>' +
                '<div class="plato-tags">'   + ingredientesHTML + '</div>' +
                '<div class="plato-desc">'   + plato.descripcion + '</div>' +
                '<div class="plato-footer">' +
                    '<span class="plato-precio">' + precioMostrar + '</span>' +
                    (plato.vegano ? '<span class="plato-vegano">🌿 Vegano</span>' : '') +
                '</div>' +
                '<button class="btn-agregar" onclick="agregarAlCarrito(' + plato.id + ')">Agregar al pedido</button>' +
            '</div>';
        grid.appendChild(card);
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  🛒  FUNCIÓN: agregarAlCarrito(id)
// ─────────────────────────────────────────────────────────────────────────────

function agregarAlCarrito(id) {
    var plato = carta.find(function (p) { return p.id === id; });
    if (!plato) return;

    var existente = carrito.find(function (item) { return item.id === id; });
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push(Object.assign({}, plato, { cantidad: 1 }));
    }

    actualizarCarrito();
    mostrarToast();
}


// ─────────────────────────────────────────────────────────────────────────────
//  💰  FUNCIÓN: actualizarCarrito()
//  Calcula el total y actualiza el panel de pedido.
// ─────────────────────────────────────────────────────────────────────────────

function actualizarCarrito() {
    var contenedor = document.getElementById("carritoItems");
    var countEl    = document.getElementById("cartCount");
    var totalEl    = document.getElementById("cartTotal");

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="empty-cart">Agrega platos para comenzar.</p>';
        countEl.textContent  = 0;
        totalEl.textContent  = "$0";
        return;
    }

    // El error 3 se manifiesta al acumular los precios aquí.
    totalPedido = "0";
    carrito.forEach(function (item) {
        totalPedido = totalPedido + (item.precio * item.cantidad);

        var div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML =
            '<span class="cart-item-qty">×' + item.cantidad + '</span>' +
            '<span class="cart-item-name">' + item.nombre + '</span>' +
            '<span class="cart-item-price">$' +
                (item.precio * item.cantidad).toLocaleString("es-CO") +
            '</span>';
        contenedor.appendChild(div);
    });

    var totalItems = carrito.reduce(function (acc, item) { return acc + item.cantidad; }, 0);
    countEl.textContent = totalItems;
    totalEl.textContent = "$" + (typeof totalPedido === "number"
        ? totalPedido.toLocaleString("es-CO")
        : totalPedido);
}


// ─────────────────────────────────────────────────────────────────────────────
//  📱  FUNCIÓN: toggleCarrito()
// ─────────────────────────────────────────────────────────────────────────────

function toggleCarrito() {
    document.getElementById("carritoPanel").classList.toggle("open");
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔔  FUNCIÓN: mostrarToast()
// ─────────────────────────────────────────────────────────────────────────────

function mostrarToast() {
    var toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(function () { toast.classList.remove("show"); }, 2000);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🚀  INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

renderizarCategorias();
filtrarPorCategoria("todas");
