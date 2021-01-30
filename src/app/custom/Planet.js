import EventEmitter from "eventemitter3";
import { delay } from "../utils";
import Person from "./Person";

export default class Planet extends EventEmitter {
  constructor(name, peopleData) {
    super();
    this.name = name;
    this.config = { populationDelay: 1 };
    this.peopleData = peopleData;
    this.population = [];
  }

  static get events() {
    return {
      PERSON_BORN: "person_born",
      POPULATING_COMPLETED: "populating_completed",
    };
  }
  get populationCount() {
    return this.population.length;
  }

  async populate() {
    await delay(this.config.populationDelay);
    if (this.populationCount < 10) {
      this.population.push(
        new Person(
          this.peopleData[this.populationCount].name,
          this.peopleData[this.populationCount].height,
          this.peopleData[this.populationCount].mass
        )
      );
      this.emit("PERSON_BORN", {
        filmUrls: this.peopleData[this.populationCount-1].films,
      });
        this.populate();
    } else {
      this.emit("POPULATING_COMPLETED");
    }
  }
}
