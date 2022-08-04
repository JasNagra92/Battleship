const ShipFactory = (length, position) => {
  return {
    length,
    position,
    sunk: false,
    hit(x, y) {
      this.position.forEach(function (coordinates,index) {
        if (coordinates[0] == x && coordinates[1] == y) {
          position[index] = "hit";
        }
      });
    },
    isSunk(array) {
      if (array.every((x) => x === 'hit')) {
        this.sunk = true;
      }
    },
  };
};

export { ShipFactory };
