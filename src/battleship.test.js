import { ShipFactory } from './shipfns';

test('ShipFactory function returns ship object with length', () => {
  const ship1 = ShipFactory(3);
  expect(ship1).toMatchObject({ length: 3 });
});
test('Ship created with position A4, changes position property to hit when hit', () => {
  const ship1 = ShipFactory(1, ['A4']);
  ship1.hit('A4');
  expect(ship1.position[0]).toEqual('hit');
});
