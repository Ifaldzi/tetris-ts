import DrawingContext from "../DrawingContext"
import KeyboardKey from "../listeners/KeyboardKey"
import KeyListener from "../listeners/KeyListener"
import listener from "../listeners/Listener"
import manager from '../GameManager'

class Block implements KeyListener {
  public x: number
  public y: number
  public shape: number[][]

  private context: DrawingContext
  private size: number

  constructor(x: number, y: number, shape: number[][]) {
    this.x = x
    this.y = y
    this.shape = shape
    this.context = DrawingContext.getInstance()
    this.size = this.context.canvas.width / 10
    listener.addEventListener(this)
  }

  private move(x: number) {
    this.x += x
  }

  public moveDown() {
    this.y += 1
  }

  public moveRight() {
    this.move(1)
  }

  public moveLeft() {
    this.move(-1)
  }

  public rotate() {
    const rotatedShape = this.shape[0].map((val, index) => this.shape.map(row => row[index]).reverse())
    this.shape = rotatedShape

    const arena = manager.arena
    const {col: width} = arena?.getArenaSize()!

    if (this.x < 0) {
      this.x = 0
    } else if (this.x + this.shape[0].length >= width) {
      console.log(this.shape[0].length - (width - 1 - this.x));
      
      this.x -= (this.shape[0].length - (width - this.x))
    }
  }

  public draw() {
    for (let i=0; i<this.shape.length; i++) {
      for (let j=0; j<this.shape[i].length; j++) {
        if (this.shape[i][j] !== 0) {
          this.context.ctx.fillRect((j + this.x) * this.size, (i + this.y) * this.size, this.size, this.size)
        }
      }
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    const arena = manager.arena
    
    switch (event.key) {
      case KeyboardKey.RIGHT:
        if (arena?.checkCollideWithWall(this) !== 1)
          this.moveRight()
        break;
      case KeyboardKey.LEFT:
        if (arena?.checkCollideWithWall(this) !== -1)
          this.moveLeft()
        break;
      case KeyboardKey.DOWN:
        if (!arena?.checkCollide(this))
          this.moveDown()
        break;
      case KeyboardKey.UP:
        this.rotate()
        break;
      default:
        break;
    }
  }
}

export default Block