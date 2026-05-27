// Eventos: target + trigger + handler
const boton = document.getElementById("enviar");
const resultados = document.getElementById("resultados");

let contador = 0;

boton.addEventListener("click", (event) => {
    contador++;
    resultados.textContent = `Clic #${contador} en (${event.clientX}, ${event.clientY})`;
});

window.addEventListener("click", () => alert(`Click en pantalla en el eje x: ${clientX}, y eje Y: ${clientY}`));
