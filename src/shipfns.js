/* eslint-disable import/prefer-default-export */
const ShipFactory = (length, position) => ({
  length,
  position,
  sunk: false,
  hit(x, y) {
    this.position.forEach((coordinates, index) => {
      if (coordinates[0] === x && coordinates[1] === y) {
        // eslint-disable-next-line no-param-reassign
        position[index] = 'hit';
      }
    });
  },
  isSunk(array) {
    if (array.every((x) => x === 'hit')) {
      this.sunk = true;
    }
  },
});

export { ShipFactory };
