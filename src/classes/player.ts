import { Gameboard } from "./gameboard";
import type { coords, shipPlacementType } from "./gameboard";
export default class Player {
    private board: Gameboard
    constructor() {
        this.board = new Gameboard();;
    }

    aiAttack() {
        let coord:coords = getRandomCoord();
        while(this.board.boardState[coord.y][coord.x].beenShot){
            coord = getRandomCoord();
        }
        this.board.receiveAttack(coord);
    }

    setAIShips(){
        const shiparr = [5,4,3,3,2];
        const orientarr: Array<"h" | "v"> = ["h", "v"];
        for(let i = 0; i < shiparr.length; i++){
            const orient = orientarr[Math.floor(Math.random()*2)];
            this.placeAIShips(shiparr[i],orient)
        }
    }
    
    //need an algorithm that will place ships in a random manner
    //look up ways to do this in a less random fashion.
    private placeAIShips(length:number, orient:"h"|"v"):void {
        while(true){//keep searching until ship is placed?
            const coord = getRandomCoord();
            try{
                this.board.placeShip({startingCoord:coord, length: length, orient:orient});
                return;
            }
            catch(e){
               ;// in this case the error is useless other than
               //as a signal to try again 
            }
        }
        
    }

    playerAttack(coord:coords):boolean{
        return this.board.receiveAttack(coord);
    }

    playerSetShip(coord: coords, length: number, orient:"h"|"v"): shipPlacementType| Error{
       return this.board.placeShip({startingCoord:coord, length: length, orient: orient});

    }

    get GameBoard(){
        return this.board
    }

}


function getRandomCoord(): coords {
    return { x: Math.floor(Math.random() * 10) , y: Math.floor(Math.random() * 10) };
}