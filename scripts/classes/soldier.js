var baseSoldier = /** @class */ (function () {
    function baseSoldier(x, y) {
        this.pos = {
            x: x,
            y: y
        };
        this.target = {
            x: undefined,
            y: undefined
        };
        this.speed = 1;
    }
    ;
    baseSoldier.prototype.moveToTarget = function () {
        if (this.target.x === undefined || this.target.y === undefined) {
            return;
        }
        var deltaX = this.pos.x - this.target.x;
        var deltaY = this.pos.y - this.target.y;
        var angleToTarget = Math.atan(deltaY / deltaX);
        console.log(Math.round(deltaX), Math.round(deltaY));
        console.log(180 * (angleToTarget / Math.PI));
        this.pos.x += 10 * this.speed * Math.cos(angleToTarget);
        // this.pos.y += 10 * this.speed * Math.sin(angleToTarget)
    };
    baseSoldier.prototype.draw = function () {
        ctx.fillStyle = "rgb(0,155,155)";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 30, 0, 6.28);
        ctx.fill();
        ctx.closePath();
    };
    ;
    return baseSoldier;
}());
