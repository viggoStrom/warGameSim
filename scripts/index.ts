const canvas = document.getElementById("playingField") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.width = 1920
canvas.height = 1080
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault()
})

const soldier = new baseSoldier(300, 200)
// soldier.draw()
soldier.target = {
    x: 500,
    y: 500
}

canvas.addEventListener("mousedown", (event) => {
    soldier.target = {
        x: canvas.width * event.offsetX / canvas.clientWidth,
        y: canvas.height * event.offsetY / canvas.clientHeight
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    soldier.draw()
    soldier.moveToTarget()
})