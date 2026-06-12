const Animal = require('./Animal');

/**
 * Clase Mamifero que extiende de Animal
 * Representa un mamífero con características específicas
 */
class Mamifero extends Animal {
    /**
     * Constructor de la clase Mamifero
     * @param {string} nombre - Nombre del mamífero
     * @param {number} edad - Edad del mamífero en años
     * @param {string} especie - Especie del mamífero
     * @param {string} tipoPelaje - Tipo de pelaje del mamífero
     */
    #tipoPelaje;

    constructor(nombre, edad, especie, tipoPelaje) {
        super(nombre, edad, especie);
        this.#tipoPelaje = tipoPelaje;
    }

    set tipoPelaje(pelaje){
        this.#tipoPelaje = pelaje;
    }

    get tipoPelaje() {
        return this.#tipoPelaje;
    }

    /**
     * Método específico de mamíferos para amamantar a las crías
     * @returns {string} Descripción de la acción de amamantar
     */
    amamantar() {
        return `${this.nombre} está amamantando a sus crías`;
    }

    /**
     * Sobrescribe el método hacerSonido para mamíferos
     * @returns {string} Sonido específico de mamífero
     */
    hacerSonido() {
        return `${this.nombre} emite sonidos característicos de mamífero ${this.especie}`;
    }

    /**
     * Método para obtener información completa del mamífero
     * @returns {string} Información completa del mamífero
     */
    obtenerInfo() {
        return `${super.obtenerInfo()}, Tipo de pelaje: ${this.tipoPelaje}`;
    }
}

module.exports = Mamifero;
