const Persona = require('./persona');

class Estudiante extends Persona {

    /**
     * Constructor de la clase Estudiante
     * @param {int} id - identificador unico y secuencial de la persona
     * @param {string} primerNombre - el primer nombre de la persona
     * @param {string} segundoNombre - el segundo nombre de la persona
     * @param {string} primerApellido - el primer apellido de la persona
     * @param {string} segundoApellido - el segundo apellido de la persona
     * @param {string} tipoDocumento - el tipo de documento de la persona
     * @param {string} numeroDocumento - el numero de documento de la persona
     * @param {string} fechaNacimiento - la fecha de nacimiento de la persona
     * @param {Matricula} matricula - la matricula del estudiante
     * @param {Array} materias - el array de materias del estudiante
     */

    #matricula;
    #materias;

    constructor(id, primerNombre, segundoNombre, primerApellido, segundoApellido, tipoDocumento, numeroDocumento, fechaNacimiento, matricula, materias){
        super(id, primerNombre, segundoNombre, primerApellido, segundoApellido, tipoDocumento, numeroDocumento, fechaNacimiento);
        this.#matricula = matricula;
        this.#materias = materias;
    }

    getMatricula(){
        return this.#matricula;
    }

    setMaterias(materias){
        this.#materias = materias;
    }

    getMaterias(){
        return this.#materias;
    }

       
    setMatricula(matricula){
        this.#matricula = matricula;
    }

    mostrarInformacion(){
        return `Estudiante: 
            ${this.getPrimerNombre()} 
            ${this.getSegundoNombre()} 
            ${this.getPrimerApellido()} 
            ${this.getSegundoApellido()}, 
        Documento: 
            ${this.getTipoDocumento()} 
            ${this.getNumeroDocumento()}, 
        Fecha de Nacimiento: 
            ${this.getFechaNacimiento()}, 
        Matricula: 
            ${this.#matricula.getCarrera()} - 
            ${this.#matricula.getPromocion()}, 
        Materias: 
            ${this.#materias.map(materia => materia.getNombre()).join(', ')}`;
    }

}

module.exports = Estudiante;