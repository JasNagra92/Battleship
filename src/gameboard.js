import { ShipFactory } from './shipfns';

const GameboardFactory = () => {
  return {
    ships: [],
    missedShots: [],
    previousShots: [],
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
