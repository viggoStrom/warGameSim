var BaseSoldier = /** @class */ (function () {
    function BaseSoldier(x, y, team) {
        if (team === void 0) { team = "neutral"; }
        updateQueue.push(this);
        entities.push(this);
        this.id = Date.now() % Math.random();
        this.pos = { x: x, y: y };
        this.target = {
            x: undefined,
            y: undefined
        };
        this.speed = 1;
        this.damage = 10;
        this.armor = 0;
        this.health = 100;
        this.range = 50;
        this.restTime = 1000;
        this.resting = false;
        this.color = "rgb(0,155,155)";
        this.team = team;
        this.idle = true;
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
        var distanceToTarget = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        if (distanceToTarget < 5) {
            this.target.x = undefined;
            this.target.y = undefined;
            return;
        }
        var angleToTarget = Math.atan(deltaY / deltaX);
        if (deltaX > 0 || distanceToTarget < this.range - 10) {
            this.pos.x -= this.speed * Math.cos(angleToTarget) * Math.random();
            this.pos.y -= this.speed * Math.sin(angleToTarget) * Math.random();
        }
        else if (deltaX < 0 || distanceToTarget > this.range - 10) {
            this.pos.x += this.speed * Math.cos(angleToTarget) * Math.random();
            this.pos.y += this.speed * Math.sin(angleToTarget) * Math.random();
        }
    };
    BaseSoldier.prototype.defend = function () {
    };
    BaseSoldier.prototype.attack = function () {
        var _this = this;
        entities.forEach(function (entity) {
            if (_this.id === entity.id || entity.team === _this.team) {
                return;
            }
            var dist = Math.sqrt(Math.pow((_this.pos.x - entity.pos.x), 2) + Math.pow((_this.pos.y - entity.pos.y), 2));
            if (dist < _this.range && !_this.resting) {
                _this.resting = true;
                entity.health -= Math.abs(_this.damage - entity.armor);
                setTimeout(function () {
                    _this.resting = false;
                }, _this.restTime);
            }
        });
    };
    BaseSoldier.prototype.search = function () {
        var _this = this;
        var closest = [this, Infinity];
        entities.forEach(function (entity) {
            if (_this.id === entity.id || entity.team === _this.team) {
                return;
            }
            var dist = Math.sqrt(Math.pow((_this.pos.x - entity.pos.x), 2) + Math.pow((_this.pos.y - entity.pos.y), 2));
            if (closest[1] > dist) {
                closest = [entity, dist];
            }
        });
        this.target = closest[0].pos;
    };
    BaseSoldier.prototype.drawZ0 = function () { };
    BaseSoldier.prototype.drawZ1 = function () {
        // Path
        if (this.target.x !== undefined && this.target.y !== undefined) {
            ctx.strokeStyle = "rgba(128,128,128,.8)";
            ctx.lineDashOffset = 10;
            ctx.lineCap = "round";
            ctx.lineWidth = 6;
            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.target.x, this.target.y);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        // Range
        ctx.fillStyle = "rgba(247, 32, 111, .3)";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.range, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    };
    BaseSoldier.prototype.drawZ2 = function () {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    };
    ;
    BaseSoldier.prototype.drawZ3 = function () { };
    BaseSoldier.prototype.drawZ4 = function () { };
    BaseSoldier.prototype.drawZ5 = function () {
        // Healthbar Backdrop
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(this.pos.x - 48, this.pos.y - 53, 100, 8);
        ctx.fill();
        ctx.closePath();
        // Healthbar Background
        ctx.lineWidth = 2;
        ctx.fillStyle = "lightgrey";
        ctx.strokeStyle = "gray";
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.rect(this.pos.x - 50, this.pos.y - 55, 100, 8);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        // Healthbar Fill
        ctx.fillStyle = "rgba(255,0,0,0.8)";
        ctx.beginPath();
        ctx.rect(this.pos.x - 48, this.pos.y - 54, this.health - 4, 6.5);
        ctx.fill();
        ctx.closePath();
    };
    BaseSoldier.prototype.update = function () {
        if (this.health <= 0) {
            updateQueue.splice(updateQueue.indexOf(this), 1);
            entities.splice(entities.indexOf(this), 1);
        }
        this.moveToTarget();
        if (Math.random() > .98 && this.idle) {
            this.idle = false;
            this.search();
        }
        this.attack();
    };
    return BaseSoldier;
}());
