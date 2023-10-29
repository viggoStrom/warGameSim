
class baseSoldier {
    pos: { x: number, y: number };
    target: { x: number | undefined, y: number | undefined };
    speed: number;

    constructor(x: number, y: number) {
        this.pos = {
            x,
            y
        }
        this.target = {
            x: undefined,
            y: undefined
        }
        this.speed = 1
    };

    moveToTarget(): void {
        if (this.target.x === undefined || this.target.y === undefined) {
            return
        }
        const deltaX: number = this.pos.x - this.target.x
        const deltaY: number = this.pos.y - this.target.y
        const angleToTarget: number = Math.atan(deltaY / deltaX)
        console.log(Math.round(deltaX), Math.round(deltaY));
        console.log(180 * (angleToTarget / Math.PI));

        this.pos.x += 10 * this.speed * Math.cos(angleToTarget)
        // this.pos.y += 10 * this.speed * Math.sin(angleToTarget)
    }

    draw(): void {
        ctx.fillStyle = "rgb(0,155,155)"
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, 30, 0, 6.28)
        ctx.fill()
        ctx.closePath()
    };
}