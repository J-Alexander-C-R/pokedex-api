const botonBuscar = document.getElementById("buscarPokemon");
const inputPokemon = document.getElementById("pokemonInput");
const resultado = document.getElementById("pokemonResultado");

botonBuscar.addEventListener("click", () => {
    const nombrePokemon = inputPokemon.value.toLowerCase().trim();

    if (nombrePokemon === "") {
        resultado.innerHTML = "<p>Escribe el nombre de un Pokémon.</p>";
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon no encontrado");
            }
            return response.json();
        })
        .then(data => {
            mostrarPokemon(data);
        })
        .catch(error => {
            resultado.innerHTML = "<p>Pokémon no encontrado.</p>";
        });
});

function mostrarPokemon(pokemon) {
    resultado.innerHTML = `
        <h3>${pokemon.name.toUpperCase()}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Altura:</strong> ${pokemon.height}</p>
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
    `;
}
