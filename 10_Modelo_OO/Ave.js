const Animal = require('./Animal');

/**
 * Clase Ave que extiende de Animal
 * Representa un ave con características específicas
 */
class Ave extends Animal {
    /**
     * Constructor de la clase Ave
     * @param {string} nombre - Nombre del ave
     * @param {number} edad - Edad del ave en años
     * @param {string} especie - Especie del ave
     * @param {number} envergaduraAlas - Envergadura de las alas en centímetros
     */

    #envergaduraAlas;

    constructor(nombre, edad, especie, envergaduraAlas) {
        super(nombre, edad, especie);
        this.#envergaduraAlas = envergaduraAlas;
    }

    set envergaduraAlas(envergadura){
        this.#envergaduraAlas = envergadura;
    }

    get envergaduraAlas() {
        return this.#envergaduraAlas;
    }

    /**
     * Método específico de aves para volar
     * @returns {string} Descripción de la acción de volar
     */
    volar() {
        return `${this.nombre} está volando con una envergadura de ${this.envergaduraAlas} cm`;
    }

    /**
     * Sobrescribe el método hacerSonido para aves
     * @returns {string} Sonido específico de ave
     */
    hacerSonido() {
        return `${this.nombre} canta melodiosamente como ${this.especie}`;
    }

    /**
     * Método para obtener información completa del ave
     * @returns {string} Información completa del ave
     */
    obtenerInfo() {
        return `${super.obtenerInfo()}, Envergadura de alas: ${this.envergaduraAlas} cm`;
    }
}

module.exports = Ave;
