const Player = (name) => ({
  name,
  shots: [],
  attack(gameboard, x, y, target) {
    this.shots.forEach((coordinates) => {
      if (coordinates[0] === x && coordinates[1] === y) {
        throw new Error('coordinates already hit');
      }
    });
    gameboard.receiveAttack(x, y, target);
    this.shots.push([x, y]);
  },
});
const CpuPlayer = () => ({
  shots: [],
  attack(gameboard, x, y, target) {
    this.shots.forEach((coordinates) => {
      if (coordinates[0] === x && coordinates[1] === y) {
        throw new Error('coordinates already hit');
      }
    });
    gameboard.receiveAttack(x, y, target);
    this.shots.push([x, y]);
  },
});
export { Player, CpuPlayer };
