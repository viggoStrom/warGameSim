
class BaseSoldier {
    target: { x: number | undefined, y: number | undefined };
    pos: { x: number, y: number };
    speed: number;
    damage: number;
    health: number;
    armor: number;

    constructor(x: number, y: number) {
        this.pos = { x, y }
        this.target = {
            x: undefined,
            y: undefined
        }
        this.speed = 1
        this.damage = 1
        this.armor = 1
        this.health = 100

        updateQueue.entities.push(this)
    };

    moveToTarget(x: number | undefined = undefined, y: number | undefined = undefined): void {
        if (this.target.x === undefined || this.target.y === undefined) {
            return
        }

        if (x !== undefined && y !== undefined) {
            this.target.x = x
            this.target.y = y
        }

        const deltaX: number = this.pos.x - this.target.x
        const deltaY: number = this.pos.y - this.target.y
        const angleToTarget: number = Math.atan(deltaY / deltaX)

        if (deltaX > 0) {
            this.pos.x -= 10 * this.speed * Math.cos(angleToTarget)
            this.pos.y -= 10 * this.speed * Math.sin(angleToTarget)
        } else {
            this.pos.x += 10 * this.speed * Math.cos(angleToTarget)
            this.pos.y += 10 * this.speed * Math.sin(angleToTarget)
        }
    }

    drawBody(): void {
        ctx.fillStyle = "rgb(0,155,155)"
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, 30, 0, 6.28)
        ctx.fill()
        ctx.closePath()
    };

    drawHealthbar(): void {
        ctx.fillStyle = "lightgrey"
        ctx.beginPath()
        ctx.rect(this.pos.x, this.pos.y - 80, 100, 10)
        ctx.fill()
    }
}