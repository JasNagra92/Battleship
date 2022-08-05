const Player = (name) => ({
  name,
  attack(gameboard, x, y) {
    gameboard.receiveAttack(x, y);
  },
});
const CpuPlayer = () => ({
  attack(gameboard, x, y) {
    gameboard.receiveAttack(x, y);
  },
});
export { Player, CpuPlayer };
