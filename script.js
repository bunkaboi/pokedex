let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander'
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('loaded Pokemon', currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo() {

    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonArtwork').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function renderBasestats() {
    let stats = currentPokemon['stats'];
    let baseStats = document.getElementById('info-content');
    
    for (let i = 0; i  < stats.length; i++) {
        const statsNumber = stats[i];
        baseStats.innerHTML += `<div>${statsNumber['stat']['name']}: ${statsNumber['base_stat']}</div>`;
    }
}