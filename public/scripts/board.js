const canvas = document.getElementById('board');  //Холст
const context = canvas.getContext('2d'); //Контекст

window.addEventListener("resize", resize);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', sketch);

context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

let coord = { x: 0, y: 0 };
let paint = false;

function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

function startPainting(event) {
    paint = true;
    getPosition(event);
}
function stopPainting() {
    paint = false;
}

function sketch(event) {
    if (!paint) return;
    context.beginPath();

    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.moveTo(coord.x, coord.y);
    getPosition(event);
    context.lineTo(coord.x, coord.y);
    context.stroke();
}

//Для изменения размера окна
function resize() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
}

//Стереть все на доске
function eraseAll() {
    const canvas = document.getElementById('board');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    handleButtonClick(null);
}
