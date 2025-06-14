import { getLocalStorage, setLocalStorage, capFirst, lastUpdate } from "./utils.mjs";
import Pokémon from "./PokeAPI.mjs";
import Jokes from "./JokesAPI.mjs";

lastUpdate();

const pokeapi = new Pokémon();
const jokes = new Jokes();

jokes.getJokes();

const favoritesList = document.querySelector("#favoritesList");
let pokeId = 0;

// shows the list of favorited pokemon
function showFavList() {
  favoritesList.innerHTML  = "";
  const favList = getLocalStorage("favList") || [];
  favList.forEach((pokemon) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const span = document.createElement("span");
    const decrease = document.createElement("button");

    img.setAttribute("src", `${pokemon.sprites.front_default}`);
    img.setAttribute("alt", `The frontsprite of ${capFirst(pokemon.name)}`);
    img.setAttribute("width", "96");
    img.setAttribute("height", "96");
    p.innerHTML = `Name: ${capFirst(pokemon.name)}<br>Id: ${pokemon.id}<br>Times Favorited: `;
    span.innerText = `${pokemon.timesFaved}`;
    decrease.textContent = "Decrease";

    li.addEventListener("click", function() {
      pokeId = pokemon.id;
    });

    img.addEventListener("click", function() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
      pokeapi.getPokemon(url);
      document.querySelector("#removeButton").classList.remove("hidden");
      jokes.getJokes();
    });

    p.addEventListener("click", function() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
      pokeapi.getPokemon(url);
      document.querySelector("#removeButton").classList.remove("hidden");
      jokes.getJokes();
    });

    decrease.addEventListener("click", function() {
      lowerCount(span ,pokemon.id);
    });

    p.appendChild(span);
    li.appendChild(img);
    li.appendChild(p);
    li.appendChild(decrease);
    favoritesList.appendChild(li);
  });
}

// removes a pokemon from the favList
function removePokemon(favList) {
  const filteredList = favList.filter((pokemon) => pokemon.id != pokeId);
  document.querySelector("#pokeInfo").classList.add("hidden");
  document.querySelector("#removeButton").classList.add("hidden");
  setLocalStorage("favList", filteredList);
  showFavList();
}

// decreses the selected pokemon's .timesFaved
function lowerCount(span, pokeId) {
  const favList = getLocalStorage("favList") || [];
  let i = 0;
  let itemIndex = 0;
  let correctMon = false;
  
  do {
    for (let n = 0; n < favList.length; n++) {
      if (pokeId == favList[n].id) {
        itemIndex = n;
        correctMon = true;
      }
    }
    i += 1;
  } while (i <= favList.length - 1);

  if (correctMon == true) {
    favList[itemIndex].timesFaved -= 1;
    span.innerText = `${favList[itemIndex].timesFaved}`;
  }

  setLocalStorage("favList", favList);
  const updatedList = getLocalStorage("favList") || [];

  if (updatedList[itemIndex].timesFaved <= 0) {
    removePokemon(updatedList);
  }
}

document.querySelector("#removeButton").addEventListener("click", function() {
  const favList = getLocalStorage("favList") || [];
  favList.forEach((pokemon) => {
    if (pokemon.id == pokeId) {
      removePokemon(favList);
    }
  });
});

showFavList();