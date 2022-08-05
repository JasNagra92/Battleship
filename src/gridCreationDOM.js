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

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const playerDiv = document.createElement('div');
      playerSide.appendChild(playerDiv);
      const cpuDiv = document.createElement('div');
      cpuSide.appendChild(cpuDiv);
      playerDiv.dataset.xCoordinate = i;
      playerDiv.dataset.yCoordinate = j;
      cpuDiv.dataset.xCoordinate = i;
      cpuDiv.dataset.yCoordinate = j;
      playerDiv.classList.add('boardSquare');
      cpuDiv.classList.add('boardSquare');
    }
  }

  const label = document.createElement('label');
  label.setAttribute('for', 'name');
  label.innerHTML = 'Player name:';
  const input = document.createElement('input');
  input.setAttribute('id', 'name');
  document.body.appendChild(label);
  document.body.appendChild(input);
  const createPlayerBtn = document.createElement('button');
  createPlayerBtn.innerHTML = 'create player';
  createPlayerBtn.id = 'createPlayer';
  document.body.appendChild(createPlayerBtn);
}
export { createPlayerGrid };
