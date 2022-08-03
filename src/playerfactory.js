const Player = (name) => {
    return {
        name,
        attack (gameboard, coordinates){
            gameboard.receiveAttack(coordinates)
        }
    }
}
const CpuPlayer = () => {
    return{
        attack(gameboard, coordinates){
         gameboard.receiveAttack(coordinates)   
        }
    }
}
export { Player, CpuPlayer }