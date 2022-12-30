import Block from "./Block";

class LBlock extends Block {
  constructor(x: number, y: number) {
    const shape = [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ]
    super(x, y, shape)
  }
}

export default LBlock