

async function renderPokemonDetailsContainer(pokemonNumber) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    let responsePokemon = await fetch(url);
    loadedPokemonInfo = await responsePokemon.json();

    let artwork = loadedPokemonInfo['sprites']['other']['official-artwork']['front_default'];
    let indexOfType1 = allTypes.indexOf(loadedPokemonInfo['types']['0']['type']['name']);

    if(document.getElementById('cluster-container').classList.contains('cluster-blur-out')){
        document.getElementById('cluster-container').classList.remove('cluster-blur-out');
    }
    document.getElementById('cluster-container').classList.add('cluster-blur-in');

    let pokemonDetailsContainer = document.getElementById('pokemon-details-container');

    pokemonDetailsContainer.innerHTML = /*HTML*/`
    <div id="card-pokemon-image" class="card-pokemon-image-container">
        <img src="${artwork}" class="pokemon-image">
    </div>
    <div id="card-pokemon-information" class="card-pokemon-information-container" style="background-color: ${lightColorOfType[indexOfType1]}; border-color: ${darkColorOfType[indexOfType1]};"></div>
    `;
    renderPokemonInformation(loadedPokemonInfo);
}

function closePokemonImage() {
    document.getElementById('cluster-container').classList.remove('cluster-blur-in');
    document.getElementById('cluster-container').classList.add('cluster-blur-out');
    document.getElementById('card-pokemon-image').style = 'animation: close-card-pokemon 2s ease-in-out forwards;';
    document.getElementById('card-pokemon-information').style = 'animation: close-card-information 2s ease-in-out forwards;';
    setTimeout(hidePokemonDetailContainer, 2000);
}

function hidePokemonDetailContainer() {
    document.getElementById('pokemon-details-container').innerHTML = ``;
}

function renderPokemonInformation(loadedPokemonInfo) {
    let pokemonInfo = document.getElementById('card-pokemon-information');

    let height = loadedPokemonInfo['height'];
    let weight = loadedPokemonInfo['weight'];
    
    let name = loadedPokemonInfo['species']['name'];
    name = name.toUpperCase();
    let stats = loadedPokemonInfo['stats'];

    let pokePic = loadedPokemonInfo['sprites']['other']['official-artwork']['front_default'];
    let type1 = loadedPokemonInfo['types']['0']['type']['name'];
    let indexOfType1 = allTypes.indexOf(loadedPokemonInfo['types']['0']['type']['name']);

    if(loadedPokemonInfo['types'].length > 1) {
        let type2 = loadedPokemonInfo['types']['1']['type']['name'];
        let indexOfType2 = allTypes.indexOf(loadedPokemonInfo['types']['1']['type']['name']);
    };

    pokemonInfo.innerHTML = /*HTML*/`
        <div id="pokemon-name" class="pokemon-name" style="background-color: ${darkColorOfType[indexOfType1]};">${name}</div>
        <div id="navbar-container" class="navbar-container" style="background: linear-gradient( to bottom,${darkColorOfType[indexOfType1]} 0%,${lightColorOfType[indexOfType1]} 50%,${darkColorOfType[indexOfType1]} 100%);">
            <a href="#" id="about" onclick="renderAbout(${height}, ${weight}, '${type1}')">About</a>
            <a href="#" id="stats">Stats</a>
            <a href="#" id="moves">Moves</a>
        </div>
        <div id="pokemon-infos"></div>
        <div id="direction-container" class="direction-container" style="background-color: ${darkColorOfType[indexOfType1]};">
            <a href="#" onclick="closePokemonImage()">close</a>
        </div>
    `;
}

function renderAbout(height, weight, type1) {
    
    let infoContainer = document.getElementById('pokemon-infos');

    infoContainer.innerHTML = ``;

    infoContainer.innerHTML = /*HTML*/`
        <div id="info-about-content-container">
            
            <div class="info-content-row">
                <div class="info-text">
                    <div>Height:</div>
                </div>
                <div class="info-text-about">
                    <div><b>${height}"</b></div>
                </div>
            </div>
            <div class="info-content-row">
                <div class="info-text">
                    <div>Weight:</div>
                </div>
                <div class="info-text-about">
                    <div><b>${weight} lbs.</b></div>
                </div>
            </div>
            <div class="info-content-row">
                <div class="info-text">
                    <div>Type 1:</div>
                </div>
                <div class="info-text-about">
                    <div class="info-content-row"><b>${type1}</b>&nbsp;<img src="./img/${type1}.png" alt=""></div>
                </div>
            </div>
        </div>
        `;

        if (loadedPokemonInfo['types'].length > 1) {
            let type2 = loadedPokemonInfo['types']['1']['type']['name'];
            document.getElementById('info-about-content-container').innerHTML += /*HTML*/`
                <div class="info-content-row">
                <div class="info-text">
                    <div>Type 2:</div>
                </div>
                <div class="info-text-about">
                    <div class="info-content-row"><b>${type2}</b>&nbsp;<img src="./img/${type2}.png" alt=""></div>
                </div>
            </div>
            `;
        }; 
}






//alles vergessen - wir machen neu, anders, besser (Überlegung den Haupthintergrund zu animieren)
function openCardDetailAnimation(i) {
    document.getElementById(`pokemonArtwork${i}`).style.animation = 'openCard 2s ease-in forwards';
    setTimeout(openCardDetail, 1500, i);
}

