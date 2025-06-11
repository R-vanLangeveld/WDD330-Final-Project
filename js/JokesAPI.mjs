export default class Jokes {
  constructor() {}

  async getJokes() {
    const joke1 = await fetch("https://official-joke-api.appspot.com/random_joke");
    document.querySelector("#jokeList").classList.add("active");
    document.querySelector("#joke").classList.add("active");
    if (joke1.ok) {
      const data = await joke1.json();
      document.querySelector("#joke1").innerHTML = `${data.setup}<br>${data.punchline}`;
    }

    const joke2 = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
    if (joke2.ok) {
      const data = await joke2.json();
      if (data.type === "twopart") {
        document.querySelector("#joke2").innerHTML = `${data.setup}<br>${data.delivery}`;
      }
      else {
        document.querySelector("#joke2").innerHTML = `${data.joke}`;
      }
    }

    const joke3 = await fetch("https://geek-jokes.sameerkumar.website/api?format=json");
    if (joke3.ok) {
      const data = await joke3.json();
      document.querySelector("#joke3").innerHTML = `${data.joke}`;
    }
  }
}