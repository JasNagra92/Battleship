/* eslint-disable prefer-destructuring */
import { Player, CpuPlayer } from './playerfactory';
import { GameboardFactory } from './gameboard';
import { ShipFactory } from './shipfns';
import {
  getRandomInt,
  checkHorizontalValid,
  checkVerticalValid,
  checkHorizontalCollision,
  checkVerticalCollision,
} from './helpers';

import { createPlayerGrid } from './gridCreationDOM';

function GameObject() {
  function StartGame() {
    /* on game start, instructions reads next steps for ship placement */
    const instructions = document.querySelector('#instructions');
    instructions.innerHTML = 'Place your ships, use the horizontal/vertical button to change orientation';
    /* player1 object and cpu object using factory functions, and gives each a gameboard object */
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
    let shipDirection = 'horizontal';
    const directionDisplay = document.querySelector('#currentDirection');
    const shipDirectionBtn = document.querySelector('#shipOrientation');
    shipDirectionBtn.addEventListener('click', () => {
      // eslint-disable-next-line no-unused-expressions
      shipDirection === 'horizontal'
        ? (shipDirection = 'vertical')
        : (shipDirection = 'horizontal');
      directionDisplay.innerHTML = `Current Placement:${shipDirection}`;
    });
    const playerBoard = document.querySelector('#playerBoard');
    /* add event listener to players board that will add a class list to certain squares
    depending on the length value received from the checked radio button, provides feedback
    to user for ship placement */
    playerBoard.addEventListener('mouseover', (e) => {
      if (gamePhase === 'setup' && shipDirection === 'horizontal') {
        const length = +document.querySelector(
          'input[name = "shipSelector"]:checked',
        ).value;
        const yCoordinate = +e.target.dataset.yCoordinate;
        for (let i = yCoordinate; i < yCoordinate + length; i += 1) {
          const div = document.querySelector(
            `[data-x-Coordinate="${e.target.dataset.xCoordinate}"][data-y-Coordinate="${i}"]`,
          );
          div.classList.add('selected');
        }
      } else if (gamePhase === 'setup' && shipDirection === 'vertical') {
        const length = +document.querySelector(
          'input[name = "shipSelector"]:checked',
        ).value;
        const xCoordinate = +e.target.dataset.xCoordinate;
        for (let i = xCoordinate; i < xCoordinate + length; i += 1) {
          const div = document.querySelector(
            `[data-x-Coordinate="${i}"][data-y-Coordinate="${e.target.dataset.yCoordinate}"]`,
          );
          div.classList.add('selected');
        }
      }
    });
    playerBoard.addEventListener('mouseout', (e) => {
      if (gamePhase === 'setup' && shipDirection === 'horizontal') {
        const length = +document.querySelector(
          'input[name = "shipSelector"]:checked',
        ).value;
        const yCoordinate = +e.target.dataset.yCoordinate;
        for (let i = yCoordinate; i < yCoordinate + length; i += 1) {
          const div = document.querySelector(
            `[data-x-Coordinate="${e.target.dataset.xCoordinate}"][data-y-Coordinate="${i}"]`,
          );
          div.classList.remove('selected');
        }
      } else if (gamePhase === 'setup' && shipDirection === 'vertical') {
        const length = +document.querySelector(
          'input[name = "shipSelector"]:checked',
        ).value;
        const xCoordinate = +e.target.dataset.xCoordinate;
        for (let i = xCoordinate; i < xCoordinate + length; i += 1) {
          const div = document.querySelector(
            `[data-x-Coordinate="${i}"][data-y-Coordinate="${e.target.dataset.yCoordinate}"]`,
          );
          div.classList.remove('selected');
        }
      }
    });
    /* event listener used for placing of the ships, uses 2 functions to check if ship coordinates
    will extend past the board size as well as if one of the squares the ship will occupy already
    has a class selector of ship added to it, if it does, return error */
    playerBoard.addEventListener('click', (e) => {
      if (gamePhase === 'setup' && shipDirection === 'horizontal') {
        const xCoordinate = +e.target.dataset.xCoordinate;
        const yCoordinate = +e.target.dataset.yCoordinate;
        const length = +document.querySelector(
          'input[name = "shipSelector"]:checked',
        ).value;
        const radioBtn = document.querySelector(
          'input[name = "shipSelector"]:checked',
        );
        // eslint-disable-next-line max-len
        if (
          checkHorizontalValid(length, yCoordinate)
          && checkHorizontalCollision(length, xCoordinate, yCoordinate)
        ) {
          player1.gameboard.placeShip(
            xCoordinate,
            yCoordinate,
            length,
            radioBtn,
            shipDirection,
          );
        } else {
          alert('ship wont fit here');
        }
      } else if (gamePhase === 'setup' && shipDirection === 'vertical') {
        const xCoordinate = +e.target.dataset.xCoordinate;
        const yCoordinate = +e.target.dataset.yCoordinate;
        const length = +document.querySelector(
          'input[name = "shipSelector"]:checked',
        ).value;
        const radioBtn = document.querySelector(
          'input[name = "shipSelector"]:checked',
        );
        // eslint-disable-next-line max-len
        if (
          checkVerticalValid(length, xCoordinate)
          && checkVerticalCollision(length, xCoordinate, yCoordinate)
        ) {
          player1.gameboard.placeShip(
            xCoordinate,
            yCoordinate,
            length,
            radioBtn,
            shipDirection,
          );
        } else {
          alert('ship wont fit here');
        }
      }
      /* once player has placed 5 ships, change phase to attack to disable previous listeners */
      if (player1.gameboard.ships.length === 5) {
        const shipSquares = document.querySelectorAll('.selected');
        shipSquares.forEach((square) => {
          square.classList.remove('selected');
        });
        gamePhase = 'attack';
        instructions.innerHTML = 'Choose a square on the Cpu Board to launch your missile!';
      }
    });
    cpuBoard.addEventListener('click', (e) => {
      /* actual game loop alternates player and cpu attacks and checks for all ships sunk 
      after each attack */
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
