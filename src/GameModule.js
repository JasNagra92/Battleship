/* eslint-disable prefer-destructuring */
import { Player, CpuPlayer } from './playerfactory';
import { GameboardFactory } from './gameboard';
import { ShipFactory } from './shipfns';
import { getRandomInt, checkValid } from './helpers';

import { createPlayerGrid } from './gridCreationDOM';

function GameObject() {
  function StartGame() {
    const playerName = document.querySelector('#name').value;
    const player1 = Player(playerName);
    player1.gameboard = GameboardFactory();
    const cpu = CpuPlayer();
    cpu.gameboard = GameboardFactory();
    cpu.gameboard.ships.push(
      ShipFactory(3, [
        [2, 0],
        [2, 1],
        [2, 2],
      ]),
    );
    let turn = 'player';
    const cpuBoard = document.querySelector('#cpuBoard');
    let gamePhase = 'setup';
    const shipPlacementDirection = 'horizontal';
    const playerBoard = document.querySelector('#playerBoard');
    playerBoard.addEventListener('click', (e) => {
      if (gamePhase === 'setup' && shipPlacementDirection === 'horizontal') {
        const xCoordinate = +e.target.dataset.xCoordinate;
        const yCoordinate = +e.target.dataset.yCoordinate;
        const length = +document.querySelector('input[name = "shipSelector"]:checked').value;
        const radioBtn = document.querySelector('input[name = "shipSelector"]:checked');
        if (checkValid(length, yCoordinate, shipPlacementDirection)) {
          player1.gameboard.placeShip(xCoordinate, yCoordinate, length, radioBtn);
        } else {
          alert('ship wont fit here');
        }
      }
      if (player1.gameboard.ships.length === 5) {
        gamePhase = 'attack';
      }
    });
    cpuBoard.addEventListener('click', (e) => {
      if (turn === 'player' && gamePhase === 'attack') {
        const xCoordinate = +e.target.dataset.xCoordinate;
        const yCoordinate = +e.target.dataset.yCoordinate;
        let target = 'cpu';
        player1.attack(cpu.gameboard, xCoordinate, yCoordinate, target);
        if (cpu.gameboard.checkAllSunk(cpu.gameboard.ships)) {
          alert('you win');
        }
        turn = 'cpu';
        target = 'player';
        let repeat = true;
        while (repeat) {
          try {
            cpu.attack(
              player1.gameboard,
              getRandomInt(9),
              getRandomInt(9),
              target,
            );
            repeat = false;
          } catch (error) {
            repeat = true;
          }
        }
        if (player1.gameboard.checkAllSunk(player1.gameboard.ships)) {
          alert('you lose');
        }
        turn = 'player';
      }
    });
  }
  return {
    StartGame,
    createPlayerGrid,
  };
}
// eslint-disable-next-line import/prefer-default-export
export { GameObject };
