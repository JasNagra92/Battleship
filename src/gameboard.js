import { ShipFactory } from './shipfns';

const GameboardFactory = () => {
  return {
    ships: [],
    missedShots: [],
    previousShots: [],
    board: ( function makeBoard(){
        const board = new Array(10);
        for (let i = 0; i < 10;i++){
            board[i] = new Array(10)
            for (let j = 0; j < 10; j++){
              board[i][j] = null
            }
        };
        return board;
    })(),
    receiveAttack(string) {
      if (this.previousShots.includes(string)) {
        throw new Error('Coordinates have already been hit');
      } else if (this.ships.length > 0) {
        this.ships.forEach((ship) => {
          if (ship.position.includes(string)) {
            this.previousShots.push(string);
            ship.hit(string);
            ship.isSunk(ship.position);
          } else {
            this.missedShots.push(string);
            this.previousShots.push(string);
          }
        });
      } else {
        this.missedShots.push(string);
        this.previousShots.push(string);
      }
    },
    ShipFactory,
    checkAllSunk(array) {
      if (array.every((ship) => ship.sunk == true)) {
        return true;
      } else {
        return false;
      }
    },
  };
};
export { GameboardFactory };
