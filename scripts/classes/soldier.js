var BaseSoldier = /** @class */ (function () {
    function BaseSoldier(x, y) {
        this.pos = { x: x, y: y };
        this.target = {
            x: undefined,
            y: undefined
        };
        this.speed = 1;
        this.damage = 1;
        this.armor = 1;
        this.health = 100;
        updateQueue.entities.push(this);
    }
    ;
    BaseSoldier.prototype.moveToTarget = function (x, y) {
        if (x === void 0) { x = undefined; }
        if (y === void 0) { y = undefined; }
        if (this.target.x === undefined || this.target.y === undefined) {
            return;
        }
        if (x !== undefined && y !== undefined) {
            this.target.x = x;
            this.target.y = y;
        }
        var deltaX = this.pos.x - this.target.x;
        var deltaY = this.pos.y - this.target.y;
        var angleToTarget = Math.atan(deltaY / deltaX);
        if (deltaX > 0) {
            this.pos.x -= 10 * this.speed * Math.cos(angleToTarget);
            this.pos.y -= 10 * this.speed * Math.sin(angleToTarget);
        }
        else {
            this.pos.x += 10 * this.speed * Math.cos(angleToTarget);
            this.pos.y += 10 * this.speed * Math.sin(angleToTarget);
        }
    };
    BaseSoldier.prototype.drawBody = function () {
        ctx.fillStyle = "rgb(0,155,155)";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 30, 0, 6.28);
        ctx.fill();
        ctx.closePath();
    };
    ;
    BaseSoldier.prototype.drawHealthbar = function () {
        ctx.fillStyle = "lightgrey";
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y - 80, 100, 10);
        ctx.fill();
    };
    return BaseSoldier;
}());
