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