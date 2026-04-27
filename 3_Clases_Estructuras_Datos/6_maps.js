const map = new Map();
const objKey = { id: 1, nombre:"Mauro" };

map.set(objKey, "datos");
map.set(42, "numero");
map.set(true, "booleano");

console.log(map.get(42)); // "datos"