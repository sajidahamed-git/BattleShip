import './style.css'
import gameController from './gameController'

const form = document.getElementById('player-form')
const gameContainer = document.getElementById('game-container')
const startButton = document.getElementById('start-button')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const playerName = document.getElementById('player-name').value
    gameController.initialize()
    gameContainer.classList.remove('hidden')
    form.classList.add('hidden')
    startButton.classList.remove('hidden')
})   