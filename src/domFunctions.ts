//We Will ONLY control the dom with this. NO GAME LOGIC!!!!! ALL THAT IN MAIN ONLY DOM YOU MONKEY STOP IT HAHAHAHAHAHAHAHA
//DIVISION OF RESPONISIBILTY MONKEY
//"Oh, but I could just..." NO NO NO NO NO NO BAD PRACTICE DOM ONLY
//DOM ONLY


function StartButtonDom(): void {
    const retbutton = new HTMLButtonElement();
    retbutton.type = "button";
    retbutton.classList.add("start-button");

    const main = document.querySelector("main");
    if (main) {
        main.innerHTML = "";
        main.append(retbutton);
    }
}


function PlaceShipDOM(): void {
    const retGrid = new HTMLDivElement();
    const alignButton = new HTMLButtonElement();
    alignButton.innerText = "Horizontal"; 
    alignButton.id ="align-button";
    const alignLabel = new HTMLLabelElement();
    alignLabel.classList.add("align-label");
    alignLabel.htmlFor = "align-button";
    
    const alignDiv = new HTMLDivElement();
    alignDiv.classList.add("align-container");
    alignDiv.append(alignLabel, alignButton);

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const space = new HTMLDivElement();
            space.classList.add("place-ship-space");
            space.classList.add(i.toString() + j.toString());
            retGrid.appendChild(space);
        }
    }
    const main = document.querySelector("main");
    if (main) {
        main.innerHTML = "";
        main.append(alignDiv);
        main.append(retGrid);
    }
}

function GameDOM(): void {
    const playerGrid = new HTMLDivElement();
    const aiGrid = new HTMLDivElement();
    for (let i = 0; i < 10; i++) {
        const pSpace = new HTMLDivElement();
        const aiSpace = new HTMLDivElement();
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