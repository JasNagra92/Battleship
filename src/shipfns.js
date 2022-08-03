const ShipFactory = (length,position) => {
    return {length,
            position,
            sunk: false,
            hit(string){
                if (position.includes(string)){
                    const index = position.indexOf(string);
                    position[index] = 'hit'
                    alert('direct hit!')
                }
            },
            isSunk(position){
                if (position.every(x => x === 'hit')){
                    this.sunk = true
                }
            }
            }
}

export{ShipFactory}