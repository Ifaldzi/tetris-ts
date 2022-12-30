import KeyListener from "./KeyListener";

class Listener {
  public addEventListener(keyListener: KeyListener) {
    document.addEventListener('keydown', (event: KeyboardEvent) => keyListener.onKeyDown(event))
  }
}

const listener = new Listener()

export default listener