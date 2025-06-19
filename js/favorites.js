import { getLocalStorage, setLocalStorage, capFirst, lastUpdate } from "./utils.mjs";
import Pokémon from "./PokeAPI.mjs";
import Jokes from "./JokesAPI.mjs";

lastUpdate();
const pokeapi = new Pokémon();
const jokes = new Jokes();

jokes.getJokes();

const favoritesList = document.querySelector("#favoritesList");
let pokeId = 0;
const favList = getLocalStorage("favList") || [];

// shows the list of favorited Pokémon
function showFavList(list) {
  favoritesList.innerHTML  = "";
  list.forEach((pokemon) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const span = document.createElement("span");
    const decrease = document.createElement("button");
    const increase = document.createElement("button");

    img.setAttribute("src", `${pokemon.sprites.front_default}`);
    img.setAttribute("alt", `The frontsprite of ${capFirst(pokemon.name)}`);
    img.setAttribute("width", "96");
    img.setAttribute("height", "96");
    p.innerHTML = `Name: ${capFirst(pokemon.name)}<br>Id: ${pokemon.id}<br>Times Favorited: `;
    span.innerText = `${pokemon.timesFaved}`;
    increase.textContent = "Upvote";
    decrease.textContent = "Downvote";

    li.addEventListener("click", function() {
      pokeId = pokemon.id;
      setLocalStorage("pokeInfo", pokemon);
    });

    img.addEventListener("click", function() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
      pokeapi.getPokemon(url);
      document.querySelector("#removeButton").classList.remove("hidden");
      jokes.getJokes();
      pokeId = pokemon.id;
      shiny(img, pokeId);
    });

    p.addEventListener("click", function() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
      pokeapi.getPokemon(url);
      pokeId = pokemon.id;
      document.querySelector("#removeButton").classList.remove("hidden");
      jokes.getJokes();
    });

    decrease.addEventListener("click", function() {
      let i = 0;
      let correctMon = false;
      let itemIndex = 0;
      const baseLength = list.length;

      if (baseLength !== 0) {
        do {
          for (let n = 0; n < baseLength; n++) {
            if (pokemon.id === list[n].id) {
              itemIndex = n;
              correctMon = true;
            }
          }
          i += 1;
        } while (i <= baseLength - 1);

        if (correctMon === true) {
          list[itemIndex].timesFaved = list[itemIndex].timesFaved - 1;
          span.innerText = `${list[itemIndex].timesFaved}`;
          setLocalStorage("favList", list);
        }
        if (list[itemIndex].timesFaved <= 0) {
          removePokemon(list);
        }
      }

    });

    increase.addEventListener("click", function() {
      let j = 0;
      let correctMon = false;
      let itemIndex = 0;
      const baseLength = list.length;

      if (baseLength !== 0) {
        do {
          for (let n = 0; n < baseLength; n++) {
            if (pokemon.id === list[n].id) {
              itemIndex = n;
              correctMon = true;
            }
          }
          j += 1;
        } while (j <= baseLength - 1);

        if (correctMon === true) {
          list[itemIndex].timesFaved += 1; 
          span.innerText = `${list[itemIndex].timesFaved}`;
        }
      }
      setLocalStorage("favList", list);
    });

    p.appendChild(span);
    li.appendChild(img);
    li.appendChild(p);
    li.appendChild(increase);
    li.appendChild(decrease);
    favoritesList.appendChild(li);
  });
}

// removes a Pokémon from the favList
function removePokemon(favList) {
  const filteredList = favList.filter((pokemon) => pokemon.id != pokeId);
  document.querySelector("#pokeInfo").classList.add("hidden");
  document.querySelector("#removeButton").classList.add("hidden");
  setLocalStorage("favList", filteredList);
  showFavList(filteredList);
}

// switches the sprite between normal and shiny
function shiny(img, pokeId) {
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
    img.classList.toggle("clicked");
    favList[itemIndex].timesClicked += 1;

    if (favList[itemIndex].timesClicked % 2 === 0) {
      setTimeout(() => {img.classList.add("clicked");}, 1000);
      img.setAttribute("src", favList[itemIndex].sprites.front_shiny);
      img.setAttribute("alt", `The shiny frontsprite of ${capFirst(favList[itemIndex].name)}`);
    } else {
      setTimeout(() => {img.classList.add("clicked");}, 1000);
      img.setAttribute("src", favList[itemIndex].sprites.front_default);
      img.setAttribute("alt", `The frontsprite of ${capFirst(favList[itemIndex].name)}`);
    }
  }
}

// sorts the displayed list by the Pokémon's id or timesFaved
function sortBy(input) {
  const favList = getLocalStorage("favList") || [];
  document.querySelector("#pokeInfo").classList.add("hidden");
  document.querySelector("#removeButton").classList.add("hidden");
  jokes.getJokes();

  if (input === "timesFaved") {
    showFavList(favList.toSorted((a, b) => a.timesFaved - b.timesFaved));
  } else if (input === "id") {
    showFavList(favList.toSorted((a, b) => a.id - b.id));
  } else {
    showFavList(favList);
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

document.querySelector("#sortBtn").addEventListener("click", function() {
	const value = document.getElementById("sort").value;
	sortBy(value);
});

showFavList(favList);