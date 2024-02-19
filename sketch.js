let rows = 300;
let cols = 300;
let squareSize = 2;
let blobSize = 2;
let array;

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

function setup() {
  
  createCanvas(600, 600);
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
  
}

function draw() {
  if (mouseIsPressed) {
    for (let i = -blobSize; i < blobSize; i++) {
      for (let j = -blobSize; j < blobSize; j++) {
        if (isXInBounds(mouseX + j * squareSize) && isYInBounds(mouseY + i * blobSize) && Math.random() > 0.9) {
          let xCell = Math.floor(mouseX/squareSize);
          let yCell = Math.floor(mouseY/squareSize);
          array[yCell + j][xCell + i] = 1;
        }
      }
    }
  }
  background(0);
  drawMyArray();
  
  let newArray = makeZeroArray();

  for (let row = rows - 2; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      let state = array[row][column];
      if (state == 1) {
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
  array = newArray;
}

function drawMyArray() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      noStroke();
      fill(array[i][j]*255);
      
      let x = j * squareSize;
      let y = i * squareSize;
      square(x, y, squareSize);
    }
  }
}