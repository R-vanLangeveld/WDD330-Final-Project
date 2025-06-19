import { getLocalStorage, setLocalStorage, lastUpdate } from "./utils.mjs";
import Pokémon from "./PokeAPI.mjs";
import Jokes from "./JokesAPI.mjs";

lastUpdate();
const pokeapi = new Pokémon();
const jokes = new Jokes();

pokeapi.getPokemon("https://pokeapi.co/api/v2/pokemon/52");

const addToFavs = document.querySelector("#addToFavList");

// displays data about a pokemon using the name or id. And displays three random jokes
document.querySelector("#searchBtn").addEventListener("click", function() {
	const value = document.getElementById("search").value;
	if (value !== "") {
		const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
		pokeapi.getPokemon(url);
    addToFavs.classList.remove("favorited");
    addToFavs.textContent = "Add to Favorites";
    document.querySelector("#jokeInfo").classList.add("hidden");
    jokes.getJokes();
	} else {
		explainText.classList.remove("hidden");
	}
});

// adds a pokemon to the favList
addToFavs.addEventListener("click", function() {
  addToFavs.classList.add("favorited");
  addToFavs.textContent = "Favorited";
  document.querySelector("figcaption").classList.add("favorited");
  const favList = getLocalStorage("favList") || [];
  const pokemon = getLocalStorage("pokeInfo");
  let j = 0;
  let inList = false;
  let itemIndex = 0;
  const array = {"timesClicked" : -1, "timesFaved" : 1};
  const baseLength = favList.length;
  
  if (baseLength !== 0) {
    do {
      for (let n = 0; n < favList.length; n++) {
        if (pokemon.id === favList[n].id) {
          itemIndex = n;
          inList = true;
        }
      }
      j += 1;
    } while (j <= baseLength - 1);
    
    if (inList === false) {
      favList.push(Object.assign(pokemon, array));
    } else if (inList === true) {
      favList[itemIndex].timesFaved += 1; 
    }
  } else {
    favList.push(Object.assign(pokemon, array));
  }
  setLocalStorage("favList", favList);
});
