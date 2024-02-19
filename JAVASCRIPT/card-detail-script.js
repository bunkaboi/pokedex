

async function renderPokemonDetailsContainer(pokemonNumber) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    let responsePokemon = await fetch(url);
    loadedPokemonInfo = await responsePokemon.json();

    let artwork = loadedPokemonInfo['sprites']['other']['official-artwork']['front_default'];
    let indexOfType1 = allTypes.indexOf(loadedPokemonInfo['types']['0']['type']['name']);

    if(blurEffectActive()){
        removeBlurEffect();
    } else {
        activateBlurEffect();
    };

    showCard(artwork, indexOfType1);
    renderCardContent(loadedPokemonInfo);
}

function blurEffectActive() {
    return document.getElementById('cluster-container').classList.contains('cluster-blur-out');
}

function removeBlurEffect() {
    return document.getElementById('cluster-container').classList.remove('cluster-blur-out');
}
function activateBlurEffect() {
    return document.getElementById('cluster-container').classList.add('cluster-blur-in');
}

function closeCard(indexOfType1) {
    document.getElementById('cluster-container').classList.remove('cluster-blur-in');
    document.getElementById('cluster-container').classList.add('cluster-blur-out');
    document.getElementById('card-pokemon-image').style = 'animation: close-card-pokemon 2s ease-in-out forwards;';
    document.getElementById('card-pokemon-information').style = `background-color: ${lightColorOfType[indexOfType1]}; border-color: ${darkColorOfType[indexOfType1]}; animation: close-card-information 2s ease-in-out forwards;`;
    setTimeout(hidePokemonDetailContainer, 2000);
}

function showCard(artwork, indexOfType1) {
    let pokemonDetailsContainer = document.getElementById('pokemon-details-container');

    pokemonDetailsContainer.style = "z-index: 202;"
    pokemonDetailsContainer.innerHTML = /*HTML*/`
    <div id="card-pokemon-image" class="card-pokemon-image-container">
        <img src="${artwork}" class="pokemon-image">
    </div>
    <div id="card-pokemon-information" class="card-pokemon-information-container" style="border-color: ${darkColorOfType[indexOfType1]}; background-color: ${midColorOfType[indexOfType1]};"></div>
    `;
}

function hidePokemonDetailContainer() {
    document.getElementById('pokemon-details-container').style = "z-index: 0;";
}

function renderCardContent(loadedPokemonInfo) {
    let pokemonInfo = document.getElementById('card-pokemon-information');
    let height = Math.round(loadedPokemonInfo['height'] * 30.48);
    let weight = Math.round(loadedPokemonInfo['weight'] * 0.453592);
    let experience = loadedPokemonInfo['base_experience']
    let name = loadedPokemonInfo['species']['name'];
    name = name.toUpperCase();
    let type1 = loadedPokemonInfo['types']['0']['type']['name'];
    let indexOfType1 = allTypes.indexOf(loadedPokemonInfo['types']['0']['type']['name']);
    let pokemonNumber = loadedPokemonInfo['id'];

    let stats = loadedPokemonInfo['stats'];
    let pokePic = loadedPokemonInfo['sprites']['other']['official-artwork']['front_default'];
    
    showPokemonName(pokemonInfo, name, indexOfType1);
    showNavbar(pokemonInfo, height, weight, indexOfType1, pokemonNumber, experience);
    createInfoContainer(pokemonInfo, indexOfType1);
    showDirection(pokemonInfo, indexOfType1, pokemonNumber);
    renderAbout(height, weight, indexOfType1, experience);
}

function showPokemonName(pokemonInfo, name, indexOfType1) {
    return pokemonInfo.innerHTML = /*HTML*/`
    <div id="pokemon-name" class="pokemon-name" style="background-color: ${darkColorOfType[indexOfType1]};">${name}</div>
    `;
}

function showNavbar(pokemonInfo, height, weight, indexOfType1, pokemonNumber, experience) {
    return pokemonInfo.innerHTML += /*HTML*/`   
    <div id="navbar-container" class="navbar-container" style="background: linear-gradient( to bottom,${darkColorOfType[indexOfType1]} 0%,${lightColorOfType[indexOfType1]} 50%,${darkColorOfType[indexOfType1]} 100%);">
        <a href="#" id="about" onclick="renderAbout(${height}, ${weight}, ${indexOfType1}, ${experience})">Über</a>
        <a href="#" id="stats" onclick="renderStats(${indexOfType1})">Angaben</a>
        <a href="#" id="abilities" onclick="renderPokemonAbilities(${pokemonNumber}, ${indexOfType1});">Fähigkeiten</a>
        <a href="#" id="moves" onclick="renderPokemonMoves(${pokemonNumber});">Attacken</a>
    </div>
    `;
}

