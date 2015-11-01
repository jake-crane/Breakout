///<reference path="Brick.ts" />
///<reference path="Paddle.ts" />
class Game {
    private canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    private ctx = this.canvas.getContext("2d");
    private ballRadius = 10;
    private x = this.canvas.width / 2;
    private y = this.canvas.height - 30;
    private dx = 2;
    private dy = -2;
    private paddle: Paddle = new Paddle(75, 10);
    private rightPressed = false;
    private leftPressed = false;
    private brick: Brick;
    private score = 0;
    private lives = 3;
    private brickRowCount: number = 5;
    private brickColumnCount: number = 3;

    private bricks: Brick[][] = [];

    public constructor() {
        this.paddle.setX((this.canvas.width - this.paddle.getWidth()) / 2); // move out of constructor?
        for (var i: number = 0; i < this.brickColumnCount; i++) {
            this.bricks[i] = [];
            for (var j: number = 0; j < this.brickRowCount; j++) {
                this.bricks[i][j] = new Brick();
            }
        }
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
    }

    private keyDownHandler = (e) => {
        if (e.keyCode == 39) {
            this.rightPressed = true;
        }
        else if (e.keyCode == 37) {
            this.leftPressed = true;
        }
    }
    private keyUpHandler = (e) => {
        if (e.keyCode == 39) {
            this.rightPressed = false;
        }
        else if (e.keyCode == 37) {
            this.leftPressed = false;
        }
    }

    private collisionDetection() {
        for (var i: number = 0; i < this.brickColumnCount; i++) {
            for (var j: number = 0; j < this.brickRowCount; j++) {
                var b: Brick = this.bricks[i][j];
                if (b.getHealth() > 0) {
                    if (this.x > b.getX()
                        && this.x < b.getX() + Brick.width
                        && this.y > b.getY()
                        && this.y < b.getY() + Brick.height) {
                        this.dy = -this.dy;
                        b.setHealth(0);
                        this.score++;
                        if (this.score == this.brickRowCount * this.brickColumnCount) {
                            alert("YOU WIN!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    private drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }
    private drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddle.getX(), this.canvas.height - this.paddle.getHeight(), this.paddle.getWidth(), this.paddle.getHeight());
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();
    }
    private drawBricks() {
        for (var i: number = 0; i < this.brickColumnCount; i++) {
            for (var j: number = 0; j < this.brickRowCount; j++) {
                if (this.bricks[i][j].getHealth() > 0) {
                    var brickX = (j * (Brick.width + Brick.padding)) + Brick.offsetLeft;
                    var brickY = (i * (Brick.height + Brick.padding)) + Brick.offsetTop;
                    this.bricks[i][j].setX(brickX);
                    this.bricks[i][j].setY(brickY);
                    this.ctx.beginPath();
                    this.ctx.rect(brickX, brickY, Brick.width, Brick.height);
                    this.ctx.fillStyle = "red";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }
    private drawScore() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Score: " + this.score, 8, 20);
    }
    private drawLives() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Lives: " + this.lives, this.canvas.width - 65, 20);
    }

    public draw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBricks();
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
        this.drawLives();
        this.collisionDetection();

        if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
            if (this.x > this.paddle.getX() && this.x < this.paddle.getX() + this.paddle.getWidth()) {
                this.dy = -this.dy;
            } else {
                this.lives--;
                if (!this.lives) {
                    alert("GAME OVER");
                    document.location.reload();
                } else {
                    this.x = this.canvas.width / 2;
                    this.y = this.canvas.height - 30;
                    this.dx = 3;
                    this.dy = -3;
                    this.paddle.setX((this.canvas.width - this.paddle.getWidth()) / 2);
                }
            }
        }

        if (this.rightPressed && this.paddle.getX() < this.canvas.width - this.paddle.getWidth()) {
            this.paddle.setX(this.paddle.getX() + 7);
        } else if (this.leftPressed && this.paddle.getX() > 0) {
            this.paddle.setX(this.paddle.getX() - 7);
        }

        this.x += this.dx;
        this.y += this.dy;
        requestAnimationFrame(this.draw);
    }
    
}
