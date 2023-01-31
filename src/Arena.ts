import Block from './blocks/Block';
import { Color } from './blocks/Colors';

class Arena {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;

  private maxCol: number = 10;
  private maxRow: number = 20;

  private blockSize: number;

  private arenaArray: number[][];

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.blockSize = width / 10;

    this.arenaArray = new Array(this.maxRow).fill(null).map(() => Array(this.maxCol).fill(0));
    console.log(this.arenaArray);
  }

  public drawArena() {
    this.ctx.strokeRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.maxRow; i++) {
      for (let j = 0; j < this.maxCol; j++) {
        if (this.arenaArray[i][j] !== 0) {
          this.ctx.fillStyle = Color.getColor(this.arenaArray[i][j]);
          this.ctx.fillRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);
        }
      }
    }
  }

  public checkCollide(block: Block): boolean {
    const blockShape = block.shape;

    for (let row = blockShape.length - 1; row >= 0; row--) {
      for (let col = blockShape[row].length - 1; col >= 0; col--) {
        const piece = blockShape[row][col];

        const blockPositionInArena = {
          row: row + block.y,
          col: col + block.x,
        };

        if (
          blockPositionInArena.row >= this.maxRow ||
          blockPositionInArena.row < 0 ||
          blockPositionInArena.col >= this.maxCol ||
          blockPositionInArena.col < 0
        )
          continue;

        if (piece !== 0) {
          if (row + block.y >= this.maxRow - 1) return true;

          if (this.arenaArray[row + block.y + 1][col + block.x] !== 0) return true;
        }
      }
    }

    return false;
  }

  public checkCollideWithWall(block: Block): number {
    const blockShape = block.shape;

    for (let row = blockShape.length - 1; row >= 0; row--) {
      for (let col = blockShape[row].length - 1; col >= 0; col--) {
        const piece = blockShape[row][col];

        if (piece !== 0) {
          if (col + block.x + 1 >= this.maxCol) return 1;

          if (col + block.x - 1 < 0) return -1;

          if (row + block.y >= this.maxRow) return 0;

          if (this.arenaArray[row + block.y][col + block.x + 1] !== 0) return 1;

          if (this.arenaArray[row + block.y][col + block.x - 1] !== 0) return -1;
        }
      }
    }

    return 0;
  }

  public getArenaSize() {
    return {
      row: this.maxRow,
      col: this.maxCol,
    };
  }

  public addBlockToArena(block: Block): void {
    const blockShape = block.shape;

    for (let row = 0; row < blockShape.length; row++) {
      for (let col = 0; col < blockShape[row].length; col++) {
        const arenaPiece = this.arenaArray[block.y + row]?.[block.x + col];

        if (block.y + row < this.maxRow && block.x + col < this.maxCol && arenaPiece === 0) {
          this.arenaArray[block.y + row][block.x + col] =
            blockShape[row][col] !== 0 ? block.color : 0;
        }
      }
    }
  }

  public checkFilledRow(): number {
    let filledRowCount = 0;
    for (let row = 0; row < this.maxRow; row++) {
      const isFilled = !this.arenaArray[row].some((val) => val === 0);

      if (isFilled) {
        this.arenaArray[row] = Array(this.maxCol).fill(0);
        filledRowCount++;
      }
    }

    if (filledRowCount > 0) this.dropRestBlock();

    return filledRowCount;
  }

  public dropRestBlock(startIndex: number = 1): void {
    if (startIndex >= this.maxRow) return;

    const isRowEmpty = !this.arenaArray[startIndex].some((val) => val !== 0);
    const isLastRowEmpty = !this.arenaArray[startIndex - 1].some((val) => val !== 0);

    if (isRowEmpty && !isLastRowEmpty) {
      this.arenaArray.splice(startIndex, 1);
      this.arenaArray.unshift(Array(this.maxCol).fill(0));
    }

    return this.dropRestBlock(++startIndex);
  }

  public isGameOver(): boolean {
    return this.arenaArray[0].some((elm) => elm !== 0);
  }
}

export default Arena;