function createInfoContainer(pokemonInfo, indexOfType1) {
    return pokemonInfo.innerHTML += /*HTML*/`
    <div id="pokemon-infos" class="pokemon-infos-container" style="background-color: ${lightColorOfType[indexOfType1]};"></div>
    `;
}

function showDirection(pokemonInfo, indexOfType1, pokemonNumber) {
    return pokemonInfo.innerHTML += /*HTML*/`
    <div id="direction-container" class="direction-container" style="background-color: ${darkColorOfType[indexOfType1]};">
        <svg onclick="openPreviousCard(${pokemonNumber})"class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="white" d="M20 11H7.41l3.29-3.29A1 1 0 0 0 9.29 6.29L3.71 11.88a1 1 0 0 0 0 1.41l5.58 5.59a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L7.41 13H20a1 1 0 0 0 0-2z"/>
        </svg>
        <a href="#" onclick="closeCard(${indexOfType1})">schliessen</a>
        <svg onclick="openNextCard(${pokemonNumber})" class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="white" d="M14.59 11H4a1 1 0 0 0 0 2h10.59l-3.29 3.29a1 1 0 1 0 1.42 1.42l5.59-5.59a1 1 0 0 0 0-1.42l-5.59-5.59a1 1 0 0 0-1.42 1.42L14.59 11z"/>
        </svg>
    </div>
    `;
}

async function openNextCard(pokemonNumber) {
    if (pokemonNumber < ((OFFSET + VISIBLE_CLUSTER) - 1)) {
        pokemonNumber++;
        renderPokemonDetailsContainer(pokemonNumber);
    }
}

 function openPreviousCard(pokemonNumber) {
    if (pokemonNumber < ((OFFSET + VISIBLE_CLUSTER) - 1)) {
        pokemonNumber--;
        renderPokemonDetailsContainer(pokemonNumber);
        }
}


//bis hierhin refactored

function renderAbout(height, weight, indexOfType1, experience) {
    let infoContainer = document.getElementById('pokemon-infos');

    infoContainer.innerHTML = ``;
    infoContainer.innerHTML = /*HTML*/`  
    <div class="info-container">
        <div class="info-name">
            <div>Erfahrung:</div>
        </div>
        <div class="info-text" style="background-color: ${darkColorOfType[indexOfType1]};">
            <div><b>${experience}</b></div>
        </div>
    </div>
    <div class="info-container">
        <div class="info-name">
            <div>Größe:</div>
        </div>
        <div class="info-text" style="background-color: ${darkColorOfType[indexOfType1]};">
            <div><b>${height} cm</b></div>
        </div>
    </div>
    <div class="info-container">
        <div class="info-name">
            <div>Gewicht:</div>
            </div>
        <div class="info-text" style="background-color: ${darkColorOfType[indexOfType1]};">
            <div><b>${weight} Kg</b></div>
        </div>
    </div>
    `;
        renderPokemonTypes(loadedPokemonInfo, indexOfType1);    
}



async function renderPokemonTypes(loadedPokemonInfo, indexOfType1) {


    let infoContainer = document.getElementById('pokemon-infos');
    let typesOfPokemon = loadedPokemonInfo['types'];
    
    for (let i = 0; i < typesOfPokemon.length; i++) {
        const typeArr = typesOfPokemon[i];

        let urlType = typeArr['type']['url'];
        let responseType = await fetch(urlType);
        loadedTypes = await responseType.json();
        console.log('loaded Types', loadedTypes);

        let typeNameGerman = loadedTypes['names']['4']['name']
        let typeNumber = i + 1

        infoContainer.innerHTML += /*HTML*/`
        <div class="info-container">
            <div class="info-name">
                <div>Typ ${typeNumber}:</div>
            </div>
            <div class="info-text" style="background-color: ${darkColorOfType[indexOfType1]};">
                <div><b>${typeNameGerman}</b></div>
            </div>
        </div>
        `;
        
    }



}



