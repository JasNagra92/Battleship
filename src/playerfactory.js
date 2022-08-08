/* eslint-disable no-unused-expressions */
import {
  getRandomInt,
  randomHorizontalCoordinates,
  randomVerticalCoordinates,
} from './helpers';
import { ShipFactory } from './shipfns';

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
  generateFleet() {
    let currentShipCoordinates = [[0, 0]];
    for (let i = 2; i <= 5; i += 1) {
      if (i === 2) {
        const directionNumber = getRandomInt(2);
        let direction;
        directionNumber === 0
          ? (direction = 'horizontal')
          : (direction = 'vertical');
        let coordinates;
        if (direction === 'horizontal') {
          coordinates = randomHorizontalCoordinates(2, currentShipCoordinates);
        } else if (direction === 'vertical') {
          coordinates = randomVerticalCoordinates(2, currentShipCoordinates);
        }
        this.gameboard.ships.push(ShipFactory(2, coordinates));
        currentShipCoordinates.push(coordinates);
      } else if (i === 3) {
        let directionNumber = getRandomInt(2);
        let direction;
        directionNumber === 0
          ? (direction = 'horizontal')
          : (direction = 'vertical');
        let coordinates;
        if (direction === 'horizontal') {
          coordinates = randomHorizontalCoordinates(3, currentShipCoordinates);
        } else if (direction === 'vertical') {
          coordinates = randomVerticalCoordinates(3, currentShipCoordinates);
        }
        this.gameboard.ships.push(ShipFactory(3, coordinates));
        currentShipCoordinates.push(coordinates);

        directionNumber = getRandomInt(2);
        directionNumber === 0
          ? (direction = 'horizontal')
          : (direction = 'vertical');
        coordinates;
        if (direction === 'horizontal') {
          coordinates = randomHorizontalCoordinates(3, currentShipCoordinates);
        } else if (direction === 'vertical') {
          coordinates = randomVerticalCoordinates(3, currentShipCoordinates);
        }
        this.gameboard.ships.push(ShipFactory(3, coordinates));
        currentShipCoordinates.push(coordinates);
      } else if (i === 4) {
        const directionNumber = getRandomInt(2);
        let direction;
        directionNumber === 0
          ? (direction = 'horizontal')
          : (direction = 'vertical');
        let coordinates;
        if (direction === 'horizontal') {
          coordinates = randomHorizontalCoordinates(4, currentShipCoordinates);
        } else if (direction === 'vertical') {
          coordinates = randomVerticalCoordinates(4, currentShipCoordinates);
        }
        this.gameboard.ships.push(ShipFactory(4, coordinates));
        currentShipCoordinates.push(coordinates);
      } else if (i === 5) {
        const directionNumber = getRandomInt(2);
        let direction;
        directionNumber === 0
          ? (direction = 'horizontal')
          : (direction = 'vertical');
        let coordinates;
        if (direction === 'horizontal') {
          coordinates = randomHorizontalCoordinates(5, currentShipCoordinates);
        } else if (direction === 'vertical') {
          coordinates = randomVerticalCoordinates(5, currentShipCoordinates);
        }
        this.gameboard.ships.push(ShipFactory(5, coordinates));
        currentShipCoordinates.push(coordinates);
        console.log(currentShipCoordinates)
      }
    }
  },
});
export { Player, CpuPlayer };
