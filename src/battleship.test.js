import {Ship} from "./shipfns"

test('Ship function returns ship object with length', () =>{
    expect(Ship()).toEqual({length:3})
})