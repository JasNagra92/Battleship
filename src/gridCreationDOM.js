import './style.css';

function createPlayerGrid() {
  const h1 = document.createElement('h1');
  document.body.appendChild(h1);

  const main = document.createElement('div');
  document.body.appendChild(main);
  main.classList.add('main');

  const playerSide = document.createElement('div');
  const cpuSide = document.createElement('div');
  playerSide.classList.add('board');
  playerSide.id = 'playerBoard';
  cpuSide.id = 'cpuBoard';
  cpuSide.classList.add('board');

  main.appendChild(playerSide);
  main.appendChild(cpuSide);

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const playerDiv = document.createElement('div');
      playerSide.appendChild(playerDiv);
      const cpuDiv = document.createElement('div');
      cpuSide.appendChild(cpuDiv);
      playerDiv.dataset.xCoordinate = i;
      playerDiv.dataset.yCoordinate = j;
      playerDiv.dataset.side = 'player';
      cpuDiv.dataset.xCoordinate = i;
      cpuDiv.dataset.yCoordinate = j;
      cpuDiv.dataset.side = 'cpu';
      playerDiv.classList.add('boardSquare');
      cpuDiv.classList.add('boardSquare');
    }
  }

  const namelabel = document.createElement('label');
  namelabel.setAttribute('for', 'name');
  namelabel.innerHTML = 'Player name:';
  const nameInput = document.createElement('Input');
  nameInput.setAttribute('id', 'name');
  document.body.appendChild(namelabel);
  document.body.appendChild(nameInput);
  const createPlayerBtn = document.createElement('button');
  createPlayerBtn.innerHTML = 'create player';
  createPlayerBtn.id = 'createPlayer';
  document.body.appendChild(createPlayerBtn);

  const ship2label = document.createElement('label');
  ship2label.setAttribute('for', 'ship');
  ship2label.innerHTML = 'cruiser-length 2';
  const ship2radio = document.createElement('input');
  ship2radio.setAttribute('type', 'radio');
  ship2radio.setAttribute('name', 'shipSelector');
  ship2radio.setAttribute('value', '2');
  document.body.appendChild(ship2label);
  document.body.appendChild(ship2radio);
}
function renderMisses(x, y, target) {
  const missedBox = document.querySelector(`[data-x-Coordinate="${x}"][data-y-Coordinate="${y}"][data-side='${target}']`);
  missedBox.classList.add('missed');
}
function renderHits(x, y, target) {
  const hitBox = document.querySelector(`[data-x-Coordinate="${x}"][data-y-Coordinate="${y}"][data-side='${target}']`);
  hitBox.classList.add('hit');
}
// eslint-disable-next-line import/prefer-default-export
export { createPlayerGrid, renderMisses, renderHits };
