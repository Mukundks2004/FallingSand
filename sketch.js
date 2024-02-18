

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
let squareSize = 15;
let array;

function setup() {
  createCanvas(cols * squareSize, rows * squareSize);
  array = makeZeroArray();
  array[10][10] = 1;
  
  
}

function draw() {
  background(0);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      stroke(255);
      fill(array[i][j]*255);
      
      let x = j * squareSize;
      let y = i * squareSize;
      square(x, y, 50);
    }
  }
}