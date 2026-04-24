// --- CÓDIGO CON ERRORES PARA RESOLVER ---

//
function mostrarStatus() {
    const tanqueID = "T-400";
    console.log("Revisando: " + tanqueID); 
}

//
let nivelOxigeno = 100;
nivelOxigeno = 85; 

//
function iniciarProceso() {
    if (true) {
        let mensajeInterno = "OXÍGENO OK";
        document.getElementById('log-display').innerText = mensajeInterno;
    }
    // 
}

//
function sistemaDeControl() {
    let revisiones = 0;
    // Un closure debe retornar la función para mantener el vínculo permanente con su scope [9, 10].
    return function() {
        revisiones++;
        return "Revisiones totales: " + revisiones;
    }
}

// --- INTERACCIÓN ---
const control = sistemaDeControl();

document.getElementById('btn-iniciar').onclick = function() {
    iniciarProceso();
};

document.getElementById('btn-tanque').onclick = function() {
    // 
    document.getElementById('log-display').innerText = control();
};