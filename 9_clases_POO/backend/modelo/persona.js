class Persona{

    #id;
    #primerNombre;
    #segundoNombre;
    #primerApellido;
    #segundoApellido;
    #tipoDocumento;
    #numeroDocumento;
    #fechaNacimiento;

    /**
     * Constructor de la clase Persona
     * @param {int} id - identificador unico y secuencial de la persona
     * @param {string} primerNombre - el primer nombre de la persona
     * @param {string} segundoNombre - el segundo nombre de la persona
     * @param {string} primerApellido - el primer apellido de la persona
     * @param {string} segundoApellido - el segundo apellido de la persona
     * @param {string} tipoDocumento - el tipo de documento de la persona
     * @param {string} numeroDocumento - el numero de documento de la persona
     * @param {string} fechaNacimiento - la fecha de nacimiento de la persona
     */

    constructor(id, primerNombre, segundoNombre, primerApellido, segundoApellido, tipoDocumento, numeroDocumento, fechaNacimiento){
        this.#id = id;
        this.#primerNombre = primerNombre;
        this.#segundoNombre = segundoNombre;
        this.#primerApellido = primerApellido;
        this.#segundoApellido = segundoApellido;
        this.#tipoDocumento = tipoDocumento;
        this.#numeroDocumento = numeroDocumento;
        this.#fechaNacimiento = fechaNacimiento;
    }

    getId(){
        return this.#id;
    }

    getPrimerNombre(){
        return this.#primerNombre;
    }

    getSegundoNombre(){
        return this.#segundoNombre;
    }

    getPrimerApellido(){
        return this.#primerApellido;
    }

    getSegundoApellido(){
        return this.#segundoApellido;
    }

    getTipoDocumento(){
        return this.#tipoDocumento;
    }

    getNumeroDocumento(){
        return this.#numeroDocumento;
    }

    getFechaNacimiento(){
        return this.#fechaNacimiento;
    }

    setId(id){
        this.#id = id;
    }

    setPrimerNombre(primerNombre){
        this.#primerNombre = primerNombre;
    }

    setSegundoNombre(segundoNombre){
        this.#segundoNombre = segundoNombre;
    }

    setPrimerApellido(primerApellido){
        this.#primerApellido = primerApellido;
    }

    setSegundoApellido(segundoApellido){
        this.#segundoApellido = segundoApellido;
    }

    setTipoDocumento(tipoDocumento){
        this.#tipoDocumento = tipoDocumento;
    }

    setNumeroDocumento(numeroDocumento){
        this.#numeroDocumento = numeroDocumento;
    }

    setFechaNacimiento(fechaNacimiento){
        this.#fechaNacimiento = fechaNacimiento;
    }

}

module.exports = Persona;