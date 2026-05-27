// 1. **Galería de Imágenes Dinámica** (Selección y Atributos)
// Enunciado: Crea una página que muestre una imagen principal y tres miniaturas debajo.
// - Utiliza `querySelectorAll()` para seleccionar todas las miniaturas y `querySelector()` para la imagen principal.
// - Programa un **EventListener** de tipo clic para que, al presionar cualquier miniatura, el atributo `src` de la imagen principal se actualice dinámicamente.

const imagenPrincipal = document.getElementById('imagen-principal')
const imagenesMiniaturas = document.querySelectorAll(".miniatura")
const description = document.getElementById('descripcion')

imagenesMiniaturas.forEach((miniatura) => {
    miniatura.addEventListener("click", ()=>{
        imagenPrincipal.src = miniatura.dataset.src
        description.textContent = miniatura.dataset.texto
    
    imagenesMiniaturas.forEach((miniatura) => {
        miniatura.addEventListener("click", () => {

        // 1. quitar la clase activa de todas
        imagenesMiniaturas.forEach((item) => {
            item.classList.remove("activa");
        });

        // 2. agregar activa a la clickeada
        miniatura.classList.add("activa");

    });

});
})
})