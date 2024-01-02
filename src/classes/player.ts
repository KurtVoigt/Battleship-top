import { Gameboard } from "./gameboard";
import type { coords } from "./gameboard";
class Player {
    private board: Gameboard
    constructor(board: Gameboard) {
        this.board = board;
    }

    aiAttack() {
        this.board.receiveAttack(getRandomCoord());
    }

    playerAttack(coord:coords){
        this.board.receiveAttack(coord);
    }
}


function getRandomCoord(): coords {
    return { x: Math.floor(Math.random() * 10) , y: Math.floor(Math.random() * 10) };
}