let canvas = document.getElementById("paint-canvas")
let ctx = canvas.getContext("2d")
ctx.fillStyle = "white"
var previousPosition = {x:0, y:0}
    
canvas.addEventListener("touchstart", (e) => {
    previousPosition = {x: e.touches[0].clientX, y: e.touches[0].clientY}
})

canvas.addEventListener("touchmove", (e) => {
    ctx.beginPath()
    ctx.moveTo(previousPosition.x, previousPosition.y)
    ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY)
    ctx.stroke()
    ctx.closePath()
    previousPosition = {x: e.touches[0].clientX, y: e.touches[0].clientY}
})

let clearButton = document.getElementById('clear-button')
clearButton.addEventListener('click', () => {
    ctx.clearRect(0,0,300,400)
})