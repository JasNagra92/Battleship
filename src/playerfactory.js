const Player = (name) => ({
  name,
  attack(gameboard, x, y, target) {
    gameboard.receiveAttack(x, y, target);
  },
});
const CpuPlayer = () => ({
  attack(gameboard, x, y, target) {
    gameboard.receiveAttack(x, y, target);
  },
});
export { Player, CpuPlayer };
