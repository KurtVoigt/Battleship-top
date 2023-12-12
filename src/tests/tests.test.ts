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

test("place ship vertically", ()=>{
    const newBoard = new Gameboard();
    console.log(newBoard.boardState);
    newBoard.placeShip({startingCoord:{x:0,y:0}, length:3, orient:"v"});
    expect(newBoard.boardState[0][0].ship instanceof Ship).toBe(true);
    expect(newBoard.boardState[1][0].ship instanceof Ship).toBe(true);
    expect(newBoard.boardState[2][0].ship instanceof Ship).toBe(true);
    expect(newBoard.boardState[0][1].ship instanceof Ship).toBe(false);
    console.log(newBoard.boardState);
});