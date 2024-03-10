let rows, cols;
let squareSize = 5;
let blobSize = 3;
let sandGrid;
let totalWidth = 300;
let totalHeight = 300;

//Used to keep all sand on the screen
function isRowInBounds(row) {
  return row >= 0 && row < rows;
}

function isColInBounds(col) {
  return col >= 0 && col < cols;
}

//Initializes grid with 0s
function makeZeroArray() {
  sandGrid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    sandGrid[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      sandGrid[i][j] = 0;
    }
  }
}

//Varies colour by a little
function varyColour(color) {
  let Hue = floor(hue(color)) + floor(random(-0, 0));
  let Sat = saturation(color) + floor(random(0, 10));
  let Light = lightness(color) + floor(random(-10, 0));
  return `hsl(${Hue}, ${Sat}%, ${Light}%)`;
}

function setup() {
  var container = createCanvas(totalWidth, totalHeight);
  container.parent('container');
  cols = width / squareSize;
  rows = height / squareSize;
  makeZeroArray();
}

function draw() {

  //Reset canvas
  background(0);

  //Select colour
  let e = document.getElementById("sandColour");
  let value = e.value;

  //Generate sand
  if (mouseIsPressed && mouseY < totalHeight) {
    let mouseCol = floor(mouseX / squareSize);
    let mouseRow = floor(mouseY / squareSize);
    for (let i = -blobSize; i <= blobSize; i++) {
      for (let j = -blobSize; j <= blobSize; j++) {
        if (isRowInBounds(mouseRow + i) && isColInBounds(mouseCol + j) && Math.random() > 0.6) {
          sandGrid[mouseRow + i][mouseCol + j] = varyColour(color(value));
        }
      }
    }
  }

  //Draw sand
  colorMode(HSB);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      noStroke();
      if (sandGrid[i][j] != 0) {
        fill(sandGrid[i][j]);
        let x = j * squareSize;
        let y = i * squareSize;
        square(x, y, squareSize);
      }
    }
  }

  //Drop sand
  for (let row = rows - 2; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      if (sandGrid[row][col] != 1) {
        if (sandGrid[row + 1][col] == 0) {
          sandGrid[row + 1][col] = sandGrid[row][col];
          sandGrid[row][col] = 0;
        }

        //Spill if sand cannot drop directly down
        else {
          direction = Math.random() > 0.5 ? 1 : -1;
          if (sandGrid[row + 1][col + direction] == 0) {
            sandGrid[row + 1][col + direction] = sandGrid[row][col];
            sandGrid[row][col] = 0;
          }
          else if (sandGrid[row + 1][col - direction] == 0) {
            sandGrid[row + 1][col - direction] = sandGrid[row][col];
            sandGrid[row][col] = 0;
          }
        }
      }
    }
  }
}