import { ShipFactory } from './shipfns';
import { renderMisses, renderHits } from './gridCreationDOM';

const GameboardFactory = () => ({
  ships: [],
  missedShots: [],
  previousShots: [],
  receiveAttack(x, y, target) {
    this.previousShots.forEach((coordinates) => {
      if (coordinates[0] === x && coordinates[1] === y) {
        throw new Error('coordinates already hit');
      }
    });

    this.ships.forEach((ship) => {
      ship.hit(x, y, target);

      ship.isSunk(ship.position);
    });

    this.previousShots.push([x, y]);
  },
  populateShipsArray(length, coordinates) {
    this.ships.push(ShipFactory(length, coordinates));
  },
  checkAllSunk(array) {
    if (array.every((ship) => ship.sunk === true)) {
      return true;
    }
    return false;
  },
  placeShip(xCoordinate, yCoordinate, length, radioBtn) {
    for (let i = yCoordinate; i < yCoordinate + length; i += 1) {
      const shipSquare = document.querySelector(
        `[data-x-Coordinate="${xCoordinate}"][data-y-Coordinate="${i}"][data-side="player"]`,
      );
      shipSquare.classList.add('ship');
    }
    const coordinates = [];
    for (let i = yCoordinate; i < yCoordinate + length; i += 1) {
      coordinates.push([xCoordinate, i]);
    }
    this.populateShipsArray(length, coordinates);
    radioBtn.setAttribute('disabled', 'disabled');
    radioBtn.removeAttribute('checked');
    const btns = [...document.querySelectorAll('input[name="shipSelector"]:enabled')];
    if (btns.length >= 1) { btns[0].checked = true; }
  },
});
// eslint-disable-next-line import/prefer-default-export
export { GameboardFactory };
