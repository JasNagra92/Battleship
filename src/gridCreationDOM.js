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

  const optionsDiv = document.createElement('div');
  optionsDiv.classList.add('optionsContainer');
  const nameDiv = document.createElement('div');
  const shipSelectDiv = document.createElement('div');
  shipSelectDiv.classList.add('shipSelectDiv');

  const namelabel = document.createElement('label');
  namelabel.setAttribute('for', 'name');
  namelabel.innerHTML = 'Player name:';
  const nameInput = document.createElement('Input');
  nameInput.setAttribute('id', 'name');
  nameDiv.appendChild(namelabel);
  nameDiv.appendChild(nameInput);
  const createPlayerBtn = document.createElement('button');
  createPlayerBtn.innerHTML = 'create player';
  createPlayerBtn.id = 'createPlayer';
  nameDiv.appendChild(createPlayerBtn);
  optionsDiv.appendChild(nameDiv);

  const ship1label = document.createElement('label');
  ship1label.setAttribute('for', 'ship');
  ship1label.innerHTML = 'Destroyer-length 2';
  const ship1radio = document.createElement('input');
  ship1radio.setAttribute('type', 'radio');
  ship1radio.setAttribute('name', 'shipSelector');
  ship1radio.setAttribute('value', '2');
  ship1radio.setAttribute('checked', true);
  ship1label.appendChild(ship1radio);
  shipSelectDiv.appendChild(ship1label);

  const ship2label = document.createElement('label');
  ship2label.setAttribute('for', 'ship');
  ship2label.innerHTML = 'Submarine-length 3';
  const ship2radio = document.createElement('input');
  ship2radio.setAttribute('type', 'radio');
  ship2radio.setAttribute('name', 'shipSelector');
  ship2radio.setAttribute('value', '3');
  ship2label.appendChild(ship2radio);
  shipSelectDiv.appendChild(ship2label);

  const ship3label = document.createElement('label');
  ship3label.setAttribute('for', 'ship');
  ship3label.innerHTML = 'Cruiser-length 3';
  const ship3radio = document.createElement('input');
  ship3radio.setAttribute('type', 'radio');
  ship3radio.setAttribute('name', 'shipSelector');
  ship3radio.setAttribute('value', '3');
  ship3label.appendChild(ship3radio);
  shipSelectDiv.appendChild(ship3label);

  const ship4label = document.createElement('label');
  ship4label.setAttribute('for', 'ship');
  ship4label.innerHTML = 'Battleship-length 4';
  const ship4radio = document.createElement('input');
  ship4radio.setAttribute('type', 'radio');
  ship4radio.setAttribute('name', 'shipSelector');
  ship4radio.setAttribute('value', '4');
  ship4label.appendChild(ship4radio);
  shipSelectDiv.appendChild(ship4label);

  const ship5label = document.createElement('label');
  ship5label.setAttribute('for', 'ship');
  ship5label.innerHTML = 'Carrier-length 5';
  const ship5radio = document.createElement('input');
  ship5radio.setAttribute('type', 'radio');
  ship5radio.setAttribute('name', 'shipSelector');
  ship5radio.setAttribute('value', '5');
  ship5label.appendChild(ship5radio);
  shipSelectDiv.appendChild(ship5label);
  optionsDiv.appendChild(shipSelectDiv);
  document.body.appendChild(optionsDiv);
}
function renderMisses(x, y, target) {
  const missedBox = document.querySelector(
    `[data-x-Coordinate="${x}"][data-y-Coordinate="${y}"][data-side='${target}']`
  );
  missedBox.classList.add('missed');
}
function renderHits(x, y, target) {
  const hitBox = document.querySelector(
    `[data-x-Coordinate="${x}"][data-y-Coordinate="${y}"][data-side='${target}']`
  );
  if (hitBox.classList.contains('ship')) {
    hitBox.classList.replace('ship', 'hit');
  } else {
    hitBox.classList.add('hit');
  }
}
// eslint-disable-next-line import/prefer-default-export
export { createPlayerGrid, renderMisses, renderHits };
