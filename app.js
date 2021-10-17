function getPokemonUrl(id) {
    return `https://pokeapi.co/api/v2/pokemon/${id}`
}

function generatePokemonPromises() {
    return Array(150).fill("a").map(async (_, i) => {
        const resp = await fetch(getPokemonUrl(i + 1))
        return resp.json()
    })
}

function generateHTML(pokemons) {
    return pokemons.reduce((acc, pokemon ) => {
        const elementTypes = pokemon.types.map(typeInfo => typeInfo.type.name)

        acc += `
            <li class="card ${elementTypes[0]}">
                <img class="card-image" alt="${pokemon.name}" 
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${elementTypes.join(" | ")}</p>
            </li>
        `
        return acc
    }, "")
}

function insertPokemonsIntoPage(pokemons) {
    const ul = document.querySelector("[data-js='pokedex']")
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)