import Block from "./Block"
import BlockType from "./BlockType"
import IBlock from "./IBlock"
import JBlock from "./JBlock"
import LBlock from "./LBlock"
import OBlock from "./OBlock"
import SBlock from "./SBlock"
import TBlock from "./TBlock"
import ZBlock from "./ZBlock"

class BlockSpawner {
  private static instance: BlockSpawner

  public static getInstance() {
    if (!this.instance) {
      this.instance = new BlockSpawner()
    }

    return this.instance
  }

  public spawnBlock(type: BlockType): Block {
    const defaultX = 4

    switch (type) {
      case BlockType.I_BLOCK:
        return new IBlock(defaultX, 0)
      case BlockType.J_BLOCK:
        return new JBlock(defaultX, 0)
      case BlockType.L_BLOCK:
        return new LBlock(defaultX, 0)
      case BlockType.O_BLOCK:
        return new OBlock(defaultX, 0)
      case BlockType.S_BLOCK:
        return new SBlock(defaultX, 0)
      case BlockType.T_BLOCK:
        return new TBlock(defaultX, 0)
      case BlockType.Z_BLOCK:
        return new ZBlock(defaultX, 0)
      default:
        return new JBlock(defaultX, 0)
    }
  }

  public spawnRandomBlock(): Block {
    const randomIndex = Math.floor(Math.random() * 7)

    return this.spawnBlock(randomIndex)
  }
}

export default BlockSpawner