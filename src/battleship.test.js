import { ShipFactory } from './shipfns';
import { GameboardFactory } from './gameboard';

test('ShipFactory function returns ship object with length', () => {
  const ship1 = ShipFactory(3);
  expect(ship1).toMatchObject({ length: 3 });
});
test('Ship created with position [0,0], changes position property to hit when hit', () => {
  const ship1 = ShipFactory(1, [[0,0],[0,1]]);
  ship1.hit(0,0);
  expect(ship1.position[0]).toEqual('hit');
});
test('Ship that has all positions as hit, has sunk property as true', () => {
  const ship1 = ShipFactory(3, [[0,1],[0,2],[0,3]]);
  ship1.hit(0,1);
  ship1.hit(0,2);
  ship1.hit(0,3)
  ship1.isSunk(ship1.position);
  expect(ship1.sunk).toEqual(true);
});
test('gameboard recieveAttack function to call ship in arrays hit method', () => {
  const myBoard = GameboardFactory();
  myBoard.ships.push(myBoard.ShipFactory(2, [[0,1],[0,2]]));
  myBoard.receiveAttack(0,1);
  expect(myBoard.ships[0].position[0]).toEqual('hit');
});
test('gameboard stores missed shot in missed shots array', () => {
  const myBoard = GameboardFactory();
  myBoard.ships[0] = GameboardFactory().ShipFactory(2, [
    [0, 0],
    [0, 1]
  ]);
  myBoard.receiveAttack(2,0);
  expect(myBoard.missedShots).toEqual([[2,0]]);
});
test('gameboard checkAllSunk method should return true if all ships sunk properties are true', () => {
  const myBoard = GameboardFactory();
  myBoard.ships.push(myBoard.ShipFactory(2, [[0,0],[0,1]]));
  myBoard.ships.push(myBoard.ShipFactory(2,[[3,4],[3,5]]))
  myBoard.receiveAttack(0,0);
  myBoard.receiveAttack(0,1);
  myBoard.receiveAttack(3,4);
  myBoard.receiveAttack(3,5);
  myBoard.checkAllSunk(myBoard.ships);
  expect(myBoard.checkAllSunk(myBoard.ships)).toEqual(true);
});
test('gameboard returns error if shooting same coordinate twice', () => {
  const myBoard = GameboardFactory();
  myBoard.ships.push(myBoard.ShipFactory(2, [[0,0],[0,1]]));
  myBoard.receiveAttack(2,0);
  expect(()=>{myBoard.receiveAttack(2,0)}).toThrow();
});
test('board property of gameboard object should return 2D array', ()=>{
  const myBoard = GameboardFactory();
  expect(myBoard.board).toEqual([
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
])
})
test('newly created ship with position written as a set of 2 numbers should have its position property value be an array with the coordinates stored as an inner array', ()=>{
  const ship1 = GameboardFactory().ShipFactory(2,[[0,0],[0,1]])
  expect(ship1.position).toEqual([[0,0],[0,1]])
})