async function obtenerPersonajes() {
    const url = "https://rickandmortyapi.com/api/character";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results[3].name);
    console.log(data.results[3].species);
    // → "Rick Sanchez"
    return data.results;
}
obtenerPersonajes()
.then(p => console.log(p.length));
// → 20 personajes
