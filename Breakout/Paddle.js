var Paddle = (function () {
    function Paddle(width, height) {
        this.width = width;
        this.height = height;
    }
    Paddle.prototype.getWidth = function () {
        return this.width;
    };
    Paddle.prototype.getHeight = function () {
        return this.height;
    };
    Paddle.prototype.getX = function () {
        return this.x;
    };
    Paddle.prototype.setX = function (x) {
        this.x = x;
    };
    return Paddle;
})();
