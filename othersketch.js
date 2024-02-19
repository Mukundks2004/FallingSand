// Create a 2D array
// Sorry if you are used to matrix math!
// How would you do this with a
// higher order function????

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      // Fill the array with 0s
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }
  
  // The grid
  let grid;
  let velocityGrid;
  let colorGrid;
  
  // How big is each square?
  let w = 2;
  let cols, rows;
  let colorIndex = 0;
  
  let gravity = 0;
  
  let palette;
  
  // Check if a row is within the bounds
  function withinCols(i) {
    return i >= 0 && i <= cols - 1;
  }
  
  // Check if a column is within the bounds
  function withinRows(j) {
    return j >= 0 && j <= rows - 1;
  }
  
  function keyPressed() {
    if (key == ' ') {
      save('thumbnail.png');
    }
  }
  
  function setup() {
    createCanvas(600, 500);
    palette = [
      [11, 106, 136],
      [45, 197, 244],
      [112, 50, 126],
      [164, 41, 99],
      [236, 1, 90],
      [240, 99, 164],
      [241, 97, 100],
      [248, 158, 79],
      [252, 238, 33],
    ];
    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);
    velocityGrid = make2DArray(cols, rows, 1);
    colorGrid = make2DArray(cols, rows);
  }
  
  function draw() {
    background(0);
    console.log(width + " " + height + " " + w);
    
    if (mouseIsPressed) {
      let mouseCol = floor(mouseX / w);
      let mouseRow = floor(mouseY / w);
  
      // Randomly add an area of sand particles
      let matrix = 10;
      let extent = floor(matrix / 2);
      for (let i = -extent; i <= extent; i++) {
        for (let j = -extent; j <= extent; j++) {
          if (random(1) < 0.75) {
            let col = mouseCol + i;
            let row = mouseRow + j;
            if (withinCols(col) && withinRows(row)) {
              grid[col][row] = 1;
              let c = palette[int(colorIndex)];
              let r = c[0] + random(-5, 5);
              let g = c[1] + random(-5, 5);
              let b = c[2] + random(-5, 5);
              colorGrid[col][row] = color(r, g, b);
              velocityGrid[col][row] = 1;
            }
          }
        }
      }
      // Change the color of the sand over time
      colorIndex += 0.01;
      if (colorIndex > palette.length) {
        colorIndex = 0;
      }
    }
  
    //frameRate(1);
  
    // Draw the sand
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        noStroke();
        if (grid[i][j] > 0) {
          let c = colorGrid[i][j];
          fill(c);
          let x = i * w;
          let y = j * w;
          square(x, y, w);
        }
      }
    }
  
    // Create a 2D array for the next frame of animation
    let nextGrid = make2DArray(cols, rows);
    let nextVelocityGrid = make2DArray(cols, rows);
    let nextColorGrid = make2DArray(cols, rows);
  
    // Check every cell
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // What is the state?
        let state = grid[i][j];
        let col = colorGrid[i][j];
        let velocity = velocityGrid[i][j];
        let moved = false;
        if (state > 0) {
          let newPos = int(j + velocity);
          for (let y = newPos; y > j; y--) {
            let below = grid[i][y];
            let dir = 1;
            if (random(1) < 0.5) {
              dir *= -1;
            }
            let belowA = -1;
            let belowB = -1;
            if (withinCols(i + dir)) belowA = grid[i + dir][y];
            if (withinCols(i - dir)) belowB = grid[i - dir][y];
  
            if (below === 0) {
              nextGrid[i][y] = state;
              nextColorGrid[i][y] = col;
              nextVelocityGrid[i][y] = velocity + gravity;
              moved = true;
              break;
            } else if (belowA === 0) {
              nextGrid[i + dir][y] = state;
              nextColorGrid[i + dir][y] = col;
              nextVelocityGrid[i + dir][y] = velocity + gravity;
              moved = true;
              break;
            } else if (belowB === 0) {
              nextGrid[i - dir][y] = state;
              nextColorGrid[i - dir][y] = col;
              nextVelocityGrid[i - dir][y] = velocity + gravity;
              moved = true;
              break;
            }
          }
        }
  
        if (state > 0 && !moved) {
          nextGrid[i][j] = grid[i][j];
          nextColorGrid[i][j] = colorGrid[i][j];
          nextVelocityGrid[i][j] = velocityGrid[i][j] + gravity;
        }
      }
    }
    grid = nextGrid;
    colorGrid = nextColorGrid;
    velocityGrid = nextVelocityGrid;
  }
  