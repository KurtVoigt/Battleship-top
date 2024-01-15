import {expect, test} from 'vitest';
import Ship from "../classes/ship";
import {Gameboard, shipPlacementType, shipSpace} from '../classes/gameboard';
import Player from '../classes/player';
//ship tests**********************************************************
test("create ship", ()=>{
    const newShip = new Ship(3);
    expect(newShip instanceof Ship).toBe(true)});

test("one hp and one hit means sunk", ()=>{
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true)});

test("one hp and two hits means sunk", ()=>{
    const ship = new Ship(1);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true)});


//gameboard tests*******************************************************

test("create board", ()=>{
    const newBoard = new Gameboard();
    expect(newBoard instanceof Gameboard).toBe(true)});

    //TODO: iteratively test whole board state
test("place ship vertically", ()=>{
    const newBoard = new Gameboard();
    newBoard.placeShip({startingCoord:{x:0,y:0}, length:3, orient:"v"});
    expect(newBoard.boardState[0][0].ship instanceof Ship).toBe(true);
    expect(newBoard.boardState[1][0].ship instanceof Ship).toBe(true);
    expect(newBoard.boardState[2][0].ship instanceof Ship).toBe(true);
    expect(newBoard.boardState[0][1].ship instanceof Ship).toBe(false);
});

test("place ship horizontally", ()=>{
    const newBoard = new Gameboard();
    newBoard.placeShip({startingCoord:{x:0,y:0}, length:3, orient:"h"});
    expect(newBoard.boardState[0][0].ship instanceof Ship).toBe(true);
    expect(newBoard.boardState[0][1].ship instanceof Ship).toBe(true);
    expect(newBoard.boardState[0][2].ship instanceof Ship).toBe(true);
    expect(newBoard.boardState[1][0].ship instanceof Ship).toBe(false);

    expect(()=>newBoard.placeShip({startingCoord:{x:2,y:0}, length:3, orient:"h"})).toThrowError("ship-already-placed");
});

test("hit vertical ship multiple times and see if sunk", ()=>{
    const board = new Gameboard();
    board.placeShip({startingCoord:{x:0,y:0}, length:3, orient:"v"});
    board.receiveAttack({x:0, y:0})
    board.receiveAttack({x:0, y:1})
    board.receiveAttack({x:0, y:2})
    expect(board.boardState[0][0].beenShot).toBe(true)
    expect(board.boardState[1][0].beenShot).toBe(true)
    expect(board.boardState[2][0].beenShot).toBe(true)
    expect(board.boardState[0][2].ship).toBe(null);
    expect(board.boardState[2][0].ship?.isSunk()).toBe(true)

});

test("hit horizontal ship multiple times and see if sunk", ()=>{
    const board = new Gameboard();
    board.placeShip({startingCoord:{x:0,y:0}, length:3, orient:"h"});
    board.receiveAttack({x:0, y:0})
    board.receiveAttack({x:1, y:0})
    board.receiveAttack({x:2, y:0})
    expect(board.boardState[0][0].beenShot).toBe(true)
    expect(board.boardState[0][1].beenShot).toBe(true)
    expect(board.boardState[0][2].beenShot).toBe(true)
    expect(board.boardState[0][2].ship?.isSunk()).toBe(true)

});

test("hitting a ship in same spot means it is not sunk", ()=>{
    const board = new Gameboard();
    board.placeShip({startingCoord: {x:3, y:4}, length: 2, orient:"h"});
    board.receiveAttack({x:3, y:4});
    board.receiveAttack({x:3, y:4});
    console.log(board.boardState[4]);
    expect(board.boardState[4][3].ship?.isSunk()).toBe(false);
});

test("big one, place multiple ships, hit them all, and check if all are sunk",()=>{
    const board = new Gameboard();
    board.placeShip({startingCoord: {x:3, y:4}, length: 2, orient:"h"});
    board.receiveAttack({x:3, y:4});
    board.receiveAttack({x:4, y:4});
    board.placeShip({startingCoord: {x:6, y:6}, length: 3, orient:"v"});
    board.receiveAttack({x:6, y:6});
    board.receiveAttack({x:6, y:7});
    board.receiveAttack({x:6, y:8});
    board.placeShip({startingCoord: {x:0, y:0}, length: 4, orient:"h"});
    board.receiveAttack({x:0, y:0});
    board.receiveAttack({x:1, y:0});
    board.receiveAttack({x:2, y:0});
    board.receiveAttack({x:3, y:0});

    expect(board.allSunk()).toBe(true);
});

//player tests ****************************************************888*****************
//should dom have access to baord if it is managed via players? I think not
//on the other hand, the dom manager needs at least read access to the boards to display the info on them
//making the functions private would also break the tests...
//leaving it this way I'm the only one working on this anyway
test("player and AI function tests, place ships and attack", ()=>{
const playerBoard = new Gameboard();
const AIBoard = new Gameboard();
const player = new Player(playerBoard);
const AI = new Player(AIBoard);
//set up ships
AI.setAIShips();
//should now have a board with ship lengths 5 4 3 3 2 
const evaluatedAiBoard = evaluateBoard(AIBoard);

player.playerSetShip({x:0, y:0}, 5, "h")
player.playerSetShip({x:5, y:0}, 4, "h")
player.playerSetShip({x:0, y:1}, 3, "v")
player.playerSetShip({x:4, y:5}, 3, "v")
player.playerSetShip({x:7, y:3}, 2, "h")

const evaluatedPBoard = evaluateBoard(playerBoard);

player.playerAttack({x:0, y:0});

expect(playerBoard.boardState[0][0].beenShot).toBe(true);
expect(evaluatedAiBoard).toBe(true);
expect(evaluatedPBoard).toBe(true);
function evaluateBoard(gb:Gameboard):boolean{
    let arr:shipSpace[] = [];
    for(let i=0; i<10; i++){
        for(let j=0; j<10; j++){
            if(gb.boardState[i][j].ship){
                if(!(arr.find(entry => gb.boardState[i][j].ship=== entry)))
                    arr.push(gb.boardState[i][j].ship);
            }
        }
    }
   return (arr.length == 5) 
}


});


