const f = ["Manzana", "Banana", "Naranja", "Pera"];
f.push("Kiwi");

console.log(f.length);
console.log(f[2]);
var total = f.length;
console.log(f[total-1]);

// Métodos esenciales


console.log(f.map(x => x.toUpperCase()));
console.log(f.filter(x => x.length > 6));
console.log(f.find(x => x === 'Banana'));
f.reduce((a,b) => a+','+b);