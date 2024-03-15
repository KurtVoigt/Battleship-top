import { StartButtonDom, PlaceShipDOM, GameDOM, buildHitSquare, buildMissSquare } from "./domFunctions.ts"
import Player from "./classes/player.ts";
import "./reset.scss";
import "./style.scss";
import { coords, shipPlacementType } from "./classes/gameboard.ts";


//TODO: Create DOM Elements, pass objects to dom functions to keep state consistent


const player = new Player();
const ai = new Player();

GameStart();


function GameStart() {
  StartButtonDom();
  const sb = document.querySelector(".start-button");
  if (sb instanceof HTMLButtonElement)
    sb.addEventListener("click", () => {
      PlaceShipState();
    });

}

function PlaceShipState() {
  ai.setAIShips();
  PlaceShipDOM();
  //here goes the game Logic!
  //you wanted to put it in domfunctions again you dog!
  const shipLengths = [5, 4, 3, 3, 2] as const;
  let roundNumber = 0;
  //a "types" file might be a good idea in the future :)
  let shipOrient: "h" | "v" = "h";

  const alignButton = document.querySelector("#align-button");
  if (alignButton instanceof HTMLButtonElement) {
    alignButton.addEventListener("click", () => {
      if (shipOrient == "h")
        shipOrient = "v";
      else if (shipOrient == "v")
        shipOrient = "h";
    });
  }

  //attach listeners to grid slots for styling 
  const spaceList = document.querySelectorAll(".place-ship-space");
  for (let i = 0; i < spaceList.length; ++i) {
    if (spaceList[i] instanceof HTMLDivElement) {
      spaceList[i].addEventListener("click", () => {
        const placed = ShipPlacementCallback(spaceList[i] as HTMLDivElement, roundNumber, shipLengths, shipOrient)
        if (!(placed instanceof Error)) {
          //move this to dom functions? I'll never do it but if I was getting paid for this I would
          if (shipOrient === "h") {
            for (let j = 0; j < shipLengths[roundNumber]; j++) {
              spaceList[i + j].classList.add("placed-ship");
            }
          }
          else if (shipOrient === "v") {
            for (let j = 0; j < shipLengths[roundNumber]; j++) {
              spaceList[i + j*10].classList.add("placed-ship");
            }
          }
          roundNumber++;
        }

        if (roundNumber === 5) {
          //go to game!
          GameState(player);
        }

      });
      //light up hovers

      spaceList[i].addEventListener("mouseenter", () => {
        if (shipOrient === "h") {
          let disabled: boolean = false;
          for (let j = shipLengths[roundNumber] - 1; j >= 0; --j) {
            if (spaceList[i + j]) {
              if ((parseInt(spaceList[i].classList[1]) > parseInt(spaceList[i + j].classList[1]))) {
                disabled = true;
              }
              else {
                if (disabled)
                  spaceList[i + j].classList.add("ship-disabled-marker");
                else
                  spaceList[i + j].classList.add("ship-placement-marker");

              }
            }
            else {
              disabled = true;
            }
          }
        }

        else if (shipOrient === "v") {
          let disabled: boolean = false;
          for (let j = 0; j < shipLengths[roundNumber]; ++j) {
            if (!(spaceList[i + (shipLengths[roundNumber] - 1) * 10])) {
              disabled = true;
            }
            if (spaceList[i + j * 10]) {
              if (disabled)
                spaceList[i + j * 10].classList.add("ship-disabled-marker");
              else
                spaceList[i + j * 10].classList.add("ship-placement-marker");
            }
          }
        }
      });
      spaceList[i].addEventListener("mouseleave", () => {
        spaceList.forEach((el) => {
          el.classList.remove("ship-placement-marker");
          el.classList.remove("ship-disabled-marker");
        });
      });
    }

  }
  //light up hovers
  if (shipLengths[roundNumber] === 5) {// carrier

  }

}


function GameState(player:Player ): void {
  GameDOM(player);
  //boards are now rendered, on click the ai to query hits, mark them in the dom (make a dom function
  //that updates the ai dom with coords) , get the ai to do the hit and update THAT in the player grid
  //and then you have a game!, maybe make it two player?
  AttachAIBoardClickListeners();
  
}

function AttachAIBoardClickListeners(): void{
  const aiCells = document.querySelectorAll(".game-ship-space-enemy");
  if(aiCells){
    for(let i = 0; i < aiCells.length; ++i){
      if(aiCells[i] instanceof HTMLDivElement){
        aiCells[i].addEventListener("click",()=>{
          let stringCoords:string;
          let xCoord;
          let yCoord;

          if(aiCells[i].classList.item(1)){//why isn't this check good enough for typescript if it is null it won't go here
            stringCoords = aiCells[i].classList.item(1) as string;
            xCoord = stringCoords[0];
            yCoord = stringCoords[1];

            const coords:coords = {x:parseInt(xCoord), y: parseInt(yCoord)};
            const hit = ai.playerAttack(coords);

            if(hit)
              buildHitSquare(aiCells[i] as HTMLDivElement); //once again this is already checked, figure this out
            else
              buildMissSquare(aiCells[i] as HTMLDivElement);
          }


        });
      }
    }
  }
}

function ShipPlacementCallback(space: HTMLDivElement, roundNumber: number, shipLengths: readonly [5, 4, 3, 3, 2], orient: "h" | "v"): shipPlacementType | Error {
  let spaceNumber = space.classList.item(1);
  //need front end protections based off of ship length! might need to change from grid o actual table
  if (spaceNumber) {
    return player.playerSetShip({ x: parseInt(spaceNumber.charAt(0)), y: parseInt(spaceNumber.charAt(1)) },
      shipLengths[roundNumber], orient);

  }
  else
    return new Error("placement-space-not-found");
}