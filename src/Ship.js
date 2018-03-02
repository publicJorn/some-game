import { Graphics } from 'pixi.js'

class Ship extends Graphics {
  constructor () {
    super()

    this.beginFill(0x66FF33)
    this.drawPolygon([
      0, 0,
      18, 38,
      -18, 38,
    ])
    this.endFill()
    this.x = 500
    this.y = 800
    this.pivot.y = 19 // 19px down from top-center point
    this.vx = 0
    this.vy = 0

    // Ship controls/movement related
    this.ctrl = {
      accelerate: 0.1,
      deccelerate: 0.05,
      break: 0.2,
      maxForward: 5,
      maxReverse: -2,
      rotation: 1,

      speed: 0,
      angle: 0, // in deg
    }
  }

  update (controls, delta) {
    // Facting
    if (controls.left && !controls.right) {
      const newAngle = this.ctrl.angle - rotation
      this.ctrl.angle = (newAngle > 0) ? newAngle : newAngle + 360
    } else
    if (controls.right && !controls.left) {
      const newAngle = this.ctrl.angle + rotation
      this.ctrl.angle = (newAngle < 360) ? newAngle : newAngle - 360
    }

    // Thrust
    if (controls.forward && !controls.back) {
      // Forward
      this.ctrl.speed = Math.min(this.ctrl.speed + this.ctrl.accelerate, this.ctrl.maxForward)
    } else
    if (controls.back && !controls.forward) {
      // Reverse
      this.ctrl.speed = Math.max(this.ctrl.speed - this.ctrl.break, this.ctrl.maxReverse)
    } else {
      // Normalize to zero
      const newSpeedAbs = Math.abs(this.ctrl.speed) - this.ctrl.deccelerate
      this.ctrl.speed = (this.ctrl.speed > 0) ? newSpeedAbs : newSpeedAbs * -1
    }

    // Velocity
    // not taking azimuth into account
    // so FORWARD equals minus
    this.vy = -this.ctrl.speed

    // Delta makes it go backward on low speeds, so only add when vy > 1
    this.y += (this.vy > 1) ? this.vy + delta : this.vy
  }
}

export default Ship
