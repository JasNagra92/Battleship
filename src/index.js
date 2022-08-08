import { GameObject } from './GameModule';

const gameObject = GameObject();
gameObject.createPlayerGrid();
const createPlayerBtn = document.querySelector('#createPlayer');
createPlayerBtn.addEventListener('click', () => {
  const name = document.querySelector('#name');
  if (name.value === '') {
    alert('player name cannot be empty')
  } else {
    gameObject.StartGame();
    createPlayerBtn.setAttribute('disabled', 'disabled');
  }
});
