import { loadHeaderFooter, getLocalStorage, capFirst } from "./utils.mjs";
import Pokémon from "./PokeAPI.mjs";
import Jokes from "./JokesAPI.mjs";

// loadHeaderFooter();

const pokeapi = new Pokémon();
const jokes = new Jokes();


// pokeapi.showFavList();
jokes.getJokes();

function showFavList() {
  const favList = getLocalStorage("favList") || [];
  favList.forEach((pokemon) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="The frontsprite of ${capFirst(pokemon.name)}">
    <p>Name: ${capFirst(pokemon.name)}<br>Id: ${pokemon.id}<br>Times Favorited: ${pokemon.timesFaved}</p>`;
    li.addEventListener("click", function() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
      pokeapi.getPokemon(url);
    })

    favoritesList.appendChild(li);
  });
}

showFavList();