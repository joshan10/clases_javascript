/**
 * Clase base Animal
 * Representa un animal del zoológico con propiedades y comportamientos básicos
 */
class Animal {

    #nombre;
    #edad;
    #especie;

    /**
     * Constructor de la clase Animal
     * @param {string} nombre - Nombre del animal
     * @param {number} edad - Edad del animal en años
     * @param {string} especie - Especie del animal
     */

    constructor(nombre, edad, especie) {
        this.#nombre = nombre;
        this.#edad = edad;
        this.#especie = especie;
    }

    get nombre() {
        return this.#nombre;
    }

    get edad() {
        return this.#edad;
    }

    get especie() {
        return this.#especie;
    }

    /**
     * Método para que el animal haga sonido
     * @returns {string} Sonido genérico del animal
     */
    hacerSonido() {
        return `${this.nombre} hace un sonido característico de su especie ${this.especie}`;
    }

    /**
     * Método para que el animal coma
     * @returns {string} Descripción de la acción de comer
     */
    comer() {
        return `${this.nombre} está comiendo su alimento`;
    }

    /**
     * Método para obtener información del animal
     * @returns {string} Información completa del animal
     */
    obtenerInfo() {
        return `Animal: ${this.nombre}, Edad: ${this.edad} años, Especie: ${this.especie}`;
    }
}

module.exports = Animal;
