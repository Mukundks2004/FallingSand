let rows, cols;
let squareSize = 2;
let blobSize = 2;
let array, colourGrid, movingGrid;
let mukundBlue;

function makeZeroArray() {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

function isRowInBounds(row) {
  return row >= 0 && row < rows;
}

function isColInBounds(col) {
  return col >= 0 && col < cols;
}

function setup() {
  
  createCanvas(600, 600);
  cols = width / squareSize;
  rows = height / squareSize;
  array = makeZeroArray();
  colourGrid = makeZeroArray();
  movingGrid = makeZeroArray();
}

function varyBlue(color) {
  let Hue = floor(hue(color));
  let Sat = saturation(color) + floor(random(0, 10));
  let Light = lightness(color) + floor(random(-10, 0));
  return `hsl(${Hue}, ${Sat}%, ${Light}%)`;
}

function draw() {
  background(0);
  if (mouseIsPressed) {
    let mouseCol = floor(mouseX / squareSize);
    let mouseRow = floor(mouseY / squareSize);
    for (let i = -blobSize; i <= blobSize; i++) {
      for (let j = -blobSize; j <= blobSize; j++) {
        if (isRowInBounds(mouseRow + i) && isColInBounds(mouseCol + j) && Math.random() > 0.6) {
          //mukundBlue = color("magenta");
          //console.log(varyBlue(mukundBlue));
          array[mouseRow + i][mouseCol + j] = 1;
        }
      }
    }
  }
  mukundBlue = color("magenta");
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      noStroke();
      if (array[i][j] > 0) {

        colorMode(HSB);

        fill(varyBlue(mukundBlue));

        let x = j * squareSize;
        let y = i * squareSize;
        square(x, y, squareSize);
      }
    }
  }

  for (let row = rows - 2; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      if (array[row][col] == 1) {
        if (array[row + 1][col] == 0) {
          array[row + 1][col] = 1;
          array[row][col] = 0;
        }
        else {
          direction = Math.random() > 0.5 ? 1 : -1;
          if (array[row + 1][col + direction] == 0) {
            array[row + 1][col + direction] = 1;
            array[row][col] = 0;
          }
          else if (array[row + 1][col - direction] == 0) {
            array[row + 1][col - direction] = 1;
            array[row][col] = 0;
          }
        }
      }
    }
  }
}