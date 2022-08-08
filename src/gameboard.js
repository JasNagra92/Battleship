import { ShipFactory } from './shipfns';
import { renderMisses, renderHits } from './gridCreationDOM';

const GameboardFactory = () => ({
  ships: [],
  missedShots: [],

  receiveAttack(x, y, target) {
    this.ships.forEach((ship) => {
      ship.hit(x, y, target);
      ship.isSunk(ship.position);
    });
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
  placeShip(xCoordinate, yCoordinate, length, radioBtn, direction) {
    if (direction === 'horizontal') {
      for (let i = yCoordinate; i < yCoordinate + length; i += 1) {
        const shipSquare = document.querySelector(
          `[data-x-Coordinate="${xCoordinate}"][data-y-Coordinate="${i}"][data-side="player"]`
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
      const btns = [
        ...document.querySelectorAll('input[name="shipSelector"]:enabled'),
      ];
      if (btns.length >= 1) {
        btns[0].checked = true;
      }
    } else if (direction === 'vertical') {
      for (let i = xCoordinate; i < xCoordinate + length; i += 1) {
        const shipSquare = document.querySelector(
          `[data-x-Coordinate="${i}"][data-y-Coordinate="${yCoordinate}"][data-side="player"]`
        );
        shipSquare.classList.add('ship');
      }
      const coordinates = [];
      for (let i = xCoordinate; i < xCoordinate + length; i += 1) {
        coordinates.push([i, yCoordinate]);
      }
      this.populateShipsArray(length, coordinates);
      radioBtn.setAttribute('disabled', 'disabled');
      radioBtn.removeAttribute('checked');
      const btns = [
        ...document.querySelectorAll('input[name="shipSelector"]:enabled'),
      ];
      if (btns.length >= 1) {
        btns[0].checked = true;
      }
    }
  },
});
// eslint-disable-next-line import/prefer-default-export
export { GameboardFactory };
