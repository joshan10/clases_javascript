const URL = "http://localhost:3000/estudiantes";

function cargarEstudiantes() {
    const seccion = document.getElementById('listadoEstudiantes');

    // mode: 'cors' le indica al navegador que debe incluir las cabeceras
    // CORS en la petición y aceptar la respuesta solo si el servidor las devuelve.
    fetch(URL, { mode: 'cors' })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(estudiantes) {
            estudiantes.forEach(function(est) {
                const div = document.createElement('div');

                const nombre = document.createElement('h2');
                nombre.textContent = `${est.primerNombre} ${est.segundoNombre} ${est.primerApellido} ${est.segundoApellido}`;

                const documento = document.createElement('span');
                documento.textContent = `${est.tipoDocumento}: ${est.numeroDocumento}`;

                const fechaNacimiento = document.createElement('span');
                fechaNacimiento.textContent = `Fecha de nacimiento: ${est.fechaNacimiento}`;

                const matricula = document.createElement('p');
                matricula.textContent = `Carrera: ${est.matricula.carrera} — ${est.matricula.promocion}`;

                const materias = document.createElement('p');
                const nombresMaterias = est.materias.map(function(mat) { return mat.nombre; }).join(', ');
                materias.textContent = `Materias: ${nombresMaterias}`;

                div.appendChild(nombre);
                div.appendChild(documento);
                div.appendChild(fechaNacimiento);
                div.appendChild(matricula);
                div.appendChild(materias);

                seccion.appendChild(div);
            });
        })
        .catch(function(error) {
            console.error('Error al cargar estudiantes:', error);
        });
}

cargarEstudiantes();
