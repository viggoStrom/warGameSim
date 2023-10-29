
class BaseSoldier {
    id: number;
    target: { x: number | undefined, y: number | undefined };
    pos: { x: number, y: number };
    speed: number;
    damage: number;
    health: number;
    armor: number;
    range: number;
    restTime: number;
    color: string;
    team: string;
    idle: boolean;
    resting: boolean;

    constructor(x: number, y: number, team: string = "neutral") {
        updateQueue.push(this)
        entities.push(this)

        this.id = Date.now() % Math.random()
        this.pos = { x, y }
        this.target = {
            x: undefined,
            y: undefined
        }
        this.speed = 1
        this.damage = 10
        this.armor = 0
        this.health = 100
        this.range = 50
        this.restTime = 1000
        this.resting = false
        this.color = "rgb(0,155,155)"
        this.team = team
        this.idle = true
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

        const distanceToTarget: number = Math.sqrt(deltaX ** 2 + deltaY ** 2)
        if (distanceToTarget < 5) {
            this.target.x = undefined
            this.target.y = undefined
            return
        }

        const angleToTarget: number = Math.atan(deltaY / deltaX)

        if (deltaX > 0 || distanceToTarget < this.range - 10) {
            this.pos.x -= this.speed * Math.cos(angleToTarget) * Math.random()
            this.pos.y -= this.speed * Math.sin(angleToTarget) * Math.random()
        }
        else if (deltaX < 0 || distanceToTarget > this.range - 10) {
            this.pos.x += this.speed * Math.cos(angleToTarget) * Math.random()
            this.pos.y += this.speed * Math.sin(angleToTarget) * Math.random()
        }
    }

    defend(): void {

    }

    attack(): void {
        entities.forEach((entity: any): void => {
            if (this.id === entity.id || entity.team === this.team) { return }

            const dist = Math.sqrt((this.pos.x - entity.pos.x) ** 2 + (this.pos.y - entity.pos.y) ** 2)
            if (dist < this.range && !this.resting) {
                this.resting = true
                entity.health -= Math.abs(this.damage - entity.armor)

                setTimeout(() => {
                    this.resting = false
                }, this.restTime);
            }
        })
    }

    search(): void {
        let closest: [BaseSoldier, number] = [this, Infinity]

        entities.forEach((entity: any): void => {
            if (this.id === entity.id || entity.team === this.team) { return }

            const dist = Math.sqrt((this.pos.x - entity.pos.x) ** 2 + (this.pos.y - entity.pos.y) ** 2)
            if (closest[1] > dist) {
                closest = [entity, dist]
            }
        })

        this.target = closest[0].pos
    }

    drawZ0(): void { }

    drawZ1(): void {
        // Path
        if (this.target.x !== undefined && this.target.y !== undefined) {
            ctx.strokeStyle = "rgba(128,128,128,.8)"
            ctx.lineDashOffset = 10
            ctx.lineCap = "round"
            ctx.lineWidth = 6
            ctx.setLineDash([5, 15])
            ctx.beginPath()
            ctx.moveTo(this.pos.x, this.pos.y)
            ctx.lineTo(this.target.x, this.target.y)
            ctx.stroke()
            ctx.fill()
            ctx.closePath()
        }

        // Range
        ctx.fillStyle = "rgba(247, 32, 111, .3)"
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.range, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }

    drawZ2(): void { // Body
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    };

    drawZ3(): void { }

    drawZ4(): void { }

    drawZ5(): void {
        // Healthbar Backdrop
        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.rect(this.pos.x - 48, this.pos.y - 53, 100, 8)
        ctx.fill()
        ctx.closePath()

        // Healthbar Background
        ctx.lineWidth = 2
        ctx.fillStyle = "lightgrey"
        ctx.strokeStyle = "gray"
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.rect(this.pos.x - 50, this.pos.y - 55, 100, 8)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

        // Healthbar Fill
        ctx.fillStyle = "rgba(255,0,0,0.8)"
        ctx.beginPath()
        ctx.rect(this.pos.x - 48, this.pos.y - 54, this.health - 4, 6.5)
        ctx.fill()
        ctx.closePath()
    }

    update(): void {
        if (this.health <= 0) {
            updateQueue.splice(updateQueue.indexOf(this), 1)
            entities.splice(entities.indexOf(this), 1)
        }
        this.moveToTarget()

        if (Math.random() > .98 && this.idle) {
            this.idle = false
            this.search()
        }

        this.attack()
    }
}