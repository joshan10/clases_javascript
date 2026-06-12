const URL = "http://localhost:3000/estudiantes";

function cargarEstudiantes() {
    const seccion = document.getElementById('listadoEstudiantes');

    if (!seccion) {
        return;
    }

    // mode: 'cors' le indica al navegador que debe incluir las cabeceras
    // CORS en la petición y aceptar la respuesta solo si el servidor las devuelve.
    fetch(URL, { mode: 'cors' })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(estudiantes) {
            seccion.innerHTML = '';

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

function parsearMaterias(texto) {
    if (!texto) {
        return [];
    }

    return texto.split('\n')
        .map(function(linea) { return linea.trim(); })
        .filter(function(linea) { return linea.length > 0; })
        .map(function(linea) {
            const separador = linea.includes(':') ? ':' : ',';
            const partes = linea.split(separador).map(function(parte) { return parte.trim(); });
            return {
                nombre: partes[0] || '',
                creditos: Number(partes[1]) || 0
            };
        })
        .filter(function(materia) { return materia.nombre.length > 0; });
}

function prepararFormulario() {
    const formulario = document.getElementById('formularioEstudiante');
    const mensaje = document.getElementById('mensajeFormulario');

    if (!formulario) {
        return;
    }

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const datos = {
            primerNombre: formulario.primerNombre.value.trim(),
            segundoNombre: formulario.segundoNombre.value.trim(),
            primerApellido: formulario.primerApellido.value.trim(),
            segundoApellido: formulario.segundoApellido.value.trim(),
            tipoDocumento: formulario.tipoDocumento.value.trim(),
            numeroDocumento: formulario.numeroDocumento.value.trim(),
            fechaNacimiento: formulario.fechaNacimiento.value,
            matricula: {
                costo: formulario.costoMatricula.value,
                promocion: formulario.promocionMatricula.value.trim(),
                fecha: formulario.fechaMatricula.value,
                carrera: formulario.carreraMatricula.value.trim()
            },
            materias: parsearMaterias(formulario.materias.value)
        };

        fetch(URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(function(respuesta) {
                if (!respuesta.ok) {
                    throw new Error('No se pudo guardar el estudiante.');
                }
                return respuesta.json();
            })
            .then(function(respuesta) {
                if (mensaje) {
                    mensaje.textContent = respuesta.mensaje || 'Estudiante guardado correctamente.';
                    mensaje.classList.remove('mensaje-error');
                    mensaje.classList.add('mensaje-exito');
                }
                formulario.reset();
            })
            .catch(function(error) {
                if (mensaje) {
                    mensaje.textContent = error.message || 'Error al guardar el estudiante.';
                    mensaje.classList.remove('mensaje-exito');
                    mensaje.classList.add('mensaje-error');
                }
            });
    });
}

cargarEstudiantes();
prepararFormulario();
