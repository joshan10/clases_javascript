function contador() {
    let conteo = 0;
    return function() {
        conteo++;
        return conteo;
    };
}

const registrar = contador();
console.log(registrar());
console.log(registrar());
console.log(registrar());
console.log(registrar());