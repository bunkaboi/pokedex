let dataOverhead;




async function loadDataOverhead() {
    let firstURL = 'https://pokeapi.co/api/v2/pokemon/'
    let response = await fetch(firstURL);
    dataOverhead = await response.json();
    console.log('loaded Data', dataOverhead);


    renderPokemonProfile();
    renderTypeIcon();
}



function renderPokemonProfile() {

    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonArtwork').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function renderBaseStats() {
    let stats = currentPokemon['stats'];
    let infoContainer = document.getElementById('info-content-container');

    let typeNameFromAPI = currentPokemon['types'][0]['type']['name'];
    let index = elementIndex.indexOf(typeNameFromAPI);
    let colorLight = elementtypes[index][typeNameFromAPI][1];
    let colorDark = elementtypes[index][typeNameFromAPI][0];

    infoContainer.innerHTML = ``;

    infoContainer.innerHTML = /*HTML*/`
        <div id="info-stat-content-container"></div>
        `;

    let infoStatContainer = document.getElementById('info-stat-content-container');

    for (let i = 0; i  < stats.length; i++) {
        const statsNumber = stats[i];

        infoStatContainer.innerHTML += /*HTML*/`
        <div class="info-content-row">
            <div id="stat-Name" class="info-text">
                <div>${statsNumber['stat']['name']}:</div>
            </div>
            <div id="stat-Value" class="info-text">
                <div><b>${statsNumber['base_stat']}</b></div>
            </div>
            <div class="stat-bar-container">
                <div id="stat-bar" class="stat-bar" style="background-color: ${colorLight};">
                    <div class="stat-bar-progress" style="width: ${statsNumber['base_stat']}%; background-color: ${colorDark};"></div>
                </div>
            </div> 
        </div>
        `;
    }

}

function renderAbility() {
    let abilities = currentPokemon['abilities'];
    let infoContainer = document.getElementById('info-content-container');

    infoContainer.innerHTML = ``;

    for (let i = 0; i < abilities.length; i++) {
        const abilityArr = abilities[i];

        infoContainer.innerHTML += /*HTML*/`
            <div class="info-text">${abilityArr['ability']['name']}</div>
        `;
        
    }
}

function renderTypeIcon() {
    let types = currentPokemon['types'][0]['type'];
    let typeIcon = document.getElementById('type-icon')
    typeIcon.innerHTML = ``;
    typeIcon.innerHTML = `<div>${types['name']}</div>
    `;
}
