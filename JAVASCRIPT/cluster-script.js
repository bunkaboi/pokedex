VISIBLE_CLUSTER = 20;

OFFSET = 0;

async function getClusterOfPokemon() {
    let urlOfSet = `https://pokeapi.co/api/v2/pokemon/?offset=${OFFSET}&limit=${VISIBLE_CLUSTER}`;
    let responseSet = await fetch(urlOfSet);
    loadedArrayOfPokemon = await responseSet.json();
    console.log('loaded Set of Results to get Name', loadedArrayOfPokemon);
}

async function renderMainPage() {
    await getClusterOfPokemon();
    await renderSetOfPokemon(loadedArrayOfPokemon);
}

async function renderSetOfPokemon(loadedArrayOfPokemon) {
    let mainContent = document.getElementById('main-content-container')

    mainContent.innerHTML = ``;
    mainContent.innerHTML = /*HTML*/`
        <div id="cluster-container" class="cluster-container"></div>
        <div id="loading-direction" class="loading-direction-container">
        <a href="#" class="load-pokemon" onclick="loadPreviousPokemon()"><<<</a>
        <div>${OFFSET + 1}-${OFFSET + VISIBLE_CLUSTER} / ${loadedArrayOfPokemon['count']}</div>
        <a href="#" class="load-pokemon" onclick="loadMorePokemon()">>>></a>
        </div>
        `;
   for (let i = 0; i < loadedArrayOfPokemon['results'].length; i++) {
        const pokemonResults = loadedArrayOfPokemon['results'][i];
        const pokemonName = pokemonResults['name'];     
        await renderEachPokemon(pokemonName);
    };
}

async function loadMorePokemon() {
    OFFSET = OFFSET + VISIBLE_CLUSTER;
    
    document.getElementById('cluster-container').innerHTML += '';
    renderMainPage();
}

async function loadPreviousPokemon() {
    OFFSET = OFFSET -20;
    
    document.getElementById('cluster-container').innerHTML += '';
    renderMainPage();
}

async function renderEachPokemon(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let responsePokemon = await fetch(url);
    loadedPokemonInfo = await responsePokemon.json();
    console.log('loaded Info of Pokemon from Set of Results', loadedPokemonInfo);
    let pokemonNumber = loadedPokemonInfo['id'];

    await buildPokemonCluster(pokemonNumber);

    await renderPokeballs(loadedPokemonInfo, pokemonName, pokemonNumber);
}

function buildPokemonCluster(pokemonNumber) {
    document.getElementById('cluster-container').innerHTML += /*HTML*/`
    <div id="pokemon-container${pokemonNumber}" class="pokemon-container" onclick="openPokemonProfile(${pokemonNumber})"></div>
`;
}

function renderPokeballs(loadedPokemonInfo, pokemonName, pokemonNumber) {
    let artwork = loadedPokemonInfo['sprites']['other']['dream_world']['front_default'];
    let type1 = loadedPokemonInfo['types']['0']['type']['name'];
    let indexOfType1 = allTypes.indexOf(loadedPokemonInfo['types']['0']['type']['name']);
    
    if (secondTypeAvailiable()) {
        showPokeBallWithTwoTypes(artwork, type1, indexOfType1, pokemonName, pokemonNumber);
    } else {
        showPokeBallWithOneType(artwork, type1, indexOfType1, pokemonName, pokemonNumber);
    }
}

function secondTypeAvailiable() {
    return loadedPokemonInfo['types'].length > 1
}

function showPokeBallWithOneType(artwork, type1, indexOfType1, pokemonName, pokemonNumber) {
    return document.getElementById(`pokemon-container${pokemonNumber}`).innerHTML = /*HTML*/`
        <div class="pokeball-container">
            <img src="./img/pokeballopen.png" alt="">
            <div class="label-container">
                <div class="pokemon-label">
                    <div style="background-image: linear-gradient( to right bottom, ${darkColorOfType[indexOfType1]}, ${lightColorOfType[indexOfType1]}, ${darkColorOfType[indexOfType1]});" id="type-label-1${pokemonNumber}" class="type-label-1">
                        <img src="./img/${type1}.png" alt="">
                    </div>
                    ${pokemonName}
                </div>
            </div>
        </div>
        <img id="pokemonArtwork${pokemonNumber}" class="pokemonArtwork" src="${artwork}" alt="Artwork">      
        `;
}

function showPokeBallWithTwoTypes(artwork, type1, indexOfType1, pokemonName, pokemonNumber) {
    let type2 = loadedPokemonInfo['types']['1']['type']['name'];
    let indexOfType2 = allTypes.indexOf(loadedPokemonInfo['types']['1']['type']['name']);

    document.getElementById(`pokemon-container${pokemonNumber}`).innerHTML = /*HTML*/`
        <div class="pokeball-container">
            <img src="./img/pokeballopen.png" alt="">
            <div class="label-container">
                <div class="pokemon-label">
                    <div style="background-image: linear-gradient( to right bottom, ${darkColorOfType[indexOfType1]}, ${lightColorOfType[indexOfType1]}, ${darkColorOfType[indexOfType1]});" id="type-label-1${pokemonNumber}" class="type-label-1">
                        <img src="./img/${type1}.png" alt="">
                    </div>
                    ${pokemonName}
                    <div style="background-image: linear-gradient( to right bottom, ${darkColorOfType[indexOfType2]}, ${lightColorOfType[indexOfType2]}, ${darkColorOfType[indexOfType2]});" id="type-label-2${pokemonNumber}" class="type-label-2">
                        <img src="./img/${type2}.png" alt=""> 
                    </div>
                </div>
            </div>
        </div>
        <img id="pokemonArtwork${pokemonNumber}" class="pokemonArtwork" src="${artwork}" alt="Artwork">      
    `;
}

async function searchPokemon () {
    let search = document.getElementById('search-field').value;
    search = search.toLowerCase();
    if (search == '') {
        document.getElementById('cluster-container').innerHTML = ``;
        renderSetOfPokemon(loadedArrayOfPokemon);
    } else {
        pokemonName = search;
        
        document.getElementById('cluster-container').innerHTML = ``;
        document.getElementById('loading-direction').innerHTML = ``;
        renderEachPokemon(pokemonName);
    };
}

function clearSearch() {
    document.getElementById('search-field').value = '';
}
