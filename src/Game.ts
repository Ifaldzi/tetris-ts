import Arena from "./Arena"
import Block from "./blocks/Block"
import BlockSpawner from "./blocks/BlockSpawner"
import DrawingContext from "./DrawingContext"
import manager from './GameManager'

class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private score: number
  private arena: Arena
  private currentBlock : Block | undefined | null
  private blockSpawner: BlockSpawner
  
  private static instance: Game

  private oldTimestamp: number | undefined
  private blockDownTimeDelay: number = 1

  private timer: number = this.blockDownTimeDelay
  
  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')!
    this.score = 0
    this.arena = new Arena(this.ctx, this.canvas.width, this.canvas.height)
    this.blockSpawner = BlockSpawner.getInstance()
  }

  public static getInstance(canvasId: string) {
    if (!this.instance) {
      this.instance = new Game(canvasId)
    }

    return this.instance
  }

  public start(): void {
    console.log('start');
    
    manager.registerArena(this.arena)
    DrawingContext.createInstance(this.canvas)
    
    this.currentBlock = this.blockSpawner.spawnRandomBlock()
    window.requestAnimationFrame((timestamp) => this.loop(timestamp))
  }

  private loop(timestamp: number): void {
    this.draw()
    
    if (!this.oldTimestamp) {
      this.oldTimestamp = timestamp
    }

    const timeDiffInSecond = (timestamp - this.oldTimestamp) / 1000
    this.oldTimestamp = timestamp

    const fps = Math.round(1/ timeDiffInSecond)
    
    if (this.timer < 0) {
      if (this.currentBlock) {
        const isCollide = this.arena.checkCollide(this.currentBlock)
        if (isCollide) {
          // console.log('collide');
          this.arena.addBlockToArena(this.currentBlock)
          this.currentBlock = this.blockSpawner.spawnRandomBlock()
        }
      }

      this.arena.checkFilledRow()
      this.currentBlock?.moveDown()

      this.timer = this.blockDownTimeDelay
    }

    this.timer -= timeDiffInSecond
    
    window.requestAnimationFrame((timestamp) => this.loop(timestamp))
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.arena.drawArena()
    this.currentBlock?.draw()
  }
}

export default Game