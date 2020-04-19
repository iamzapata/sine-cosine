import './styles.css'

let canvas = document.getElementById('canvas')
const canvasWidth = canvas.width
const canvasHeight = canvas.height
const backgroundColor = '#F6F6F6'
let context = canvas.getContext('2d')
let centerX = canvasWidth / 2
let centerY = canvasHeight / 2

let secondsPassed
let oldTimeStamp
let fps
let animation = null

const PI = Math.PI
const PI2 = Math.PI * 2
const sin = Math.sin
const cos = Math.cos
const AMPLITUDE = 10
const PERIOD = 1
const PHASE = 1

const margin = 20

class Animation {
  constructor(fps) {
    this.incrementer = 0.05
    this.fps = fps
    this.angle = 0
    this.initialX = 0
    this.initialY = 0
  }

  drawFPS() {
    context.font = '18px Arial'
    context.fillStyle = 'black'
    context.fillText('FPS: ' + this.fps, 10, 30)
  }

  drawLabel(label, x, y) {
    context.font = '14px Arial'
    context.fillStyle = 'black'
    context.fillText(label, x, y)
  }

  drawCartisianAxes(x, y) {
    context.save()
    context.translate(x, y)
    context.beginPath()
    context.strokeStyle = 'lightgray'
    context.moveTo(0, 0) // Begin first sub-path
    context.lineTo(0, 100)
    context.moveTo(0, 0) // Begin first sub-path
    context.lineTo(0, -100)
    context.moveTo(0, 0) // Begin first sub-path
    context.lineTo(-100, 0)
    context.moveTo(0, 0) // Begin first sub-path
    context.lineTo(100, 0)
    context.stroke()
    context.restore()
  }

  drawSineCurve() {
    context.save()
    context.translate(centerX, centerY)
    context.strokeStyle = 'lightgray' // context.beginPath();
    context.moveTo(0, 0)

    for (let x = 0; x < PI2; x += 0.1) {
      context.lineTo(x * AMPLITUDE, AMPLITUDE * sin(PERIOD * x + PHASE * PI))
      context.stroke()
    }
    context.restore()
  }

  drawSine() {
    this.drawLabel('f(x) = A sin(Bx + c)', margin, centerY - 100)
    this.drawCartisianAxes(centerX, centerY)
    this.drawSineCurve()
    context.save()
    context.beginPath()
    context.arc(
      centerX + this.angle * AMPLITUDE,
      centerY + AMPLITUDE * sin(PERIOD * this.angle + PHASE * PI),
      2,
      0,
      PI * 2,
      false
    )
    context.closePath()
    context.fillStyle = 'green'
    context.fill()
    context.restore()
  }

  cleanScreen() {
    context.save()
    context.clearRect(0, 0, canvasWidth, canvasHeight)
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, canvasWidth, canvasHeight)
    context.restore()
  }

  update() {
    this.fps = fps
    this.angle += this.incrementer
    this.x = this.initialX + this.angle
    this.cleanScreen()
    this.drawFPS()
    this.drawSine()

    if (this.angle > PI2) {
      this.angle = 0
    }
  }
}

function init() {
  animation = new Animation(fps)
  requestAnimationFrame(animationLoop)
}

function draw() {
  animation.update()
}

function animationLoop(timeStamp) {
  //Calculate the number of seconds passed
  //since the last frame
  secondsPassed = (timeStamp - oldTimeStamp) / 1000
  oldTimeStamp = timeStamp

  //Calculate fps
  fps = Math.round(1 / secondsPassed)

  draw()

  requestAnimationFrame(animationLoop)
}
init()
