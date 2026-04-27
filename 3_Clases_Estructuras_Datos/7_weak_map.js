let wm = new WeakMap();
let usuario = { name: 'Juan' };
let usuario2 = {name: "Maria"}

wm.set(usuario, "publico");
wm.set(usuario2, "privado");s

console.log(wm.get(usuario2)); // "privado"