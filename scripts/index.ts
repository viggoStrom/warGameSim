const canvas = document.getElementById("playingField") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.width = 1920
canvas.height = 1080
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault()
})

const updateQueue: BaseSoldier[] = []

const soldier = new BaseSoldier(300, 200)
soldier.drawBody()

canvas.addEventListener("mousedown", (event): void => {
    const click = {
        x: canvas.width * event.offsetX / canvas.clientWidth,
        y: canvas.height * event.offsetY / canvas.clientHeight
    }
})

const masterUpdate = (): void => {
    Object.keys(updateQueue).forEach((key: string) => {


        updateQueue[key].forEach((update: CallableFunction) => {
            update()
        });
    });
}

const frame = (): void => {
    masterUpdate()

    window.requestAnimationFrame(frame)
}
window.requestAnimationFrame(frame)