let canvas = document.getElementById("paint-canvas")
let ctx = canvas.getContext("2d")
ctx.fillStyle = "white"
var previousPosition = {x:0, y:0}


var mouseStatus = 'up'
var imageData = []


const w = document.documentElement.clientWidth
const h = document.documentElement.clientHeight

var deltaW = w*0.05


canvas.width = 0.9*w
canvas.height = 0.8*h


canvas.addEventListener("touchstart", (e) => {
    previousPosition = {x: e.touches[0].clientX - deltaW,
                        y: e.touches[0].clientY}
})

canvas.addEventListener("touchmove", (e) => {
    ctx.beginPath()
    ctx.moveTo(previousPosition.x, previousPosition.y)
    ctx.lineTo(e.touches[0].clientX - deltaW,
               e.touches[0].clientY)
    ctx.stroke()
    ctx.closePath()
    previousPosition = {x: e.touches[0].clientX - deltaW,
                        y: e.touches[0].clientY}
})

let clearButton = document.getElementById('clear-button')
clearButton.addEventListener('click', () => {
    ctx.clearRect(0,0,w,h)
})

canvas.addEventListener('mousemove', (e) => {
    if(mouseStatus == 'down'){
      ctx.beginPath()
      ctx.moveTo(previousPosition.x, previousPosition.y)
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
      ctx.closePath()
      previousPosition = {x: e.offsetX, y: e.offsetY}
    }
  })

canvas.addEventListener('mousedown', (e) => {
    imageData.push(ctx.getImageData(0,0,w,h))
    previousPosition = {x: e.offsetX, y: e.offsetY}
    mouseStatus = 'down'
})

canvas.addEventListener('mouseup', () => {
    mouseStatus = 'up'
})

document.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.key == 'z' && imageData.length > 0) {
      ctx.putImageData(imageData.pop(), 0,0)
    }
})
