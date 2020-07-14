const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const size = 10;
const rows = Math.floor(canvas.height / size);
const cols = Math.floor(canvas.width / size);
const grid = [];
const stack = [];

let complete = false;
let current;

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.visited = false;
  }

  getRandomNeighbor() {
    const { row, col } = this;
    const cells = [
      [row - 2, col],
      [row, col + 2],
      [row + 2, col],
      [row, col - 2],
    ]
      .filter(([i, j]) => grid[i] && grid[i][j] && !grid[i][j].visited)
      .map(([i, j]) => grid[i][j]);

    if (!cells.length) {
      return null;
    }

    return cells[Math.floor(Math.random() * cells.length)];
  }
}

function setup() {
  for (let i = 0; i < rows; i++) {
    grid.push([]);
    for (let j = 0; j < cols; j++) {
      grid[i].push(new Cell(i, j));
    }
  }

  current = grid[1][1];
  current.visited = true;
}

function update() {
  const newCurrent = current.getRandomNeighbor();

  if (newCurrent) {
    newCurrent.visited = true;

    stack.push(newCurrent);

    // Tear down wall.
    if (newCurrent.row !== current.row) {
      const i = (newCurrent.row + current.row) / 2;
      grid[i][current.col].visited = true;
    } else if (newCurrent.col !== current.col) {
      const j = (newCurrent.col + current.col) / 2;
      grid[current.row][j].visited = true;
    }

    current = newCurrent;
  } else if (stack.length > 0) {
    current = stack.pop();
  } else {
    complete = true;
  }
}

function draw() {
  ctx.fillStyle = "#fff";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = grid[i][j];
      if (cell.visited) {
        ctx.fillRect(cell.col * size, cell.row * size, size, size);
      }
    }
  }
}

function step() {
  update();
  draw();
}

setup();

setInterval(step, 50);
