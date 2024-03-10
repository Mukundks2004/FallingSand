let rows, cols;
let squareSize = 5;
let blobSize = 3;
let grid;

//Used to keep all sand on the screen
function isRowInBounds(row) {
  return row >= 0 && row < rows;
}

function isColInBounds(col) {
  return col >= 0 && col < cols;
}

//Initializes grid with 0s
function makeZeroArray() {
  let sandGrid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    sandGrid[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      sandGrid[i][j] = 0;
    }
  }
  return sandGrid;
}

//Varies colour by a little
function varyColour(color) {
  let Hue = floor(hue(color)) + floor(random(-0, 0));
  let Sat = saturation(color) + floor(random(0, 10));
  let Light = lightness(color) + floor(random(-10, 0));
  return `hsl(${Hue}, ${Sat}%, ${Light}%)`;
}

function setup() {
  createCanvas(300, 300);
  cols = width / squareSize;
  rows = height / squareSize;
  grid = makeZeroArray();
  colourGrid = makeZeroArray();
  movingGrid = makeZeroArray();
}

function draw() {

  //Reset canvas
  background(0);

  //Generate sand
  if (mouseIsPressed) {
    let mouseCol = floor(mouseX / squareSize);
    let mouseRow = floor(mouseY / squareSize);
    for (let i = -blobSize; i <= blobSize; i++) {
      for (let j = -blobSize; j <= blobSize; j++) {
        if (isRowInBounds(mouseRow + i) && isColInBounds(mouseCol + j) && Math.random() > 0.6) {
          grid[mouseRow + i][mouseCol + j] = varyColour(color("orange"));
        }
      }
    }
  }

  //Draw sand
  colorMode(HSB);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      noStroke();
      if (grid[i][j] != 0) {
        fill(grid[i][j]);
        let x = j * squareSize;
        let y = i * squareSize;
        square(x, y, squareSize);
      }
    }
  }

  //Drop sand
  for (let row = rows - 2; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] != 1) {
        if (grid[row + 1][col] == 0) {
          grid[row + 1][col] = grid[row][col];
          grid[row][col] = 0;
        }

        //Spill if sand cannot drop directly down
        else {
          direction = Math.random() > 0.5 ? 1 : -1;
          if (grid[row + 1][col + direction] == 0) {
            grid[row + 1][col + direction] = grid[row][col];
            grid[row][col] = 0;
          }
          else if (grid[row + 1][col - direction] == 0) {
            grid[row + 1][col - direction] = grid[row][col];
            grid[row][col] = 0;
          }
        }
      }
    }
  }
}