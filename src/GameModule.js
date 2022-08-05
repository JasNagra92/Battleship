/* eslint-disable prefer-destructuring */
import { Player, CpuPlayer } from './playerfactory';
import { GameboardFactory } from './gameboard';
import { ShipFactory } from './shipfns';

function GameObject() {
  function StartGame() {
    const playerName = document.querySelector('#name').value;
    const player1 = Player(playerName);
    player1.gameboard = GameboardFactory();
    const cpu = CpuPlayer();
    cpu.gameboard = GameboardFactory();
    console.log(player1);
    player1.gameboard.ships.push(ShipFactory(3, [[0, 0], [0, 1], [0, 2]]));
    cpu.gameboard.ships.push(ShipFactory(3, [[2, 0], [2, 1], [2, 2]]));
    const turn = 'player';
    const cpuBoard = document.querySelector('#cpuBoard');
    cpuBoard.addEventListener('click', (e) => {
      if (turn === 'player') {
        const xCoordinate = +e.target.dataset.xCoordinate;
        const yCoordinate = +e.target.dataset.yCoordinate;
        console.log(cpu.gameboard);
        player1.attack(cpu.gameboard, xCoordinate, yCoordinate);
        console.log(cpu.gameboard);
      }
    });
  }
  return {
    Player,
    CpuPlayer,
    GameboardFactory,
    ShipFactory,
    StartGame,
  };
}
export { GameObject };
