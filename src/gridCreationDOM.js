import './style.css';

function createPlayerGrid() {
  const h1 = document.createElement('h1');
  const optionsContainer = document.querySelector('.optionsContainer');
  document.body.insertBefore(h1, optionsContainer);

  const main = document.createElement('div');
  document.body.insertBefore(main, optionsContainer);
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
      cpuDiv.classList.add('cpuboard');
    }
  }
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
