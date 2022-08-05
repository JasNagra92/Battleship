/* eslint-disable prefer-destructuring */
import { Player, CpuPlayer } from './playerfactory';
import { GameboardFactory } from './gameboard';
import { ShipFactory } from './shipfns';

function GameObject() {
  function renderPlayerMisses(x, y) {
    const missedBox = document.querySelector(`[data-x-Coordinate="${x}"][data-y-Coordinate="${y}"][data-side=cpu]`);
    missedBox.classList.add('missed');
  }

  function StartGame() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    const playerName = document.querySelector('#name').value;
    const player1 = Player(playerName);
    player1.gameboard = GameboardFactory();
    const cpu = CpuPlayer();
    cpu.gameboard = GameboardFactory();
    player1.gameboard.ships.push(ShipFactory(3, [[0, 0], [0, 1], [0, 2]]));
    cpu.gameboard.ships.push(ShipFactory(3, [[2, 0], [2, 1], [2, 2]]));
    let turn = 'player';
    const cpuBoard = document.querySelector('#cpuBoard');
    cpuBoard.addEventListener('click', (e) => {
      if (turn === 'player') {
        const xCoordinate = +e.target.dataset.xCoordinate;
        const yCoordinate = +e.target.dataset.yCoordinate;
        renderPlayerMisses(xCoordinate, yCoordinate);
        player1.attack(cpu.gameboard, xCoordinate, yCoordinate);
        turn = 'cpu';
        cpu.attack(player1.gameboard, getRandomInt(9), getRandomInt(9));
        turn = 'player';
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
