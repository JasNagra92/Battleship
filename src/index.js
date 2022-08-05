import { createPlayerGrid } from './gridCreationDOM';
import { GameObject } from './GameModule';

const gameObject = GameObject();
createPlayerGrid();
const createPlayerBtn = document.querySelector('#createPlayer');
createPlayerBtn.addEventListener('click', gameObject.StartGame);
