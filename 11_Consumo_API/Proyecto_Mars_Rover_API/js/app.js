/* =============================================================
 * app.js  —  CAPA DE INTERFAZ (UI)
 * -------------------------------------------------------------
 * Conecta el HTML con el servicio de api.js.
 * Aquí practicamos:
 *   - Eventos del DOM (submit, click)
 *   - Manipulación del DOM (mostrar/ocultar estados, crear contenido)
 *   - Consumir una función async y manejar éxito/error
 * ============================================================= */

// Esperamos a que el HTML esté listo antes de tocar el DOM.
document.addEventListener('DOMContentLoaded', () => {
  // --- Referencias a los elementos de la página ---
  const form = document.getElementById('search-form');
  const input = document.getElementById('photo-id');
  const boton = document.getElementById('search-btn');

  const loader = document.getElementById('loader');
  const errorBox = document.getElementById('error');
  const emptyBox = document.getElementById('empty');
  const card = document.getElementById('card');

  /* ---------------------------------------------------------
   * Helpers para controlar qué estado se ve en pantalla.
   * Solo uno debe estar visible a la vez.
   * --------------------------------------------------------- */
  function ocultarTodo() {
    loader.classList.add('hidden');
    errorBox.classList.add('hidden');
    emptyBox.classList.add('hidden');
    card.classList.add('hidden');
  }

  function mostrarCargando() {
    ocultarTodo();
    loader.classList.remove('hidden');
    boton.disabled = true; // evita peticiones repetidas mientras carga
  }

  function mostrarError(mensaje) {
    ocultarTodo();
    errorBox.textContent = `⚠️ ${mensaje}`;
    errorBox.classList.remove('hidden');
    boton.disabled = false;
  }

  /**
   * Pinta la tarjeta con los datos de la foto recibida.
   * @param {Object} foto  objeto `photo` devuelto por la API
   */
  function mostrarFoto(foto) {
    ocultarTodo();
    boton.disabled = false;

    // Construimos la tarjeta. Usamos textContent / atributos para
    // los datos del usuario (más seguro que innerHTML con datos externos).
    card.innerHTML = `
      <div class="card__media">
        <img class="card__img" src="${foto.img_src}" alt="Foto de Marte ${foto.id}" />
      </div>
      <div class="card__body">
        <span class="card__badge">${foto.rover.name}</span>
        <h3 class="card__title">Foto #${foto.id}</h3>
        <dl class="card__data">
          <div><dt>Cámara</dt><dd>${foto.camera.full_name}</dd></div>
          <div><dt>Sol (día marciano)</dt><dd>${foto.sol}</dd></div>
          <div><dt>Fecha en la Tierra</dt><dd>${foto.earth_date}</dd></div>
          <div><dt>Estado del rover</dt><dd>${foto.rover.status ?? 'No informado'}</dd></div>
        </dl>
        <a class="card__link" href="${foto.img_src}" target="_blank" rel="noopener">
          Ver imagen original ↗
        </a>
      </div>
    `;
    card.classList.remove('hidden');
  }

  /* ---------------------------------------------------------
   * Acción principal: buscar una foto por ID.
   * Es async porque dentro usamos await sobre el servicio.
   * --------------------------------------------------------- */
  async function buscarFoto(id) {
    mostrarCargando();
    try {
      const foto = await window.MarsRoverAPI.obtenerFotoPorId(id);
      mostrarFoto(foto);
    } catch (error) {
      // El servicio nos da mensajes claros en error.message.
      mostrarError(error.message);
    }
  }

  /* ---------------------------------------------------------
   * EVENTOS DEL DOM
   * --------------------------------------------------------- */

  // 1) Envío del formulario (cubre click en el botón y tecla Enter).
  form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // evita que la página se recargue
    const id = input.value.trim();
    if (id === '') {
      mostrarError('Escribe un ID de foto antes de buscar.');
      return;
    }
    buscarFoto(id);
  });

  // 2) Botones de ejemplo (los "chips"): rellenan y buscan al instante.
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.id;
      buscarFoto(chip.dataset.id);
    });
  });
});
