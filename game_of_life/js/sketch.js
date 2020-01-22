function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;

let button1;
let buttonMinus;
let buttonPlus;
let play = 1;
let speed = 10;

button1 = document.getElementById("button1");
button1.addEventListener("click", function() { playPause() });

buttonMinus = document.getElementById("buttonMinus");
buttonMinus.addEventListener("click", function() {
    slowDown();
})
buttonPlus = document.getElementById("buttonPlus");
buttonPlus.addEventListener("click", function() {
    accelerate();
})

function accelerate() {
    speed += 2;
    frameRate(speed);
}

function slowDown() {
    speed -= 2;
    if (speed < 0) {
        speed = 0;
    }
    frameRate(speed);
}



function playPause() {
    if (play == 1) {
        noLoop();
        play = 0;
        button1.innerHTML = "Start";
    } else {
        loop();
        play = 1;
        button1.innerHTML = "Pause";
    }
}

function setup() {
    createCanvas(600, 400);
    frameRate(speed);
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(2 * Math.random(2));
        }
    }
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    let next = make2DArray(cols, rows);

    //compute 
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            //edges
            if (i == 0 || i == cols - 1 || j == 0 || j == rows - 1) {
                next[i][j] = state;
            } else {

                // count live neighbours
                let sum = 0;
                let neighbours = countNeighbours(grid, i, j);

                if (state == 0 && neighbours == 3) {
                    next[i][j] = 1;
                } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }
    }
    grid = next;
}

function countNeighbours(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            sum += grid[x + i][y + j];
        }
    }
    sum -= grid[x][y];
    return sum;
}