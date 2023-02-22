// Queries
const draw_btn = document.querySelector("#draw-button");
const toggle_value = document.querySelector("#toggle-value");
const gridsize = document.querySelector("#grid-size");
const drawingBoard = document.querySelector(".drawing-board");

// Grid functions

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

// Set mouse modes

function setMode() {
  const grids = document.querySelectorAll(".grid-boxes");
  for (const box of grids) {
    box.addEventListener("mouseover", draw);
  }
}

// Mouse modes functions

const draw = function (e) {
  e.target.style["backgroundColor"] = "black";
};

// Event listeners

draw_btn.addEventListener("click", () => {
  setMode(1);
});

gridsize.addEventListener("change", setGrid);

// Default values when page loads and reloads

createGrid(gridsize.value);
setMode();
