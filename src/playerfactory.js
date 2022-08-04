const Player = (name) => ({
  name,
  attack(gameboard, coordinates) {
    gameboard.receiveAttack(coordinates);
  },
});
const CpuPlayer = () => ({
  attack(gameboard, coordinates) {
    gameboard.receiveAttack(coordinates);
  },
});
export { Player, CpuPlayer };
