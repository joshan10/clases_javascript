Persona = require('./modelo/Persona');

const persona1 = new Persona(1, 'Carlos', 'Andres', 'Gomez', 'Lopez', '1990-01-01', 34);

persona1.setPrimerNombre("Mauricio");
console.log(persona1.getId());
console.log(persona1.getPrimerNombre());