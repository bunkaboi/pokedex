async function openPokemonProfile(pokemonNumber) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    let responsePokemon = await fetch(url);
    loadedPokemonInfo = await responsePokemon.json();

    clearBlurEffectClass();
    activateBlurInEffect();
    showProfileContent(loadedPokemonInfo);
}

function showProfileContent(loadedPokemonInfo) {
    let height = Math.round(loadedPokemonInfo['height'] * 30.48);
    let weight = Math.round(loadedPokemonInfo['weight'] * 0.453592);
    let experience = loadedPokemonInfo['base_experience']
    let name = loadedPokemonInfo['species']['name'];
    name = name.toUpperCase();
    let artwork = loadedPokemonInfo['sprites']['other']['official-artwork']['front_default'];
    let indexOfType = allTypes.indexOf(loadedPokemonInfo['types']['0']['type']['name']);
    let pokemonNumber = loadedPokemonInfo['id'];

    createProfileContainer(indexOfType);

    let pokemonInfo = document.getElementById('pokemon-profile-information');
    
    renderPokemonImage(artwork);
    renderPokemonName(pokemonInfo, name, indexOfType);
    renderNavbar(pokemonInfo, height, weight, indexOfType, pokemonNumber, experience);
    createInfoContainer(pokemonInfo, indexOfType);
    renderDirection(pokemonInfo, indexOfType, pokemonNumber);
    showAbout(height, weight, indexOfType, experience);
}

function renderNavbar(pokemonInfo, height, weight, indexOfType, pokemonNumber, experience) {
    return  pokemonInfo.innerHTML += /*HTML*/`   
            <div id="navbar-container" class="navbar-container" style="background: linear-gradient( to bottom,${darkColorOfType[indexOfType]} 0%,${lightColorOfType[indexOfType]} 50%,${darkColorOfType[indexOfType]} 100%);">
                <a href="#" id="about" onclick="showAbout(${height}, ${weight}, ${indexOfType}, ${experience})">Über</a>
                <a href="#" id="stats" onclick="showStats(${indexOfType})">Angaben</a>
                <a href="#" id="abilities" onclick="showAbilities(${pokemonNumber}, ${indexOfType});">Fähigkeiten</a>
                <a href="#" id="moves" onclick="showMoves(${pokemonNumber}, ${indexOfType});">Attacken</a>
            </div>
    `;
}

function showAbout(height, weight, indexOfType, experience) {
    let infoContainer = document.getElementById('pokemon-infos');

    document.getElementById('about').style = "background: linear-gradient( to bottom,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.5) 100%); border-radius: 8px;";
    document.getElementById('stats').style = "background: '';"
    document.getElementById('abilities').style = "background: '';"
    document.getElementById('moves').style = "background: '';"    

    infoContainer.innerHTML = ``;
    renderExperience(infoContainer, indexOfType, experience);
    renderHeight(infoContainer, indexOfType, height);
    renderWeight(infoContainer, indexOfType, weight);
    renderTypes(loadedPokemonInfo, indexOfType);    
}

async function showStats(indexOfType) {
    let stats = loadedPokemonInfo['stats'];
    let infoContainer = document.getElementById('pokemon-infos');

    document.getElementById('stats').style = "background: linear-gradient( to bottom,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.5) 100%); border-radius: 8px;";
    document.getElementById('about').style = "background: '';"
    document.getElementById('abilities').style = "background: '';"
    document.getElementById('moves').style = "background: '';" 

    infoContainer.innerHTML = ``;
    createStatsContainer(infoContainer);

    let infoStatContainer = document.getElementById('info-stat-content-container');
    await renderStats(stats, infoStatContainer, indexOfType);
}

async function showAbilities(pokemonNumber, indexOfType) {
    document.getElementById('abilities').style = "background: linear-gradient( to bottom,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.5) 100%); border-radius: 8px;";
    document.getElementById('about').style = "background: '';"
    document.getElementById('stats').style = "background: '';"
    document.getElementById('moves').style = "background: '';" 

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    let responsePokemon = await fetch(url);
    loadedPokemonInfo = await responsePokemon.json();

    let infoContainer = document.getElementById('pokemon-infos');
    
    infoContainer.innerHTML = ``;
    await renderAbilities(loadedPokemonInfo, infoContainer, indexOfType);
}




