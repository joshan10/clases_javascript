const promesa = new Promise((resolve, reject) => {

setTimeout(() => {
    const exito = false;
    if (exito) resolve("¡Éxito 2!");
    else reject("Error");
}, 4000);
});

const promesa2 = new Promise((resolve, reject) => {

setTimeout(() => {
    const exito = true;
    if (exito) resolve("¡Éxito 1!");
    else reject("Error");
}, 2000);
});


promesa.then(r => console.log(r)).catch(e => console.error(e));
promesa2.then(r => console.log(r)).catch(e => console.error(e));