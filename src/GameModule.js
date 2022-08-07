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
      ])
    );
    let turn = 'player';
    const cpuBoard = document.querySelector('#cpuBoard');
    let gamePhase = 'setup';
    const direction = 'horizontal';
    const playerBoard = document.querySelector('#playerBoard');
    playerBoard.addEventListener('click', (e) => {
      if (gamePhase === 'setup' && direction === 'horizontal') {
        const xCoordinate = +e.target.dataset.xCoordinate;
        const yCoordinate = +e.target.dataset.yCoordinate;
        const length = 3;
        if (checkValid(length, yCoordinate, direction)) {
          for (let i = yCoordinate; i < yCoordinate + length; i += 1) {
            const shipSquare = document.querySelector(
              `[data-x-Coordinate="${xCoordinate}"][data-y-Coordinate="${i}"][data-side="player"]`
            );
            shipSquare.classList.add('ship');
          }
          const coordinates = [];
          for (let i = yCoordinate; i < yCoordinate + length; i += 1) {
            coordinates.push([xCoordinate, i]);
          }
          player1.gameboard.populateShipsArray(length, coordinates);
          console.log(player1.gameboard)
        } else {
          alert('ship wont fit here');
        }
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
              target
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
