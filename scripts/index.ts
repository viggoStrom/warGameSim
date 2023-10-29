const canvas = document.getElementById("playingField") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.width = 1920
canvas.height = 1080
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault()
})

const updateQueue: Object[] = []
const entities: Object[] = []

const greenSoldier = new BaseSoldier(700, 400, "team1")
const redSoldier = new BaseSoldier(1000, 500, "team2")
redSoldier.color = "rgb(200,20,0)"

canvas.addEventListener("mousedown", (event): void => {
    const click = {
        x: canvas.width * event.offsetX / canvas.clientWidth,
        y: canvas.height * event.offsetY / canvas.clientHeight
    }
    redSoldier.target = click
})

const masterUpdate = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    updateQueue.forEach((element: any) => {
        element.update() // Movement and stuff
    });

    updateQueue.forEach((element: any) => {
        element.drawZ0() // Statics
    });
    updateQueue.forEach((element: any) => {
        element.drawZ1() // Particles and effects
    });
    updateQueue.forEach((element: any) => {
        element.drawZ2() // Entities
    });
    updateQueue.forEach((element: any) => {
        element.drawZ3() // Projectiles
    });
    updateQueue.forEach((element: any) => {
        element.drawZ4() // Lower UI
    });
    updateQueue.forEach((element: any) => {
        element.drawZ5() // UI
    });
}

const frame = (): void => {
    masterUpdate()

    window.requestAnimationFrame(frame)
}
window.requestAnimationFrame(frame)