async function showMoves(pokemonNumber, indexOfType) {
    document.getElementById('moves').style = "background: linear-gradient( to bottom,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.5) 100%); border-radius: 8px;";
    document.getElementById('about').style = "background: '';"
    document.getElementById('abilities').style = "background: '';"
    document.getElementById('stats').style = "background: '';" 

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    let responsePokemon = await fetch(url);
    loadedPokemonInfo = await responsePokemon.json();

    let infoContainer = document.getElementById('pokemon-infos');
    let moves = loadedPokemonInfo['moves'];
    let pokemonName = loadedPokemonInfo['name'];
    pokemonName = pokemonName.toUpperCase();
    
    infoContainer.innerHTML = ``;
    createScrollContainer(infoContainer);
    await renderMoves(moves, indexOfType, pokemonName);
}

// Funktionen für Buttons/Links

async function openNextCard(pokemonNumber, indexOfType) {
    if (pokemonNumber < ((OFFSET + VISIBLE_CLUSTER) - 1)) {
        pokemonNumber++;
        setCloseAnimation(indexOfType); 
        setTimeout(openPokemonProfile, 500, pokemonNumber);
    }
}

 function openPreviousCard(pokemonNumber, indexOfType) {
    if (pokemonNumber < ((OFFSET + VISIBLE_CLUSTER) - 1)) {
        pokemonNumber--;
        setCloseAnimation(indexOfType); 
        setTimeout(openPokemonProfile, 500, pokemonNumber);
        }
}

function closeCard(indexOfType) {
    clearBlurEffectClass();
    activateBlurOutEffect();
    setCloseAnimation(indexOfType);
    setTimeout(profileToBackground, 1000);
}

//returns und ausgelagertes

function setCloseAnimation(indexOfType) {
    document.getElementById('pokemon-profile-image').style = 'animation: close-card-pokemon 1s ease-in-out forwards;';
    document.getElementById('pokemon-profile-information').style = `background-color: ${midColorOfType[indexOfType]}; border-color: ${darkColorOfType[indexOfType]}; animation: close-card-information 1s ease-in-out forwards;`;
}

function clearBlurEffectClass() {
    if(document.getElementById('cluster-container').classList.contains('cluster-blur-out')){
        return document.getElementById('cluster-container').classList.remove('cluster-blur-out');
    };
    if(document.getElementById('cluster-container').classList.contains('cluster-blur-in')){
        document.getElementById('cluster-container').classList.remove('cluster-blur-in');
    };
}

function activateBlurInEffect() {
    return document.getElementById('cluster-container').classList.add('cluster-blur-in');
}

function activateBlurOutEffect() {
    return document.getElementById('cluster-container').classList.add('cluster-blur-out');
}

function profileToBackground() {
    document.getElementById('pokemon-profile-container').style = "z-index: 0;";
}

function createProfileContainer(indexOfType) {
    let pokemonDetailsContainer = document.getElementById('pokemon-profile-container');
    pokemonDetailsContainer.style = "z-index: 202;"
    pokemonDetailsContainer.innerHTML = /*HTML*/`
    <div id="pokemon-profile-image" class="pokemon-image-container"></div>
    <div id="pokemon-profile-information" class="pokemon-profile-information-container" style="border-color: ${darkColorOfType[indexOfType]}; background-color: ${midColorOfType[indexOfType]};"></div>
    `;
}

function renderPokemonImage(artwork) {
    return  document.getElementById('pokemon-profile-image').innerHTML = /*HTML*/`
            <img src="${artwork}" class="pokemon-image">
            `;
}

function renderPokemonName(pokemonInfo, name, indexOfType) {
    return  pokemonInfo.innerHTML = /*HTML*/`
            <div id="pokemon-name" class="pokemon-name" style="background-color: ${darkColorOfType[indexOfType]};">${name}</div>
            `;
}

