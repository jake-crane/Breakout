var Brick = (function () {
    function Brick() {
        this.x = 0;
        this.y = 0;
        this.health = 100;
    }
    Brick.prototype.getX = function () {
        return this.x;
    };
    Brick.prototype.setX = function (x) {
        this.x = x;
    };
    Brick.prototype.getY = function () {
        return this.y;
    };
    Brick.prototype.setY = function (y) {
        this.y = y;
    };
    Brick.prototype.getHealth = function () {
        return this.health;
    };
    Brick.prototype.setHealth = function (health) {
        this.health = health;
    };
    Brick.width = 75;
    Brick.height = 20;
    Brick.padding = 10;
    Brick.offsetTop = 30;
    Brick.offsetLeft = 30;
    return Brick;
})();
