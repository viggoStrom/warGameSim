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


// Move units and such
canvas.addEventListener("mousedown", (event): void => {
    const click = {
        x: canvas.width * event.offsetX / canvas.clientWidth,
        y: canvas.height * event.offsetY / canvas.clientHeight
    }
    redSoldier.target = click
})


// Selection Square
const bounds: { x1: number, y1: number, x2: number, y2: number } = { x1: 0, y1: 0, x2: 0, y2: 0 }
const marker = document.getElementById("marker") as HTMLDivElement
marker.style.backgroundColor = "red"
marker.style.width = "99px"
marker.style.height = "99px"
marker.style.position = "absolute"
marker.style.zIndex = "999"
marker.draggable = true
canvas.addEventListener("mousemove", (event): void => {
    const pos = {
        x: (canvas.width * event.offsetX / canvas.clientWidth),
        y: (canvas.height * event.offsetY / canvas.clientHeight)
    }
    marker.style.left = `${pos.x}px`
    marker.style.top = `${pos.y}px`
    marker.style.left = `${pos.x}px`
    marker.style.top = `${pos.y}px`
})
canvas.addEventListener("dragstart", (event): void => {
    const pos = {
        x: canvas.width * event.offsetX / canvas.clientWidth,
        y: canvas.height * event.offsetY / canvas.clientHeight
    }
    console.log(pos, event);
})
canvas.addEventListener("dragend", (event): void => {
    const pos = {
        x: canvas.width * event.offsetX / canvas.clientWidth,
        y: canvas.height * event.offsetY / canvas.clientHeight
    }
    console.log(pos, event);
})


// Updates and Frame
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