function createInfoContainer(pokemonInfo, indexOfType) {
    return  pokemonInfo.innerHTML += /*HTML*/`
            <div id="pokemon-infos" class="pokemon-infos-container" style="background-color: ${lightColorOfType[indexOfType]};"></div>
            `;
}

function renderDirection(pokemonInfo, indexOfType, pokemonNumber) {
    return  pokemonInfo.innerHTML += /*HTML*/`
            <div id="direction-container" class="direction-container" style="background-color: ${darkColorOfType[indexOfType]};">
                <svg onclick="openPreviousCard(${pokemonNumber}, ${indexOfType})"class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M20 11H7.41l3.29-3.29A1 1 0 0 0 9.29 6.29L3.71 11.88a1 1 0 0 0 0 1.41l5.58 5.59a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L7.41 13H20a1 1 0 0 0 0-2z"/>
                </svg>
                <a href="#" onclick="closeCard(${indexOfType})">schliessen</a>
                <svg onclick="openNextCard(${pokemonNumber}, ${indexOfType})" class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M14.59 11H4a1 1 0 0 0 0 2h10.59l-3.29 3.29a1 1 0 1 0 1.42 1.42l5.59-5.59a1 1 0 0 0 0-1.42l-5.59-5.59a1 1 0 0 0-1.42 1.42L14.59 11z"/>
                </svg>
            </div>
            `;
}

function renderExperience(infoContainer, indexOfType, experience) {
    return  infoContainer.innerHTML += /*HTML*/`  
            <div class="info-container">
                <div class="info-name">
                    <div>Erfahrung:</div>
                </div>
                <div class="info-text" style="background-color: ${darkColorOfType[indexOfType]};">
                    <div><b>${experience}</b></div>
                </div>
            </div>
            `;
}

function renderHeight(infoContainer, indexOfType, height) {
    return  infoContainer.innerHTML += /*HTML*/`  
            <div class="info-container">
                <div class="info-name">
                    <div>Größe:</div>
                </div>
                <div class="info-text" style="background-color: ${darkColorOfType[indexOfType]};">
                    <div><b>${height} cm</b></div>
                </div>
            </div>
            `;
}

function renderWeight(infoContainer, indexOfType, weight) {
    return  infoContainer.innerHTML += /*HTML*/`  
            <div class="info-container">
                <div class="info-name">
                    <div>Gewicht:</div>
                    </div>
                <div class="info-text" style="background-color: ${darkColorOfType[indexOfType]};">
                    <div><b>${weight} Kg</b></div>
                </div>
            </div>
            `;
}

async function renderTypes(loadedPokemonInfo, indexOfType) {
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

        createTypes(infoContainer, typeNumber, indexOfType, typeNameGerman);
    }
}

function createTypes(infoContainer, typeNumber, indexOfType, typeNameGerman) {
    return  infoContainer.innerHTML += /*HTML*/`
            <div class="info-container">
                <div class="info-name">
                    <div>Typ ${typeNumber}:</div>
                </div>
                <div class="info-text" style="background-color: ${darkColorOfType[indexOfType]};">
                    <div><b>${typeNameGerman}</b></div>
                </div>
            </div>
            `;
}

function createStatsContainer(infoContainer) {
    return  infoContainer.innerHTML = /*HTML*/`
            <div id="info-stat-content-container"></div>
            `;
}

async function renderStats(stats, infoStatContainer, indexOfType) {
    for (let i = 0; i  < stats.length; i++) {
        const statsNumber = stats[i];

        let urlStatArray = statsNumber['stat']['url'];
        let responseStatArray = await fetch(urlStatArray);

        loadedStatArray = await responseStatArray.json();
        console.log('geladene StatArray', loadedStatArray);

        statNameGerman = loadedStatArray['names']['4']['name'];
        createStats(infoStatContainer, statNameGerman, indexOfType, statsNumber);
    }
}

