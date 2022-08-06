import { GameObject } from './GameModule';

const gameObject = GameObject();
gameObject.createPlayerGrid();
const createPlayerBtn = document.querySelector('#createPlayer');
createPlayerBtn.addEventListener('click', gameObject.StartGame);