async function renderPokemonAbilities(pokemonNumber, indexOfType1) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    let responsePokemon = await fetch(url);
    loadedPokemonInfo = await responsePokemon.json();

    let infoContainer = document.getElementById('pokemon-infos');
    let abilities = loadedPokemonInfo['abilities'];
    
    infoContainer.innerHTML = ``;

    for (let i = 0; i < abilities.length; i++) {
        const abilityArr = abilities[i];

        let urlAbility = abilityArr['ability']['url'];
        let responseAbility = await fetch(urlAbility);
        loadedAbilities = await responseAbility.json();
        console.log('geladene Abilities', loadedAbilities);

        let nr =  await getNumberAbilityLanguage(loadedAbilities);
        
        let abilityFlavorGerman = loadedAbilities['flavor_text_entries'][nr]['flavor_text'];
        let abilityNameGerman = loadedAbilities['names']['4']['name'];


        infoContainer.innerHTML += /*HTML*/`
            <div class="info-container">
                <div class="info-name">
                    ${abilityNameGerman}
                </div>
                <div class="info-text" style="background-color: ${darkColorOfType[indexOfType1]};">
                    ${abilityFlavorGerman}
                </div>
            </div>
        `;
    };

}

async function getNumberAbilityLanguage(loadedAbilities) {
        for (let i = 0; loadedAbilities['flavor_text_entries'][i]['language']['name'] != "de"; i++) {
            var number = i;                  
        };
        return number + 1;
}

async function renderStats(indexOfType1) {
    let stats = loadedPokemonInfo['stats'];
    let infoContainer = document.getElementById('pokemon-infos');

    infoContainer.innerHTML = ``;

    infoContainer.innerHTML = /*HTML*/`
    <div id="info-stat-content-container"></div>
    `;

    let infoStatContainer = document.getElementById('info-stat-content-container');

    for (let i = 0; i  < stats.length; i++) {
        const statsNumber = stats[i];

        let urlStatArray = statsNumber['stat']['url'];
        let responseStatArray = await fetch(urlStatArray);
        loadedStatArray = await responseStatArray.json();
        console.log('geladene StatArray', loadedStatArray);

        statNameGerman = loadedStatArray['names']['4']['name'];

        infoStatContainer.innerHTML += /*HTML*/`
        <div class="info-container">
            <div id="stat-Name" class="info-name">
                <div>${statNameGerman}:</div>
            </div>
            <div id="stat-Value">
                <div class="stat-bar-container">
                    <div id="stat-bar" class="stat-bar" style="border-color: ${darkColorOfType[indexOfType1]}; background-color: ${midColorOfType[indexOfType1]};">
                        <div class="stat-bar-progress" style="width: ${statsNumber['base_stat']/0.7}px; background-color: ${darkColorOfType[indexOfType1]};">
                            ${statsNumber['base_stat']}&nbsp;&nbsp;
                        </div>
                        255&nbsp;&nbsp;
                    </div>
                </div> 
            </div>
        </div>
        `;
    }
}

async function renderPokemonMoves(pokemonNumber) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    let responsePokemon = await fetch(url);
    loadedPokemonInfo = await responsePokemon.json();

    let infoContainer = document.getElementById('pokemon-infos');
    let moves = loadedPokemonInfo['moves'];
    
    var x = 0;
    var y = 30;

    infoContainer.innerHTML = ``;
    infoContainer.innerHTML = /*HTML*/`
    <div id="info-container-wrap" class="info-container-wrap"></div>
    <div id="prev-next" class="prev-next">
        <a href="#" id="prev" class="prev">
            <<
        </a>
        <a href="#" id="next" class="next" onclick="nextThirty()">
            >>
        </a>
    </div>
    `;


    for (let i = x; i < y; i++) {
        const movesArr = moves[i];

        let urlMove = movesArr['move']['url'];
        let responseMove = await fetch(urlMove);
        loadedMove = await responseMove.json();
        console.log('geladene Moves', loadedMove);
               
        let moveNameGerman = loadedMove['names']['4']['name'];

        document.getElementById('info-container-wrap').innerHTML += /*HTML*/`
            
                <div class="info-name-bubble">
                    ${moveNameGerman}
                </div>
            
        `;
    };

}

function nextThirty() {
  
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
                    <h2 onclick="closeCardDetail(${i})">schliessen</h2>
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