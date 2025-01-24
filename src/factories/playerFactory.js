import createGameBoard from './gameBoardFactory'

const Player = (name) =>{
    const gameBoard = createGameBoard()
    return {
        name,
        gameBoard
    }
}

export default Player