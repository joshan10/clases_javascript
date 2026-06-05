// =============================================================================
// SERVIDOR BACKEND CON NODE.JS — Programación Orientada a Objetos (POO)
// =============================================================================
// Node.js incluye módulos nativos que podemos usar sin instalar nada.
// "fs"   → File System: permite leer y escribir archivos del disco.
// "http" → permite crear un servidor web que escucha peticiones HTTP.
// "path" → ayuda a construir rutas de archivos de forma segura entre sistemas
//          operativos (Windows usa \ y Mac/Linux usan /).
// =============================================================================

const fs   = require('fs');
const http = require('http');
const path = require('path');

// -----------------------------------------------------------------------------
// IMPORTAR LAS CLASES (Modelos)
// -----------------------------------------------------------------------------
// Para poder crear objetos necesitamos las "plantillas" (clases).
// require() carga el archivo y devuelve lo que ese archivo exportó
// con module.exports. Así compartimos código entre archivos.
// -----------------------------------------------------------------------------

const Materia    = require('./modelo/materia');
const Matricula  = require('./modelo/matricula');
const Estudiante = require('./modelo/estudiante');

// -----------------------------------------------------------------------------
// FUNCIÓN: cargarEstudiantes()
// -----------------------------------------------------------------------------
// Esta función lee el archivo JSON del disco y convierte cada registro
// (que es un objeto plano de JavaScript) en una instancia real de la clase
// Estudiante, con sus objetos Matricula y Materia anidados.
//
// ¿Por qué necesitamos hacer esto?
//   Un archivo JSON guarda datos como texto. Cuando lo leemos obtenemos
//   objetos literales ({ llave: valor }), pero esos objetos NO tienen los
//   métodos de nuestras clases (getMaterias(), mostrarInformacion(), etc.).
//   Al instanciarlos con "new" les "damos vida" con todos sus comportamientos.
// -----------------------------------------------------------------------------

function cargarEstudiantes() {

    // -------------------------------------------------------------------------
    // PASO 1: Construir la ruta absoluta al archivo JSON
    // -------------------------------------------------------------------------
    // __dirname es una variable especial de Node que contiene la ruta del
    // directorio donde vive el archivo actual (app.js).
    // path.join() une segmentos de ruta respetando el sistema operativo.
    // -------------------------------------------------------------------------
    const rutaArchivo = path.join(__dirname, 'datos', 'estudiantes.json');

    // -------------------------------------------------------------------------
    // PASO 2: Leer el archivo de forma síncrona
    // -------------------------------------------------------------------------
    // readFileSync() bloquea Node hasta terminar de leer el archivo completo.
    // Devuelve el contenido como texto (string) en la codificación indicada.
    // Usamos 'utf-8' para leer caracteres especiales como tildes y ñ.
    // -------------------------------------------------------------------------
    const contenidoTexto = fs.readFileSync(rutaArchivo, 'utf-8');

    // -------------------------------------------------------------------------
    // PASO 3: Convertir el texto JSON en un arreglo de objetos JavaScript
    // -------------------------------------------------------------------------
    // JSON.parse() transforma el string en la estructura de datos real.
    // Resultado: un arreglo de objetos literales, p.ej.:
    //   [ { id: 1, primerNombre: "Juan", materias: [...], ... }, ... ]
    // -------------------------------------------------------------------------
    const registros = JSON.parse(contenidoTexto);

    // -------------------------------------------------------------------------
    // PASO 4: Mapear cada registro a una instancia real de Estudiante
    // -------------------------------------------------------------------------
    // Array.map() recorre el arreglo y transforma cada elemento aplicando
    // la función que le pasamos. El resultado es un nuevo arreglo del mismo
    // tamaño donde cada elemento ya es un objeto de la clase correspondiente.
    // -------------------------------------------------------------------------
    const estudiantes = registros.map(function(registro) {

        // ---------------------------------------------------------------------
        // 4a. Instanciar las Materias del estudiante
        // ---------------------------------------------------------------------
        // registro.materias es un arreglo de objetos planos.
        // Con otro map() creamos un objeto Materia por cada uno,
        // pasando sus propiedades al constructor: (id, nombre, creditos).
        // ---------------------------------------------------------------------
        const materias = registro.materias.map(function(datoMateria) {
            return new Materia(
                datoMateria.id,
                datoMateria.nombre,
                datoMateria.creditos
            );
        });

        // ---------------------------------------------------------------------
        // 4b. Instanciar la Matricula del estudiante
        // ---------------------------------------------------------------------
        // registro.matricula es un objeto plano con los datos de la matrícula.
        // Le pasamos sus cinco propiedades al constructor de Matricula.
        // ---------------------------------------------------------------------
        const matricula = new Matricula(
            registro.matricula.id,
            registro.matricula.costo,
            registro.matricula.promocion,
            registro.matricula.fecha,
            registro.matricula.carrera
        );

        // ---------------------------------------------------------------------
        // 4c. Instanciar el Estudiante con todos sus datos
        // ---------------------------------------------------------------------
        // Ahora que tenemos los objetos Materia[] y Matricula listos,
        // podemos crear el Estudiante completo. El constructor de Estudiante
        // recibe: id, primerNombre, segundoNombre, primerApellido,
        //         segundoApellido, tipoDocumento, numeroDocumento,
        //         fechaNacimiento, matricula, materias
        // ---------------------------------------------------------------------
        return new Estudiante(
            registro.id,
            registro.primerNombre,
            registro.segundoNombre,
            registro.primerApellido,
            registro.segundoApellido,
            registro.tipoDocumento,
            registro.numeroDocumento,
            registro.fechaNacimiento,
            matricula,
            materias
        );
    });

    return estudiantes;
}

