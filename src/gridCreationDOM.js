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
}
export { createPlayerGrid };
