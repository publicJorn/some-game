import {
  Application,
  Graphics,
} from 'pixi.js'

import {
  rad2deg
} from './utils'

import Ship from './Ship'

const opts = {
  width: window.visualViewport.width,
  height: window.visualViewport.height,
}

const game = new Application({
  width: opts.width,
  height: opts.height,
  antialias: true,
  backgroundColor: 0X20242A,
})

game.view.setAttribute('id', 'game')
game.renderer.autoResize = true

// Globals
let state = () => {}
const keyStatus = { forward: false, right: false, back: false, left: false }
let ship

document.body.appendChild(game.view)
setup()
setKeyEvents()
start()

// ---

function setup () {
  let circle = new Graphics()
  circle.lineStyle(4, 0xFF3300, 1)
  circle.beginFill(0x66CCFF)
  circle.drawCircle(0, 0, 32)
  circle.endFill()
  circle.x = 264
  circle.y = 430
  game.stage.addChild(circle)

  let line = new Graphics()
  line.lineStyle(4, 0xFFFFFF, 1)
  line.moveTo(0, 0)
  line.lineTo(80, 50)
  line.x = 632
  line.y = 332
  game.stage.addChild(line)

  ship = new Ship()
  game.stage.addChild(ship)

  game.ticker.add(delta => gameLoop(delta))
}

function start () {
  state = play
}

function setKeyEvents () {
  window.addEventListener('keydown', (evt) => {
    switch (evt.which) {
      case 38:
        evt.preventDefault()
        keyStatus.forward = true
        break

      case 39:
        evt.preventDefault()
        keyStatus.right = true
        break

      case 40:
        evt.preventDefault()
        keyStatus.back = true
        break

      case 37:
        evt.preventDefault()
        keyStatus.left = true
        break
    }
  })
  window.addEventListener('keyup', (evt) => {
    switch (evt.which) {
      case 38:
        evt.preventDefault()
        keyStatus.forward = false
        break

      case 39:
        evt.preventDefault()
        keyStatus.right = false
        break

      case 40:
        evt.preventDefault()
        keyStatus.back = false
        break

      case 37:
        evt.preventDefault()
        keyStatus.left = false
        break
    }
  })
}

function gameLoop (delta) {
  state(delta)
}

function play (delta) {
  ship.update(keyStatus, delta)
}
