import {expect, test} from 'vitest';
import Ship from "../classes/ship";
import {Gameboard, shipPlacementType} from '../classes/gameboard';

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
