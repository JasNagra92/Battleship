import { ShipFactory } from './shipfns';

const GameboardFactory = () => ({
  ships: [],
  missedShots: [],
  previousShots: [],
  board: (function makeBoard() {
    const board = new Array(10);
    for (let i = 0; i < 10; i += 1) {
      board[i] = new Array(10);
      for (let j = 0; j < 10; j += 1) {
        board[i][j] = null;
      }
    }
    return board;
  }()),
  receiveAttack(x, y) {
    this.previousShots.forEach((coordinates) => {
      if (coordinates[0] === x && coordinates[1] === y) {
        throw new Error('coordinates already hit');
      }
    });
    if (this.ships.length > 0) {
      this.ships.forEach((ship) => {
        if (
          ship.position.forEach((coordinates) => {
            if (coordinates[0] === x && coordinates[1] === y) {
              ship.hit(x, y);
              ship.isSunk(ship.position);
            }
          })
        ) {
          this.previousShots.push([x, y]);
        } else {
          this.missedShots.push([x, y]);
          this.previousShots.push([x, y]);
        }
      });
    }
  },
  ShipFactory,
  checkAllSunk(array) {
    if (array.every((ship) => ship.sunk === true)) {
      return true;
    }
    return false;
  },
});
export { GameboardFactory };
