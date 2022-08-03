import {ShipFactory} from "./shipfns"

test('ShipFactory function returns ship object with length', () =>{
    const ship1 = ShipFactory(3)
    expect(ship1).toEqual({length:3})
})
