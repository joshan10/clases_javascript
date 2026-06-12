const Cuidador = require('./Cuidador');

/**
 * Clase Jaula
 * Representa una jaula del zoológico donde se alojan los animales
 */
class Jaula {
    /**
     * Constructor de la clase Jaula
     * @param {number} numero - Número identificador de la jaula
     * @param {number} capacidad - Capacidad máxima de animales en la jaula
     * @param {Cuidador} cuidador - Cuidador asignado a la jaula
     */
    constructor(numero, capacidad, cuidador, animales=[]) {
        this.numero = numero;
        this.capacidad = capacidad;
        this.cuidador = cuidador;
        this.animales = animales; // Array para almacenar los animales en la jaula
    }

    /**
     * Método para agregar un animal a la jaula
     * @param {Animal} animal - Animal a agregar
     * @returns {boolean} True si se agregó exitosamente, false si la jaula está llena
     */
    agregarAnimal(animal) {
        if (this.animales.length < this.capacidad) {
            this.animales.push(animal);
            return true;
        }
        return false;
    }

    /**
     * Método para remover un animal de la jaula
     * @param {string} nombreAnimal - Nombre del animal a remover
     * @returns {boolean} True si se removió exitosamente, false si no se encontró
     */
    removerAnimal(nombreAnimal) {
        const index = this.animales.findIndex(animal => animal.nombre === nombreAnimal);
        if (index !== -1) {
            this.animales.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Método para obtener la lista de animales en la jaula
     * @returns {Array} Array de animales en la jaula
     */
    obtenerAnimales() {
        return this.animales;
    }

    /**
     * Método para verificar si la jaula está llena
     * @returns {boolean} True si la jaula está llena
     */
    estaLlena() {
        return this.animales.length >= this.capacidad;
    }

    /**
     * Método para obtener información de la jaula
     * @returns {string} Información completa de la jaula
     */
    obtenerInfo() {
        const animalesNombres = this.animales.map(animal => animal.nombre).join(', ');
        return `Jaula #${this.numero}, Capacidad: ${this.capacidad}, Ocupada: ${this.animales.length}/${this.capacidad}, ` +
               `Cuidador: ${this.cuidador.nombre}, Animales: [${animalesNombres}]`;
    }

    /**
     * Método para alimentar todos los animales de la jaula
     * @returns {Array} Array de mensajes de alimentación
     */
    alimentarTodosLosAnimales() {
        return this.animales.map(animal => this.cuidador.alimentarAnimal(animal));
    }
}

module.exports = Jaula;

