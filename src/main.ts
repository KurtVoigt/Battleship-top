import {StartButtonDom, PlaceShipDOM, GameDOM} from "./domFunctions.ts"
import Player from "./classes/player.ts";


//TODO: Create DOM Elements, pass objects to dom functions to keep state consistent


const player = new Player();
const ai = new Player();

GameStart();


function GameStart(){
  StartButtonDom();
}

