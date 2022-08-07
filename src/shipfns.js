/* eslint-disable import/prefer-default-export */
import { renderMisses, renderHits } from "./gridCreationDOM";
const ShipFactory = (length, position) => ({
  length,
  position,
  sunk: false,
  hit(x, y, target) {
    this.position.forEach((coordinates, index) => {
      if (coordinates[0] === x && coordinates[1] === y) {
        // eslint-disable-next-line no-param-reassign
        position[index] = 'hit';
        renderHits(x, y, target);
      } else {renderMisses(x, y, target)}
    });
  },
  isSunk(array) {
    if (array.every((x) => x === 'hit')) {
      this.sunk = true;
    }
  },
});

export { ShipFactory };