function createStats(infoStatContainer, statNameGerman, indexOfType, statsNumber) {
    return  infoStatContainer.innerHTML += /*HTML*/`
            <div class="info-container">
                <div id="stat-Name" class="info-name">
                    <div>${statNameGerman}:</div>
                </div>
                <div id="stat-Value">
                    <div class="stat-bar-container">
                        <div id="stat-bar" class="stat-bar" style="border-color: ${darkColorOfType[indexOfType]}; background-color: ${midColorOfType[indexOfType]};">
                            <div class="stat-bar-progress" style="width: ${statsNumber['base_stat']/0.7}px; background-color: ${darkColorOfType[indexOfType]};">
                                ${statsNumber['base_stat']}&nbsp;&nbsp;
                            </div>
                            255&nbsp;&nbsp;
                        </div>
                    </div> 
                </div>
            </div>
            `;
}

async function renderAbilities(loadedPokemonInfo, infoContainer, indexOfType) {
    let abilities = loadedPokemonInfo['abilities'];

    for (let i = 0; i < abilities.length; i++) {
        const abilityArr = abilities[i];

        let urlAbility = abilityArr['ability']['url'];
        let responseAbility = await fetch(urlAbility);
        loadedAbilities = await responseAbility.json();
        console.log('geladene Abilities', loadedAbilities);

        let nr =  await getNumberAbilityLanguage(loadedAbilities);
        
        let abilityFlavorGerman = loadedAbilities['flavor_text_entries'][nr]['flavor_text'];
        let abilityNameGerman = loadedAbilities['names']['4']['name'];
        createAbilities(infoContainer, abilityNameGerman, indexOfType, abilityFlavorGerman);; 
    };
}

function createAbilities(infoContainer, abilityNameGerman, indexOfType, abilityFlavorGerman) {
    return  infoContainer.innerHTML += /*HTML*/`
            <div class="info-container">
                <div class="info-name">
                    ${abilityNameGerman}
                </div>
                <div class="info-text" style="background-color: ${darkColorOfType[indexOfType]};">
                    ${abilityFlavorGerman}
                </div>
            </div>
            `;
}

async function getNumberAbilityLanguage(loadedAbilities) {
        for (let i = 0; loadedAbilities['flavor_text_entries'][i]['language']['name'] != "de"; i++) {
            var number = i;                  
        };
        return number + 1;
}

async function renderMoves(moves, indexOfType, pokemonName) {
    for (let i = 0; i < moves.length; i++) {
        const movesArr = moves[i];

        let urlMove = movesArr['move']['url'];
        let responseMove = await fetch(urlMove);
        loadedMove = await responseMove.json();
        console.log('geladene Moves', loadedMove);
            
        let moveNameGerman = loadedMove['names']['4']['name'];

        createMoves(moveNameGerman);

        progressLoadMoves(indexOfType, pokemonName, moves, i);
    };
}

function createScrollContainer(infoContainer) {
    return  infoContainer.innerHTML = /*HTML*/`
            <div id="loading-bar" class="info-text"></div>
            <div id="info-container-wrap" class="info-container-wrap"></div> 
            `;
            document.getElementById('info-container-wrap').scrollIntoView();
}

function createMoves(moveNameGerman) {
    return  document.getElementById('info-container-wrap').innerHTML += /*HTML*/`          
            <div class="info-move-name">
                ${moveNameGerman}
            </div>
            `;
}

function progressLoadMoves(indexOfType, pokemonName, moves, i) {
    let progress = ((i + 1) / moves.length) * 100
        if(i + 1 < moves.length){
        document.getElementById('loading-bar').style = `width: ${progress}%; background-color: ${darkColorOfType[indexOfType]};`;

        document.getElementById('loading-bar').innerHTML = /*HTML*/`
        ${i+1} Attacken von ${pokemonName} geladen
        `;
        } else {
        document.getElementById('loading-bar').innerHTML = /*HTML*/`
        ${moves.length} Attacken von ${pokemonName}
        `;
        }
}