let url_api_pokemon = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"

function consumir(url_api_pokemon) {

    let api_pokemon = fetch(url_api_pokemon);
    api_pokemon.then(res => res.json())
        .then(info => {
            let contenidopokemon = document.querySelector("#pokemones")
            let info_pokemon = info.results
            info_pokemon.forEach((especies, numero) => {
                
                contenidopokemon.innerHTML = ``
                let urlinfo = especies.url
                let url_pokemon = fetch(urlinfo)

                url_pokemon.then(res => res.json())
                    .then(info1 => {

                        contenidopokemon.innerHTML += `
                    <div class="card py-2 bg-dark" style="max-width: 700px;">
                    <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${info1.sprites.other.dream_world.front_default}" class=" pt-5 img-fluid rounded-start" alt="...">
                    <div id="imagenpokemon${numero}"></div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body bg-dark">
                    <h4 class="card-title text-light">${info1.name}</h4>
                        <p class= "text-light card-text" id="numerohabilidades${numero}">Habilidades:</p>
                        <p class="text-light card-text"><small id="tipopokemon${numero}">tipo pokemon:</small></p>
                        <p class="text-light card-text">Weight:${info1.weight}kg</p>
                        </div>
                    </div>
                    </div>
            </div>
                `
                        let habilidad_pokemon = info1.abilities
                        habilidad_pokemon.forEach((habilidad) => {
                            let habilidadespo = habilidad.ability.name
                            document.querySelector(`#numerohabilidades${numero}`).innerHTML += `${habilidadespo} - `
                        });


                        let tipo_pokemon = info1.types
                        tipo_pokemon.forEach((tipo) => {
                            let tipopo = tipo.type.name
                            document.querySelector(`#tipopokemon${numero}`).innerHTML += `${tipopo} - `
                        });
                    });
            })
        })
}
consumir(url_api_pokemon)

function buscar(pokemon_buscar) {
    console.log(pokemon_buscar)
}

document.querySelector("#botonbuscar").addEventListener("click", () => {
    var busqueda = document.querySelector("#buscadorpersonaje").value
    buscar(busqueda)

    var buscador_url = "https://pokeapi.co/api/v2/pokemon/" + busqueda
    var buscadortotal = fetch(buscador_url)
    buscadortotal.then(res => res.json())
        .then(busqueda => {

            let contenidopokemon = document.querySelector("#pokemones")
            contenidopokemon.innerHTML = `
            <div class="card py-2 bg-dark" style="max-width: 700px;">
            <div class="row g-0">
            <div class="col-md-4">
            <img src="${busqueda.sprites.other.dream_world.front_default}" class=" pt-5 img-fluid rounded-start" alt="...">
            <div id="imagenpokemon"></div>
            </div>
            <div class="col-md-8 bg-dark">
                <div class="card-body">
            <h5 class="card-title text-light">${busqueda.name}</h5>
                <p class= "card-text text-light" id="numerohabilidades">Habilidades:</p>
                <p class="card-text text-light"><small id="tipopokemon">tipo pokemon:</small></p>
                <p class="card-text text-light">Weight:${busqueda.weight}Kg</p>
                </div>
            </div>
            </div>
    </div>
        `
            let habilidad_pokemon = busqueda.abilities
            habilidad_pokemon.forEach((habilidad) => {
                let habilidadespo = habilidad.ability.name
                document.querySelector(`#numerohabilidades`).innerHTML += `${habilidadespo} - `
            });

            let tipo_pokemon = busqueda.types
            tipo_pokemon.forEach((tipo) => {
                let tipopo = tipo.type.name
                document.querySelector(`#tipopokemon`).innerHTML += `${tipopo} - `
            });

        })
})

var offset = 0

document.querySelector("#atras").addEventListener("click", () => {
    offset = offset - 20
    let url_api_pokemon = "https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=20"
    consumir(url_api_pokemon)
})

document.querySelector("#adelante").addEventListener("click", () => {
    offset = offset + 20
    let url_api_pokemon = "https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=20"
    consumir(url_api_pokemon)
})