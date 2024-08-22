const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const basket = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 30,
    width: 50,
    height: 20,
    dx: 5
};

const fruit = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 20,
    dy: 3
};

let score = 0;

function drawBasket() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawFruit() {
    ctx.beginPath();
    ctx.arc(fruit.x, fruit.y, fruit.width / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function moveBasket() {
    if (rightPressed && basket.x < canvas.width - basket.width) {
        basket.x += basket.dx;
    } else if (leftPressed && basket.x > 0) {
        basket.x -= basket.dx;
    }
}

function moveFruit() {
    fruit.y += fruit.dy;

    // Check if the fruit goes out of canvas
    if (fruit.y + fruit.height > canvas.height) {
        fruit.y = 0;
        fruit.x = Math.random() * (canvas.width - 20);
    }

    // Check for collision
    if (
        fruit.x < basket.x + basket.width &&
        fruit.x + fruit.width > basket.x &&
        fruit.y + fruit.height > basket.y &&
        fruit.y < basket.y + basket.height
    ) {
        score++;
        fruit.y = 0;
        fruit.x = Math.random() * (canvas.width - 20);
        console.log('Score: ' + score);
    }
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 8, 20);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();
    drawBasket();
    drawFruit();
    drawScore();
    moveBasket();
    moveFruit();

    requestAnimationFrame(gameLoop);
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

gameLoop();
