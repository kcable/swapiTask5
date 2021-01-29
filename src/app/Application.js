import config from "../config";
import EventEmitter from "eventemitter3";
import StarWarsUniverse from "./custom/StarWarsUniverse";
import { findPlanet, getFirst10People } from "./utils";

const EVENTS = {
  APP_READY: "app_ready",
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application extends EventEmitter {
  constructor() {
    super();

    this.config = config;
    this.data = {};

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree. Task data should be assigned to Application.data.
   * The APP_READY event should be emitted at the end of this method.
   */
  async init() {
    // Initiate classes and wait for async operations here.
    this.data.universe = new StarWarsUniverse();
    this.data.universe.on("UNIVERSE_POPULATED", ()=>{
      console.log("it is done i guess");
     
    });
    await this.data.universe.init();
    this.data.universe.removeAllListeners();
    
    
    
    this.emit(Application.events.APP_READY);
  }
}
