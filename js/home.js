import { getLocalStorage, setLocalStorage, lastUpdate } from "./utils.mjs";
import Pokémon from "./PokeAPI.mjs";
import Jokes from "./JokesAPI.mjs";

lastUpdate();
const pokeapi = new Pokémon();
const jokes = new Jokes();

pokeapi.getPokemon("https://pokeapi.co/api/v2/pokemon/52");

const addToFavs = document.querySelector("#addToFavList");

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
		pokeapi.explainError();
	}
});

addToFavs.addEventListener("click", function() {
  addToFavs.classList.add("favorited");
  addToFavs.textContent = "Favorited";
  document.querySelector("figcaption").classList.add("favorited");
  const favList = getLocalStorage("favList") || [];
  const pokemon = getLocalStorage("pokeInfo");
  let j = 0;
  let inList = false;
  let itemIndex = 0;
  const array = {"timesFaved" : 1};
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










const x = document.getElementById("demo");

function getLocation() {
  try {
    navigator.geolocation.getCurrentPosition(showPosition);
  } catch(err) {
    x.innerHTML = err;
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

document.querySelector("#location").addEventListener("click", function() {
  getLocation();
});


const canvas = document.getElementById("tutorial");
let drawFace = false;

canvas.addEventListener("click", function() {
	if (drawFace == true) {
		drawSad();
		drawFace = false;
	} else if (drawFace == false) {
		drawHappy();
		drawFace = true;
	}
})

function drawSad() {
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");

		ctx.fillStyle = "rgb(256 256 256)";
		ctx.fillRect(0, 0, 150, 150);
		ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
    ctx.moveTo(100, 100);
    ctx.arc(75, 100, 25, 0, Math.PI, true);
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);
    ctx.stroke();

	}
}

function drawHappy() {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

		ctx.fillStyle = "rgb(256 256 256)";
		ctx.fillRect(0, 0, 150, 150);
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);
    ctx.stroke();
  }
}

