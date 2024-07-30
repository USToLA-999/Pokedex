const MAX_POKEMON = 500;

const listWrapper = document.querySelector(".list-wrapper");

const searchInput = document.querySelector("#search-input");

const numberFilter = document.querySelector("#number");

const nameFilter = document.querySelector("#name");

const botFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
.then((Response) => Response.json())
.then((data) => {
    allPokemons = data.results;

});

async function fetchPokemonDataBeforeRedirect(id) {

    try{
        const[pokemon, pokemonSpecies] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => 
            res.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => 
            res.json()
        ),
    ])
    return true
    } catch(error){
        console.error("failed to fetch the pokemon data before redirect");
    }
}


function displayPokemons(pokemon) {
    listWrapper.innerHTML = "";

    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];
        const listItems= document.createElement("div")
        listItems.className = "list-Items";
        listItems.innerHTML = `
            <div class="number-wrap">
                <p class="caption-wrap">#${pokemonID}</p>
            </div>
            <div class="img-wrap">
                <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
            </div>
            <div class="name-wrap">
                <p class="body3-fonts">#${pokemon.name}</p>
            </div>
        `  

        listItems.addEventListener("click", async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);

            if(success){
                window.location.href = `./deatil.html?id=${pokemonID}`
            }
        });

        listWrapper.appendChild(listItems);
    });
}