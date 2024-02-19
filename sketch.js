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

let rows = 50;
let cols = 50;
let squareSize = 8;
let array;

function setup() {
  createCanvas(cols * squareSize, rows * squareSize);
  array = makeZeroArray();
}

function isXInBounds(x) {
  return (x >= 0 && x < cols * squareSize);
}

function isYInBounds(y) {
  return (y >= 0 && y < rows * squareSize);
}

function IsInBounds(x, y) {
  return isXInBounds(x) && isYInBounds(y);
}

function mouseDragged() {
  if (isXInBounds(mouseX) && isYInBounds(mouseY)) {
    let xCell = Math.floor(mouseX/squareSize);
    let yCell = Math.floor(mouseY/squareSize);
    array[yCell][xCell] = 1;
  }
}

function draw() {
  background(0);
  drawMyArray();
  getNextArray();
}

function getNextArray() {
  for (let row = rows - 2; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      if (array[row][col] == 1) {
        if (array[row + 1][col] == 0) {
          array[row + 1][col] = 1;
          array[row][col] = 0;
        }
        else {
          direction = Math.random(1) > 0.5 ? 1 : -1;
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

function drawMyArray() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      stroke(0);
      fill(array[i][j]*255);
      
      let x = j * squareSize;
      let y = i * squareSize;
      square(x, y, squareSize);
    }
  }
}