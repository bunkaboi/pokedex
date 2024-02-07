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

function renderBaseStats() {
    let stats = currentPokemon['stats'];
    let statNames = document.getElementById('stat-Name');
    let statValues = document.getElementById('stat-Value');
    
    statNames.innerHTML = ``;
    statValues.innerHTML = ``;

    for (let i = 0; i  < stats.length; i++) {
        const statsNumber = stats[i];
        statNames.innerHTML += `
            <div>${statsNumber['stat']['name']}:</div>
            `;
        statValues.innerHTML += `
            <div class="progress" style="width: 200px">
                <div class="progress-bar" role="progressbar" aria-valuenow="${statsNumber['base_stat']}" 
                aria-valuemin="0" aria-valuemax="100" 
                style="width: ${statsNumber['base_stat']}%;">${statsNumber['base_stat']}
                </div>
            </div>  
            `;
    }
}

function renderAbout() {
    let stats = currentPokemon['stats'];
    let statNames = document.getElementById('stat-Name');
    let statValues = document.getElementById('stat-Value');
    
    statNames.innerHTML = ``;
    statValues.innerHTML = ``;

    for (let i = 0; i  < stats.length; i++) {
        const statsNumber = stats[i];
        statNames.innerHTML += `
            <div>${statsNumber['stat']['name']}:</div>
            `;
        statValues.innerHTML += `
            <div class="progress" style="width: 200px">
                <div class="progress-bar" role="progressbar" aria-valuenow="${statsNumber['base_stat']}" 
                aria-valuemin="0" aria-valuemax="100" 
                style="width: ${statsNumber['base_stat']}%;">${statsNumber['base_stat']}
                </div>
            </div>  
            `;
    }
}
