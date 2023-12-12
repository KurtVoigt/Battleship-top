import {expect, test} from 'vitest';
import Ship from "../classes/ship";
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