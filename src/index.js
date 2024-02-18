let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

context.beginPath();
context.rect(200, 200, 100, 100);
context.fill();
context.closePath();