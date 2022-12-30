import Block from "./Block";

class OBlock extends Block {
  constructor(x: number, y: number) {
    const shape = [
      [1, 1],
      [1, 1],
    ]
    super(x, y, shape)
  }
}

export default OBlock