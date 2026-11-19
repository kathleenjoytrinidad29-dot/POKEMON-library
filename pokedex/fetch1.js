
const nameInput = document.getElementById("name");
const searchBtn = document.getElementById("searchBtn");
const imageElement = document.getElementById("pokemonsprite");
const nameElement = document.getElementById("pokemonName");
const typesElement = document.getElementById("pokemonTypes");
const statsElement = document.getElementById("pokemonStats");
const messageElement = document.getElementById("message");

async function fetchPokemon() {
  const pokemonName = nameInput.value.trim().toLowerCase();
  if (pokemonName === "") {
    messageElement.textContent = "Please enter a Pokemon name.";
    return;
  }
  messageElement.textContent = "Loading Pokemon data...";
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) throw new Error("Pokemon not found.");
    const data = await response.json();
    displayPokemon(data);
    messageElement.textContent = "Pokemon information loaded.";
  } catch (error) {
    messageElement.textContent = error.message;
    imageElement.style.display = "none";
    nameElement.textContent = "Pokemon Name";
    typesElement.textContent = "Type(s):";
    statsElement.textContent = "Stats:";
    console.error(error);
  }
}

function displayPokemon(data) {
  const pokemonSprite =
    data.sprites.versions["generation-v"]["black-white"].animated.front_default
    || data.sprites.front_default;

  if (pokemonSprite) {
    imageElement.src = pokemonSprite;
    imageElement.style.display = "block";
  } else {
    imageElement.style.display = "none";
  }

  const formattedName =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);
  nameElement.textContent = formattedName;

  const types = data.types
    .map(typeInfo => typeInfo.type.name)
    .join(", ");
  typesElement.textContent = `Type(s): ${types}`;

  const stats = data.stats
    .map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`)
    .join(" | ");
  statsElement.textContent = `Stats: ${stats}`;
}

searchBtn.addEventListener("click", fetchPokemon);
nameInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") fetchPokemon();
});


// async function fetchPokemon() {

//   const pokemonName = nameInput.value.trim().toLowerCase();

//   if (pokemonName === "") {
//     messageElement.textContent = "Please enter a Pokemon name.";
//     return;
//   }

//   messageElement.textContent = "Loading Pokemon data...";

//   try {
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
//     );

//     if (!response.ok) {
//       throw new Error("Pokemon not found.");
//     }

//     const data = await response.json();

//     displayPokemon(data);

//     messageElement.textContent = "Pokemon information loaded.";

//   } catch (error) {

//     messageElement.textContent = error.message;

//     imageElement.style.display = "none";
//     nameElement.textContent = "Pokemon Name";
//     typesElement.textContent = "Type(s):";
//     statsElement.textContent = "Stats:";

//     console.error(error);
//   }
// }

// function displayPokemon(data) {

//   const pokemonSprite =
//     data.sprites.versions["generation-v"]?.["black-white"]?.animated?.front_default
//     || data.sprites.front_default;

//   if (pokemonSprite) {
//     imageElement.src = pokemonSprite;
//     imageElement.style.display = "block";
//   } else {
//     imageElement.style.display = "none";
//   }

//   const formattedName =
//     data.name.charAt(0).toUpperCase() + data.name.slice(1);

//   nameElement.textContent = formattedName;

//   const types = data.types
//     .map(typeInfo => typeInfo.type.name)
//     .join(", ");

//   typesElement.textContent = `Type(s): ${types}`;

//   const stats = data.stats
//     .map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`)
//     .join(" | ");

//   statsElement.textContent = `Stats: ${stats}`;
// }

// searchBtn.addEventListener("click", fetchPokemon);

// nameInput.addEventListener("keydown", function(event) {
//   if (event.key === "Enter") {
//     fetchPokemon();
//   }
// });