// =============================================================================
// INICIO DEL SERVIDOR
// =============================================================================
// Cargamos los estudiantes UNA sola vez al arrancar el servidor.
// Esto es eficiente: no leemos el archivo en cada petición, sino al inicio.
// La lista queda en memoria y responde instantáneamente a las solicitudes.
// =============================================================================

const listaEstudiantes = cargarEstudiantes();

// Confirmamos en consola cuántos objetos se instanciaron correctamente
console.log(`\n✅ Se cargaron ${listaEstudiantes.length} estudiantes desde el archivo JSON.\n`);

// Mostramos la información de cada estudiante usando el método de la clase
listaEstudiantes.forEach(function(estudiante) {
    console.log(estudiante.mostrarInformacion());
    console.log('---');
});

// -----------------------------------------------------------------------------
// CREAR EL SERVIDOR HTTP
// -----------------------------------------------------------------------------
// http.createServer() crea un servidor. Cada vez que llegue una petición
// HTTP, Node ejecuta la función callback que recibe:
//   req → objeto con la información de la petición (URL, método, etc.)
//   res → objeto con el que construimos y enviamos la respuesta
// -----------------------------------------------------------------------------

const PUERTO = 3000;

// -----------------------------------------------------------------------------
// CABECERAS CORS
// -----------------------------------------------------------------------------
// CORS (Cross-Origin Resource Sharing) permite que el navegador acepte
// respuestas de un servidor con origen distinto al de la página que hizo
// la petición (diferente puerto, dominio o protocolo).
// Sin estas cabeceras el navegador bloquea la respuesta aunque el servidor
// la envíe correctamente.
// -----------------------------------------------------------------------------
const CABECERAS_CORS = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};

const servidor = http.createServer(function(req, res) {

    // -------------------------------------------------------------------------
    // PREFLIGHT: el navegador envía OPTIONS antes de toda petición cross-origin
    // para preguntar si el servidor la permite. Respondemos 204 (sin contenido)
    // con las cabeceras CORS y cortamos aquí.
    // -------------------------------------------------------------------------
    if (req.method === 'OPTIONS') {
        res.writeHead(204, CABECERAS_CORS);
        res.end();
        return;
    }

    // -------------------------------------------------------------------------
    // ENRUTAMIENTO: decidir qué responder según la URL solicitada
    // -------------------------------------------------------------------------
    // req.url contiene la ruta pedida por el cliente, por ejemplo "/estudiantes"
    // -------------------------------------------------------------------------

    if (req.method === 'GET' && req.url === '/estudiantes') {

        // Indicamos que la respuesta es JSON con código 200 (OK)
        // e incluimos las cabeceras CORS para que el navegador acepte la respuesta.
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', ...CABECERAS_CORS });

        // JSON.stringify() convierte el arreglo de objetos en texto JSON.
        // El segundo argumento null y el tercero 2 formatean el JSON con
        // indentación de 2 espacios para que sea legible.
        // Usamos map() para serializar solo las propiedades relevantes,
        // ya que los campos privados (#campo) no son visibles por JSON.stringify.
        const respuesta = listaEstudiantes.map(function(est) {
            return {
                id:               est.getId(),
                primerNombre:     est.getPrimerNombre(),
                segundoNombre:    est.getSegundoNombre(),
                primerApellido:   est.getPrimerApellido(),
                segundoApellido:  est.getSegundoApellido(),
                tipoDocumento:    est.getTipoDocumento(),
                numeroDocumento:  est.getNumeroDocumento(),
                fechaNacimiento:  est.getFechaNacimiento(),
                matricula: {
                    id:       est.getMatricula().getId(),
                    costo:    est.getMatricula().getCosto(),
                    promocion:est.getMatricula().getPromocion(),
                    fecha:    est.getMatricula().getFecha(),
                    carrera:  est.getMatricula().getCarrera()
                },
                materias: est.getMaterias().map(function(mat) {
                    return {
                        id:       mat.getId(),
                        nombre:   mat.getNombre(),
                        creditos: mat.getCreditos()
                    };
                })
            };
        });

        res.end(JSON.stringify(respuesta, null, 2));

    } else {

        // Si la URL no coincide con ninguna ruta conocida, respondemos 404
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8', ...CABECERAS_CORS });
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));

    }
});

// -----------------------------------------------------------------------------
// PONER EL SERVIDOR A ESCUCHAR EN EL PUERTO INDICADO
// -----------------------------------------------------------------------------
// listen() inicia el servidor. La función callback se ejecuta una sola vez
// cuando el servidor está listo para recibir peticiones.
// Abre el navegador en: http://localhost:3000/estudiantes
// -----------------------------------------------------------------------------

servidor.listen(PUERTO, function() {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PUERTO}`);
    console.log(`📋 Lista de estudiantes disponible en: http://localhost:${PUERTO}/estudiantes\n`);
});
