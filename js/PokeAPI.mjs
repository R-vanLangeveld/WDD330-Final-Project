import { getLocalStorage, setLocalStorage, capFirst } from "./utils.mjs";

export default class Pokémon {
  constructor() {}

  // gets and displays the data of a Pokémon when called
  async getPokemon(url) {
    const pokeInfo = document.querySelector("#pokeInfo");
    const response = await fetch(url);
    explainText.classList.add("hidden");

    if (response.ok) {
      const pokemon = await response.json();
      const url = pokemon.species.url;
      const response2 = await fetch(url);

      if (response2.ok) {
        setLocalStorage("pokeInfo", pokemon);
        const species = await response2.json();
        let timesClicked = -1;
        pokeInfo.classList.remove("hidden");

        pokeInfo.innerHTML = `<figure>
          <img src="${pokemon.sprites.front_default}" alt="The frontsprite of ${capFirst(pokemon.name)}" width="96" height="96" class="clicked">
          <figcaption> Pokémon: ${capFirst(pokemon.name)} </figcaption>
        </figure>
        <div>
          <p>Species: ${capFirst(pokemon.species.name)}<br>
          Weight: ${pokemon.weight}<br>Height: ${pokemon.height}<br>
          Id: ${pokemon.id}<br><br>Types: </p><ul id="typeList"></ul>
        </div>
        <div><p>Base Stats:</p><ul id="stats"></ul></div>
        <div id="varieties" class="hidden"><p>Varieties:</p>
        <ul id="varietyList"></ul></div>
        <div id="forms" class="hidden"><p>Forms:</p>
        <ul id="formList"></ul></div>`;

        pokemon.types.forEach((slot) => {
          document.querySelector("#typeList").innerHTML += `<li>${capFirst(slot.type.name)}</li>`;
        });

        pokemon.stats.forEach((stat) => {
          document.querySelector("#stats").innerHTML += `<li>${capFirst(stat.stat.name.replaceAll("-", " "))}: ${stat.base_stat}</li>`;
        });

        if (species.varieties.length > 1) {
          document.querySelector("#varieties").classList.remove("hidden");
          species.varieties.forEach((variety) => {
            const li = document.createElement("li");
            const urlText = variety.pokemon.url.replaceAll("/", "");
            li.innerHTML = `Name: ${variety.pokemon.name}<br>Id: ${urlText.slice(28)}`;
            varietyList.appendChild(li);
          });
        }

        if (pokemon.forms.length > 1) {
          document.querySelector("#forms").classList.remove("hidden");
          pokemon.forms.forEach((form) => {
            const li = document.createElement("li");
            const urlText = form.url.replaceAll("/", "");
            li.innerHTML = `Name: ${form.name}<br>Id: ${urlText.slice(33)}`;
            formList.appendChild(li);
          });
        }

        // this needs to happen after the Pokémon's data is displayed
        document.querySelector("figure").addEventListener("click", function() {
          const figImg = document.querySelector("figure img");
          figImg.classList.toggle("clicked");
          const pokemon = getLocalStorage("pokeInfo");        timesClicked += 1;

          if (timesClicked % 2 === 0) {
            setTimeout(() => {figImg.classList.add("clicked");}, 1000);
            figImg.setAttribute("src", pokemon.sprites.front_shiny);
            figImg.setAttribute("alt", `The shiny frontsprite of ${capFirst(pokemon.name)}`);
          } else {
            setTimeout(() => {figImg.classList.add("clicked");}, 1000);
            figImg.setAttribute("src", pokemon.sprites.front_default);
            figImg.setAttribute("alt", `The frontsprite of ${capFirst(pokemon.name)}`);
          }
        });

      } else {
        explainText.classList.remove("hidden");
      }
    } else {
      explainText.classList.remove("hidden");
    }
  }
}