// Importar todas las clases
const Animal = require('./Animal');
const Mamifero = require('./Mamifero');
const Ave = require('./Ave');
const Cuidador = require('./Cuidador');
const Jaula = require('./Jaula');

console.log('=== SISTEMA DE GESTIÓN DEL ZOOLÓGICO ===\n');

// Crear cuidadores
console.log('--- CREANDO CUIDADORES ---');
const cuidador1 = new Cuidador('María González', 8);
const cuidador2 = new Cuidador('Pedro Rodríguez', 3);
const cuidador3 = new Cuidador('Ana López', 12);

console.log(cuidador1.obtenerInfo());
console.log(cuidador2.obtenerInfo());
console.log(cuidador3.obtenerInfo());
console.log(`María es experimentada: ${cuidador1.esExperimentado()}`);
console.log(`Pedro es experimentado: ${cuidador2.esExperimentado()}\n`);


// Crear animales mamíferos
console.log('--- CREANDO MAMÍFEROS ---');
const leon = new Mamifero('Simba', 5, 'León', 'Melena dorada');
const elefante = new Mamifero('Dumbo', 12, 'Elefante africano', 'Piel gruesa');
const oso = new Mamifero('Baloo', 8, 'Oso pardo', 'Pelaje marrón');

console.log(leon.obtenerInfo());
console.log(leon.hacerSonido());
console.log(leon.comer());
console.log(leon.amamantar());
console.log('');

console.log(elefante.obtenerInfo());
console.log(elefante.hacerSonido());
console.log(elefante.amamantar());
console.log('');

// Crear animales aves
console.log('--- CREANDO AVES ---');
const aguila = new Ave('Águila Real', 3, 'Águila dorada', 220);
const loro = new Ave('Pepe', 2, 'Loro guacamayo', 95);
const flamenco = new Ave('Rosa', 4, 'Flamenco rosado', 140);

console.log(aguila.obtenerInfo());
console.log(aguila.hacerSonido());
console.log(aguila.volar());
console.log(aguila.comer());
console.log('');

console.log(loro.obtenerInfo());
console.log(loro.volar());
console.log('');

// Crear jaulas
console.log('--- CREANDO JAULAS ---');
const jaula1 = new Jaula(1, 2, cuidador1); // Jaula para felinos
const jaula2 = new Jaula(2, 3, cuidador2); // Jaula para aves
const jaula3 = new Jaula(3, 1, cuidador3); // Jaula para elefante

console.log(jaula1.obtenerInfo());
console.log(jaula2.obtenerInfo());
console.log(jaula3.obtenerInfo());
console.log('');

// Asignar animales a jaulas
console.log('--- ASIGNANDO ANIMALES A JAULAS ---');

// Jaula 1: Felinos
console.log(`Agregando ${leon.nombre} a jaula 1: ${jaula1.agregarAnimal(leon)}`);
console.log(`Agregando ${oso.nombre} a jaula 1: ${jaula1.agregarAnimal(oso)}`);

// Jaula 2: Aves
console.log(`Agregando ${aguila.nombre} a jaula 2: ${jaula2.agregarAnimal(aguila)}`);
console.log(`Agregando ${loro.nombre} a jaula 2: ${jaula2.agregarAnimal(loro)}`);
console.log(`Agregando ${flamenco.nombre} a jaula 2: ${jaula2.agregarAnimal(flamenco)}`);

// Jaula 3: Elefante
console.log(`Agregando ${elefante.nombre} a jaula 3: ${jaula3.agregarAnimal(elefante)}`);

console.log('');

// Mostrar estado de las jaulas
console.log('--- ESTADO ACTUAL DE LAS JAULAS ---');
console.log(jaula1.obtenerInfo());
console.log(`Jaula 1 está llena: ${jaula1.estaLlena()}`);
console.log('');

console.log(jaula2.obtenerInfo());
console.log(`Jaula 2 está llena: ${jaula2.estaLlena()}`);
console.log('');

console.log(jaula3.obtenerInfo());
console.log(`Jaula 3 está llena: ${jaula3.estaLlena()}`);
console.log('');

// Actividades de cuidado
console.log('--- ACTIVIDADES DE CUIDADO ---');

// Alimentar animales en jaula 1
console.log('Alimentando animales en jaula 1:');
const alimentacionJaula1 = jaula1.alimentarTodosLosAnimales();
alimentacionJaula1.forEach(mensaje => console.log('  ' + mensaje));
console.log('');

// Cuidado individual
console.log('Cuidado individual:');
console.log('  ' + cuidador2.cuidarAnimal(aguila));
console.log('  ' + cuidador3.cuidarAnimal(elefante));
console.log('');

// Intentar agregar un animal a una jaula llena
console.log('--- PRUEBA DE CAPACIDAD MÁXIMA ---');
const tigre = new Mamifero('Tony', 6, 'Tigre', 'Rayado naranja y negro');
console.log(`Intentando agregar ${tigre.nombre} a jaula 1 (llena): ${jaula1.agregarAnimal(tigre)}`);
console.log('');

// Remover un animal
console.log('--- REMOVIENDO ANIMALES ---');
console.log(`Removiendo ${oso.nombre} de jaula 1: ${jaula1.removerAnimal(oso.nombre)}`);
console.log(`Ahora agregando ${tigre.nombre} a jaula 1: ${jaula1.agregarAnimal(tigre)}`);
console.log('Estado final de jaula 1: ' + jaula1.obtenerInfo());
console.log('');

// Demostrar polimorfismo
console.log('--- DEMOSTRACIÓN DE POLIMORFISMO ---');
const animalesVariados = [leon, aguila, elefante, loro];

console.log('Todos los animales haciendo sonido:');
animalesVariados.forEach(animal => {
    console.log('  ' + animal.hacerSonido());
});

console.log('\nTodos los animales comiendo:');
animalesVariados.forEach(animal => {
    console.log('  ' + animal.comer());
});

console.log('\n=== FIN DE LA DEMOSTRACIÓN ===');
