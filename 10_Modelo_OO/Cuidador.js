/**
 * Clase Cuidador
 * Representa un cuidador del zoológico
 */
class Cuidador {
    /**
     * Constructor de la clase Cuidador
     * @param {string} nombre - Nombre del cuidador
     * @param {number} anosExperiencia - Años de experiencia del cuidador
     */
    constructor(nombre, anosExperiencia) {
        this.nombre = nombre;
        this.anosExperiencia = anosExperiencia;
    }

    /**
     * Método para que el cuidador alimente a los animales
     * @param {Animal} animal - Animal a alimentar
     * @returns {string} Descripción de la acción de alimentar
     */
    alimentarAnimal(animal) {
        return `${this.nombre} está alimentando a ${animal.nombre}`;
    }

    /**
     * Método para que el cuidador cuide a los animales
     * @param {Animal} animal - Animal a cuidar
     * @returns {string} Descripción de la acción de cuidar
     */
    cuidarAnimal(animal) {
        return `${this.nombre} está cuidando a ${animal.nombre} (${animal.especie})`;
    }

    /**
     * Método para obtener información del cuidador
     * @returns {string} Información completa del cuidador
     */
    obtenerInfo() {
        return `Cuidador: ${this.nombre}, Experiencia: ${this.anosExperiencia} años`;
    }

    /**
     * Método para determinar si el cuidador es experimentado
     * @returns {boolean} True si tiene más de 5 años de experiencia
     */
    esExperimentado() {
        return this.anosExperiencia > 5;
    }
}

module.exports = Cuidador;
