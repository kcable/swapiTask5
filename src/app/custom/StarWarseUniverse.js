import EventEmitter from "eventemitter3";
import { findPlanet, getFirst10People, _onPersonBorn } from "../utils";

import Planet from "./Planet";

export default class StarWarsUniverse extends EventEmitter {
  constructor() {
    super();
    this.films = [];
    this.planet = null;
  }

  static get events() {
    return {
      FILM_ADDED: "film_added",
      UNIVERSE_POPULATED: "universe_populated",
    };
  }

  async init() {
    const DesertPlanet = await findPlanet();
    const people = await getFirst10People();
    const planet = new Planet(DesertPlanet.name, people);
    this.planet = planet;
    console.log("oi");
    planet.on("PERSON_BORN", _onPersonBorn,this);
    planet.on("POPULATING_COMPLETED", () => {
      this.emit("UNIVERSE_POPULATED");
      console.log("universe populated");
      console.log(this.planet);
      console.log(this.films);
      
    });
    await planet.populate();
    planet.removeAllListeners();
  }
}
