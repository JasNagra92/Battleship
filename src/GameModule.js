/* eslint-disable prefer-destructuring */
import { Player, CpuPlayer } from './playerfactory';
import { GameboardFactory } from './gameboard';
import { ShipFactory } from './shipfns';

import { createPlayerGrid } from './gridCreationDOM';

function GameObject() {
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
        let target = 'cpu';
        player1.attack(cpu.gameboard, xCoordinate, yCoordinate, target);
        if (cpu.gameboard.checkAllSunk(cpu.gameboard.ships)) { alert('you win'); }
        turn = 'cpu';
        target = 'player';
        let repeat = true;
        while (repeat) {
          try {
            cpu.attack(player1.gameboard, getRandomInt(9), getRandomInt(9), target);
            repeat = false;
          } catch (error) {
            repeat = true;
          }
        }
        if (player1.gameboard.checkAllSunk(player1.gameboard.ships)) { alert('you lose'); }
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
    createPlayerGrid,
  };
}
// eslint-disable-next-line import/prefer-default-export
export { GameObject };
