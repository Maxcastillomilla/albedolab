console.log('se cargo main.js')
import { isModelLoaded, obtenerEstado } from './three.js';

function checkModelLoaded() {
  if (obtenerEstado()) {
    console.log('The model has loaded');
  }
}

function main() {

  let columns, rows;
  let intervalId;
  if (window.innerWidth <= 590) {
    if (isModelLoaded) {
      console.log('Model has loaded');
    }
    /* checkModelLoaded() */
    columns = 2;
    rows = 4;

    
    } else {
      columns = 4;
      rows = 2;
    } 

  createGrid(columns, rows);
  intervalId = setInterval(changeGridColors, 350);


  console.log('grillas realizadas')


  setTimeout(() => {
    clearInterval(intervalId);
    // Set all cells to transparent
    const cells = document.querySelectorAll(".grid-cell");
    for (let i = 0; i < cells.length; i++) {
      const colorDiv = cells[i].querySelector('.color-overlay');
      colorDiv.style.backgroundColor = "transparent";
    }
  }, 4500);
}




const colorPool = ["#F22455", "#00FFBA", "#1E69F5", "transparent", "transparent", "transparent", "transparent", "transparent"]; // Pool of colors
const JustcolorPool = ["#F22455", "#00FFBA", "#1E69F5"]; // Pool of colors

// Function to create the initial grid
function createGrid(columns, rows) {
  const gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  // Calculate the total number of cells
  const totalCells = columns * rows;

  // Creating the grid and the div for the color
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add("grid-cell");

    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color-overlay');

    // Add event listeners for hover effects
    cell.addEventListener('mouseover', () => {
      console.log('hover');
      const randomColor = getRandomColor();
      colorDiv.style.backgroundColor = randomColor;
    });

    cell.addEventListener('mouseout', () => {
      colorDiv.style.backgroundColor = "transparent";
    });

    cell.appendChild(colorDiv);
    gridContainer.appendChild(cell);
  }
}


function getRandomColor() {
    const colorIndex = Math.floor(Math.random() * JustcolorPool.length);
    return JustcolorPool[colorIndex];
}

// Function to get a color from the colorPool and apply it to the color-overlay
function getFixedColor(cell){
  const colorIndex = Math.floor(Math.random() * colorPool.length); // Generate a random number between 0 and the length of the color pool
  const colorDiv = cell.querySelector('.color-overlay');

  colorDiv.style.backgroundColor = colorPool[colorIndex];
}

function changeGridColors() {
  const cells = document.querySelectorAll(".grid-cell");
  for (let i = 0; i < cells.length; i++) {
    getFixedColor(cells[i]);
  }
}


main();
