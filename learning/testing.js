function Add(number1, number2) {
    return number1 + number2;
}
console.log("Mukund says hi! Look what this is, adding 2 and 3 = " + Add(2, 3));

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

context.beginPath();
context.rect(200, 200, 100, 100);
context.fill();
context.closePath();

/*

    <!-- <iframe src="index.js" width="600px" height="400px"></iframe> -->
    <script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js"></script>
    <!-- <div class="canvasDiv">
        <canvas id="myCanvas" height="500px" width="500px"></canvas>
    </div> -->
    <script src="sketch.js"></script>

    */