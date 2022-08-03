import { ShipFactory } from './shipfns';
import { GameboardFactory } from './gameboard';

test('ShipFactory function returns ship object with length', () => {
  const ship1 = ShipFactory(3);
  expect(ship1).toMatchObject({ length: 3 });
});
test('Ship created with position A4, changes position property to hit when hit', () => {
  const ship1 = ShipFactory(1, ['A4']);
  ship1.hit('A4');
  expect(ship1.position[0]).toEqual('hit');
});
test('Ship that has all positions as hit, has sunk property as true', () => {
  const ship1 = ShipFactory(1, ['A4']);
  ship1.hit('A4');
  ship1.isSunk(ship1.position);
  expect(ship1.sunk).toEqual(true);
});
test('gameboard recieveAttack function to call ship in arrays hit method', () => {
  const myBoard = GameboardFactory();
  myBoard.ships.push(myBoard.ShipFactory(1, ['A4']));
  myBoard.receiveAttack('A4');
  expect(myBoard.ships[0].position[0]).toEqual('hit');
});
test('gameboard stores missed shot in missed shots array', () => {
  const myBoard = GameboardFactory();
  myBoard.receiveAttack('A5');
  expect(myBoard.missedShots).toEqual(['A5']);
});
test('gameboard checkAllSunk method should return true if all ships sunk properties are true', () => {
  const myBoard = GameboardFactory();
  myBoard.ships.push(myBoard.ShipFactory(1, ['A4']));
  myBoard.receiveAttack('A4');
  myBoard.checkAllSunk(myBoard.ships);
  expect(myBoard.checkAllSunk(myBoard.ships)).toEqual(true);
});
test('gameboard returns error if shooting same coordiante twice', () => {
  const myBoard = GameboardFactory();
  myBoard.ships.push(myBoard.ShipFactory(1, ['A4']));
  myBoard.receiveAttack('A3');
  expect(()=>{myBoard.receiveAttack('A3')}).toThrow();
});
