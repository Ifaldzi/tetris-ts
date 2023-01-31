import Arena from "./Arena"
import Block from "./blocks/Block"
import BlockSpawner from "./blocks/BlockSpawner"
import DrawingContext from "./DrawingContext"
import manager from './GameManager'
import scoreManager from './ScoreManager';

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private arena: Arena;
  private currentBlock: Block | undefined | null;
  private blockSpawner: BlockSpawner;

  private static instance: Game;

  private oldTimestamp: number | undefined;

  private timer: number = 1000;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.arena = new Arena(this.ctx, this.canvas.width, this.canvas.height);
    this.blockSpawner = BlockSpawner.getInstance();
  }

  public static getInstance(canvasId: string) {
    if (!this.instance) {
      this.instance = new Game(canvasId);
    }

    return this.instance;
  }

  public start(): void {
    console.log('start');

    manager.registerArena(this.arena);
    scoreManager.resetScore();
    DrawingContext.createInstance(this.canvas);

    this.currentBlock = this.blockSpawner.spawnRandomBlock();
    window.requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  private loop(timestamp: number): void {
    this.draw();

    if (!this.oldTimestamp) {
      this.oldTimestamp = timestamp;
    }

    const timeDiffInSecond = (timestamp - this.oldTimestamp) / 1000;
    const timeDiffSinceLastFrame = timestamp - this.oldTimestamp;
    this.oldTimestamp = timestamp;

    const fps = Math.round(1 / timeDiffInSecond);

    if (this.timer < 0) {
      if (this.currentBlock) {
        const isCollide = this.arena.checkCollide(this.currentBlock);
        if (isCollide) {
          // console.log('collide');
          this.arena.addBlockToArena(this.currentBlock);
          if (this.arena.isGameOver()) {
            return this.gameOver();
          }
          this.currentBlock = this.blockSpawner.spawnRandomBlock();
        } else {
          this.currentBlock.moveDown();
        }
      }

      const filledRowsTotal = this.arena.checkFilledRow();
      if (filledRowsTotal > 0) scoreManager.increaseScore(filledRowsTotal);
      this.timer = (1000 * 1) / manager.blockSpeed;
    }

    this.timer -= timeDiffSinceLastFrame;

    window.requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  private gameOver(): void {
    console.log('Game over');
    this.arena = new Arena(this.ctx, this.canvas.width, this.canvas.height);
    manager.resetLevel();
    scoreManager.resetScore();
    this.start();
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.arena.drawArena();
    this.currentBlock?.draw();
  }
}

export default Game