const usuario = {
    nombre: "Alex",
    edad: 28,
    saludar() {
        return `Hola, soy ${this.nombre}`;
    },

    cumplir() {
        this.edad++;
        return this.edad;
    }
};


console.log(usuario.saludar());
// → "Hola, soy Alex"
console.log(usuario.cumplir());