export default class Ship{
    #hits:number;
    #length;
    constructor(length:number){
        this.#length = length;
        this.#hits = 0;
    }

    hit(){
        this.#hits++;
    }

    isSunk(){
        return (this.#hits === this.#length || this.#hits > this.#length);
    }
}