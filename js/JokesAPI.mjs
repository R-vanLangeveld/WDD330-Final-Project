export default class Jokes {
  constructor() {}

  async getJokes() {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    if (response.ok) {
      const data = await response.json();
      document.querySelector("#joke").innerHTML = `${data.setup}<br>${data.punchline}`;
    }
  }
}