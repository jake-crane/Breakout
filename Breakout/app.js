///<reference path="Brick.ts" />
///<reference path="Paddle.ts" />
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddle = new Paddle(75, 10);
paddle.setX((canvas.width - paddle.getWidth()) / 2);
var rightPressed = false;
var leftPressed = false;
var brick;
var score = 0;
var lives = 3;
var brickRowCount = 5;
var brickColumnCount = 3;
var bricks = [];
for (var i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (var j = 0; j < brickRowCount; j++) {
        bricks[i][j] = new Brick();
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
function collisionDetection() {
    for (i = 0; i < brickColumnCount; i++) {
        for (j = 0; j < brickRowCount; j++) {
            var b = bricks[i][j];
            if (b.getHealth() > 0) {
                if (x > b.getX()
                    && x < b.getX() + Brick.width
                    && y > b.getY()
                    && y < b.getY() + Brick.height) {
                    dy = -dy;
                    b.setHealth(0);
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.getX(), canvas.height - paddle.getHeight(), paddle.getWidth(), paddle.getHeight());
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (var i = 0; i < brickColumnCount; i++) {
        for (var j = 0; j < brickRowCount; j++) {
            if (bricks[i][j].getHealth() > 0) {
                var brickX = (j * (Brick.width + Brick.padding)) + Brick.offsetLeft;
                var brickY = (i * (Brick.height + Brick.padding)) + Brick.offsetTop;
                bricks[i][j].setX(brickX);
                bricks[i][j].setY(brickY);
                ctx.beginPath();
                ctx.rect(brickX, brickY, Brick.width, Brick.height);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddle.getX() && x < paddle.getX() + paddle.getWidth()) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddle.setX((canvas.width - paddle.getWidth()) / 2);
            }
        }
    }
    if (rightPressed && paddle.getX() < canvas.width - paddle.getWidth()) {
        paddle.setX(paddle.getX() + 7);
    }
    else if (leftPressed && paddle.getX() > 0) {
        paddle.setX(paddle.getX() - 7);
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
draw();
