import { ShipFactory } from './shipfns';

const GameboardFactory = () => {
  return {
    ships: [],
    missedShots: [],
    receiveAttack(string) {
      if (this.ships.length > 0) {
        this.ships.forEach((ship) => {
          if (ship.position.includes(string)) {
            ship.hit(string);
          } else {
            this.missedShots.push(string);
          }
        });
      } else {
        this.missedShots.push(string);
      }
    },
    ShipFactory,
  };
};
export { GameboardFactory };
