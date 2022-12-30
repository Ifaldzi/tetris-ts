import Block from "./Block";

class ZBlock extends Block {
  constructor(x: number, y: number) {
    const shape = [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ]
    super(x, y, shape)
  }
}

export default ZBlock