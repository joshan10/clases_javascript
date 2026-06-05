class Materia {

    #id;
    #nombre;
    #creditos;

    constructor(id, nombre, creditos) {
        this.#id = id;
        this.#nombre = nombre;
        this.#creditos = creditos;
    }

    getId() {
        return this.#id;
    }

    getNombre() {
        return this.#nombre;
    }

    getCreditos() {
        return this.#creditos;
    }

     setId(id) {
        this.#id = id;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }

    setCreditos(creditos) {
        this.#creditos = creditos;
    }

}

module.exports = Materia;