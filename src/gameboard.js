import { ShipFactory } from './shipfns';

const GameboardFactory = () => {
  return {
    ships: [],
    missedShots: [],
    previousShots: [],
    board: (function makeBoard() {
      const board = new Array(10);
      for (let i = 0; i < 10; i++) {
        board[i] = new Array(10);
        for (let j = 0; j < 10; j++) {
          board[i][j] = null;
        }
      }
      return board;
    })(),
    receiveAttack(x, y) {
      if (
        this.previousShots.forEach(function (coordinates) {
          if (coordinates[0] == x && coordinates[1] == y) {
            throw new Error('coordinates already hit');
          }
        })
      ) {
      } else if (this.ships.length > 0) {
        this.ships.forEach((ship) => {
          if (
            ship.position.forEach(function (coordinates) {
              if (coordinates[0] == x && coordinates[1] == y) {
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
      } else {
        return false;
      }
    },
  };
};
export { GameboardFactory };
