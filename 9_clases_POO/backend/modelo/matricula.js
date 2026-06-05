class Matricula{
    
    #id;
    #costo;
    #promocion;
    #fecha;
    #carrera;

    /**
     * Constructor de la clase Animal
     * @param {int} id - identificador unico y secuencial de la matricula
     * @param {int} costo - Precio de la matricula
     * @param {string} promocion - el año de salida tenativo para esta matricula
     * @param {String} fecha - fecha del registro de la matricula
     * @param {String} carrera - carrera a la que se asigna la matricla
     */

    constructor(id, costo, promocion, fecha, carrera){
        this.#id = id;
        this.#costo = costo;
        this.#promocion = promocion;
        this.#fecha = fecha;
        this.#carrera = carrera;
    }

    getId(){
        return this.#id;
    }

    getCosto(){
        return this.#costo;
    }

    getPromocion(){
        return this.#promocion;
    }

    getFecha(){
        return this.#fecha;
    }

    getCarrera(){
        return this.#carrera;
    }

    setId(id){
        this.#id = id;
    }

    setCosto(costo){
        this.#costo = costo;
    }

    setPromocion(promocion){
        this.#promocion = promocion;
    }

    setFecha(fecha){
        this.#fecha = fecha;
    }

    setCarrera(carrera){
        this.#carrera = carrera;
    }

    mostrarInformacion(){
        return `Matricula ${this.#id}: Costo: ${this.#costo}, Promocion: ${this.#promocion}, Fecha: ${this.#fecha}, Carrera: ${this.#carrera}`;
    }

    

}

module.exports = Matricula;