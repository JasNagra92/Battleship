import { ShipFactory } from './shipfns';
import { renderMisses, renderHits } from './gridCreationDOM';

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
  receiveAttack(x, y, target) {
    this.previousShots.forEach((coordinates) => {
      if (coordinates[0] === x && coordinates[1] === y) {
        throw new Error('coordinates already hit');
      }
    });
    let hit = false;
    this.ships.forEach((ship) => {
      ship.position.forEach((coordinates) => {
        if (coordinates[0] === x && coordinates[1] === y) {
          ship.hit(x, y);
          renderHits(x, y, target);
          hit = true;
          ship.isSunk(ship.position);
        }
      });
    });
    if (!hit) { this.missedShots.push([x, y]); renderMisses(x, y, target); }
    this.previousShots.push([x, y]);
  },
  ShipFactory,
  checkAllSunk(array) {
    if (array.every((ship) => ship.sunk === true)) {
      return true;
    }
    return false;
  },
  placeShip(shipObject, x, y, direction) {
    const { length } = shipObject;
    if (direction === 'right') {
      for (let i = 0; i < length; i += 1) {
        // eslint-disable-next-line no-plusplus, no-param-reassign
        this.board[x][y++] = `s${length}`;
      }
    } else if (direction === 'down') {
      for (let i = 0; i < length; i += 1) {
        // eslint-disable-next-line no-plusplus, no-param-reassign
        this.board[x++][y] = `s${length}`;
      }
    }
  },
});
// eslint-disable-next-line import/prefer-default-export
export { GameboardFactory };
