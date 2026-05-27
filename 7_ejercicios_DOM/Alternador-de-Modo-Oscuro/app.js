// 2. **Alternador de "Modo Oscuro"** (Manipulación de Clases)
// Enunciado: Diseña una interfaz sencilla con un título, un párrafo y un botón de "Cambiar Modo".
// - Captura el botón mediante su ID usando `getElementById()`.
// - Al dispararse el evento de clic, usa el método `classList.toggle()` para añadir o quitar la clase CSS `.dark-mode` al `document.body`.

const btn = document.getElementById('btnModo')

btn.addEventListener("click", ()=>{
    document.body.classList.toggle("modo-oscuro")
})