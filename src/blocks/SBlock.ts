import Block from "./Block";

class SBlock extends Block {
  constructor(x: number, y: number) {
    const shape = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ]
    super(x, y, shape)
  }
}

export default SBlock