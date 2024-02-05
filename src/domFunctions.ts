//We Will ONLY control the dom with this. NO GAME LOGIC!!!!! ALL THAT IN MAIN ONLY DOM YOU MONKEY STOP IT HAHAHAHAHAHAHAHA
//DIVISION OF RESPONISIBILTY MONKEY
//"Oh, but I could just..." NO NO NO NO NO NO BAD PRACTICE DOM ONLY
//DOM ONLY


function StartButtonDom(): void {
    const retbutton = document.createElement("button");
    retbutton.type = "button";
    retbutton.innerHTML= "START &#8594;";

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
    alignButton.id ="align-button";
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

function GameDOM(): void {
    const playerGrid = document.createElement("div");
    const aiGrid = document.createElement("div");
    for (let i = 0; i < 10; i++) {
        const pSpace = document.createElement("div");
        const aiSpace = document.createElement("div");
        playerGrid.appendChild(pSpace);
        aiGrid.appendChild(aiSpace)
    }

    const main = document.querySelector("main");
    if (main) {
        main.innerHTML = "";
        main.append(playerGrid, aiGrid);
    }
    //redo button possibly
}

export { StartButtonDom, PlaceShipDOM, GameDOM};