function backInPokeball(i) {
    document.getElementById(`pokemonArtwork${i}`).style.animation = 'backInPokeball 1s ease-in-out forwards';
    setTimeout(removeCardDetailAnimation, 1000, i);
}

function removeCardDetailAnimation(i) {
    document.getElementById(`pokemonArtwork${i}`).style.animation = '';
}

async function openCardDetail(i) {
    let pokemonResults = loadedArrayOfPokemon['results'][i];
    let pokemonName = pokemonResults['name'];

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let responsePokemon = await fetch(url);
    loadedPokemonInfo = await responsePokemon.json();
    let pokemonImage = loadedPokemonInfo['sprites']['other']['official-artwork']['front_default'];

    let cardDetail = document.getElementById('card-detail');
    

    let indexOfType = allTypes.indexOf(loadedPokemonInfo['types']['0']['type']['name']);

    cardDetail.innerHTML = /*HTML*/`
        <div class="card-detail-background" onclick="closeCardDetail(${i})"></div>
        <div class="card-detail-flex-center">
            <div class="card-detail-container" style="box-shadow: 0px 0px 40px 20px ${darkColorOfType[indexOfType]};">
                <div id="card-detail-header" class="card-detail-header">
                    <h1>${pokemonName}</h1>
                </div>

                <div id="card-detail-pokemon-container" class="card-detail-pokemon-container">
                    <img id="card-detail-pokemonArtwork${i}" class="card-detail-pokemonArtwork" src="${pokemonImage}" alt="Artwork">           
                    
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
                <div class="nav-card-container">
                    <svg onclick="openPreviousCard(${i})"class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="white" d="M20 11H7.41l3.29-3.29A1 1 0 0 0 9.29 6.29L3.71 11.88a1 1 0 0 0 0 1.41l5.58 5.59a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L7.41 13H20a1 1 0 0 0 0-2z"/>
                    </svg>
                    <h2 onclick="closeCardDetail(${i})">close</h2>
                    <svg onclick="openNextCard(${i})" class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="white" d="M14.59 11H4a1 1 0 0 0 0 2h10.59l-3.29 3.29a1 1 0 1 0 1.42 1.42l5.59-5.59a1 1 0 0 0 0-1.42l-5.59-5.59a1 1 0 0 0-1.42 1.42L14.59 11z"/>
                    </svg>
                </div>
            </div>
        </div>
    `;
    animatedBackground(indexOfType);
    document.getElementById('cluster-container').classList.add('cluster-blur');
    renderAbout();
   
}



function openNextCard(i) {

    backInPokeball(i);

    if (i < ((OFFSET + VISIBLE_CLUSTER) - 1)) {
        i++;
        openCardDetail(i);
        }
}
 function openPreviousCard(i) {

    backInPokeball(i);

    if (i > OFFSET) {
        i--;
        openCardDetail(i);
        }
 }

function closeCardDetail(i) {
    let cardDetail = document.getElementById('card-detail');
    cardDetail.innerHTML = ``;
    document.getElementById('cluster-container').classList.remove('cluster-blur');
    backInPokeball(i);
}



function renderBaseStats(indexOfType) {
    let stats = loadedPokemonInfo['stats'];
    let infoContainer = document.getElementById('info-content-container');

    infoContainer.innerHTML = ``;

    infoContainer.innerHTML = /*HTML*/`
        <div id="info-stat-content-container"></div>
        `;

    let infoStatContainer = document.getElementById('info-stat-content-container');

    let counter = 0;

    for (let i = 0; i  < stats.length; i++) {
        const statsNumber = stats[i];

        infoStatContainer.innerHTML += /*HTML*/`
        <div class="info-content-row">
            <div id="stat-Name" class="info-text">
                <div>${statsNumber['stat']['name']}:</div>
            </div>
            <div id="stat-Value" class="info-text">
                <div><b>${statsNumber['base_stat']} / 255</b></div>
            </div>
            <div class="stat-bar-container">
                <div id="stat-bar" class="stat-bar" style="background-color: ${lightColorOfType[indexOfType]};">
                    <div class="stat-bar-progress" style="width: ${statsNumber['base_stat']}px; background-color: ${darkColorOfType[indexOfType]};"></div>
                </div>
            </div> 
        </div>
        `;
    }

}

function renderAbility() {
    let abilities = loadedPokemonInfo['abilities'];
    let infoContainer = document.getElementById('info-content-container');

    infoContainer.innerHTML = ``;

    for (let i = 0; i < abilities.length; i++) {
        const abilityArr = abilities[i];

        infoContainer.innerHTML += /*HTML*/`
            <div class="info-text">${abilityArr['ability']['name']}</div>
        `;
        
    }
}


async function renderMainFooter() {
    let mainFooter = document.getElementById('footer-type-container');

    for (let i = 0; i < allTypes.length; i++) {
        const typeName = allTypes[i];
        mainFooter.innerHTML += /*HTML*/`
        <div class="descripeType">
            <div>${typeName}: </div><img src="./img/${typeName}.png" alt="">
        </div>
        `;
    }
}



