let loadedPokemon;
let currentPokemon;
let allTypes = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
    'unknown',
    'shadow'
];
let lightColorOfType = [
    '#b3ccff',
    '#d1e0e0',
    '#b3b3ff',
    '#ffb3ff',
    '#e0e0d1',
    '#d9d9d9',
    '#c6ecd9',
    '#ffb3d9',
    '#a6a6a6',
    '#ffb3b3',
    '#b3d1ff',
    '#c2f0c2',
    '#fff0b3',
    '#d1d1e0',
    '#b3f0ff',
    '#ecc6c6',
    '#595959',
    '#ffb3d9',
    '#f2f2f2',
    '#4d4d4d'
]
let darkColorOfType = [
    '#0044cc',
    '#527a7a',
    '#0000cc',
    '#cc00cc',
    '#7a7a52',
    '#666666',
    '#339966',
    '#cc0066',
    '#333333',
    '#cc0000',
    '#0052cc',
    '#29a329',
    '#cca300',
    '#52527a',
    '#00a3cc',
    '#993333',
    '#1a1a1a',
    '#cc0066',
    '#999999',
    '#000000'
]

VISIBLE_CLUSTER = 25
OFFSET = 0

async function loadPokemon() {
    let urlOfSet = `https://pokeapi.co/api/v2/pokemon/?offset=${OFFSET}&limit=${VISIBLE_CLUSTER}`;
    let responseSet = await fetch(urlOfSet);
    loadedPokemon = await responseSet.json();
    console.log('loaded Pokemon', loadedPokemon);

    renderClusterOfPokemon(loadedPokemon);
}

async function renderClusterOfPokemon(loadedPokemon) {
    document.getElementById('cluster-container').innerHTML = ``;

    for (let i = 0; i < loadedPokemon['results'].length; i++) {
        const pokeCard = loadedPokemon['results'][i];
        const pokemonName = pokeCard['name'];

        await renderCards(i, pokemonName);
    }
}

async function renderCards(i, pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let responsePokemon = await fetch(url);
    currentPokemon = await responsePokemon.json();
    console.log('loaded Pokemon', currentPokemon);

    let indexOfType = allTypes.indexOf(currentPokemon['types']['0']['type']['name']);

    document.getElementById('cluster-container').innerHTML += /*HTML*/`
            <div class="card-container" style="background-color: ${lightColorOfType[indexOfType]};" onclick="openCardDetail(${i})">
                <div id="card-header${i}" class="header" style="background-color: ${darkColorOfType[indexOfType]};"></div>
                <div id="visu-container${i}" class="visu-container"></div>
                <div id="card-footer${i}" class="footer" style="background-color: ${darkColorOfType[indexOfType]}; color: ${lightColorOfType[indexOfType]};"></div>
            </div>
        `;
    await renderCardHeaders(i, pokemonName);
    await renderCardVisuals(i, currentPokemon);
    await renderCardFooters(i, currentPokemon);
}

function renderCardHeaders(i, pokemonName) {

    document.getElementById(`card-header${i}`).innerHTML += /*HTML*/`
           <h3 id="pokemonName">${pokemonName}</h3>
        `;
}

function renderCardVisuals(i, currentPokemon) {
    let artwork = currentPokemon['sprites']['other']['home']['front_default'];

    document.getElementById(`visu-container${i}`).innerHTML = /*HTML*/`
            <img id="pokemonArtwork" class="pokemonArtwork" src="${artwork}" alt="Artwork">            
    `;
}

function renderCardFooters(i, currentPokemon) {
    let typeOfPokemon = currentPokemon['types']['0']['type']['name'];

    document.getElementById(`card-footer${i}`).innerHTML += /*HTML*/`
            <h4 id="pokemonName">${typeOfPokemon}</h4>
        `;
}

async function openCardDetail(i) {
    const pokeCard = loadedPokemon['results'][i];
    const pokemonName = pokeCard['name'];

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let responsePokemon = await fetch(url);
    currentPokemon = await responsePokemon.json();

    let cardDetail = document.getElementById('card-detail');
    let pokemonImage = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    console.log('check CurrentPokemonArray', currentPokemon);

    let indexOfType = allTypes.indexOf(currentPokemon['types']['0']['type']['name']);

    cardDetail.innerHTML = /*HTML*/`
        <div class="card-detail-background" onclick="closeCardDetail()"></div>
        <div class="card-detail-flex-center">
            <div class="card-detail-container" style="border-color: ${darkColorOfType[indexOfType]}; box-shadow: 0px 0px 40px 20px ${lightColorOfType[indexOfType]};">
                <div id="card-detail-header" class="card-detail-header" style="background-color: ${darkColorOfType[indexOfType]};">
                    <svg onclick="openPreviousCard(${i})"class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="white" d="M20 11H7.41l3.29-3.29A1 1 0 0 0 9.29 6.29L3.71 11.88a1 1 0 0 0 0 1.41l5.58 5.59a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L7.41 13H20a1 1 0 0 0 0-2z"/>
                    </svg>
                    <h1 style="color: ${lightColorOfType[indexOfType]};">${pokemonName}</h1>
                    <svg onclick="openNextCard(${i})" class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="white" d="M14.59 11H4a1 1 0 0 0 0 2h10.59l-3.29 3.29a1 1 0 1 0 1.42 1.42l5.59-5.59a1 1 0 0 0 0-1.42l-5.59-5.59a1 1 0 0 0-1.42 1.42L14.59 11z"/>
                    </svg>
                </div>

                <div id="card-detail-visu-container" class="card-detail-visu-container" style="background-color: ${lightColorOfType[indexOfType]};">
                    <img id="card-detail-pokemonArtwork" class="card-detail-pokemonArtwork" src="${pokemonImage}" alt="Artwork">            
                </div>

                <div class="info-container">
                    <div class="info-navbar">
                        <div id="info-navpoint-1" class="info-navpoint" onclick="renderAbout(${indexOfType})">About</div>
                        <div id="info-basestats" class="info-navpoint" onclick="renderBaseStats(${indexOfType})">Base Stats</div>
                        <div id="info-ability" class="info-navpoint" onclick="renderAbility(${indexOfType})">Ability</div>
                        <div id="info-moves" class="info-navpoint" onclick="renderMoves(${indexOfType})">Moves</div>
                    </div>
                    <div id="info-content-container" class="info-content-container"></div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('cluster-container').classList.add('cluster-blur');
}

function openNextCard(i) {
    if (i < ((OFFSET + VISIBLE_CLUSTER) - 1)) {
        i++;
        openCardDetail(i);
        }
}
 function openPreviousCard(i) {
    if (i > OFFSET) {
        i--;
        openCardDetail(i);
        }
 }

function closeCardDetail() {
    let cardDetail = document.getElementById('card-detail');
    cardDetail.innerHTML = ``;
    document.getElementById('cluster-container').classList.remove('cluster-blur');
}

function renderPokemonProfile() {

    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonArtwork').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function renderBaseStats(indexOfType) {
    let stats = currentPokemon['stats'];
    let infoContainer = document.getElementById('info-content-container');

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
                <div id="stat-bar" class="stat-bar" style="background-color: ${lightColorOfType[indexOfType]};">
                    <div class="stat-bar-progress" style="width: ${statsNumber['base_stat']}%; background-color: ${darkColorOfType[indexOfType]};"></div>
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
