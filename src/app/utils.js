/**
 * Here you can define helper functions to use across your app.
 */
import Film from "./custom/Film";

function delay(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
async function findPlanet() {
  const { count, results } = await (
    await fetch(`https://swapi.booost.bg/api/planets/`)
  ).json();
  const sumArr = [...results];
  const pages = count % 10 === 0 ? count / 10 : Math.floor(count / 10 + 1); // if count is not a number divisible by 10 add one more page
  // retriveing data from api
  for (let i = 2; i <= pages; i++) {
    const { results: newRes } = await (
      await fetch(`https://swapi.booost.bg/api/planets/?page=${i}`)
    ).json();
    sumArr.push(...newRes);
  }
  sumArr.sort((a, b) => Number(a.population) - Number(b.population));
  return sumArr[0];
}

async function getFirst10People() {
  const people = [];
  for (let i = 1; i <= 10; i++) {
    const person = await (
      await fetch(`https://swapi.booost.bg/api/people/${i}/`)
    ).json();
    people.push(person);
  }
  return people;
}

function _onPersonBorn(object){
    console.log(object);
    object.filmUrls.forEach(element => {
        if(this.films.find(film => film.url === element) === undefined){
            this.films.push(new Film(element));
            this.emit("FILM_ADDED");
        }
    });
}

export {
  delay,
  findPlanet,
  getFirst10People,
  _onPersonBorn
};
