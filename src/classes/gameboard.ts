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
        if(this.#board[coords.x][coords.y].ship !== null){
            this.#board[coords.x][coords.y].ship?.hit();
            //put in game over here?
        }
        this.#board[coords.x][coords.y].beenShot = true;
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
        const newShip = new Ship(shipInfo.length);
        (this.#board[shipInfo.startingCoord.x][shipInfo.startingCoord.y]).ship = newShip;
        if(shipInfo.orient === "h"){
            for( let i=1; i<shipInfo.length; i++){
                this.#board[shipInfo.startingCoord.x][shipInfo.startingCoord.y+i].ship = newShip;
                console.log(this.#board[0][0]);
            }
        }
        else{
            for( let i=1; i<shipInfo.length; i++){
                this.#board[shipInfo.startingCoord.x+i][shipInfo.startingCoord.y].ship = newShip;
            }
        }
        
 
    }

    get boardState(){
        return this.#board;
    }   

}

export type {shipPlacementType}
export {Gameboard}