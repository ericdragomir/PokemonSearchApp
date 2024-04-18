const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")

const pokemonImageDiv = document.getElementById("pokemon-image")

const typesElDiv = document.getElementById("types")

const weightEl = document.getElementById("weight")
const heightEl = document.getElementById("height")
const hpEl = document.getElementById("hp")
const attackEl = document.getElementById("attack")
const defenseEl = document.getElementById("defense")
const spAttackEl = document.getElementById("special-attack")
const spDefenseEl = document.getElementById("special-defense")
const speedEl = document.getElementById("speed")

const url = "https://pokeapi.co/api/v2/pokemon"

const resetUI = () => {
  heightEl.textContent = ""
  weightEl.textContent = ""

  pokemonImageDiv.innerHTML = '<p><span id="pokemon-name"></span> <span id="pokemon-id"> </span></p>'

  typesElDiv.innerHTML = ""
  hpEl.textContent = ""
  attackEl.textContent = ""
  defenseEl.textContent = ""
  spAttackEl.textContent = ""
  spDefenseEl.textContent = ""
  speedEl.textContent = ""
}

const displayData = (dataF) => {
  const pokemonNameEl = document.getElementById("pokemon-name")
  const pokemonIdEl = document.getElementById("pokemon-id")
  const pokemonSkinType = document.getElementById("skin-selector").value
  const pokemonGender = document.getElementById("gender-selector").value

  const {height, id, name, sprites, stats, types, weight} = dataF
  heightEl.textContent = height
  weightEl.textContent = weight
  pokemonIdEl.textContent = "#" + id;
  pokemonNameEl.textContent = name.toUpperCase();

  if (pokemonSkinType === "default") {
    if (pokemonGender == "default") {
      
      pokemonImageDiv.innerHTML += `<img id="sprite" src="${sprites.front_default}" alt="${name} image"/>`

      if (sprites.back_default) {
        pokemonImageDiv.innerHTML += `<img id="sprite" src="${sprites.back_default}" alt="${name} image"/>`
      }
    } else if (pokemonGender === "female") {
      if (sprites.front_female) {
        pokemonImageDiv.innerHTML += `<img id="sprite" src="${sprites.front_female}" alt="${name} image"/>`
        if (sprites.back_female) {
          pokemonImageDiv.innerHTML += `<img id="sprite" src="${sprites.back_female}" alt="${name} image"/>`
        }
      } else {
        pokemonImageDiv.innerHTML += "<p>Gender not available</p>"
      }
    }
  } else {
    if (pokemonGender == "default") {
      
      pokemonImageDiv.innerHTML += `<img id="sprite" src="${sprites.front_shiny}" alt="${name} image"/>`

      if (sprites.back_default) {
        pokemonImageDiv.innerHTML += `<img id="sprite" src="${sprites.back_shiny}" alt="${name} image"/>`
      }
    } else if (pokemonGender === "female") {
      if (sprites.front_female) {
        pokemonImageDiv.innerHTML += `<img id="sprite" src="${sprites.front_shiny_female}" alt="${name} image"/>`
        if (sprites.back_female) {
          pokemonImageDiv.innerHTML += `<img id="sprite" src="${sprites.back_shiny_female}" alt="${name} image"/>`
        }
      } else {
        pokemonImageDiv.innerHTML += "<p>Gender not available</p>"
      }
    }
  }


  typesElDiv.innerHTML += types.map(el => `<p class="type-p">${el.type.name.toUpperCase()}</p>`).join("")

  hpEl.textContent = stats[0].base_stat
  attackEl.textContent = stats[1].base_stat
  defenseEl.textContent = stats[2].base_stat
  spAttackEl.textContent = stats[3].base_stat
  spDefenseEl.textContent = stats[4].base_stat
  speedEl.textContent = stats[5].base_stat
} 

const fetchData = async (urlF, pokemonF) => {
  try {
    const res = await fetch(`${urlF}/${pokemonF.toLowerCase()}`)
    const data = await res.json()
    console.log(data)
    displayData(data)
  } catch (err) {
    alert("Pokémon not found")
    console.log("An error occured: ", err)
  }
}

searchBtn.addEventListener("click", (ev) => {
  ev.preventDefault()
  if (!searchInput.value) {
    alert("Please enter a pokemon")
    return
  }
  resetUI()
  fetchData(url, searchInput.value)
})