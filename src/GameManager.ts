import Arena from "./Arena"
import { Constants } from './Constants';
import Text from './ui/Text';

class GameManager {
  public arena: Arena | null = null;
  public level: number = 0;
  public blockSpeed: number = 1;

  private levelText: Text = new Text(Constants.LEVEL_ELEMENT_ID, `${this.level}`);

  registerArena(arena: Arena) {
    this.arena = arena;
  }

  increaseLevel() {
    this.level += 1;
    this.blockSpeed += 0.5;
    this.levelText.changeText(`${this.level}`);
  }

  resetLevel() {
    this.level = 0;
    this.levelText.changeText(`${this.level}`);
  }
}

export default new GameManager()