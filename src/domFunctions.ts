//We Will ONLY control the dom with this. NO GAME LOGIC!!!!! ALL THAT IN MAIN ONLY DOM YOU MONKEY STOP IT HAHAHAHAHAHAHAHA
//DIVISION OF RESPONISIBILTY MONKEY
//"Oh, but I could just..." NO NO NO NO NO NO BAD PRACTICE DOM ONLY
//DOM ONLY

import Player from "./classes/player";


function StartButtonDom(): void {
    const retbutton = document.createElement("button");
    retbutton.type = "button";
    retbutton.innerHTML = "START &#8594;";

    retbutton.classList.add("start-button");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("start-button-container");

    buttonContainer.appendChild(retbutton);

    const main = document.querySelector("main");
    if (main) {
        main.innerHTML = "";
        main.append(buttonContainer);
    }
}


function PlaceShipDOM(): void {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("placement-grid-container");


    const retGrid = document.createElement("div");
    retGrid.classList.add("placement-grid");


    const alignButton = document.createElement("button");
    alignButton.innerText = "Horizontal";
    alignButton.id = "align-button";
    alignButton.innerText = "Switch Alignment";
    const alignLabel = document.createElement("label");
    alignLabel.classList.add("align-label");
    alignLabel.htmlFor = "align-button";

    const alignDiv = document.createElement("div");
    alignDiv.classList.add("align-container");
    alignDiv.append(alignLabel, alignButton);

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const space = document.createElement("div");
            space.classList.add("place-ship-space");
            space.classList.add(j.toString() + i.toString());
            retGrid.appendChild(space);
        }
    }

    gridContainer.append(alignDiv);
    gridContainer.appendChild(retGrid);
    const main = document.querySelector("main");

    if (main) {
        main.innerHTML = "";
        main.append(gridContainer);
    }
}

function GameDOM(player:Player): void {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("game-grids-container");
    const playerGridAndTitle = document.createElement("div");
    const aiGridAndTitle = document.createElement("div");
    const playerGrid = document.createElement("div");
    const aiGrid = document.createElement("div");

    const playerTitle = document.createElement("div");
    const aiTitle = document.createElement("div");

    playerGridAndTitle.classList.add("game-grid-and-title");
    aiGridAndTitle.classList.add("game-grid-and-title");
    playerGrid.classList.add("game-grid");
    aiGrid.classList.add("game-grid");
    playerTitle.classList.add("title");
    aiTitle.classList.add("title");

    playerTitle.innerText = "You";
    aiTitle.innerText = "Enemy";
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const pSpace = document.createElement("div");
            const aiSpace = document.createElement("div");
            const coords = (j.toString() + i.toString()) ;
            pSpace.classList.add("game-ship-space");
            pSpace.classList.add(coords);

            aiSpace.classList.add("game-ship-space-enemy");
            aiSpace.classList.add(coords);
            //add on click to ai space YOU ALMOST DID IT AGAIN NO GAME LOGIC HERE JUST RENDER THE DANG THING

            playerGrid.appendChild(pSpace);
            aiGrid.appendChild(aiSpace)
            
        }
    }



    const main = document.querySelector("main");
    if (main) {
        main.innerHTML = "";
        playerGridAndTitle.append(playerTitle, playerGrid);
        aiGridAndTitle.append(aiTitle, aiGrid);
        gridContainer.append(playerGridAndTitle, aiGridAndTitle);
        main.append(gridContainer);
    }
     //render player ships on grid totally not game logic and a ok
    for(let i =0; i<player.GameBoard.boardState.length; i++){
        for(let j = 0; j< player.GameBoard.boardState[i].length; j++){
            if(player.GameBoard.boardState[i][j].ship){
                const space = document.getElementsByClassName("game-ship-space " + j.toString() + i.toString());
                console.log(space);
                if(space[0]){
                    space[0].classList.add("placed-ship");
                }
            }
        }
    }   //redo button possibly
}

export { StartButtonDom, PlaceShipDOM, GameDOM };