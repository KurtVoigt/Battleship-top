import Ship from "./ship";

type coords = {
    x:number,
    y:number,
}

type shipPlacementType = {
    startingCoord: coords,
    length:number,
    orient: "h" | "v"
}



type shipSpace = Ship | null;
interface boardSpace {
    ship:shipSpace,
    beenShot: boolean
}


type miss = "miss";
class Gameboard{
    #board:boardSpace[][];
    constructor(){
        this.#board = [];
        for(let i=0; i<10; ++i){
            let arr = [];
            for(let j=0; j<10; ++j){
                const space:boardSpace = {ship:null, beenShot:false}
                arr.push(space)
            }
            this.#board.push(arr);
        };
    }

    //will have to disable the ability to click a coord from the 
    //frontend in order to disable clicking the same space multiple times
    receiveAttack(coords:coords){
        
        if(this.#board[coords.y][coords.x].beenShot)
            return;
        

        if(this.#board[coords.y][coords.x].ship !== null){
            this.#board[coords.y][coords.x].ship?.hit();
        }
        this.#board[coords.y][coords.x].beenShot = true;
        return;
    }

    allSunk(){
        for(let i=0; i<this.#board.length; i++){
            for(let j=0; j < this.#board[i].length; j++){
                if(this.#board[i][j].ship !==null){
                    if(!this.#board[i][j].ship?.isSunk())
                        return false;
                }
            }
        }
        return true;
    }

    placeShip(shipInfo: shipPlacementType){

        if(!this.OKToPlaceShipCheck(shipInfo)){
            throw new Error("ship-already-placed");
        }

        const newShip = new Ship(shipInfo.length);
        (this.#board[shipInfo.startingCoord.y][shipInfo.startingCoord.x]).ship = newShip;
        if(shipInfo.orient === "h"){
            for( let i=1; i<shipInfo.length; i++){
                this.#board[shipInfo.startingCoord.y][shipInfo.startingCoord.x+i].ship = newShip;
            }
        }
        else{
            for( let i=1; i<shipInfo.length; i++){
                this.#board[shipInfo.startingCoord.y+i][shipInfo.startingCoord.x].ship = newShip;
            }
        }
        
 
    }


    //true means ship is there false means space is free
    OKToPlaceShipCheck(shipInfo: shipPlacementType){
        if(shipInfo.orient === "h"){
            for( let i=0; i<shipInfo.length; i++){
                if(this.#board[shipInfo.startingCoord.y][shipInfo.startingCoord.x+i].ship instanceof Ship)
                    return false;
            }
        }
        else{
            for( let i=1; i<shipInfo.length; i++){
                if(this.#board[shipInfo.startingCoord.y+i][shipInfo.startingCoord.x].ship instanceof Ship)
                    return false;

            }
        }
        return true;

    }
 

    get boardState(){
        return this.#board;
    }   

}

export type {shipPlacementType, coords}
export {Gameboard}