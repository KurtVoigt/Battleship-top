import {StartButtonDom, PlaceShipDOM, GameDOM} from "./domFunctions.ts"
import Player from "./classes/player.ts";
import "./reset.scss";
import "./style.scss";


//TODO: Create DOM Elements, pass objects to dom functions to keep state consistent


const player = new Player();
const ai = new Player();

GameStart();


function GameStart(){
  StartButtonDom();
  const sb = document.querySelector(".start-button");
  if(sb instanceof HTMLButtonElement)
    sb.addEventListener("click", ()=>{
      PlaceShipState();});

}

function PlaceShipState(){
  ai.setAIShips();
  PlaceShipDOM();
  //here goes the game Logic!
  //you wanted to put it in domfunctions again you dog!
  const shipLengths = [5,4,3,3,2] as const;
  let roundNumber = 0;
  //a "types" file might be a good idea in the future :)
  let shipOrient: "h"|"v" = "h";

  const alignButton = document.querySelector("#align-button");
  if(alignButton instanceof HTMLButtonElement){
    alignButton.addEventListener("click",()=>{
      if(shipOrient == "h")
        shipOrient = "v";
      else if(shipOrient == "v")
        shipOrient = "h";
    });
  }

 //attach listeners to grid slots for styling 
  const spaceList = document.querySelectorAll(".place-ship-space");
  for(let i = 0; i < spaceList.length; ++i){
    if(spaceList[i] instanceof HTMLDivElement){
      spaceList[i].addEventListener("click",()=>{
        ShipPlacementCallback(spaceList[i] as HTMLDivElement, roundNumber, shipLengths, shipOrient)
        roundNumber++;
        
        if(roundNumber === 5){
          //go to game!
          GameState();
        }

      });
    }
  }
  
}


function GameState():void{
  GameDOM();
}

function ShipPlacementCallback(space:HTMLDivElement, roundNumber:number, shipLengths: readonly [5,4,3,3,2], orient: "h"|"v"): void{
  let spaceNumber = space.classList.item(1);
  //need front end protections based off of ship length! might need to change from grid o actual table
  if(spaceNumber)
    player.playerSetShip({x:parseInt(spaceNumber.charAt(0)), y: parseInt(spaceNumber.charAt(1))},
      shipLengths[roundNumber], orient);

}