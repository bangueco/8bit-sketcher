const gridsize = document.querySelector("#grid-size");
const toggle_value = document.querySelector("#toggle-value");
const gridboxes = document.querySelectorAll(".grid-boxes");
const drawingBoard = document.querySelector(".drawing-board");

function setGrid(size) {
  console.log(size.target.value);
  removeGrid();
  createGrid(size.target.value);
}

function createGrid(size) {
  for (let x = 1; x <= size * size; x++) {
    const grid_item = document.createElement("div");
    grid_item.classList.add("grid-boxes");
    drawingBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    drawingBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    drawingBoard.appendChild(grid_item);
    toggle_value.textContent = `${size}x${size}`;
  }
}

function removeGrid() {
  while (drawingBoard.firstChild) {
    drawingBoard.removeChild(drawingBoard.lastChild);
  }
}

gridsize.addEventListener("change", setGrid);

createGrid(gridsize.value);
