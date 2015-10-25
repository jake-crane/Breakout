///<reference path="Brick.ts" />
var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brick: Brick;
var score = 0;
var lives = 3;
var brickRowCount: number = 5;
var brickColumnCount: number = 3;

var bricks: Brick[][] = [];
for (var i: number = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (var j: number = 0; j < brickRowCount; j++) {
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
            var b: Brick = bricks[i][j];
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
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (var i: number = 0; i < brickColumnCount; i++) {
        for (var j: number = 0; j < brickRowCount; j++) {
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
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();