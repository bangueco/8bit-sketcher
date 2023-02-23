// Queries
const color_selector = document.querySelector("#color-selector");
const draw_btn = document.querySelector("#draw-button");
const eraser_btn = document.querySelector("#eraser-button");
const rgb_btn = document.querySelector("#rgb-button");
const clear_btn = document.querySelector("#clear-button");
const showgrid_btn = document.querySelector("#grid-visibility-button");
const toggle_value = document.querySelector("#toggle-value");
const gridsize = document.querySelector("#grid-size");
const drawingBoard = document.querySelector(".drawing-board");

// Grid functions

function setGrid(size) {
  console.log(size.target.value);
  removeGrid();
  createGrid(size.target.value);
  setMode(currentMouseMode);
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
  showgrid_btn.textContent = "Show Grid: On";
  while (drawingBoard.firstChild) {
    drawingBoard.removeChild(drawingBoard.lastChild);
  }
}

// Set mouse modes

let currentMouseMode = 1; // Default is 1

let drawMode = true;
let eraseMode = false;
let rgbMode = false;

let mouseDown = false;

document.body.addEventListener("mousedown", () => (mouseDown = true));
document.body.addEventListener("mouseup", () => (mouseDown = false));

/*
1 = draw mode
2 = eraser mode
3 = rgb mode
*/

function setMode(mode) {
  const grids = document.querySelectorAll(".grid-boxes");
  if (currentMouseMode == 1) {
    drawMode = true;
    if (eraseMode == true || rgbMode == true) {
      eraseMode = false;
      rgbMode = false;
      for (const box of grids) {
        box.removeEventListener("mouseover", erase);
        box.removeEventListener("mouseover", random);
      }
    }
  } else if (currentMouseMode == 2) {
    eraseMode = true;
    if (drawMode == true || rgbMode == true) {
      drawMode = false;
      rgbMode = false;
      for (const box of grids) {
        box.removeEventListener("mouseover", draw);
        box.removeEventListener("mouseover", random);
      }
    }
  } else if (currentMouseMode == 3) {
    rgbMode = true;
    if (drawMode == true || eraseMode == true) {
      drawMode = false;
      eraseMode = false;
      for (const box of grids) {
        box.removeEventListener("mouseover", draw);
        box.removeEventListener("mouseover", erase);
      }
    }
  }

  if (mode === 1) {
    currentMouseMode = 1;
    for (const box of grids) {
      box.addEventListener("mouseover", draw);
    }
  } else if (mode === 2) {
    currentMouseMode = 2;
    for (const box of grids) {
      box.addEventListener("mouseover", erase);
    }
  } else if (mode === 3) {
    currentMouseMode = 3;
    for (const box of grids) {
      box.addEventListener("mouseover", random);
    }
  }
}

// Mouse modes functions

const draw = function (e) {
  if (e.type == "mouseover" && mouseDown == true) {
    e.target.style["backgroundColor"] = color_selector.value;
  }
};

const erase = function (e) {
  if (e.type == "mouseover" && mouseDown == true) {
    e.target.style["backgroundColor"] = "whitesmoke";
  }
};

const random = function (e) {
  let x = Math.floor(Math.random() * 255);
  let y = Math.floor(Math.random() * 255);
  let z = Math.floor(Math.random() * 255);
  let result = `rgb(${x}, ${y}, ${z})`;
  if (e.type == "mouseover" && mouseDown == true) {
    e.target.style["backgroundColor"] = result;
  }
};

// Event listeners

draw_btn.addEventListener("click", () => {
  setMode(1);
});

eraser_btn.addEventListener("click", () => {
  setMode(2);
});

rgb_btn.addEventListener("click", () => {
  setMode(3);
});

clear_btn.addEventListener("click", () => {
  const grids = document.querySelectorAll(".grid-boxes");
  for (const box of grids) {
    box.style["backgroundColor"] = "whitesmoke";
  }
});

showgrid_btn.addEventListener("click", () => {
  const grids = document.querySelectorAll(".grid-boxes");
  if (showgrid_btn.textContent == "Show Grid: On") {
    showgrid_btn.textContent = "Show Grid: Off";
    for (const box of grids) {
      box.style["border"] = "none";
    }
  } else if (showgrid_btn.textContent == "Show Grid: Off") {
    showgrid_btn.textContent = "Show Grid: On";
    for (const box of grids) {
      box.style["border"] = "1px solid black";
    }
  }
});

gridsize.addEventListener("change", setGrid);

// Default values when page loads and reloads

createGrid(gridsize.value);
setMode(currentMouseMode);
